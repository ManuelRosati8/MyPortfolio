
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}