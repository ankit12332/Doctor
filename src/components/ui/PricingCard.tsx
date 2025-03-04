import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  ctaText?: string;
  ctaAction?: () => void;
  delay?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  isPopular = false,
  ctaText = 'Get Started',
  ctaAction = () => {},
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative h-full"
    >
      <div
        className={`h-full glass-card overflow-hidden ${
          isPopular ? 'border-2 border-primary-500 shadow-neon' : ''
        }`}
      >
        {isPopular && (
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs font-semibold px-4 py-1 transform rotate-45 translate-x-[30%] translate-y-[40%] shadow-md">
              Popular
            </div>
          </div>
        )}
        
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="mb-4">
            <span className="text-3xl md:text-4xl font-bold">{price}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">{period}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
          
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span
                  className={`mr-2 mt-1 ${
                    feature.included
                      ? 'text-accent-500'
                      : 'text-gray-400'
                  }`}
                >
                  <Check size={16} />
                </span>
                <span
                  className={
                    feature.included
                      ? 'text-gray-700 dark:text-gray-200'
                      : 'text-gray-400 dark:text-gray-500 line-through'
                  }
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={ctaAction}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              isPopular
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {ctaText}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingCard;