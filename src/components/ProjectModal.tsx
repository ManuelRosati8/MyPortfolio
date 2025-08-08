import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';
import { X, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <AnimatePresence>
      {project && (
        <MotionDiv
          className="fixed inset-0 bg-orange-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <MotionDiv
            layoutId={`card-container-${project.id}`}
            className="bg-orange-950 rounded-lg overflow-hidden w-full max-w-3xl border border-orange-800/50 shadow-2xl shadow-orange-500/20"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="w-full h-64 bg-white flex items-center justify-center">
                <span className="text-9xl font-bold text-black select-none">{project.id}.</span>
              </div>
              <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white hover:bg-orange-500 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-8">
              <MotionH2 className="text-3xl font-bold text-white mb-2">{project.title}</MotionH2>
              <MotionDiv className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-black/40 text-orange-200 text-xs font-mono px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </MotionDiv>
              <MotionP className="text-neutral-200 mb-6">{project.longDescription}</MotionP>
              <MotionDiv className="flex items-center gap-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors font-semibold">
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
                {!project.liveUrl && (
                    <span className="text-sm text-neutral-500 italic">
                      Dettagli disponibili su richiesta.
                    </span>
                  )}
              </MotionDiv>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;