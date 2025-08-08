import React from 'react';
import { motion } from 'framer-motion';

interface SocialIconProps {
  icon: React.ElementType;
  href: string;
}

const MotionA = motion.a;

const SocialIcon = ({ icon: Icon, href }: SocialIconProps) => {
  return (
    <MotionA
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-400 hover:text-orange-500"
      whileHover={{ y: -3, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Icon size={28} />
    </MotionA>
  );
};

export default SocialIcon;