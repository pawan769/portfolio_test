import { ProjectTag } from "@/constants/tags";
export interface Project {
  id: string;
  title: string;
  description: string;
  coverUrl?: string; 
  repoUrl?: string; 
  liveUrl?: string; 
  tag: ProjectTag;
  createdAt: string;
  updatedAt: string;
}
