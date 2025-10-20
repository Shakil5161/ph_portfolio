// components/ProjectsSection.tsx
import { ProjectsSectionProps } from '@/types';
import ProjectCard from './ProjectCard';


export default function ProjectsSection({ 
  projects, 
  title = "My Projects", 
  description = "Here are some of the projects I've worked on",
  showFilters = true 
}: ProjectsSectionProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Projects Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Projects will be displayed here once they're added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}