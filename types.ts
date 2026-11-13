
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
  videoPosterDark?: string;
  videoPosterLight?: string;
  liveUrl?: string;
  repoUrl?: string;
}