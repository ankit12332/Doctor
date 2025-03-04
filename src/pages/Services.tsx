import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, BarChart3, Stethoscope, Clock, Shield, Check } from 'lucide-react';
import PricingCard from '../components/ui/PricingCard';
import FeatureCard from '../components/ui/FeatureCard';

const Services: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--primary-glow),_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--secondary-glow),_transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6"
            >
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">Services</span> & Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-700 dark:text-gray-300 mb-8"
            >
              Comprehensive solutions designed to transform your medical practice with cutting-edge technology and intuitive workflows.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              Core Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              Everything you need to streamline your practice and enhance patient care
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar size={24} />}
              title="Smart Scheduling"
              description="AI-powered appointment management system that optimizes your calendar, reduces no-shows, and maximizes practice efficiency."
              delay={0.1}
            />
            <FeatureCard
              icon={<Users size={24} />}
              title="Patient Management"
              description="Comprehensive patient profiles with medical history, treatment plans, and secure communication channels for better care coordination."
              delay={0.2}
            />
            <FeatureCard
              icon={<BarChart3 size={24} />}
              title="Advanced Analytics"
              description="Powerful insights into your practice performance with customizable dashboards and reports to make data-driven decisions."
              delay={0.3}
            />
            <FeatureCard
              icon={<Stethoscope size={24} />}
              title="Telehealth Integration"
              description="Seamless virtual consultations with integrated video conferencing, digital prescriptions, and remote monitoring capabilities."
              delay={0.4}
            />
            <FeatureCard
              icon={<Clock size={24} />}
              title="Automated Workflows"
              description="Streamline routine tasks with customizable automation to save time, reduce errors, and minimize administrative burden."
              delay={0.5}
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Security & Compliance"
              description="Enterprise-grade security with end-to-end encryption, comprehensive audit trails, and full HIPAA compliance for peace of mind."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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
              Flexible Pricing Plans
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              Choose the perfect plan for your practice size and needs
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Essential"
              price="$199"
              period="per month"
              description="Perfect for small practices just getting started with digital solutions."
              features={[
                { text: "Smart Scheduling", included: true },
                { text: "Basic Patient Management", included: true },
                { text: "Standard Reports", included: true },
                { text: "Email Support", included: true },
                { text: "Telehealth Integration", included: false },
                { text: "Advanced Analytics", included: false },
                { text: "Custom Workflows", included: false },
                { text: "Priority Support", included: false },
              ]}
              ctaText="Get Started"
              delay={0.1}
            />
            
            <PricingCard
              title="Professional"
              price="$399"
              period="per month"
              description="Ideal for established practices looking to optimize their operations."
              features={[
                { text: "Smart Scheduling", included: true },
                { text: "Advanced Patient Management", included: true },
                { text: "Custom Reports & Dashboards", included: true },
                { text: "Telehealth Integration", included: true },
                { text: "Basic Analytics", included: true },
                { text: "Standard Workflows", included: true },
                { text: "Phone & Email Support", included: true },
                { text: "API Access", included: false },
              ]}
              isPopular={true}
              ctaText="Get Started"
              delay={0.2}
            />
            
            <PricingCard
              title="Enterprise"
              price="$799"
              period="per month"
              description="Comprehensive solution for multi-provider practices and clinics."
              features={[
                { text: "Smart Scheduling", included: true },
                { text: "Advanced Patient Management", included: true },
                { text: "Custom Reports & Dashboards", included: true },
                { text: "Telehealth Integration", included: true },
                { text: "Advanced Analytics & AI", included: true },
                { text: "Custom Workflows", included: true },
                { text: "24/7 Priority Support", included: true },
                { text: "Full API Access", included: true },
              ]}
              ctaText="Get Started"
              delay={0.3}
            />
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Need a custom solution for your healthcare organization?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Contact Us for Custom Pricing
            </motion.button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
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
              Plan Comparison
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              Detailed feature comparison to help you choose the right plan
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-x-auto glass-card"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100/50 dark:bg-gray-800/50">
                  <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Features</th>
                  <th className="px-6 py-4 text-center text-gray-700 dark:text-gray-300 font-semibold">Essential</th>
                  <th className="px-6 py-4 text-center text-primary-600 dark:text-primary-400 font-semibold">Professional</th>
                  <th className="px-6 py-4 text-center text-gray-700 dark:text-gray-300 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <TableRow
                  feature="Providers"
                  essential="Up to 2"
                  professional="Up to 5"
                  enterprise="Unlimited"
                />
                <TableRow
                  feature="Patients"
                  essential="Up to 500"
                  professional="Up to 2,000"
                  enterprise="Unlimited"
                />
                <TableRow
                  feature="Appointment Scheduling"
                  essential="Basic"
                  professional="Advanced"
                  enterprise="Advanced + Custom Rules"
                />
                <TableRow
                  feature="Patient Portal"
                  essential="Basic"
                  professional="Advanced"
                  enterprise="Advanced + White Label"
                />
                <TableRow
                  feature="Telehealth"
                  essential="Not Included"
                  professional="Included"
                  enterprise="Included + Custom Branding"
                />
                <TableRow
                  feature="Analytics"
                  essential="Basic Reports"
                  professional="Custom Dashboards"
                  enterprise="AI-Powered Insights"
                />
                <TableRow
                  feature="Integrations"
                  essential="Limited"
                  professional="Standard"
                  enterprise="Full API Access"
                />
                <TableRow
                  feature="Support"
                  essential="Email Only"
                  professional="Email & Phone"
                  enterprise="24/7 Priority"
                />
                <TableRow
                  feature="Training"
                  essential="Documentation"
                  professional="2 Training Sessions"
                  enterprise="Unlimited Training"
                />
                <TableRow
                  feature="Data Storage"
                  essential="10GB"
                  professional="50GB"
                  enterprise="Unlimited"
                />
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400"
            >
              Common questions about our services and pricing
            </motion.p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <FAQItem
                question="How long does implementation take?"
                answer="Implementation typically takes 2-4 weeks depending on the size of your practice and the complexity of your needs. Our dedicated implementation team will guide you through every step of the process to ensure a smooth transition."
                delay={0.1}
              />
              <FAQItem
                question="Is my data secure and HIPAA compliant?"
                answer="Absolutely. MediSync is fully HIPAA compliant and employs enterprise-grade security measures including end-to-end encryption, regular security audits, and comprehensive access controls to protect your sensitive patient data."
                delay={0.2}
              />
              <FAQItem
                question="Can I integrate MediSync with my existing EHR system?"
                answer="Yes, MediSync is designed to integrate with most major EHR systems. Our Professional and Enterprise plans include standard integrations, and we can develop custom integrations for specific needs."
                delay={0.3}
              />
              <FAQItem
                question="Do you offer a free trial?"
                answer="We offer a 14-day free trial of our Professional plan so you can experience the full capabilities of MediSync before making a commitment. No credit card required to start your trial."
                delay={0.4}
              />
              <FAQItem
                question="Can I upgrade or downgrade my plan later?"
                answer="Yes, you can change your plan at any time. If you upgrade, the new features will be immediately available. If you downgrade, the changes will take effect at the start of your next billing cycle."
                delay={0.5}
              />
              <FAQItem
                question="What kind of support do you provide?"
                answer="All plans include access to our comprehensive knowledge base and community forum. The Essential plan includes email support, Professional adds phone support during business hours, and Enterprise includes 24/7 priority support with a dedicated account manager."
                delay={0.6}
              />
            </div>
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
              Ready to Transform Your Practice?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl mb-8 opacity-90"
            >
              Start your 14-day free trial today and experience the difference MediSync can make for your practice and patients.
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

// Table Row Component
interface TableRowProps {
  feature: string;
  essential: string;
  professional: string;
  enterprise: string;
}

const TableRow: React.FC<TableRowProps> = ({
  feature,
  essential,
  professional,
  enterprise,
}) => {
  return (
    <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">{feature}</td>
      <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">{essential}</td>
      <td className="px-6 py-4 text-center text-primary-600 dark:text-primary-400 font-medium">{professional}</td>
      <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">{enterprise}</td>
    </tr>
  );
};

// FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
  delay?: number;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  delay = 0,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Services;