
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';
import { ChevronDown, ExternalLink, Github } from 'lucide-react';
import { useT } from '../i18n/useTranslation';

interface ProjectCardProps {
  project: Project;
}

const MotionDiv = motion.div;
const MotionButton = motion.button;

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useT();

  const title = t(`project.${project.id}.title`);
  const description = t(`project.${project.id}.description`);
  const longDescription = t(`project.${project.id}.longDescription`);

  return (
    <MotionDiv
      layout
      className="relative border rounded-xl overflow-hidden backdrop-blur-sm hover:border-orange-500/40 transition-colors duration-300 cursor-pointer group"
      style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border-subtle)' }}
      onClick={() => setExpanded(!expanded)}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">
                {String(project.id).padStart(2, '0')}
              </span>
              {project.liveUrl && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded uppercase tracking-wider">
                  {t('card.live')}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold group-hover:text-orange-400 transition-colors duration-300 truncate" style={{ color: 'var(--color-text)' }}>
              {title}
            </h3>
            <p className="text-sm mt-1.5 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
              {description}
            </p>
          </div>
          <MotionButton
            className="flex-shrink-0 mt-1 transition-colors group-hover:text-orange-500"
            style={{ color: 'var(--color-text-secondary)' }}
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <ChevronDown size={20} />
          </MotionButton>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2 py-0.5 rounded"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0" style={{ borderTopColor: 'var(--color-border-subtle)' }}>
              <div className="pt-4">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {longDescription}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                      {t('card.liveDemo')}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors border"
                      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-secondary)', borderColor: 'var(--color-border-subtle)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={14} />
                      {t('card.repository')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
};

export default ProjectCard;
