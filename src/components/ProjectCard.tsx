import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onCardClick: (project: Project) => void;
}

const MotionDiv = motion.div;
const MotionH3 = motion.h3;

const ProjectCard = ({ project, onCardClick }: ProjectCardProps) => {
  return (
    <MotionDiv
      layoutId={`card-container-${project.id}`}
      onClick={() => onCardClick(project)}
      className="bg-orange-600 rounded-lg overflow-hidden cursor-pointer group border border-orange-700 hover:border-orange-400 transition-colors duration-300 relative"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-8xl font-bold text-black select-none">{project.id}.</span>
        </div>
      </div>
      <div className="p-6">
        <MotionH3 className="text-xl font-bold text-white mb-2">{project.title}</MotionH3>
        <p className="text-orange-100 mb-4 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-black/20 text-white text-xs font-mono px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
       <div className="absolute top-4 right-4 bg-black/25 rounded-full p-2 translate-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight className="text-white" size={20} />
      </div>
    </MotionDiv>
  );
};

export default ProjectCard;