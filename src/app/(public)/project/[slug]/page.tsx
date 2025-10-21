// app/projects/[slug]/page.tsx
import { getProject } from '@/app/api/project/route';
import LexicalRenderer from '@/components/modules/RichTextEditor/LexicalRenderer';
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Eye,
  Github,
  Play
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
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
  views: number;
  createdAt: string;
  updatedAt: string;
}



export default async function ProjectDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
    console.log(params.slug, 'params.slug',params)
  const project = await getProject(params.slug);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/project"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Project Image/Video */}
          <div className="relative">
            {project.videoUrl ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                <video
                  src={project.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                  poster={project.image}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ) : project.image ? (
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </div>
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-xl font-bold">{project.title}</p>
                </div>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            {/* Featured Badge */}
            {project.featured && (
              <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ Featured Project
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>

            {/* Description */}
            
             <LexicalRenderer content={project.description} />

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>
                  {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{project.views} views</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Github size={20} />
                  Source Code
                </a>
              )}
              
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Play size={20} />
                  Watch Video
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Content */}
        {project.content && (
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>Project Details</h2>
              <div 
                dangerouslySetInnerHTML={{ __html: project.content }}
                className="project-content"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// // Generate static paths for ISR
// export async function generateStaticParams() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`, {
//     next: { revalidate: 3600 } // Revalidate every hour
//   });
  
//   if (!res.ok) {
//     return [];
//   }
  
//   const data = await res.json();
//   const projects = data.data || [];
  
//   return projects.map((project: Project) => ({
//     slug: project.slug,
//   }));
// }

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  
  return {
    title: `${project.title} | Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
      type: 'website',
    },
  };
}