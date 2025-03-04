import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement>, MotionProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  ...props
}) => {
  return (
    <motion.div
      className={`glass-card ${hoverEffect ? 'hover:shadow-xl transition-all duration-300' : ''} ${className}`}
      whileHover={hoverEffect ? { y: -5 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;