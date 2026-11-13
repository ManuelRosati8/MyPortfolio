import React from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';
import { Project } from '../../types';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../i18n/useTranslation';

interface ProjectCardProps {
  project: Project;
  index?: number;
  total?: number;
}

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
  const { t } = useT();
  const { theme } = useTheme();

  const title = t(`project.${project.id}.title`);
  const description = t(`project.${project.id}.description`);
  const longDescription = t(`project.${project.id}.longDescription`);
  const poster = theme === 'dark' ? project.videoPosterDark : project.videoPosterLight;
  const displayIndex = String((index ?? project.id - 1) + 1).padStart(2, '0');
  const displayTotal = total ? String(total).padStart(2, '0') : null;

  return (
    <article className="group relative flex min-h-[calc(100svh-9rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-300/40 transition-colors duration-300 hover:border-orange-500/50 dark:border-neutral-800 dark:bg-[#0b0b0b] dark:shadow-black/70 dark:hover:border-orange-500/50 md:min-h-[34rem]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/[0.07] via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex flex-1 flex-col p-5 sm:p-7 md:p-9">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded bg-orange-500/10 px-2 py-0.5 font-mono text-xs text-orange-500">
                {String(project.id).padStart(2, '0')}
              </span>
              {project.liveUrl && (
                <span className="rounded bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                  {t('card.live')}
                </span>
              )}
            </div>
            <h3 className="text-balance text-xl font-bold leading-tight text-neutral-900 transition-colors duration-300 group-hover:text-orange-500 dark:text-white dark:group-hover:text-orange-400 sm:text-2xl md:text-3xl">
              {title}
            </h3>
          </div>
          <span className="hidden shrink-0 text-right font-mono sm:block">
            <span className="block text-5xl font-black leading-none text-neutral-100 dark:text-neutral-900">
              {displayIndex}
            </span>
            {displayTotal && (
              <span className="mt-1 block text-[10px] tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                / {displayTotal}
              </span>
            )}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-base">
          {description}
        </p>

        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start">
          <p className="min-w-0 flex-1 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-sm">
            {longDescription}
          </p>

          {project.videoUrl && (
            <div className="w-full shrink-0 lg:w-[22rem] xl:w-[24rem]">
              <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-orange-500">
                <Play size={11} />
                {t('card.demo')}
              </div>
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-black shadow-lg shadow-neutral-300/40 dark:border-neutral-700 dark:shadow-black/50">
                <video
                  src={project.videoUrl}
                  poster={poster}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`${t('card.demo')} ${title}`}
                  className="block h-auto w-full"
                >
                  {t('card.videoFallback')}
                </video>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-neutral-100 px-2 py-1 font-mono text-[11px] text-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-orange-700"
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
                  className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                  <Github size={14} />
                  {t('card.repository')}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
