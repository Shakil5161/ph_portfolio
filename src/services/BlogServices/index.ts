"use server"
import { getUserSession } from "@/app/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const getBlogById = async (blogId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogId}`);
    return await res.json();
}

export const deleteBlogById = async (id: string) => {
    try {
        const session = await getUserSession()

        if(!session?.token){
            throw new Error("Authentication required")
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session.token}`
            }
        })

        const result = await res.json();
        if(result.success){
            revalidateTag("BLOGS");
            revalidatePath("/blogs");
            revalidatePath("/dashboard/all-blog");
            return { success: true, message: result.message } 
        } else {
            throw new Error(result.error || "Failed to delete blog") 

        }

    } catch (error: any) {
        console.error('Delete blog error:', error);
        return { success: false, error: error.message };
    }
}

export async function updateBlog(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });
    
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true, 
        data: data.data,
        message: 'Blog updated successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: data.error || 'Failed to update blog' },
        { status: response.status }
      );
    }
    
  } catch (error: any) {
    console.error('Blog update error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}