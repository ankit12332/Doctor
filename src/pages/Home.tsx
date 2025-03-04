import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Users, BarChart3, Stethoscope, Clock, Shield } from 'lucide-react';
import Scene3D from '../components/3d/Scene3D';
import GlassCard from '../components/ui/GlassCard';
import FeatureCard from '../components/ui/FeatureCard';

const Home: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-secondary-500/10 dark:from-primary-900/20 dark:to-secondary-900/20 z-0" />
          <div className="absolute inset-0 opacity-30 dark:opacity-40 z-0">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary-500/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-secondary-500/20 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-primary-500/20 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-secondary-500/20 to-transparent" />
          </div>
        </div>

        <motion.div
          style={{ y, opacity }}
          className="container mx-auto px-4 md:px-6 pt-32 pb-16 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                    Revolutionize
                  </span>{' '}
                  Your Medical Practice
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                  MediSync combines cutting-edge technology with intuitive design to streamline your healthcare workflow, enhance patient care, and boost your practice's efficiency—empowering you to manage patient care, billing, and growth seamlessly while AI handles the rest.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Watch Demo <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-[500px] floating-element"
            >
              <Scene3D />
            </motion.div>
          </div>
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
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ height: ['20%', '40%', '20%'] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 bg-primary-500 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem + Solution Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              Problems <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">+</span> Solutions
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <GlassCard className="p-8">
                <h3 className="text-2xl font-display font-bold mb-6 text-gray-800 dark:text-white">Problems Doctors Face</h3>
                <ul className="space-y-4">
                  {[
                    'Overwhelmed by repetitive administrative tasks.',
                    'Missed revenue opportunities due to manual billing errors.',
                    'Difficulty managing patient communication and follow-ups.',
                    'Struggles in attracting new patients through digital presence.',
                    'Fragmented systems causing operational inefficiencies.'
                  ].map((problem, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <GlassCard className="p-8">
                <h3 className="text-2xl font-display font-bold mb-6 text-gray-800 dark:text-white">Our AI-Powered Solutions</h3>
                <ul className="space-y-4">
                  {[
                    'Intelligent automation handling appointments, records, and follow-ups.',
                    'Error-free billing and seamless revenue cycle management.',
                    'AI-driven patient engagement through personalized messaging.',
                    'Autonomous marketing strategies to grow online visibility and patient base.',
                    'Unified platform connecting doctors, labs, pharmacies, and hospitals for end-to-end healthcare automation.'
                  ].map((solution, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <section className="py-20 relative overflow-hidden">
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
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">MediSync</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              The future of healthcare management is here
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WhyChooseCard
              title="Global Platform"
              description="Worldwide reach connecting healthcare providers across continents, enabling seamless collaboration and standardized care protocols."
              highlight="Worldwide reach"
              icon={
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.6 9H20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.6 15H20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3C14.4 5.55556 15.6 8.77778 15.6 12C15.6 15.2222 14.4 18.4444 12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3C9.6 5.55556 8.4 8.77778 8.4 12C8.4 15.2222 9.6 18.4444 12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              delay={0.1}
            />
            
            <WhyChooseCard
              title="AI Automation"
              description="Our platform features 9+ specialized AI agents that handle everything from scheduling to billing, freeing your staff to focus on patient care."
              highlight="9+ AI agents"
              icon={
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              delay={0.2}
            />
            
            <WhyChooseCard
              title="Trusted Partners"
              description="Seamlessly integrated with leading laboratories, pharmacies, and healthcare systems to provide a unified experience for providers and patients."
              highlight="Integrated with top labs"
              icon={
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              Powerful Features for Modern Healthcare
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              Everything you need to manage your practice efficiently and provide exceptional patient care
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar size={24} />}
              title="Smart Scheduling"
              description="Intelligent appointment management with automated reminders and optimized scheduling to reduce no-shows."
              delay={0.1}
            />
            <FeatureCard
              icon={<Users size={24} />}
              title="Patient Management"
              description="Comprehensive patient profiles with medical history, treatment plans, and secure communication channels."
              delay={0.2}
            />
            <FeatureCard
              icon={<BarChart3 size={24} />}
              title="Advanced Analytics"
              description="Powerful insights into your practice performance with customizable dashboards and reports."
              delay={0.3}
            />
            <FeatureCard
              icon={<Stethoscope size={24} />}
              title="Telehealth Integration"
              description="Seamless virtual consultations with integrated video conferencing and digital prescription capabilities."
              delay={0.4}
            />
            <FeatureCard
              icon={<Clock size={24} />}
              title="Automated Workflows"
              description="Streamline routine tasks with customizable automation to save time and reduce administrative burden."
              delay={0.5}
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="HIPAA Compliant"
              description="Enterprise-grade security with end-to-end encryption and comprehensive audit trails for complete peace of mind."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
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
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Ready to Transform Your Medical Practice?
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
                Start Free Trial
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
              <path d="M10.667 13.333H5.33366C5.33366 8 9.33366 5.333 13.3337 5.333L12.0003 8C10.667 9.333 10.667 11.333 10.667 13.333ZM21.3337 13.333H16.0003C16.0003 8 20.0003 5.333 24.0003 5.333L22.667 8C21.3337 9.333 21.3337 11.333 21.3337 13.333Z" fill="currentColor"/>
              <path d="M10.667 13.333C10.667 14.667 10.667 20 5.33366 20V26.667H16.0003V20C16.0003 18.667 16.0003 13.333 21.3337 13.333C21.3337 14.667 21.3337 20 26.667 20V26.667H16.0003" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

// Why Choose Us Card Component
interface WhyChooseCardProps {
  title: string;
  description: string;
  highlight: string;
  icon: React.ReactNode;
  delay?: number;
}

const WhyChooseCard: React.FC<WhyChooseCardProps> = ({
  title,
  description,
  highlight,
  icon,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      <GlassCard className="h-full p-8 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white"
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-4 rounded-full"></div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="text-primary-600 dark:text-primary-400 font-semibold">
          {highlight}
        </div>
        
        {/* Glowing effect */}
        <motion.div
          animate={{ 
            boxShadow: ['0 0 0px rgba(56, 189, 248, 0)', '0 0 15px rgba(56, 189, 248, 0.3)', '0 0 0px rgba(56, 189, 248, 0)'] 
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 rounded-xl pointer-events-none"
        ></motion.div>
      </GlassCard>
    </motion.div>
  );
};

export default Home;