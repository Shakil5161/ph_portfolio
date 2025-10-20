// types/models.ts

export type UserRole = "OWNER" | "ADMIN";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  blogs?: IBlog[];
}

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  views: number;
  tags: string[];
  isPublished: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author?: IUser;
}

export interface IProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  featured: boolean;
  techStack: string[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  featured: boolean;
  techStack: string[];
  views: number;
}

export interface ProjectsSectionProps {
  projects: Project[];
  title?: string;
  description?: string;
  showFilters?: boolean;
}