
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

const Section = ({ children, id, className = '' }: SectionProps) => {
  return (
    <motion.section
      id={id}
      className={`container mx-auto px-6 py-14 md:py-20 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
};

export default Section;