import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ---------------- Particle System Components ---------------- */
interface ParticleSystemProps {
  count?: number;
}
const ParticleSystem: React.FC<ParticleSystemProps> = ({ count = 200 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  // Set initial positions for particles
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 5;
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, viewport]);

  // Animate particles with a subtle drift
  useFrame(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      dummy.position.x += Math.sin(Date.now() * 0.001 + i) * 0.005;
      dummy.position.y += Math.cos(Date.now() * 0.001 + i) * 0.005;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#0ea5e9" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const SceneParticles: React.FC = () => {
  return (
    <Canvas
      style={{ background: 'transparent' }}
      camera={{ position: [0, 0, 10], fov: 75 }}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <ParticleSystem count={200} />
    </Canvas>
  );
};

/* ---------------- Section Indicator Component ---------------- */
interface SectionIndicatorProps {
  sections: React.RefObject<HTMLElement>[];
  labels: string[];
}
const SectionIndicator: React.FC<SectionIndicatorProps> = ({ sections, labels }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const index = sections.findIndex(ref => ref.current === entry.target);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
    sections.forEach(ref => ref.current && observer.observe(ref.current));

    return () => {
      sections.forEach(ref => ref.current && observer.unobserve(ref.current));
    };
  }, [sections]);

  return (
    <div
      className="hidden md:flex flex-col items-end"
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
      }}
    >
      <div className="relative">
        {/* Vertical guide line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-300" />
        <div className="flex flex-col gap-6">
          {labels.map((label, index) => (
            <div key={index} className="relative flex items-center">
              <motion.div
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{
                  scale: activeIndex === index ? 1.4 : 1,
                  opacity: activeIndex === index ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4 rounded-full bg-white shadow-md border border-gray-400"
              />
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-full ml-2 text-sm font-medium text-gray-800"
                >
                  {label}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Utility Card Components ---------------- */
// Testimonial Card
interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  delay?: number;
}
const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  name,
  title,
  image,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <GlassCard className="h-full p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4 text-primary-500">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.667 13.333H5.33366C5.33366 8 9.33366 5.333 13.3337 5.333L12.0003 8C10.667 9.333 10.667 11.333 10.667 13.333ZM21.3337 13.333H16.0003C16.0003 8 20.0003 5.333 24.0003 5.333L22.667 8C21.3337 9.333 21.3337 11.333 21.3337 13.333Z"
                fill="currentColor"
              />
              <path
                d="M10.667 13.333C10.667 14.667 10.667 20 5.33366 20V26.667H16.0003V20C16.0003 18.667 16.0003 13.333 21.3337 13.333C21.3337 14.667 21.3337 20 26.667 20V26.667H16.0003"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{quote}</p>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-semibold">{name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

/* ---------------- Home Component ---------------- */
const Home: React.FC = () => {
  // Create refs for each section to track scroll progress
  const problemsRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // List of section refs and labels (make sure order matches the rendered sections)
  const sectionRefs = [problemsRef, whyChooseRef, agentsRef, servicesRef, testimonialsRef, ctaRef];
  const sectionLabels = [
    'Problems + Solutions',
    'Why Choose Us',
    'AI Agents',
    'Services',
    'Testimonials',
    'CTA',
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Particle Overlay */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-secondary-500/10 dark:from-primary-900/20 dark:to-secondary-900/20 z-0" />
          <div className="absolute inset-0 opacity-30 dark:opacity-40 z-0">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary-500/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-secondary-500/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-primary-500/20 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-secondary-500/20 to-transparent" />
          </div>
          {/* Particle System Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <SceneParticles />
          </div>
        </div>
        <motion.div className="container mx-auto px-4 md:px-6 pt-32 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                  Your Practice. <br />
                  Fully Automated. <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                    Powered by AI.
                  </span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                  Streamline patient care, billing, and growth—while AI handles the rest.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Book a Demo
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Explore How AI Works
                  </motion.button>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="h-[500px] floating-element">
              <img src="stethescope.png" alt="Stethoscope" className="w-full h-full object-contain" />
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }} className="flex flex-col items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Scroll to explore</p>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
              <motion.div animate={{ height: ['20%', '40%', '20%'] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 bg-primary-500 rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Right-side Section Indicator */}
      <SectionIndicator sections={sectionRefs} labels={sectionLabels} />

      {/* Problem + Solution Section */}
      <section ref={problemsRef} className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              Problems{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                +
              </span>{' '}
              Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              Transforming healthcare challenges into opportunities with AI-powered solutions
            </motion.p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <GlassCard className="p-8 h-full flex flex-col">
                <h3 className="text-2xl font-display font-bold mb-6 text-gray-800 dark:text-white">
                  Problems Doctors Face
                </h3>
                <ul className="space-y-4 flex-grow">
                  {[
                    'Overwhelmed by repetitive administrative tasks.',
                    'Missed revenue opportunities due to manual billing errors.',
                    'Difficulty managing patient communication and follow-ups.',
                    'Struggles in attracting new patients through digital presence.',
                    'Fragmented systems causing operational inefficiencies.',
                  ].map((problem, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex-shrink-0">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{problem}</span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <GlassCard className="p-8 h-full flex flex-col">
                <h3 className="text-2xl font-display font-bold mb-6 text-gray-800 dark:text-white">
                  Our AI-Powered Solutions
                </h3>
                <ul className="space-y-4 flex-grow">
                  {[
                    'Intelligent automation handling appointments, records, and follow-ups.',
                    'Error-free billing and seamless revenue cycle management.',
                    'AI-driven patient engagement through personalized messaging.',
                    'Autonomous marketing strategies to grow online visibility and patient base.',
                    'Unified platform connecting doctors, labs, pharmacies, and hospitals for end-to-end healthcare automation.',
                  ].map((solution, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 flex-shrink-0">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{solution}</span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyChooseRef} className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              Why Choose{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                MediSync
              </span>
            </motion.h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Empowering doctors with a platform that expands your reach, automates your workflow, and partners with trusted healthcare leaders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-bold text-primary-600 mb-1">Global Platform</h3>
              <p className="text-sm text-gray-500 mb-4">Worldwide reach</p>
              <p className="text-gray-700 dark:text-gray-300">
                Expand your practice beyond local boundaries. Our platform connects you with patients and specialists worldwide, ensuring standardized care and increased accessibility.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-bold text-primary-600 mb-1">AI Automation</h3>
              <p className="text-sm text-gray-500 mb-4">9+ AI agents</p>
              <p className="text-gray-700 dark:text-gray-300">
                Let AI handle routine tasks. With 9+ specialized AI agents, manage appointments, billing, and patient follow-ups effortlessly—reducing errors and saving you time.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-bold text-primary-600 mb-1">Trusted Partners</h3>
              <p className="text-sm text-gray-500 mb-4">Integrated with top labs</p>
              <p className="text-gray-700 dark:text-gray-300">
                Integrate seamlessly with leading labs, pharmacies, and hospitals. Our network of trusted partners ensures comprehensive support and reliable service for your practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your AI Agents Section */}
      <section ref={agentsRef} className="py-32 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-[90px]">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Meet Your{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                AI Agents
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Empower your practice with smart automation across every aspect of patient care.
            </p>
          </div>
          <div className="relative w-full h-96 flex items-center justify-center">
            {(() => {
              const agents = [
                "Scheduler Agent",
                "Billing Agent",
                "Marketing Agent",
                "Document Agent",
                "Prescription Agent",
                "Test Center Connector",
                "Pharmacy Agent",
                "Doctor Network Agent",
                "Productivity Tools",
              ];
              const radius = 200;
              return (
                <>
                  {/* Background Circle for Diagram */}
                  <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <circle
                      cx="50%"
                      cy="50%"
                      r={radius}
                      stroke="rgba(55, 65, 81, 0.15)"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* SVG Lines Connecting Nodes with Thunder Animation */}
                    {agents.map((_agent, index) => {
                      const total = agents.length;
                      const angle = (index / total) * 360 - 90;
                      const x = radius * Math.cos((angle * Math.PI) / 180);
                      const y = radius * Math.sin((angle * Math.PI) / 180);
                      return (
                        <motion.line
                          key={index}
                          x1="50%"
                          y1="50%"
                          x2={`calc(50% + ${x}px)`}
                          y2={`calc(50% + ${y}px)`}
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray="4"
                          initial={{ strokeDashoffset: 20, opacity: 0.5 }}
                          animate={{ strokeDashoffset: 0, opacity: 1 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "loop",
                            delay: index * 0.1,
                          }}
                        />
                      );
                    })}
                  </svg>

                  {/* Central AI Hub */}
                  <div className="absolute w-32 h-32 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                    AI
                  </div>

                  {/* Radial Agent Nodes */}
                  {agents.map((agent, index) => {
                    const total = agents.length;
                    const angle = (index / total) * 360 - 90;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);
                    return (
                      <motion.div
                        key={index}
                        className="absolute flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2"
                        style={{
                          left: `calc(50% + ${x}px - 40px)`,
                          top: `calc(50% + ${y}px - 40px)`,
                          width: "80px",
                          height: "80px",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <span className="text-xs font-bold text-center text-primary-600 break-words">
                          {agent}
                        </span>
                      </motion.div>
                    );
                  })}
                </>
              );
            })()}
          </div>
          <div className="mt-[80px] text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover how our AI agents seamlessly automate your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        className="py-20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 dark:text-gray-100 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tailored solutions for every healthcare provider.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Individual Doctors */}
            <motion.div
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-10 transform -skew-y-6"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  Individual Doctors
                </h3>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>AI appointment scheduling</li>
                  <li>Automated billing</li>
                  <li>Digital marketing support</li>
                  <li>Prescription automation</li>
                  <li>Patient follow-up reminders</li>
                  <li>Website creation</li>
                  <li>Branding automation</li>
                </ul>
              </div>
            </motion.div>
            {/* Small Clinics */}
            <motion.div
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 opacity-10 transform -skew-y-6"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  Small Clinics
                </h3>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Multi-doctor scheduling</li>
                  <li>Centralized billing</li>
                  <li>Patient communication workflows</li>
                  <li>Inventory & test integrations</li>
                  <li>Team productivity tools</li>
                  <li>Clinic website management</li>
                  <li>Marketing automation</li>
                </ul>
              </div>
            </motion.div>
            {/* Enterprise Hospitals */}
            <motion.div
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-red-400 to-pink-400 opacity-10 transform -skew-y-6"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold text-yellow-600 mb-4">
                  Enterprise Hospitals
                </h3>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Department scheduling optimization</li>
                  <li>Advanced analytics</li>
                  <li>Cross-department management</li>
                  <li>Pharmacy & lab connectivity</li>
                  <li>Regulatory compliance</li>
                  <li>Enterprise branding</li>
                  <li>Multi-branch website management</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--primary-glow),_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--secondary-glow),_transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              Trusted by Healthcare Professionals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              See what medical professionals are saying about MediSync
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial
              quote="MediSync has transformed our practice. We've reduced administrative time by 40% and improved patient satisfaction scores significantly."
              name="Dr. Sarah Johnson"
              title="Cardiologist, Heart Care Center"
              image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              delay={0.1}
            />
            <Testimonial
              quote="The scheduling system alone was worth the investment. No more double bookings, and patients love the automated reminders."
              name="Dr. Michael Chen"
              title="Family Physician, Community Health"
              image="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              delay={0.2}
            />
            <Testimonial
              quote="As a small practice, we needed something affordable yet powerful. MediSync delivered beyond our expectations."
              name="Dr. Emily Rodriguez"
              title="Pediatrician, Kids First Clinic"
              image="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Ready to Automate Your Practice?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl mb-8 opacity-90"
            >
              Join thousands of healthcare professionals who are already using MediSync to streamline their practice and improve patient care.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book a Free Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Schedule Demo
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
