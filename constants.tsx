import sixAssistLogo from './Logos/6ixAssist_logo.png';
import pegasusLogo from './Logos/PegasusCover.png';
import packPalLogo from './Logos/PackPal.png';

import { Project, SkillGroup } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "6IXASSIST",
    category: "AI / GEOLOCATION",
    image: sixAssistLogo,
    tags: ["React", "Gemini API", "OpenStreetMap", "TypeScript"],
    description: "Winner of 1st Place at ElleHacks Hackathon. An AI-powered lifeline connecting Toronto residents to vital community resources.",
    detailedDescription: "Uses natural language processing to instantly map needs to real-time shelter and food bank data, bridging the gap for those in crisis. It simplifies complex service databases into an accessible, lifeline interface for the community.",
    features: [
      "Natural Language Search",
      "Real-time Geolocation Routing",
      "Offline-first Architecture",
      "Multi-language Support"
    ],
    role: "Lead Developer",
    status: "Live / Maintained",
    technicalDetails: "Built using React and the Gemini API for intent classification. The mapping system uses Leaflet with custom tiles for accessibility. We implemented a custom caching layer to ensure critical resource data remains available even with poor internet connectivity.",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 2,
    title: "PEGASUS",
    category: "E-COMMERCE",
    image: pegasusLogo,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    description: "A futuristic, high-velocity e-commerce interface designed for the next generation of digital retail.",
    detailedDescription: "Source code is private. Pegasus is a cutting-edge e-commerce platform engineered for speed and seamless user interaction. It features a fully responsive product catalog, dynamic cart management, and a streamlined checkout flow. Designed with a modern, minimalist aesthetic, it delivers a premium shopping experience across all devices.",
    features: [
      "Modern Responsive UI",
      "Real-time Cart Management",
      "Dynamic Product Filtering",
      "Optimized Performance"
    ],
    role: "Full Stack Developer",
    status: "Live Deployment",
    technicalDetails: "Deployed on Vercel for maximum performance and scalability. The application leverages Next.js for server-side rendering and efficient data fetching, while Tailwind CSS ensures a consistent and adaptive design system. The architecture is built to handle high traffic with minimal latency.",
    demoUrl: "https://pegasus-zeta.vercel.app/",
    repoUrl: "" 
  },
  {
    id: 3,
    title: "PACKPAL 🚧",
    category: "AI / TRAVEL (COMING SOON)",
    image: packPalLogo,
    tags: ["Next.js", "TypeScript", "Gemini 2.5", "PostgreSQL"],
    description: "AI-powered travel packing assistant creating smart lists based on trip details.",
    detailedDescription: "PackPal is an intelligent travel companion that generates personalized packing checklists using Gemini 2.5. By analyzing weather forecasts, trip duration, and destination activities, it ensures travelers never leave essentials behind. Features include secure authentication and collaborative list editing.",
    features: [
      "Smart Packing Lists (Gemini 2.5)",
      "Weather Integration",
      "Collaborative Planning",
      "Real-time Sync"
    ],
    role: "Full Stack Developer",
    status: "In Progress",
    technicalDetails: "Built with Next.js and TypeScript. Uses NextAuth for secure authentication and Drizzle ORM with PostgreSQL for robust data management. Real-time updates utilize Next.js Server Actions. Deployed on Vercel.",
    demoUrl: "",
    repoUrl: ""
  },
  {
    id: 4,
    title: "GO STATION TRACKER",
    category: "DATA VISUALIZATION (COMING SOON)",
    image: "https://placehold.co/800x450/FFFFFF/c026d3/png?text=COMING+SOON&font=montserrat",
    tags: ["Python", "Flask", "SQLite", "JavaScript"],
    description: "Real-time parking availability dashboard for commuters.",
    detailedDescription: "A high-performance dashboard designed to streamline the daily commute. It aggregates data from various GO Transit infrastructure endpoints to provide a real-time visualization of parking availability across the network, helping commuters plan their arrival times better.",
    features: [
      "Real-time Data Polling",
      "Historical Trend Analysis",
      "Responsive Visualization",
      "Low-bandwidth Mode"
    ],
    role: "Solo Developer",
    status: "Archived",
    technicalDetails: "Backend built with Flask serving a REST API. A background scheduler handles data ingestion from public transit APIs, normalizing the data into SQLite. The frontend uses Chart.js for rendering historical trends and immediate availability metrics.",
    demoUrl: "",
    repoUrl: ""
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    description: "Core programming languages",
    icon: "CODE",
    items: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "C" }
    ]
  },
  {
    category: "Frontend",
    description: "Interfaces and interaction",
    icon: "LAYOUT",
    items: [
      { name: "React" },
      { name: "Next.js", desc: "App routing, SSR" },
      { name: "Tailwind CSS" },
      { name: "HTML / CSS" },
      { name: "Framer Motion" }
    ]
  },
  {
    category: "Backend",
    description: "APIs, databases, and services",
    icon: "SERVER",
    items: [
      { name: "Node.js" },
      { name: "Flask" },
      { name: "PostgreSQL" },
      { name: "SQLite" },
      { name: "Supabase", desc: "Auth, DB, Storage" },
      { name: "REST APIs" }
    ]
  },
  {
    category: "Tools & Infra",
    description: "Deployment, tooling, and infrastructure",
    icon: "TERMINAL",
    items: [
      { name: "Linux" },
      { name: "Git" },
      { name: "Docker" },
      { name: "Google APIs", desc: "Maps, Gemini, Places" },
      { name: "GCP" },
      { name: "Jenkins" }
    ]
  }
];
