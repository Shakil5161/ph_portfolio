// app/admin/blogs/edit/[id]/page.tsx
'use client';

import EditBlogForm from '@/components/modules/Blogs/EditBlogForm';
import { Button } from '@/components/ui/button';
import { getBlogById } from '@/services/BlogServices';
import { ArrowLeftIcon, Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {blogId} = params ;
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const result = await getBlogById(blogId as string)
        
        if (result.id) {
          setBlog(result);
        } else {
          setError(result.error || 'Failed to fetch blog');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

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
        <h1 className="text-2xl font-bold">Edit Blog</h1>
      </div>
      
      {blog && <EditBlogForm blog={blog} />}

    </div>
  );
}