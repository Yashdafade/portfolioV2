import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Server, Database, Cpu, Cloud, Terminal, Globe, ChevronDown, ExternalLink, Code, Box, Phone } from 'lucide-react';

/**
 * PORTFOLIO FOR YASH DAFADE
 * Focus: Backend, DevOps, AI/ML Integration
 * Theme: Modern Dark Minimalist with 3D Particles
 */

// --- 3D Background Component (Three.js) ---
const ParticleNetwork = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Dynamic script loading for Three.js to ensure it runs in this environment
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
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      // Create Particles
      const particlesGeometry = new THREE.BufferGeometry();
      const counts = 150; // Number of particles

      const positions = new Float32Array(counts * 3);
      const velocities = [];

      for (let i = 0; i < counts * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20; // Spread
        if (i % 3 === 0) velocities.push({
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        });
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x60a5fa, // Tailwind blue-400
        size: 0.05,
        transparent: true,
        opacity: 0.8
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      // Lines connecting particles
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.15
      });

      camera.position.z = 5;

      // Mouse Interaction
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        requestAnimationFrame(animate);

        const positions = particlesMesh.geometry.attributes.position.array;

        // Move particles
        for (let i = 0; i < counts; i++) {
          positions[i * 3] += velocities[i].x;
          positions[i * 3 + 1] += velocities[i].y;
          positions[i * 3 + 2] += velocities[i].z;

          // Bounce off invisible walls to keep them in view
          if (positions[i * 3] > 10 || positions[i * 3] < -10) velocities[i].x *= -1;
          if (positions[i * 3 + 1] > 10 || positions[i * 3 + 1] < -10) velocities[i].y *= -1;
          if (positions[i * 3 + 2] > 10 || positions[i * 3 + 2] < -10) velocities[i].z *= -1;
        }
        particlesMesh.geometry.attributes.position.needsUpdate = true;

        // Gentle rotation based on mouse
        particlesMesh.rotation.x += 0.001 + (mouseY * 0.001);
        particlesMesh.rotation.y += 0.001 + (mouseX * 0.001);

        // Dynamic Lines (connect close particles)
        // Note: Creating new geometry every frame is expensive, 
        // but for < 200 particles on modern devices, it's acceptable for this effect.
        // For production, we'd use a pre-allocated buffer and update indices.

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
        if (mountRef.current) mountRef.current.innerHTML = '';
      };
    };

    return () => {
      if (mountRef.current) mountRef.current.innerHTML = '';
    }

  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-950" />;
};

// --- Main App Component ---

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="font-sans text-slate-200 selection:bg-blue-500 selection:text-white">
      <ParticleNetwork />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-blue-400 flex items-center gap-2">
            <Terminal size={20} />
            <span>Yash.dev</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="hover:text-blue-400 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          {/* Mobile Menu Button Placeholder */}
          <div className="md:hidden text-slate-400">
            <Box size={24} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-20 relative">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase">
              Available for Backend & DevOps Roles
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
              Yash Dafade
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-400 font-light">
              Backend Engineer & <br />
              <span className="text-blue-400 font-semibold">DevOps Practitioner</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              Architecting scalable MERN applications, optimizing secure backend logic,
              and integrating AI-driven automation into production environments.
            </p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => scrollTo('projects')}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                View Infrastructure
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-8 py-3 border border-slate-600 hover:border-blue-400 hover:text-blue-400 text-slate-300 font-semibold rounded-lg transition-all"
              >
                Contact Me
              </button>
            </div>

            <div className="flex gap-6 pt-8 text-slate-500">
              <a href="https://github.com/yashdafade" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/yash-dafade-992ab2209/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin size={24} /></a>
              <a href="mailto:yashdafade93@gmail.com" className="hover:text-white transition-colors"><Mail size={24} /></a>
            </div>
          </div>

          {/* Visual Element for Hero (Right Side) - Abstract Representation of Microservices */}
          <div className="hidden md:flex justify-center items-center relative h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>
            <div className="relative z-10 grid grid-cols-2 gap-4 p-6 border border-slate-800 bg-slate-900/50 backdrop-blur-sm rounded-2xl rotate-3 transform hover:rotate-0 transition-transform duration-700">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <Server className="text-blue-400 mb-2" size={32} />
                <div className="text-sm font-bold text-slate-200">Backend</div>
                <div className="text-xs text-slate-500">Node.js • Python</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <Cloud className="text-purple-400 mb-2" size={32} />
                <div className="text-sm font-bold text-slate-200">DevOps</div>
                <div className="text-xs text-slate-500">Docker • AWS</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <Cpu className="text-emerald-400 mb-2" size={32} />
                <div className="text-sm font-bold text-slate-200">AI/ML</div>
                <div className="text-xs text-slate-500">OpenCV • Gemini</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <Database className="text-orange-400 mb-2" size={32} />
                <div className="text-sm font-bold text-slate-200">Data</div>
                <div className="text-xs text-slate-500">MySQL • MongoDB</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-20 bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
            <p className="text-slate-400">Built for performance, scalability, and automation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <SkillCard
              icon={<Server size={32} className="text-blue-400" />}
              title="Backend Engineering"
              skills={["Node.js & Express.js", "Python (FastAPI)", "RESTful API Development", "Scalable API Architecture"]}
            />
            <SkillCard
              icon={<Cloud size={32} className="text-purple-400" />}
              title="Cloud & DevOps"
              skills={["Docker & Containerization", "GitHub Actions (CI/CD)", "Linux (Ubuntu) Administration", "AWS Cloud Practioner", "Nginx/Caddy Proxy"]}
            />
            <SkillCard
              icon={<Database size={32} className="text-emerald-400" />}
              title="Database Management"
              skills={["MySQL (Schema & Optimization)", "SQL Joins & Indexing", "Connection Pooling", "Data Integrity"]}
            />
            <SkillCard
              icon={<Cpu size={32} className="text-orange-400" />}
              title="AI Integration"
              skills={["LLM API Integrations", "Face Recognition (InsightFace)", "OpenCV", "Automation Workflows"]}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
            Work History
          </h2>

          <div className="border-l-2 border-slate-800 ml-4 pl-8 py-2 space-y-12 relative">
            <div className="relative">
              <span className="absolute -left-[41px] top-0 w-5 h-5 bg-blue-500 rounded-full border-4 border-slate-950"></span>
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Assistant System Engineer</h3>
                    <h4 className="text-blue-400 font-medium">Tata Consultancy Services (TCS)</h4>
                  </div>
                  <span className="text-slate-500 text-sm font-mono mt-2 md:mt-0">Jan 2025 - Present</span>
                </div>
                <ul className="space-y-3 text-slate-400 text-sm md:text-base">
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-1">▹</span>
                    Designed Power BI dashboards to visualize SLA adherence, incident trends, and DEG performance metrics.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-1">▹</span>
                    Automated daily Excel-based reports, cutting manual work by 70% through efficient scripting.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-1">▹</span>
                    Validated automated alert workflows for incidents and SLA breaches, ensuring accuracy in critical escalations.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - DEEP DIVE */}
      <section id="projects" className="py-24 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
              <p className="text-slate-400 max-w-xl">
                A showcase of full-stack architectures, AI integration, and DevOps implementations.
              </p>
            </div>
            {/* <a href="https://github.com" className="hidden md:flex items-center gap-2 text-blue-400 hover:text-white transition-colors">
                View all on Github <ExternalLink size={16} />
            </a> */}
          </div>

          <div className="space-y-20">
            {/* Project 1: Schoolix */}
            <ProjectCard
              title="Schoolix - Enterprise School Management Platform"
              tags={["MERN Stack", "Docker", "GitHub Actions CI/CD", "JWT Auth"]}
              description="A comprehensive SaaS-ready administration platform designed to digitize school operations. This project demonstrates full-cycle development from DB schema design to VPS deployment."
              features={[
                "Architected a modular backend with JWT-secured REST APIs, ensuring strict data privacy for student and teacher records.",
                "Implemented complex business logic for billing, certificate generation, inventory tracking, and library management.",
                "Engineered an Excel-upload feature for bulk data processing and built an analytics dashboard with advanced filtering.",
                "Established a robust CI/CD pipeline using GitHub Actions for automated testing and deployment.",
                "Deployed on a Hostinger VPS (Ubuntu) using Docker containers and configured Caddy as a reverse proxy for SSL/TLS termination."
              ]}
              impact="Reduced administrative workload by 50% and significantly improved data integrity across the institution."
              link="#"
              isLeft={true}
            />

            {/* Project 2: AI Attendance */}
            <ProjectCard
              title="AI-Powered Contactless Attendance System"
              tags={["Python", "FastAPI", "OpenCV", "InsightFace"]}
              description="A high-performance computer vision microservice integrated into the Schoolix ecosystem. It addresses the inefficiency of manual roll calls."
              features={[
                "Built a standalone face recognition service using Python and FastAPI for low-latency response times.",
                "Integrated the InsightFace library and OpenCV to achieve 96% recognition accuracy under varying lighting conditions.",
                "Optimized the recognition pipeline to achieve sub-second scan speeds for real-time usage.",
                "Seamlessly connected this microservice with the main Schoolix backend to update attendance records automatically."
              ]}
              impact="Replaced manual roll calls with automated facial recognition, improving efficiency by 70%."
              link="#"
              isLeft={false}
            />

            {/* Project 3: Gemini Chatbot */}
            <ProjectCard
              title="Intelligent Database Chatbot"
              tags={["Node.js", "Gemini API", "Natural Language Processing"]}
              description="An AI interface allowing non-technical staff to query complex database records using natural language."
              features={[
                "Developed a Node.js middleware leveraging Google's Gemini API to translate natural language into database queries.",
                "Created secure REST APIs to allow the chatbot to safely retrieve specific student, teacher, and driver data.",
                "Implemented context-aware prompts to ensure the AI understands relationships between different data entities.",
                "Designed the system to handle secure, real-time data retrieval without exposing raw database access."
              ]}
              impact="Automated 80% of repetitive administrative queries, saving hours of weekly manual lookup time."
              link="#"
              isLeft={true}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to scale your backend?</h2>
          <p className="text-lg text-slate-400 mb-12">
            I am currently open for Backend Developer, DevOps, and AI Integration roles.
            Let's discuss how I can contribute to your engineering team.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="mailto:yashdafade93@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white transition-all group">
              <Mail className="text-blue-400 group-hover:scale-110 transition-transform" />
              yashdafade93@gmail.com
            </a>
            <a
              href="tel:+919359126989"
              className="flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white transition-all group"
            >
              <Phone className="text-blue-400 group-hover:scale-110 transition-transform" size={22} />
              +91 9359126989
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800 flex justify-center gap-8 text-slate-500">
            <a href="https://www.linkedin.com/in/yash-dafade-992ab2209/" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/yashdafade" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://drive.google.com/file/d/1Z3fj6m3iP4p1WEo-Dj64uZ0Vvp1Mrg_w/view" className="hover:text-white transition-colors">Download Resume</a>
          </div>
          <p className="mt-8 text-xs text-slate-600">
            © 2025 Yash Dafade. Built with React & Three.js.
          </p>
        </div>
      </section>
    </div>
  );
};

// --- Helper Components ---

const SkillCard = ({ icon, title, skills }) => (
  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
    <div className="mb-4 p-3 bg-slate-950 rounded-lg inline-block group-hover:scale-105 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
    <ul className="space-y-2">
      {skills.map((skill, idx) => (
        <li key={idx} className="text-sm text-slate-400 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-blue-500 transition-colors"></div>
          {skill}
        </li>
      ))}
    </ul>
  </div>
);

const ProjectCard = ({ title, tags, description, features, impact, isLeft }) => (
  <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-start`}>
    {/* "Screenshot" / Visual Placeholder */}
    <div className="w-full md:w-5/12 aspect-video bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <Code size={48} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-slate-950 p-2 rounded-full text-white border border-slate-700">
          <ExternalLink size={16} />
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="w-full md:w-7/12 space-y-4">
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-slate-800 text-blue-300 text-xs rounded-full border border-slate-700">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-slate-300 leading-relaxed">
        {description}
      </p>

      <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-800/60">
        <h4 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wider">Key Implementation Details:</h4>
        <ul className="space-y-2">
          {features.map((feat, i) => (
            <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
              <span className="text-blue-500 mt-1">▹</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-400/10 p-3 rounded border border-emerald-400/20">
        <Globe size={16} />
        <span>Impact: {impact}</span>
      </div>
    </div>
  </div>
);

export default App;