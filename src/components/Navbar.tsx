import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Activity } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
}

const Navbar: React.FC<NavbarProps> = ({ }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 glass-card bg-white/70 dark:bg-gray-900/70'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Activity size={32} className="text-primary-500" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500"
            >
              MediSync
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/about" active={location.pathname === '/about'}>
              About Us
            </NavLink>
            <NavLink to="/services" active={location.pathname === '/services'}>
              Services & Pricing
            </NavLink>
            <NavLink to="/ai_agents" active={location.pathname === '/ai_agents'}>
              AI Agents
            </NavLink>
            {/* Direct Insights Link */}
            <NavLink 
              to="/insights" 
              active={location.pathname.startsWith('/insights')}
            >
              Insights
            </NavLink>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Get Started
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-card mt-2 mx-4 rounded-xl overflow-hidden"
        >
          <nav className="flex flex-col py-4">
            <MobileNavLink to="/" active={location.pathname === '/'}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/about" active={location.pathname === '/about'}>
              About Us
            </MobileNavLink>
            <MobileNavLink to="/services" active={location.pathname === '/services'}>
              Services & Pricing
            </MobileNavLink>
            <MobileNavLink to="/ai_agents" active={location.pathname === '/ai_agents'}>
              AI Agents
            </MobileNavLink>
            {/* Direct Insights Link */}
            <MobileNavLink to="/insights" active={location.pathname.startsWith('/insights')}>
              Insights
            </MobileNavLink>
            <div className="px-4 pt-4">
              <button className="w-full btn-primary">Get Started</button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`relative font-medium transition-colors duration-300 ${
        active
          ? 'text-primary-600 dark:text-primary-400'
          : 'text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400'
      }`}
    >
      {children}
      {active && (
        <motion.span
          layoutId="navbar-indicator"
          className="absolute bottom-[-5px] left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`py-3 px-4 font-medium transition-colors duration-300 ${
        active
          ? 'bg-primary-50/10 text-primary-600 dark:text-primary-400'
          : 'text-gray-700 dark:text-gray-200'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;