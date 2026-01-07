
import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- GAME TYPES ---
type Point = { x: number; y: number };
type Vector = { x: number; y: number };

interface GameObject {
  id: number;
  pos: Point;
  vel: Vector;
  radius: number;
  angle: number;
}

interface Ship extends GameObject {
  rotation: number; // Current visual angle
  thrusting: boolean;
  cooldown: number;
  invulnerable: number;
}

interface Asteroid extends GameObject {
  type: 'large' | 'medium' | 'small';
  vertices: Point[]; // Relative offsets for wireframe drawing
  rotationSpeed: number;
}

interface Bullet extends GameObject {
  life: number;
}

interface Particle {
  id: number;
  pos: Point;
  vel: Vector;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

// --- CONSTANTS ---
const FPS = 60;
const FRICTION = 0.98; // Low friction for floaty feel
const SHIP_THRUST = 0.15;
const ROTATION_SPEED = 0.07;
const MAX_SPEED = 7;
const BULLET_SPEED = 12;
const BULLET_LIFETIME = 60;
const BULLET_COOLDOWN = 15;
const ASTEROID_SPEED_BASE = 1.5;

interface HeroProps {
  isLocked?: boolean;
  onUnlock?: () => void;
  onGameStatusChange?: (isActive: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ isLocked = false, onUnlock, onGameStatusChange }) => {
  // --- REFS (GAME STATE) ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const gameRunningRef = useRef(false); // Logic ref to avoid stale closures
  const scoreRef = useRef(0); 
  const livesRef = useRef(3);
  
  // Game Entities
  const shipRef = useRef<Ship>({
    id: 0,
    pos: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    radius: 15,
    angle: -Math.PI / 2,
    rotation: -Math.PI / 2,
    thrusting: false,
    cooldown: 0,
    invulnerable: 0,
  });
  
  const asteroidsRef = useRef<Asteroid[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const shakeRef = useRef(0);
  const frameCountRef = useRef(0);
  const difficultyMultiplierRef = useRef(1);

  // Audio Context
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // --- REACT STATE (UI) ---
  const [gameActive, setGameActive] = useState(false);
  const [uiScore, setUiScore] = useState(0); 
  const [uiLives, setUiLives] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [gameState, setGameState] = useState<'briefing' | 'playing' | 'gameover'>('briefing');

  // Load High Score
  useEffect(() => {
    const stored = localStorage.getItem('LORI_BATTOUK_HIGHSCORE');
    if (stored) setHighScore(parseInt(stored));
  }, []);

  // Sync game active state with parent (App.tsx)
  useEffect(() => {
    if (onGameStatusChange) {
      onGameStatusChange(gameActive);
    }
    // Lock scroll when game is active
    if (gameActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [gameActive, onGameStatusChange]);

  // If we are locked, show briefing immediately, but don't start loop until user clicks
  useEffect(() => {
    if (isLocked) {
      setGameActive(true);
      setGameState('briefing');
    }
  }, [isLocked]);

  // --- AUDIO SYSTEM ---
  const initAudio = () => {
    if (audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        return;
    }
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = isMuted ? 0 : 0.3;
    master.connect(ctx.destination);
    
    audioCtxRef.current = ctx;
    masterGainRef.current = master;
  };

  const playSound = useCallback((type: 'shoot' | 'thrust' | 'explode' | 'hit' | 'gameover') => {
    if (isMuted || !audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const t = ctx.currentTime;

    if (type === 'shoot') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.1);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
      osc.connect(gain);
      gain.connect(masterGainRef.current);
      osc.start(t);
      osc.stop(t + 0.15);
    } 
    else if (type === 'thrust') {
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, t);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.1);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current);
      noise.start(t);
    }
    else if (type === 'explode') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, t);
      osc.frequency.exponentialRampToValueAtTime(10, t + 0.4);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
      osc.connect(gain);
      gain.connect(masterGainRef.current);
      osc.start(t);
      osc.stop(t + 0.4);
    }
    else if (type === 'hit') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.exponentialRampToValueAtTime(50, t + 0.1);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.1);
      osc.connect(gain);
      gain.connect(masterGainRef.current);
      osc.start(t);
      osc.stop(t + 0.1);
    }
    else if (type === 'gameover') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, t);
        osc.frequency.exponentialRampToValueAtTime(20, t + 0.5);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.5);
        osc.connect(gain);
        gain.connect(masterGainRef.current);
        osc.start(t);
        osc.stop(t + 0.5);
    }
  }, [isMuted]);

  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(isMuted ? 0 : 0.3, audioCtxRef.current?.currentTime || 0, 0.1);
    }
  }, [isMuted]);

  // --- GAME LOGIC HELPERS ---
  const spawnAsteroid = (canvas: HTMLCanvasElement, size: 'large' | 'medium' | 'small', x?: number, y?: number) => {
    let pos = { x: 0, y: 0 };
    if (x !== undefined && y !== undefined) {
      pos = { x, y };
    } else {
      if (Math.random() < 0.5) {
        pos.x = Math.random() < 0.5 ? -50 : canvas.width + 50;
        pos.y = Math.random() * canvas.height;
      } else {
        pos.x = Math.random() * canvas.width;
        pos.y = Math.random() < 0.5 ? -50 : canvas.height + 50;
      }
    }

    const radius = size === 'large' ? 40 : size === 'medium' ? 20 : 10;
    const angleToCenter = Math.atan2(canvas.height/2 - pos.y, canvas.width/2 - pos.x);
    const spread = 1.5; 
    const angle = x === undefined ? angleToCenter + (Math.random() - 0.5) * spread : Math.random() * Math.PI * 2;
    // Difficulty scaler increases speed
    const speed = (ASTEROID_SPEED_BASE + Math.random()) * difficultyMultiplierRef.current * (size === 'small' ? 1.5 : 1);

    const vertices: Point[] = [];
    const numVerts = 5 + Math.floor(Math.random() * 5);
    for (let i = 0; i < numVerts; i++) {
      const theta = (i / numVerts) * Math.PI * 2 + (Math.random() * 0.5);
      const r = radius * (0.8 + Math.random() * 0.4);
      vertices.push({ x: Math.cos(theta) * r, y: Math.sin(theta) * r });
    }

    asteroidsRef.current.push({
      id: Math.random(),
      pos,
      vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
      radius,
      angle: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      type: size,
      vertices
    });
  };

  const spawnParticles = (x: number, y: number, count: number, color: string, speed: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const v = Math.random() * speed;
      particlesRef.current.push({
        id: Math.random(),
        pos: { x, y },
        vel: { x: Math.cos(angle) * v, y: Math.sin(angle) * v },
        life: 1.0,
        maxLife: 1.0,
        color,
        size: Math.random() * 3 + 1
      });
    }
  };

  // --- MAIN GAME LOOP ---
  const animate = (time: number) => {
    if (!gameRunningRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    frameCountRef.current++;
    // Increase difficulty slowly over time (Infinite Scaling)
    if (frameCountRef.current % 600 === 0) difficultyMultiplierRef.current += 0.05;

    // --- UPDATES ---
    const ship = shipRef.current;
    const keys = inputRef.current;

    // 1. Ship Physics
    if (livesRef.current > 0) {
      if (keys.ArrowLeft || keys.a) ship.angle -= ROTATION_SPEED;
      if (keys.ArrowRight || keys.d) ship.angle += ROTATION_SPEED;
      
      ship.thrusting = keys.ArrowUp || keys.w;
      if (ship.thrusting) {
        ship.vel.x += Math.cos(ship.angle) * SHIP_THRUST;
        ship.vel.y += Math.sin(ship.angle) * SHIP_THRUST;
        playSound('thrust');
        if (Math.random() > 0.5) {
           const offset = { x: Math.cos(ship.angle + Math.PI) * 15, y: Math.sin(ship.angle + Math.PI) * 15 };
           particlesRef.current.push({
             id: Math.random(),
             pos: { x: ship.pos.x + offset.x, y: ship.pos.y + offset.y },
             vel: { x: -Math.cos(ship.angle) * 3 + (Math.random()-0.5), y: -Math.sin(ship.angle) * 3 + (Math.random()-0.5) },
             life: 0.5, maxLife: 0.5, color: '#9333ea', size: 2 // Purple particles
           });
        }
      }

      // Shooting
      if ((keys.Space || keys[' ']) && ship.cooldown <= 0) {
        bulletsRef.current.push({
          id: Math.random(),
          pos: { 
            x: ship.pos.x + Math.cos(ship.angle) * 20, 
            y: ship.pos.y + Math.sin(ship.angle) * 20 
          },
          vel: { 
            x: Math.cos(ship.angle) * BULLET_SPEED + ship.vel.x * 0.5, 
            y: Math.sin(ship.angle) * BULLET_SPEED + ship.vel.y * 0.5 
          },
          radius: 2,
          angle: ship.angle,
          life: BULLET_LIFETIME
        });
        ship.cooldown = BULLET_COOLDOWN;
        playSound('shoot');
        shakeRef.current = 2;
      }
      if (ship.cooldown > 0) ship.cooldown--;
      if (ship.invulnerable > 0) ship.invulnerable--;

      ship.vel.x *= FRICTION;
      ship.vel.y *= FRICTION;
      const speed = Math.sqrt(ship.vel.x ** 2 + ship.vel.y ** 2);
      if (speed > MAX_SPEED) {
        ship.vel.x = (ship.vel.x / speed) * MAX_SPEED;
        ship.vel.y = (ship.vel.y / speed) * MAX_SPEED;
      }

      ship.pos.x += ship.vel.x;
      ship.pos.y += ship.vel.y;

      if (ship.pos.x < 0) ship.pos.x = canvas.width;
      if (ship.pos.x > canvas.width) ship.pos.x = 0;
      if (ship.pos.y < 0) ship.pos.y = canvas.height;
      if (ship.pos.y > canvas.height) ship.pos.y = 0;
    }

    // 2. Projectiles
    bulletsRef.current.forEach(b => {
      b.pos.x += b.vel.x;
      b.pos.y += b.vel.y;
      b.life--;
    });
    bulletsRef.current = bulletsRef.current.filter(b => b.life > 0);

    // 3. Asteroids
    // Spawn cap increases with difficulty
    if (asteroidsRef.current.length < 5 + Math.floor(difficultyMultiplierRef.current * 3)) {
      if (Math.random() < 0.02 * difficultyMultiplierRef.current) spawnAsteroid(canvas, Math.random() > 0.7 ? 'large' : 'medium');
    }

    asteroidsRef.current.forEach(a => {
      a.pos.x += a.vel.x;
      a.pos.y += a.vel.y;
      a.angle += a.rotationSpeed;
      
      if (a.pos.x < -60) a.pos.x = canvas.width + 50;
      if (a.pos.x > canvas.width + 60) a.pos.x = -50;
      if (a.pos.y < -60) a.pos.y = canvas.height + 50;
      if (a.pos.y > canvas.height + 60) a.pos.y = -50;
    });

    // 4. Collisions
    bulletsRef.current.forEach(b => {
      asteroidsRef.current.forEach(a => {
        const dx = b.pos.x - a.pos.x;
        const dy = b.pos.y - a.pos.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < a.radius) {
          b.life = 0; 
          playSound('hit');
          spawnParticles(a.pos.x, a.pos.y, 8, '#c026d3', 3); // Fuchsia explosion
          
          if (a.type === 'large') {
            scoreRef.current += 100;
            spawnAsteroid(canvas, 'medium', a.pos.x, a.pos.y);
            spawnAsteroid(canvas, 'medium', a.pos.x, a.pos.y);
          } else if (a.type === 'medium') {
            scoreRef.current += 250;
            spawnAsteroid(canvas, 'small', a.pos.x, a.pos.y);
            spawnAsteroid(canvas, 'small', a.pos.x, a.pos.y);
            spawnAsteroid(canvas, 'small', a.pos.x, a.pos.y);
          } else {
            scoreRef.current += 500;
          }
          
          a.pos.x = -9999; 
          setUiScore(scoreRef.current);
          if (scoreRef.current > highScore) {
              setHighScore(scoreRef.current);
          }
        }
      });
    });
    asteroidsRef.current = asteroidsRef.current.filter(a => a.pos.x !== -9999);

    if (livesRef.current > 0 && ship.invulnerable <= 0) {
      asteroidsRef.current.forEach(a => {
        const dx = ship.pos.x - a.pos.x;
        const dy = ship.pos.y - a.pos.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < a.radius + ship.radius) {
          playSound('explode');
          spawnParticles(ship.pos.x, ship.pos.y, 20, '#ffffff', 5);
          shakeRef.current = 20;
          livesRef.current--;
          setUiLives(livesRef.current);
          ship.invulnerable = 120;
          ship.pos = { x: canvas.width/2, y: canvas.height/2 };
          ship.vel = { x: 0, y: 0 };
          
          if (livesRef.current <= 0) {
             setGameState('gameover');
             gameRunningRef.current = false; // Stop loop
             playSound('gameover');
             // Save High Score
             if (scoreRef.current > highScore) {
                 localStorage.setItem('LORI_BATTOUK_HIGHSCORE', scoreRef.current.toString());
             }
          }
        }
      });
    }

    // 5. Particles
    particlesRef.current.forEach(p => {
      p.pos.x += p.vel.x;
      p.pos.y += p.vel.y;
      p.life -= 0.02;
    });
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);

    if (shakeRef.current > 0) shakeRef.current *= 0.9;
    if (shakeRef.current < 0.5) shakeRef.current = 0;

    // --- DRAWING ---
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    if (shakeRef.current > 0) {
      const dx = (Math.random() - 0.5) * shakeRef.current;
      const dy = (Math.random() - 0.5) * shakeRef.current;
      ctx.translate(dx, dy);
    }

    particlesRef.current.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    ctx.fillStyle = '#c026d3'; // Bullet color (Fuchsia 600)
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#c026d3';
    bulletsRef.current.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.pos.x, b.pos.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#e9d5ff'; // Asteroid wireframe (Purple 200)
    ctx.lineWidth = 2;
    asteroidsRef.current.forEach(a => {
      ctx.save();
      ctx.translate(a.pos.x, a.pos.y);
      ctx.rotate(a.angle);
      
      ctx.shadowBlur = a.type === 'large' ? 5 : 10;
      ctx.shadowColor = '#d8b4fe'; // Purple 300 shadow

      ctx.beginPath();
      ctx.moveTo(a.vertices[0].x, a.vertices[0].y);
      for (let i = 1; i < a.vertices.length; i++) {
        ctx.lineTo(a.vertices[i].x, a.vertices[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = '#c026d3'; // Asteroid fill (Fuchsia 600)
      ctx.globalAlpha = 0.1;
      ctx.fill();
      ctx.globalAlpha = 1.0;
      ctx.restore();
    });

    if (livesRef.current > 0) {
      if (ship.invulnerable === 0 || Math.floor(frameCountRef.current / 5) % 2 === 0) {
        ctx.save();
        ctx.translate(ship.pos.x, ship.pos.y);
        ctx.rotate(ship.angle);

        ctx.strokeStyle = '#9333ea'; // Ship color (Purple 600)
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#9333ea';
        
        ctx.beginPath();
        ctx.moveTo(20, 0); 
        ctx.lineTo(-15, 12); 
        ctx.lineTo(-10, 0); 
        ctx.lineTo(-15, -12); 
        ctx.closePath();
        ctx.stroke();

        if (ship.thrusting) {
           ctx.fillStyle = '#c026d3'; // Thrust color (Fuchsia 600)
           ctx.beginPath();
           ctx.moveTo(-12, 0);
           ctx.lineTo(-25, 5);
           ctx.lineTo(-25, -5);
           ctx.fill();
        }

        ctx.restore();
      }
    }

    ctx.restore(); 

    requestRef.current = requestAnimationFrame(animate);
  };

  const inputRef = useRef<{ [key: string]: boolean }>({});
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { 
        if (gameRunningRef.current && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();
        }
        inputRef.current[e.key] = true; 
    };
    const handleKeyUp = (e: KeyboardEvent) => { inputRef.current[e.key] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startGame = () => {
    initAudio();
    setGameActive(true);
    setGameState('playing');
    gameRunningRef.current = true;
    setUiLives(3);
    setUiScore(0);
    
    // Reset Refs
    livesRef.current = 3;
    scoreRef.current = 0;
    shipRef.current.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    shipRef.current.vel = { x: 0, y: 0 };
    shipRef.current.angle = -Math.PI / 2;
    asteroidsRef.current = [];
    bulletsRef.current = [];
    particlesRef.current = [];
    difficultyMultiplierRef.current = 1;
    frameCountRef.current = 0;

    cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  const stopGame = () => {
    setGameActive(false);
    setGameState('briefing'); // Reset game state to ensure UI cleans up
    gameRunningRef.current = false;
    cancelAnimationFrame(requestRef.current);
    if (audioCtxRef.current) audioCtxRef.current.suspend();
    // Exiting always unlocks the site
    handleUnlock();
  };

  const handleUnlock = () => {
      setGameActive(false);
      gameRunningRef.current = false;
      if (onUnlock) onUnlock();
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${gameActive ? 'bg-slate-950' : 'bg-transparent'} ${!isLocked && !gameActive ? 'pt-24' : ''}`}>
      
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef}
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${gameActive ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* GAME HUD (Visible during active gameplay) */}
      {(gameState === 'playing' || gameState === 'gameover') && (
        <div className="fixed inset-0 pointer-events-none z-50 p-8">
           {/* Top Bar */}
           <div className="absolute top-8 left-8 flex flex-col gap-1">
              <span className="text-purple-300 text-[10px] font-black tracking-[0.4em] uppercase">SCORE</span>
              <span className="text-white font-display font-black text-xl sm:text-2xl md:text-3xl tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {uiScore.toString().padStart(6, '0')}
              </span>
              <span className="text-fuchsia-300 text-[9px] font-bold tracking-widest mt-1">BEST: {highScore}</span>
           </div>

           <div className="absolute top-8 right-8 text-right flex flex-col gap-2 items-end">
              <span className="text-purple-300 text-[10px] font-black tracking-[0.4em] uppercase">LIVES</span>
              <div className="flex gap-2">
                 {[...Array(3)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className={`w-6 h-6 ${i < uiLives ? 'fill-fuchsia-600 drop-shadow-[0_0_8px_#c026d3]' : 'fill-slate-800'}`}>
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                 ))}
              </div>
           </div>
           
           <button 
             onClick={() => setIsMuted(!isMuted)}
             className="absolute bottom-8 right-8 pointer-events-auto text-white/70 hover:text-white transition-colors"
           >
             {isMuted ? '🔇 MUTED' : '🔊 AUDIO ON'}
           </button>

           <div className="absolute bottom-8 left-8 text-[10px] text-white/60 font-bold tracking-[0.2em] uppercase space-y-1">
             <p>[ ARROWS ] TO PILOT</p>
             <p>[ SPACE ] TO FIRE</p>
           </div>
        </div>
      )}

      {/* BRIEFING SCREEN (Gatekeeper Mode) */}
      {isLocked && gameState === 'briefing' && (
        <div className="relative z-20 text-center px-6 animate-in zoom-in duration-500">
           {/* Floating Orb Icon */}
           <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-fuchsia-500 to-purple-600 rounded-full animate-bounce opacity-80 mb-8 absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_30px_rgba(192,38,211,0.5)]"></div>

           {/* New Name */}
           <h1 className="text-3xl sm:text-5xl md:text-3xl sm:text-4xl md:text-5xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl md:text-4xl sm:text-5xl md:text-3xl sm:text-5xl md:text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
             ASTRO <br/> BIT
           </h1>

           <div className="bg-slate-900/90 border border-white/10 p-8 max-w-lg mx-auto backdrop-blur-md mb-12 rounded-xl">
              <p className="text-purple-100 font-mono text-sm leading-relaxed mb-6">
                <span className="text-fuchsia-500 font-bold">MISSION:</span> BLAST ASTEROIDS.
              </p>
              <div className="flex gap-4 justify-center">
                 <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest bg-black/50 px-3 py-1">Lives: 3</div>
                 <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest bg-black/50 px-3 py-1">Best: {highScore}</div>
              </div>
           </div>
           
           {/* Redesigned Button Cluster */}
           <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <button 
                 onClick={startGame}
                 className="w-72 py-6 bg-fuchsia-600 text-white font-display font-black text-lg tracking-[0.2em] uppercase hover:bg-white hover:text-fuchsia-600 transition-all border-2 border-fuchsia-600 shadow-[0_0_30px_rgba(192,38,211,0.4)] hover:-translate-y-1"
               >
                 START GAME
               </button>
               <button 
                 onClick={handleUnlock}
                 className="w-72 py-6 bg-transparent text-white font-display font-black text-lg tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white transition-all border-2 border-white/20 backdrop-blur-sm hover:-translate-y-1"
               >
                 BYPASS SECURITY
               </button>
           </div>
        </div>
      )}

      {/* EXIT BUTTON (Only for Active Play) */}
      {gameActive && gameState !== 'gameover' && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto">
          <button 
            onClick={stopGame}
            className="px-10 py-4 bg-transparent text-white/50 border-2 border-white/10 font-display font-black text-xs tracking-[0.4em] uppercase hover:bg-fuchsia-600 hover:border-fuchsia-600 hover:text-white transition-all backdrop-blur-md"
          >
            EXIT GAME
          </button>
        </div>
      )}

      {/* GAME OVER SCREEN */}
      {gameState === 'gameover' && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto animate-in zoom-in duration-300 z-50">
               <div className="text-center space-y-8">
                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-fuchsia-600 uppercase tracking-tighter drop-shadow-[0_0_30px_#c026d3]">System Failure</h2>
                 <div className="flex flex-col gap-2">
                    <p className="text-white text-xl tracking-[0.5em] font-bold">FINAL SCORE: {uiScore}</p>
                    <p className="text-purple-300 text-xs tracking-[0.3em] font-bold">BEST: {highScore}</p>
                 </div>
                 
                 <div className="flex flex-col gap-4">
                    <button 
                    onClick={startGame}
                    className="px-12 py-4 bg-white text-black font-display font-black text-xl tracking-[0.2em] hover:bg-fuchsia-600 hover:text-white transition-all uppercase"
                    >
                    REBOOT SYSTEM
                    </button>
                    <button 
                    onClick={stopGame}
                    className="text-white/60 font-bold tracking-widest text-xs hover:text-fuchsia-500"
                    >
                    EXIT GAME
                    </button>
                 </div>
               </div>
             </div>
      )}

      {/* STANDARD HERO CONTENT (Visible only when UNLOCKED and Game NOT Active) */}
      {!isLocked && !gameActive && (
        <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto pointer-events-none transition-all duration-700 animate-in fade-in zoom-in-95`}>
          
          <h1 className="text-4xl sm:text-5xl md:text-3xl sm:text-5xl md:text-3xl sm:text-4xl md:text-5xl md:text-4xl sm:text-3xl sm:text-4xl md:text-5xl md:text-4xl sm:text-5xl md:text-3xl sm:text-5xl md:text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tighter mb-12 leading-none text-white text-glow-fuchsia">
            LORI <br />
            <span className="text-white">BATTOUK</span>
          </h1>
          
          <p className="max-w-4xl mx-auto text-purple-100 text-2xl md:text-3xl font-light mb-24 leading-relaxed tracking-wider">
            Crafting high-precision software with a signature modern aesthetic.
          </p>

          <div className="flex flex-wrap justify-center gap-16 mb-20 pointer-events-auto">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-16 py-8 bg-fuchsia-600 text-white font-display font-black text-xl tracking-[0.5em] uppercase transition-all hover:bg-white hover:text-fuchsia-600 border-4 border-fuchsia-600"
            >
              PROJECTS
            </button>
            
            <button 
              onClick={startGame}
              className="px-16 py-8 border-4 border-white/20 text-white font-display font-black text-xl tracking-[0.5em] uppercase transition-all hover:border-fuchsia-600 hover:text-fuchsia-600"
            >
              PLAY ASTRO BIT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
