
import ProjectsSection from "@/components/modules/Project/ProjectsSection";


interface Project {
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

async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`, {
    next: { revalidate: 60 } // ISR: revalidate every 60 seconds
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.data || [];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            My Projects
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto">
            Explore my portfolio of web applications, tools, and creative solutions
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <ProjectsSection 
        projects={projects}
        title="Featured Work"
        description="A collection of projects I've built using modern technologies and best practices"
      />
    </main>
  );
}

export const metadata = {
  title: 'My Projects',
  description: 'Explore my portfolio of web applications and projects',
};