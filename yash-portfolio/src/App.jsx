import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Server, Database, Cpu, Cloud, Terminal, Globe, ChevronDown, ExternalLink, Box, Phone, Layers, Lock, Zap } from 'lucide-react';

/**
 * PORTFOLIO FOR YASH DAFADE - ANIMATED & MODERNIZED
 * Theme: Cyber-Minimalist (Deep Slate, Electric Blue, Violet)
 * Updates: White Flash Fix, Consistent Hero Animations
 */

// --- Experience Calculator Logic ---
const getExperienceDuration = () => {
  const startDate = new Date("2025-01-20");
  const currentDate = new Date();
  
  // Calculate total months difference
  let months = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += currentDate.getMonth();
  
  // Adjust if current day is before start day
  if (currentDate.getDate() < startDate.getDate()) {
    months--;
  }

  if (months <= 0) return "Just Joined";
  if (months < 12) return `${months} Month${months !== 1 ? 's' : ''}`;
  
  // If > 1 year, use decimal format (e.g., 1.5 Years)
  const years = months / 12;
  return `${years.toFixed(1)} Years`;
};

// --- Custom Hook for Scroll Animations ---
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return [ref, isVisible];
};

// --- Dynamic Background Component ---
const DynamicBackground = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      
      const scrollY = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / height, 0), 1);
      
      let color1, color2;

      if (progress < 0.5) {
        const p = progress * 2;
        const hue = 222 + (243 - 222) * p;
        color1 = `hsl(${hue}, 40%, 8%)`; 
        color2 = `hsl(${hue + 20}, 40%, 5%)`;
      } else {
        const p = (progress - 0.5) * 2;
        const hue = 243 - (243 - 222) * p;
        color1 = `hsl(${hue}, 40%, 8%)`;
        color2 = `hsl(${hue + 10}, 40%, 5%)`;
      }

      bgRef.current.style.background = `radial-gradient(circle at 50% ${50 - (progress * 20)}%, ${color1}, ${color2})`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div ref={bgRef} className="fixed inset-0 -z-20 transition-colors duration-1000 ease-linear bg-slate-950" />;
};

// --- 3D Background Component (Three.js) ---
const ParticleNetwork = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;

    script.onload = () => {
      initThreeJS();
    };

    document.body.appendChild(script);

    const initThreeJS = () => {
      if (!mountRef.current) return;

      const THREE = window.THREE;
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.002); 

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const particlesGeometry = new THREE.BufferGeometry();
      const counts = 180;
      const positions = new Float32Array(counts * 3);
      const velocities = [];

      for (let i = 0; i < counts * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 25; 
        if (i % 3 === 0) velocities.push({
          x: (Math.random() - 0.5) * 0.008,
          y: (Math.random() - 0.5) * 0.008,
          z: (Math.random() - 0.5) * 0.008
        });
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x3b82f6,
        size: 0.07,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      camera.position.z = 5;

      let mouseX = 0;
      let mouseY = 0;
      let scrollY = 0;

      const handleMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      const handleScroll = () => { scrollY = window.scrollY; };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);

      const animate = () => {
        requestAnimationFrame(animate);
        const positions = particlesMesh.geometry.attributes.position.array;
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x = scrollY * 0.0002;
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-scrollY * 0.001 + mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        for (let i = 0; i < counts; i++) {
            positions[i * 3] += velocities[i].x;
            positions[i * 3 + 1] += velocities[i].y;
            positions[i * 3 + 2] += velocities[i].z;
            const range = 15;
            if (Math.abs(positions[i * 3]) > range) positions[i * 3] *= -0.9;
            if (Math.abs(positions[i * 3 + 1]) > range) positions[i * 3 + 1] *= -0.9;
            if (Math.abs(positions[i * 3 + 2]) > range) positions[i * 3 + 2] *= -0.9;
        }

        particlesMesh.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };

      animate();
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        if (mountRef.current) mountRef.current.innerHTML = '';
      };
    };
    return () => { if (mountRef.current) mountRef.current.innerHTML = ''; }
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

// --- Animations Styles (Injected) ---
const GlobalStyles = () => (
  <style>{`
    /* Fix for white flash on reload - set body background immediately */
    body { background-color: #020617; color: #e2e8f0; }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    @keyframes float-delayed {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(-2deg); }
    }
    @keyframes gradient-move {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    /* New Entrance Animations */
    @keyframes slideDown {
      0% { transform: translateY(-100%); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideInRight {
      0% { transform: translateX(100px); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeScale {
      0% { opacity: 0; transform: scale(0.9); }
      100% { opacity: 1; transform: scale(1); }
    }

    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
    .animate-slide-down { animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-slide-in-right { animation: slideInRight 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
    
    .glass-panel {
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;
    }
    .glass-card-hover:hover {
      background: rgba(30, 41, 59, 0.6);
      border-color: rgba(59, 130, 246, 0.4);
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
    }
    
    .text-gradient {
      background: linear-gradient(to right, #60a5fa, #a78bfa, #34d399);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% auto;
      animation: gradient-move 5s linear infinite;
    }

    /* Scroll Reveal Classes */
    .reveal-hidden { 
      opacity: 0; 
      transform: translateY(30px) scale(0.95); 
      transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); 
    }
    .reveal-visible { 
      opacity: 1; 
      transform: translateY(0) scale(1); 
    }
    
    /* Smooth Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #020617; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
    
    html { scroll-behavior: smooth; }
  `}</style>
);

// --- Reusable Animated Section Wrapper ---
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal(0.15);
  return (
    <div 
      ref={ref} 
      className={`reveal-hidden ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Components ---

const Navbar = ({ scrollTo }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 py-3 shadow-2xl' : 'bg-transparent py-5'} animate-slide-down`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Animation */}
        <div 
          className="text-xl font-bold tracking-tighter text-slate-100 flex items-center gap-2 group cursor-pointer opacity-0 animate-[slideDown_0.5s_ease-out_forwards_200ms]" 
          onClick={() => scrollTo('hero')}
        >
          <div className="p-1.5 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/40 transition-colors">
            <Terminal size={20} className="text-blue-400" />
          </div>
          <span>Yash<span className="text-blue-500">.dev</span></span>
        </div>
        
        {/* Nav Links Animation */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="hover:text-blue-400 transition-colors relative group py-1 opacity-0"
              style={{ animation: `slideDown 0.5s ease-out forwards ${300 + (index * 100)}ms` }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>
        
        <div className="md:hidden text-slate-400">
          <Box size={24} />
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ scrollTo }) => (
  <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden">
    {/* Abstract Background Glow - Animated */}
    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
    <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

    <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
      <div className="space-y-8">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-shadow cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Hire
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={100}>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white tracking-tight">
            Architecting <br />
            <span className="text-gradient">Intelligent Systems</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <h2 className="text-2xl md:text-3xl text-slate-400 font-light flex flex-col gap-2">
            <span>Backend Engineer</span>
            <span className="text-slate-500 text-xl md:text-2xl">& DevOps Practitioner</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed border-l-2 border-blue-500/30 pl-4">
            Building scalable infrastructure, optimizing backend logic, and integrating AI automation into production environments.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={400} className="flex gap-4 pt-4">
          <button
            onClick={() => scrollTo('projects')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-1 hover:scale-105 active:scale-95"
          >
            Explore Projects
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3.5 border border-slate-700 hover:border-blue-400 hover:bg-blue-900/10 hover:text-blue-400 text-slate-300 font-semibold rounded-lg transition-all transform hover:-translate-y-1"
          >
            Contact Me
          </button>
        </AnimatedSection>

        <AnimatedSection delay={500} className="flex gap-6 pt-4 text-slate-500">
          <SocialLink href="https://github.com/yashdafade" icon={<Github size={24} />} />
          <SocialLink href="https://www.linkedin.com/in/yash-dafade-992ab2209/" icon={<Linkedin size={24} />} />
          <SocialLink href="mailto:yashdafade93@gmail.com" icon={<Mail size={24} />} />
        </AnimatedSection>
      </div>

      {/* Hero Visual - Animated 3D-ish Cards with Consistent "Reveal" Animation */}
      <AnimatedSection delay={600} className="hidden md:flex justify-center items-center relative h-[500px]">
        {/* Central Hub */}
        <div className="relative z-10 w-full max-w-md aspect-square animate-float">
          <div className="absolute inset-0 border border-slate-700 rounded-full border-dashed animate-[spin_30s_linear_infinite] opacity-20"></div>
          <div className="absolute inset-8 border border-slate-600 rounded-full border-dashed animate-[spin_20s_linear_infinite_reverse] opacity-20"></div>
          
          {/* Floating Cards - enhanced hover */}
          <FloatingCard 
            icon={<Server size={28} className="text-blue-400" />} 
            label="Backend" 
            sub="Node / Python" 
            className="top-10 left-10 animate-float-delayed" 
          />
          <FloatingCard 
            icon={<Cloud size={28} className="text-purple-400" />} 
            label="DevOps" 
            sub="Docker / AWS" 
            className="top-20 right-0 animate-float" 
            delay="1s"
          />
          <FloatingCard 
            icon={<Cpu size={28} className="text-emerald-400" />} 
            label="AI / ML" 
            sub="OpenCV / LLMs" 
            className="bottom-20 left-0 animate-float" 
            delay="2s"
          />
          <FloatingCard 
            icon={<Database size={28} className="text-orange-400" />} 
            label="Data" 
            sub="SQL / NoSQL" 
            className="bottom-10 right-10 animate-float-delayed" 
            delay="3s"
          />
          
          {/* Center Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-center z-20 group hover:border-blue-500 transition-colors duration-500">
            <Terminal size={40} className="text-white group-hover:text-blue-400 transition-colors" />
          </div>
        </div>
      </AnimatedSection>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce cursor-pointer hover:text-white transition-colors" onClick={() => scrollTo('about')}>
      <ChevronDown size={24} />
    </div>
  </section>
);

const FloatingCard = ({ icon, label, sub, className, delay }) => (
  <div 
    className={`absolute glass-panel p-4 rounded-xl flex items-center gap-4 shadow-lg w-48 transition-all hover:scale-110 hover:border-blue-500/50 cursor-default hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] z-30 ${className}`}
    style={{ animationDelay: delay }}
  >
    <div className="p-2 bg-slate-800/80 rounded-lg">{icon}</div>
    <div>
      <div className="font-bold text-slate-100">{label}</div>
      <div className="text-xs text-slate-400 font-mono">{sub}</div>
    </div>
  </div>
);

const SocialLink = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:-translate-y-1 hover:scale-110 transition-all duration-300">
    {icon}
  </a>
);

// --- About / Skills Section ---
const Skills = () => (
  <section id="skills" className="py-32 relative">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Technical Arsenal</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          A robust suite of technologies focused on performance, security, and scalability.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SkillCard
          icon={<Server size={32} className="text-blue-400" />}
          title="Backend Engineering"
          desc="Building robust APIs and microservices."
          skills={["Node.js & Express", "Python (FastAPI)", "REST Architecture", "System Design"]}
          delay={0}
        />
        <SkillCard
          icon={<Cloud size={32} className="text-purple-400" />}
          title="Cloud & DevOps"
          desc="Automating deployment and infrastructure."
          skills={["Docker & Compose", "GitHub Actions CI/CD", "AWS Essentials", "Nginx & Reverse Proxy"]}
          delay={100}
        />
        <SkillCard
          icon={<Database size={32} className="text-emerald-400" />}
          title="Database Mgmt"
          desc="Optimizing data storage and retrieval."
          skills={["MySQL Optimization", "MongoDB Aggregations", "Redis Caching", "Data Modeling"]}
          delay={200}
        />
        <SkillCard
          icon={<Cpu size={32} className="text-orange-400" />}
          title="AI Integration"
          desc="Infusing applications with intelligence."
          skills={["LLM APIs (Gemini)", "OpenCV Vision", "Vector Embeddings", "Automation Agents"]}
          delay={300}
        />
      </div>
    </div>
  </section>
);

const SkillCard = ({ icon, title, desc, skills, delay }) => (
  <AnimatedSection delay={delay} className="h-full">
    <div className="glass-panel p-8 rounded-2xl h-full glass-card-hover transition-all duration-300 group relative overflow-hidden">
      {/* Subtle hover gradient bloom */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="mb-6 p-4 bg-slate-900/50 rounded-xl inline-block border border-slate-800 group-hover:bg-slate-800 transition-colors group-hover:scale-110 duration-300 relative z-10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors relative z-10">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 h-10 relative z-10">{desc}</p>
      
      <div className="space-y-3 pt-6 border-t border-slate-800 relative z-10">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            {skill}
          </div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

// --- Experience Section ---
const Experience = () => (
  <section id="experience" className="py-24 px-6 bg-slate-900/10">
    <div className="max-w-4xl mx-auto">
      <AnimatedSection className="mb-16 flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
           <Layers className="text-blue-400" size={24}/>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Professional History</h2>
      </AnimatedSection>

      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-10 space-y-16">
        <ExperienceItem 
          role="Assistant System Engineer"
          company="Tata Consultancy Services (TCS)"
          period="Jan 2025 - Present"
          duration={getExperienceDuration()}
          points={[
            "Designed Power BI dashboards to visualize SLA adherence, incident trends, and DEG performance metrics, enabling data-driven decisions.",
            "Automated daily Excel-based reporting tasks using Python scripts, reducing manual workload by 70%.",
            "Validated automated alert workflows for incidents and SLA breaches, ensuring 99.9% accuracy in critical escalations."
          ]}
        />
      </div>
    </div>
  </section>
);

const ExperienceItem = ({ role, company, period, duration, points }) => (
  <AnimatedSection className="relative pl-8 md:pl-12 group">
    {/* Timeline Dot */}
    <span className="absolute -left-[9px] top-0 w-5 h-5 bg-slate-950 rounded-full border-4 border-blue-600 shadow-[0_0_0_4px_rgba(15,23,42,1)] group-hover:scale-150 group-hover:border-white transition-all duration-300"></span>
    
    <div className="glass-panel p-6 md:p-8 rounded-2xl hover:border-blue-500/30 transition-all duration-300 hover:translate-x-2">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-2">
        <div>
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{role}</h3>
          <h4 className="text-lg text-slate-400 font-medium mt-1">{company}</h4>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="px-4 py-1.5 bg-slate-800 rounded-full text-slate-300 text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap border border-slate-700">
            {period}
          </div>
          {/* Dynamic Experience Badge */}
          <div className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(37,99,235,0.2)]">
            {duration}
          </div>
        </div>
      </div>
      
      <ul className="space-y-4">
        {points.map((point, i) => (
          <li key={i} className="flex gap-4 text-slate-300 text-base leading-relaxed">
            <span className="text-blue-500 mt-1.5 flex-shrink-0">▹</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </AnimatedSection>
);

// --- Projects Section ---
const Projects = () => (
  <section id="projects" className="py-32 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <AnimatedSection className="mb-20">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Featured Projects</h2>
        <p className="text-slate-400 max-w-2xl text-lg">
           Full-stack architectures demonstrating my ability to ship production-ready code.
        </p>
      </AnimatedSection>

      <div className="space-y-32">
        <ProjectCard
          title="Schoolix - Enterprise School Platform"
          subtitle="SaaS-ready Administration System"
          tags={["MERN Stack", "Docker", "GitHub Actions", "JWT Auth"]}
          desc="A comprehensive SaaS-ready platform designed to digitize school operations. This project covers the full SDLC from DB schema design to VPS deployment."
          features={[
            "Architected a modular backend with JWT-secured REST APIs.",
            "Implemented complex logic for billing, inventory, and library management.",
            "Engineered bulk data processing via Excel uploads.",
            "Established CI/CD pipelines and deployed via Docker & Caddy."
          ]}
          impact="Reduced administrative workload by 50%."
          isLeft={true}
          icon={<Globe size={40} />}
        />

        <ProjectCard
          title="AI Contactless Attendance"
          subtitle="Computer Vision Microservice"
          tags={["Python FastAPI", "OpenCV", "InsightFace", "Microservices"]}
          desc="A high-performance computer vision microservice integrated into the Schoolix ecosystem. It eliminates the inefficiency of manual roll calls using facial recognition."
          features={[
            "Built a standalone face recognition service using Python and FastAPI.",
            "Integrated InsightFace library achieving 96% accuracy.",
            "Optimized pipeline for sub-second recognition speeds.",
            "Seamless asynchronous communication with main Node.js backend."
          ]}
          impact="Improved attendance efficiency by 70%."
          isLeft={false}
          icon={<Zap size={40} />}
        />

        <ProjectCard
          title="Intelligent DB Chatbot"
          subtitle="Natural Language to SQL Interface"
          tags={["Node.js", "Gemini API", "NLP", "Secure Context"]}
          desc="An AI interface allowing non-technical staff to query complex database records using natural language commands."
          features={[
            "Leveraged Google's Gemini API to translate natural language to queries.",
            "Created context-aware prompts for understanding data relationships.",
            "Designed read-only secure execution environment.",
            "Reduced dependency on technical support for data retrieval."
          ]}
          impact="Automated 80% of routine data lookup queries."
          isLeft={true}
          icon={<Lock size={40} />}
        />
      </div>
    </div>
  </section>
);

const ProjectCard = ({ title, subtitle, tags, desc, features, impact, isLeft, icon }) => (
  <div className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
    
    {/* Visual Side */}
    <AnimatedSection className="w-full lg:w-1/2 group perspective-1000">
      <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl transition-all duration-700 transform group-hover:rotate-x-2 group-hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.3)] group-hover:border-blue-500/50">
        {/* Abstract UI Representation */}
        <div className="absolute inset-0 bg-slate-800/50 flex flex-col p-6 transition-transform duration-700 group-hover:scale-105">
          <div className="w-full h-8 bg-slate-900 rounded-lg mb-4 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 flex gap-4">
            <div className="w-1/4 h-full bg-slate-900/50 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-full space-y-4">
              <div className="w-full h-1/2 bg-slate-900/50 rounded-lg relative overflow-hidden group-hover:bg-blue-900/20 transition-colors flex items-center justify-center">
                  <div className="text-slate-700 group-hover:text-blue-400 transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12">
                      {icon}
                  </div>
              </div>
              <div className="w-full h-1/3 bg-slate-900/50 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 hover:bg-blue-50">
                View Details <ExternalLink size={16}/>
            </button>
        </div>
      </div>
    </AnimatedSection>

    {/* Content Side */}
    <AnimatedSection className="w-full lg:w-1/2 space-y-6" delay={200}>
      <div>
        <h4 className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">{subtitle}</h4>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-blue-900/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/20 hover:bg-blue-900/40 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <p className="text-slate-300 text-lg leading-relaxed">
        {desc}
      </p>

      <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
        <ul className="space-y-3">
          {features.map((feat, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
              <span className="text-blue-500 mt-1">▹</span>
              {feat}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2 text-emerald-400 font-medium">
         <div className="p-2 bg-emerald-500/10 rounded-full">
            <Zap size={18} />
         </div>
         Impact: {impact}
      </div>
    </AnimatedSection>
  </div>
);

// --- Contact Section ---
const Contact = () => (
  <section id="contact" className="py-32 px-6 relative overflow-hidden">
    {/* Footer Background Gradients */}
    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
    
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <AnimatedSection>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to scale?</h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          I'm currently available for <span className="text-blue-400">Backend</span> and <span className="text-purple-400">DevOps</span> roles. 
          Let's build something robust together.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={200} className="flex flex-col md:flex-row gap-6 justify-center items-center mb-20">
        <a href="mailto:yashdafade93@gmail.com" className="group flex items-center gap-3 px-8 py-5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-600/40 hover:-translate-y-1">
          <Mail className="group-hover:animate-bounce" />
          Say Hello
        </a>
        <a
          href="tel:+919359126989"
          className="group flex items-center gap-3 px-8 py-5 glass-panel hover:bg-slate-800 border border-slate-700 rounded-xl text-white font-semibold transition-all hover:-translate-y-1"
        >
          <Phone className="text-slate-400 group-hover:text-white transition-colors" size={20} />
          +91 9359126989
        </a>
      </AnimatedSection>

      <AnimatedSection delay={300} className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center text-slate-500 gap-6">
        <div className="flex gap-8">
           <a href="https://www.linkedin.com/in/yash-dafade-992ab2209/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
           <a href="https://github.com/yashdafade" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
           <a href="https://drive.google.com/file/d/1Z3fj6m3iP4p1WEo-Dj64uZ0Vvp1Mrg_w/view?usp=drive_link" className="hover:text-white transition-colors">Resume</a>
        </div>
        <div className="text-sm">
          © 2025 Yash Dafade. Crafted with React & Three.js.
        </div>
      </AnimatedSection>
    </div>
  </section>
);

// --- Main App Component ---
const App = () => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="font-sans text-slate-200 min-h-screen selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden relative">
      <GlobalStyles />
      <DynamicBackground />
      <ParticleNetwork />
      <Navbar scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;