import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, MeshDistortMaterial, Float, Text3D, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Brain, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  FileText, 
  Shield, 
  Stethoscope, 
  CreditCard, 
  Users 
} from 'lucide-react';

// Particle System Component
const ParticleSystem = ({ count = 200 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  
  useEffect(() => {
    if (!mesh.current) return;
    
    const dummy = new THREE.Object3D();
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 10;
      
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      
      particles.push({
        position: [x, y, z],
        velocity: [(Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, 0],
      });
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count, viewport]);
  
  useFrame(() => {
    if (!mesh.current) return;
    
    const dummy = new THREE.Object3D();
    
    for (let i = 0; i < count; i++) {
      mesh.current.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      
      dummy.position.x += (Math.sin(Date.now() * 0.001 + i) * 0.01);
      dummy.position.y += (Math.cos(Date.now() * 0.001 + i) * 0.01);
      
      if (Math.abs(dummy.position.x) > viewport.width) {
        dummy.position.x = (Math.random() - 0.5) * viewport.width * 2;
      }
      if (Math.abs(dummy.position.y) > viewport.height) {
        dummy.position.y = (Math.random() - 0.5) * viewport.height * 2;
      }
      
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#0ea5e9" transparent opacity={0.6} />
    </instancedMesh>
  );
};

// Connection Lines Component
const ConnectionLines: React.FC<{ agents: any[] }> = ({ agents }) => {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  useFrame(() => {
    if (!linesRef.current) return;
    if (Array.isArray(linesRef.current.material)) {
      linesRef.current.material.forEach(material => {
        material.opacity = 0.1 + Math.sin(Date.now() * 0.001) * 0.05;
      });
    } else {
      linesRef.current.material.opacity = 0.1 + Math.sin(Date.now() * 0.001) * 0.05;
    }
  });
  
  useEffect(() => {
    if (!linesRef.current || agents.length === 0) return;
    
    const positions = [];
    const indices = [];
    
    for (let i = 0; i < agents.length; i++) {
      for (let j = i + 1; j < agents.length; j++) {
        if (Math.random() > 0.7) continue;
        
        const startIndex = positions.length / 3;
        
        positions.push(
          (i % 3 - 1) * 2, 
          Math.floor(i / 3) - 1, 
          0
        );
        
        positions.push(
          (j % 3 - 1) * 2, 
          Math.floor(j / 3) - 1, 
          0
        );
        
        indices.push(startIndex, startIndex + 1);
      }
    }
    
    const geometry = linesRef.current.geometry;
    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.attributes.position.needsUpdate = true;
  }, [agents]);
  
  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#0ea5e9" transparent opacity={0.15} />
    </lineSegments>
  );
};

// Agent Card Component
const AgentCard: React.FC<{
  name: string;
  role: string;
  icon: React.ReactNode;
  capabilities: string[];
  index: number;
}> = ({ name, role, icon, capabilities, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isExpanded) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -10;
    const rotateY = (x - centerX) / centerX * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current || isExpanded) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    setIsHovered(false);
  };
  
  return (
    <>
      <motion.div
        ref={cardRef}
        className={`relative ${isExpanded ? 'z-50' : 'z-10'}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsExpanded(!isExpanded)}
        tabIndex={0}
        aria-label={`${name}, ${role}`}
        role="button"
        aria-expanded={isExpanded}
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div 
          className={`glass-card h-[400px] w-full max-w-[320px] mx-auto p-6 flex flex-col items-center justify-center transition-all duration-300 ${
            isHovered && !isExpanded ? 'shadow-[0_0_30px_rgba(14,165,233,0.2)]' : ''
          }`}
        >
          <div className="w-16 h-16 mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">
              {React.cloneElement(icon as React.ReactElement, { size: 32 })}
            </div>
            <div className="absolute inset-0 rounded-full bg-primary-500 opacity-10 animate-pulse"></div>
          </div>
          
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-primary-600 dark:text-primary-400 mb-4 text-center">{role}</p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {capabilities.map((capability, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800"
              >
                {capability}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0  bottom-0 z-[1000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Overlay */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsExpanded(false)}
            ></div>
            
            {/* Modal Content */}
            <motion.div
              className="relative z-[1100] w-[95%] max-w-3xl max-h-screen overflow-y-auto rounded-lg bg-white dark:bg-gray-900 shadow-xl p-6 md:p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                aria-label="Close details"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
              {/* Main Content */}
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* Agent Icon */}
                <div className="w-20 h-20 relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">
                    {React.cloneElement(icon as React.ReactElement, { size: 48 })}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-primary-500 opacity-10 animate-pulse"></div>
                </div>
                
                {/* Details Section */}
                <div className="text-center md:text-left w-full">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{name}</h2>
                  <p className="text-primary-600 dark:text-primary-400 text-lg mb-4">{role}</p>
                  
                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {capabilities.map((capability, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    <p>
                      The {name} AI agent leverages advanced machine learning algorithms to automate and optimize {role.toLowerCase()} processes within your medical practice.
                    </p>
                    <p>
                      With specialized capabilities in {capabilities.join(', ')}, this agent significantly reduces manual workload while improving accuracy and efficiency.
                    </p>
                    <p>
                      Seamlessly integrated with other MediSync AI agents, it forms part of a comprehensive ecosystem designed to transform healthcare management.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-4">Key Performance Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg border border-primary-100 dark:border-primary-800">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">95%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Task Automation</div>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg border border-primary-100 dark:border-primary-800">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">3.5x</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Efficiency Increase</div>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg border border-primary-100 dark:border-primary-800">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">99.8%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</div>
                  </div>
                </div>
              </div>
              
              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button 
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg shadow-md hover:bg-primary-600 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 3D Scene Component
const Scene3D: React.FC<{ agents: any[] }> = ({ agents }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} color="#0ea5e9" intensity={0.5} />
      
      <ParticleSystem count={150} />
      <ConnectionLines agents={agents} />
      
      <Environment preset="city" />
    </Canvas>
  );
};

// Main AI Agents Page Component
const AIAgents: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(reducedMotionQuery.matches);
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);
  
  const agents = [
    {
      name: "ScheduleSync",
      role: "Appointment Manager",
      icon: <Calendar />,
      capabilities: ["Smart Scheduling", "Reminders", "Availability Optimization"]
    },
    {
      name: "PatientPulse",
      role: "Patient Engagement Specialist",
      icon: <Users />,
      capabilities: ["Communication", "Follow-ups", "Satisfaction Tracking"]
    },
    {
      name: "DataDoc",
      role: "Analytics Expert",
      icon: <BarChart3 />,
      capabilities: ["Performance Metrics", "Trend Analysis", "Predictive Insights"]
    },
    {
      name: "BillingBot",
      role: "Revenue Cycle Manager",
      icon: <CreditCard />,
      capabilities: ["Automated Billing", "Insurance Verification", "Payment Processing"]
    },
    {
      name: "MediMind",
      role: "Clinical Decision Support",
      icon: <Brain />,
      capabilities: ["Treatment Recommendations", "Research Integration", "Risk Assessment"]
    },
    {
      name: "DocuGenius",
      role: "Documentation Assistant",
      icon: <FileText />,
      capabilities: ["Automated Charting", "Template Management", "Compliance Checking"]
    },
    {
      name: "CareConnect",
      role: "Telehealth Coordinator",
      icon: <Stethoscope />,
      capabilities: ["Virtual Visits", "Remote Monitoring", "Digital Prescriptions"]
    },
    {
      name: "GuardianAI",
      role: "Security & Compliance Officer",
      icon: <Shield />,
      capabilities: ["HIPAA Compliance", "Threat Detection", "Access Control"]
    },
    {
      name: "ConversAI",
      role: "Patient Communication Expert",
      icon: <MessageSquare />,
      capabilities: ["Chatbot Interface", "Multilingual Support", "Sentiment Analysis"]
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-secondary-500/10 dark:from-primary-900/20 dark:to-secondary-900/20 z-0" />
          <div className="absolute inset-0 opacity-30 dark:opacity-40 z-0">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary-500/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-secondary-500/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-primary-500/20 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-secondary-500/20 to-transparent" />
          </div>
        </div>
        
        <div className="absolute inset-0 z-0">
          <Scene3D agents={agents} />
        </div>
        
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : y, opacity }}
          className="container mx-auto px-4 md:px-6 relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Meet Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">AI Agents</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover the cutting-edge AI agents powering MediSync's healthcare management platform, each specialized to handle critical aspects of your medical practice.
            </p>
          </motion.div>
        </motion.div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Scroll to explore</p>
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-primary-400/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={prefersReducedMotion ? {} : { height: ['20%', '40%', '20%'] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 bg-primary-500 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Agents Grid Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {agents.map((agent, index) => (
              <AgentCard
                key={index}
                name={agent.name}
                role={agent.role}
                icon={agent.icon}
                capabilities={agent.capabilities}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Integration Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Seamless <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">Integration</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              Our AI agents work together in perfect harmony, creating a unified ecosystem that transforms your healthcare practice.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 md:p-12 bg-[#0A0A1F]/70 border border-[#00F5FF]/10"
            style={{ backdropFilter: 'blur(20px)' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Intelligent Collaboration</h3>
                <p className="text-gray-300 mb-6">
                  MediSync's AI agents don't just work independently—they communicate and collaborate to create a seamless workflow across your entire practice.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Real-time data sharing between agents",
                    "Automated handoffs for multi-step processes",
                    "Contextual awareness across the platform",
                    "Unified learning from your practice patterns"
                  ].map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                      className="flex items-start"
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-[#00F5FF]/10 text-[#00F5FF] mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="relative h-[300px] md:h-[400px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-[#00F5FF]/5 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#00F5FF]/20 to-transparent" />
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#00F5FF]/10 to-transparent" />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-3/4 h-3/4">
                          <motion.div
                            animate={prefersReducedMotion ? {} : { 
                              scale: [1, 1.05, 1],
                              rotate: [0, 5, 0, -5, 0]
                            }}
                            transition={{ 
                              duration: 10, 
                              repeat: Infinity,
                              repeatType: 'reverse'
                            }}
                            className="absolute inset-0"
                          >
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                              <path
                                fill="rgba(0, 245, 255, 0.1)"
                                d="M40.8,-62.2C52.9,-56.3,62.5,-44.6,68.2,-31.3C73.9,-18,75.8,-3,73.2,11.1C70.7,25.2,63.8,38.5,53.2,47.8C42.5,57.2,28.1,62.6,13.2,67.1C-1.7,71.5,-17.1,75,-30.8,71.2C-44.4,67.4,-56.2,56.3,-65.2,42.8C-74.1,29.2,-80.1,13.1,-79.1,-2.3C-78.1,-17.7,-70.1,-32.4,-58.9,-42.8C-47.7,-53.2,-33.4,-59.3,-19.8,-63.9C-6.2,-68.5,6.6,-71.6,19.9,-70.1C33.1,-68.6,46.7,-62.5,40.8,-62.2Z"
                                transform="translate(100 100)"
                              />
                            </svg>
                          </motion.div>
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              animate={prefersReducedMotion ? {} : { 
                                scale: [1, 1.1, 1],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{ 
                                duration: 4, 
                                repeat: Infinity,
                                repeatType: 'reverse'
                              }}
                              className="w-24 h-24 rounded-full bg-[#00F5FF]/10 flex items-center justify-center"
                            >
                              <Brain size={48} className="text-[#00F5FF]" />
                            </motion.div>
                          </div>
                          
                          {/* Connection lines */}
                          {[0, 1, 2, 3, 4, 5].map((i) => {
                            const angle = (i * Math.PI * 2) / 6;
                            const x = Math.cos(angle) * 120;
                            const y = Math.sin(angle) * 120;
                            
                            return (
                              <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-t from-[#00F5FF]/50 to-transparent"
                                style={{
                                  height: '120px',
                                  transformOrigin: 'bottom center',
                                  transform: `translate(-50%, -100%) rotate(${angle}rad)`,
                                }}
                                animate={prefersReducedMotion ? {} : { 
                                  opacity: [0.3, 0.7, 0.3],
                                  height: ['100px', '120px', '100px']
                                }}
                                transition={{ 
                                  duration: 3 + i * 0.5, 
                                  repeat: Infinity,
                                  repeatType: 'reverse'
                                }}
                              />
                            );
                          })}
                          
                          {/* Satellite nodes */}
                          {[0, 1, 2, 3, 4, 5].map((i) => {
                            const angle = (i * Math.PI * 2) / 6;
                            const x = Math.cos(angle) * 120;
                            const y = Math.sin(angle) * 120;
                            
                            return (
                              <motion.div
                                key={i}
                                className="absolute w-12 h-12 rounded-full bg-[#0A0A1F] border border-[#00F5FF]/30 flex items-center justify-center"
                                style={{
                                  top: `calc(50% + ${y}px)`,
                                  left: `calc(50% + ${x}px)`,
                                  transform: 'translate(-50%, -50%)',
                                }}
                                animate={prefersReducedMotion ? {} : { 
                                  scale: [1, 1.1, 1],
                                  boxShadow: [
                                    '0 0 0 rgba(0, 245, 255, 0)',
                                    '0 0 10px rgba(0, 245, 255, 0.3)',
                                    '0 0 0 rgba(0, 245, 255, 0)'
                                  ]
                                }}
                                transition={{ 
                                  duration: 3, 
                                  delay: i * 0.5,
                                  repeat: Infinity,
                                  repeatType: 'reverse'
                                }}
                              >
                                {[<Calendar />, <Users />, <BarChart3 />, <Shield />, <FileText />, <CreditCard />][i]}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Ready to Transform Your Practice?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl mb-8 opacity-90"
            >
              Experience the power of MediSync's AI agents working together to revolutionize your healthcare workflow.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule a Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIAgents;