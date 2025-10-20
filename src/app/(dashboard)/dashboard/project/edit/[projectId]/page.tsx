
'use client';

import { getProject } from '@/app/api/project/route';
import EditProjectForm from '@/components/modules/Project/EditProjectForm';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {projectId} = params
console.log(params, 'params')
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const result = await getProject(projectId as string)
        
        console.log( result, 'result', )
        if (result.id) {
          setProject(result);
        } else {
          setError( 'Failed to fetch project');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeftIcon size={16} className="mr-2" />
            Back
          </Button>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeftIcon size={16} className="mr-2" />
            Back
          </Button>
        </div>
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeftIcon size={16} className="mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Project</h1>
      </div>
      
      {project && <EditProjectForm project={project} />}

    </div>
  );
}