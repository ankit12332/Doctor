import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Clock, Rocket, UserCheck } from 'lucide-react';

/* --------------------------------------------
   Particle System Component (3D Background)
--------------------------------------------- */
const ParticleSystem = ({ count = 200 }: { count?: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  useEffect(() => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 10;
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count, viewport]);

  useFrame(() => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      mesh.current.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      dummy.position.x += Math.sin(Date.now() * 0.001 + i) * 0.01;
      dummy.position.y += Math.cos(Date.now() * 0.001 + i) * 0.01;
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

/* --------------------------------------------
   3D Scene Component
--------------------------------------------- */
const Scene3D: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} color="#0ea5e9" intensity={0.5} />
      <ParticleSystem count={150} />
      <Environment preset="city" />
    </Canvas>
  );
};

/* --------------------------------------------
   Insight Card Component
--------------------------------------------- */
interface InsightCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  details: string[];
  index: number;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, subtitle, icon, details, index }) => {
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
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
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
        onClick={() => setIsExpanded(true)}
        tabIndex={0}
        aria-label={`${title}: ${subtitle}`}
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
          <h3 className="text-xl font-bold mb-1 text-center">{title}</h3>
          <p className="text-primary-600 dark:text-primary-400 mb-4 text-center">{subtitle}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsExpanded(false)}></div>
            {/* Modal Content */}
            <motion.div
              className="relative z-[1100] w-[95%] max-w-3xl max-h-screen overflow-y-auto rounded-lg bg-white dark:bg-gray-900 shadow-xl p-6 md:p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                aria-label="Close details"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-20 h-20 relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">
                    {React.cloneElement(icon as React.ReactElement, { size: 48 })}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-primary-500 opacity-10 animate-pulse"></div>
                </div>
                <div className="text-center md:text-left w-full">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
                  <p className="text-primary-600 dark:text-primary-400 text-lg mb-4">{subtitle}</p>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    {details.map((detail, idx) => (
                      <p key={idx}>{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
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

/* --------------------------------------------
   Main Insights Page Component
--------------------------------------------- */
const Insights: React.FC = () => {
  const prefersReducedMotion = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Set reduced-motion preference
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = reducedMotionQuery.matches;
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    reducedMotionQuery.addEventListener('change', handleChange);
    return () => reducedMotionQuery.removeEventListener('change', handleChange);
  }, []);

  const insights = [
    {
      title: '5 Ways AI Saves You Hours',
      subtitle: 'Streamlining operations for maximum efficiency',
      icon: <Clock />,
      details: [
        'Automated scheduling reduces manual workload.',
        'AI-powered documentation cuts time on charting.',
        'Optimized patient communications save valuable time.',
        'Administrative tasks are streamlined for focus.',
        'Instant data analysis delivers insights quickly.'
      ]
    },
    {
      title: 'The Future of Automation',
      subtitle: 'Revolutionizing workflows with cutting-edge tech',
      icon: <Rocket />,
      details: [
        'Seamless integration across systems boosts productivity.',
        'Innovative solutions address modern challenges.',
        'Time optimization frees you for strategic planning.',
        'Enhanced collaboration drives overall success.'
      ]
    },
    {
      title: 'Real Success Stories',
      subtitle: 'Hear from professionals transforming their practice',
      icon: <UserCheck />,
      details: [
        'Testimonials from healthcare leaders.',
        'Dramatic improvements in operational efficiency.',
        'Enhanced patient care and experience.',
        'Proven results with data-driven insights.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16 overflow-hidden">
      {/* Hero Section with 3D Background */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Scene3D />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-secondary-500/10 dark:from-primary-900/20 dark:to-secondary-900/20" />
        </div>
        <motion.div
          style={{ y: prefersReducedMotion.current ? 0 : y, opacity }}
          className="container mx-auto px-4 md:px-6 relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Insights & Innovations in Healthcare
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore how AI and automation are transforming healthcare—unlocking new efficiencies and success stories.
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
              animate={prefersReducedMotion.current ? {} : { y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-primary-400/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={prefersReducedMotion.current ? {} : { height: ['20%', '40%', '20%'] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 bg-primary-500 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Insights Grid Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {insights.map((insight, index) => (
              <InsightCard
                key={index}
                title={insight.title}
                subtitle={insight.subtitle}
                icon={insight.icon}
                details={insight.details}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
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
              Ready to Leverage Data-Driven Insights?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl mb-8 opacity-90"
            >
              Experience the power of innovative insights that revolutionize your healthcare practice.
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
                Request a Demo
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

export default Insights;
