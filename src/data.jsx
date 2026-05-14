import { User, Image, Mail, Phone, Cpu, Globe, Rocket, Shield, Settings } from 'lucide-react';

export const MY_DATA = {
  profile: {
    name: "Maulizar Nauval",
    role: "Senior Fullstack 3D Architect",
    experience: "10+ Years Professional Journey",
    location: "Aceh, Indonesia (Remote Ready)",
    bio: "My journey into software engineering began with a simple curiosity: the fascination of watching machines communicate through languages that felt both abstract and limitless. What started as an obsession with understanding how lines of code could transform into interactive systems quickly evolved into a lifelong pursuit of building digital experiences that merge logic, creativity, and human interaction. Over the past decade, I have challenged the boundaries of computation and architecture to turn ambitious concepts into production-ready realities. Today, I do not just build applications; I engineer living, adaptive systems designed to deliver unforgettable digital experiences",
    stats: [
      { label: "Experience", value: "10Y+" },
      { label: "Project Done", value: "150+" },
      { label: "Success Rate", value: "99%" }
    ],
    skills: [
      { name: "Frontend Core", tech: "React / Next.js / TypeScript", icon: <Globe size={14}/> },
      { name: "3D Engine", tech: "Three.js / WebGL / GLSL", icon: <Cpu size={14}/> },
      { name: "Backend Logic", tech: "Node.js / Go / PostgreSQL", icon: <Shield size={14}/> },
      { name: "Infrastructure", tech: "AWS / Docker / Kubernetes", icon: <Rocket size={14}/> }
    ]
  },

  ecosystem: {
    network: {
      title: "Global Intelligence",
      description: "A decade of borderless collaboration and enterprise-grade remote infrastructure management.",
      nodes: [
        { id: 1, name: "Jakarta", type: "HQ", details: "Core Architecture & Remote Ops Hub: Global operational control center with 24/7 high-availability systems." },
        { id: 2, name: "San Francisco", type: "Partner", details: "Fintech Innovation & API Strategy: Strategic collaboration on banking systems and robust payment gateway architecture." },
        { id: 3, name: "Berlin", type: "Client", details: "Enterprise Cloud Scaler Systems: Large-scale cloud deployment adhering to strict GDPR and data privacy standards." },
        { id: 4, name: "Singapore", type: "Hub", details: "Strategic Tech & Blockchain Advisory: Technology accelerator for blockchain integration and regional latency optimization." }
      ],
      stats: {
        countries: "12+",
        collaborators: "85+",
        uptime_managed: "99.999% (Remote-Maintained)"
      }
    },
    stack: {
      title: "Architectural Stack",
      description: "Precision-engineered technology stack for high-scale performance.",
      categories: [
        { name: "Frontend Ecosystem", level: "Master", tech: ["React/Next.js", "Three.js/Fiber", "WebGL/GLSL", "Framer Motion", "Tailwind CSS"] },
        { name: "Backend Logic", level: "Expert", tech: ["Node.js/Go", "PostgreSQL/Redis", "Microservices Architecture", "GraphQL/gRPC"] },
        { name: "Infrastructure & DevOps", level: "Architect", tech: ["Kubernetes", "AWS/GCP Ecosystem", "CI/CD Pipeline Automation", "Docker Containerization"] }
      ]
    },
    journey: {
      title: "A Decade of Impact",
      description: "Evolutionary milestones from raw code to architectural mastery.",
      milestones: [
        { year: "2016", title: "The Foundation", desc: "Started as a self-taught engineer, building foundational logic in web standards and early performance optimization." },
        { year: "2019", title: "Scale Phase", desc: "Handled the first high-traffic fintech platform, managing 1M+ daily transactions with microservices architecture." },
        { year: "2022", title: "3D Revolution", desc: "Pioneered interactive 3D web. Merged heavy compute with artistic design for immersive user experiences." },
        { year: "2026", title: "Architect Era", desc: "Leading global digital ecosystems as a Senior Architect, focusing on scalability, security, and the future of remote-first technology." }
      ]
    }
  },

  contact: {
    whatsapp: "6282273426266",
    email: "maulizar@example.com",
    telegram: "@maulizar_dev",
    status: "Available (Remote)",
    lastActive: "Just now",
    latency: "24ms"
  },

  apps: [
    { id: 'profile', icon: <User size={24} />, label: 'Profile', color: 'bg-gradient-to-br from-blue-500 to-indigo-700', description: 'System Identity' },
    { id: 'gallery', icon: <Image size={24} />, label: 'Gallery', color: 'bg-gradient-to-br from-zinc-700 to-black', description: 'Portfolio' },
    // UPDATE: Mengganti icon features menjadi Settings ala iOS
    { id: 'features', icon: <Settings size={24} />, label: 'Settings', color: 'bg-gradient-to-br from-zinc-400 to-zinc-600', description: 'System Core' },
    { id: 'contact', icon: <Phone size={24} />, label: 'Phone', color: 'bg-gradient-to-br from-emerald-500 to-teal-700', description: 'Communication' },
    { id: 'email', icon: <Mail size={24} />, label: 'Email', color: 'bg-gradient-to-br from-indigo-500 to-purple-700', description: 'Correspondence' },
  ],

  projects: [
    { 
      id: "medcare", title: "MedCare AI", category: "Healthcare Ecosystem", 
      desc: "Bridging the gap between patients and medical professionals with low-latency communication and high-level data privacy.", 
      tags: ["Next.js", "Socket.io", "AWS"], image: "/proyek1.jpeg", 
      details: { engine: "React Native & Node.js", performance: "< 200ms API Response", security: "HIPAA & E2E Encryption", highlights: ["Real-time Telemedicine", "Automated Prescription", "Health Analytics"] }
    },
    { 
      id: "fintrack", title: "FinTrack Pro", category: "Fintech Solutions", 
      desc: "Personal asset management solution that transforms raw transaction data into strategic financial insights.", 
      tags: ["TypeScript", "D3.js", "Firebase"], image: "/proyek2.jpeg",
      details: { engine: "Flutter & Go-Gin", performance: "Optimized Data Sync", security: "MFA & Data Scrubbing", highlights: ["Smart Budgeting AI", "Real-time Ledger", "Visual Insights"] }
    },
    { 
      id: "shopzone", title: "ShopZone", category: "E-Commerce", 
      desc: "Modern retail platform designed for seamless shopping experiences and high-level scalability.", 
      tags: ["React Native", "Node.js", "Redis"], image: "/proyek3.jpeg",
      details: { engine: "Next.js (SSR) Architecture", performance: "99/100 Lighthouse Score", security: "PCI-DSS Level 1 Ready", highlights: ["Dynamic Inventory", "Adaptive UX Design", "Smart Search System"] }
    },
    { 
      id: "vantage", title: "Vantage System", category: "Enterprise Monitoring", 
      desc: "Digital command center for enterprise-scale project oversight with 100% field data accuracy.", 
      tags: ["React", "Go", "PostgreSQL"], image: "/proyek4.jpeg",
      details: { engine: "Vue.js 3 & Firebase", performance: "Event-Driven Live Updates", security: "RBAC & OAuth 2.0", highlights: ["Project Command Center", "Instant Reporting", "High-Security Gateway"] }
    },
    { 
      id: "eduverse", title: "EduVerse", category: "Edutech Platform", 
      desc: "Future-proof education ecosystem that personalizes learning paths for every individual.", 
      tags: ["Three.js", "FastAPI", "Docker"], image: "/proyek5.jpeg",
      details: { engine: "React Native & Redis", performance: "Fluid 60fps UI", security: "DRM Content Protection", highlights: ["Adaptive Learning Path", "Interactive Progress", "Multi-Platform Sync"] }
    }
  ]
};