import React from 'react';
import { motion } from 'framer-motion';
import Scene3D from '../components/3d/Scene3D';
import GlassCard from '../components/ui/GlassCard';
import { Award, Users, Lightbulb, Target, Heart, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--primary-glow),_transparent_50%)]" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--secondary-glow),_transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
                  About <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">MediSync</span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                  We're on a mission to transform healthcare management through innovative technology, making medical practices more efficient and patient care more effective.
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-[400px] floating-element"
            >
              <Scene3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-8 text-center"
            >
              Our Story
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6 text-lg text-gray-700 dark:text-gray-300"
            >
              <p>
                MediSync was founded in 2022 by a team of healthcare professionals and technology experts who recognized a critical gap in the medical software market. Traditional healthcare management systems were often clunky, difficult to use, and failed to address the evolving needs of modern medical practices.
              </p>
              <p>
                Our founders experienced firsthand the frustrations of using outdated systems that hindered rather than helped their daily workflows. They envisioned a comprehensive solution that would not only streamline administrative tasks but also enhance the quality of patient care.
              </p>
              <p>
                After two years of intensive research, development, and collaboration with healthcare providers across various specialties, MediSync was born—a cutting-edge SaaS platform designed specifically for the unique challenges of today's medical practices.
              </p>
              <p>
                Today, MediSync serves thousands of healthcare providers nationwide, from small independent practices to large multi-specialty clinics. Our team continues to innovate and expand our offerings, driven by our commitment to transforming healthcare management through technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
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
              Our Core Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              The principles that guide everything we do
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard
              icon={<Innovation />}
              title="Innovation"
              description="We constantly push the boundaries of what's possible in healthcare technology, seeking new solutions to old problems."
              delay={0.1}
            />
            <ValueCard
              icon={<Excellence />}
              title="Excellence"
              description="We are committed to delivering the highest quality in everything we do, from our software to our customer support."
              delay={0.2}
            />
            <ValueCard
              icon={<Integrity />}
              title="Integrity"
              description="We operate with transparency, honesty, and ethical standards that earn the trust of our clients and partners."
              delay={0.3}
            />
            <ValueCard
              icon={<PatientCentric />}
              title="Patient-Centric"
              description="We design our solutions with the ultimate goal of improving patient outcomes and experiences."
              delay={0.4}
            />
            <ValueCard
              icon={<Collaboration />}
              title="Collaboration"
              description="We believe in the power of teamwork and partnership with healthcare providers to create meaningful solutions."
              delay={0.5}
            />
            <ValueCard
              icon={<Security />}
              title="Security"
              description="We prioritize the protection of sensitive healthcare data with rigorous security measures and compliance standards."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4"
            >
              Meet Our Leadership Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              The visionaries behind MediSync
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="Dr. Alexandra Chen"
              title="Co-Founder & CEO"
              bio="Former cardiologist with 15 years of clinical experience and a passion for healthcare innovation."
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              delay={0.1}
            />
            <TeamMember
              name="Michael Rodriguez"
              title="Co-Founder & CTO"
              bio="Tech entrepreneur with previous successful exits in healthcare IT and artificial intelligence."
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              delay={0.2}
            />
            <TeamMember
              name="Dr. James Wilson"
              title="Chief Medical Officer"
              bio="Board-certified internist specializing in healthcare systems optimization and clinical workflows."
              image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              delay={0.3}
            />
            <TeamMember
              name="Sarah Johnson"
              title="Chief Product Officer"
              bio="Former UX director with expertise in creating intuitive interfaces for complex healthcare applications."
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              delay={0.4}
            />
            <TeamMember
              name="David Kim"
              title="Chief Revenue Officer"
              bio="Healthcare sales veteran with deep understanding of provider needs and market dynamics."
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              delay={0.5}
            />
            <TeamMember
              name="Dr. Olivia Martinez"
              title="VP of Clinical Affairs"
              bio="Practicing physician and healthcare policy expert focused on improving clinical outcomes through technology."
              image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              delay={0.6}
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
              Join the MediSync Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl mb-8 opacity-90"
            >
              Become part of a growing network of forward-thinking healthcare providers who are revolutionizing patient care through technology.
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
                Schedule a Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Value Card Component
interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
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
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </GlassCard>
    </motion.div>
  );
};

// Team Member Component
interface TeamMemberProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  delay?: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  title,
  bio,
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
      <GlassCard className="h-full overflow-hidden">
        <div className="aspect-w-3 aspect-h-2 w-full">
          <img src={image} alt={name} className="w-full h-64 object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">{title}</p>
          <p className="text-gray-600 dark:text-gray-300">{bio}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// Icon Components
const Innovation = () => <Lightbulb size={20} />;
const Excellence = () => <Award size={20} />;
const Integrity = () => <Shield size={20} />;
const PatientCentric = () => <Heart size={20} />;
const Collaboration = () => <Users size={20} />;
const Security = () => <Target size={20} />;

export default About;