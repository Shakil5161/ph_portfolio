"use server"

import { getUserSession } from "@/app/helpers/getUserSession"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export const createBlog = async(data: FormData) => {
    const blogInfo = Object.fromEntries(data.entries())
    
    const session = await getUserSession()
    
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    
    const payload = {
        title: blogInfo.title as string,
        content: blogInfo.content as string,
        excerpt: '', 
        thumbnail: blogInfo.thumbnail as string,
        tags: blogInfo.tags
  ? (blogInfo.tags as string).split(",").map((tag) => tag.trim())
  : [],
        isPublished: true, 
        authorId: Number(session.user.id), 
        isFeatured: blogInfo.isFeatured === 'true' 
    };
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${session.token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(payload) // Send as JSON
    });

    const result = await res.json();
    
    
    if(result.success){
        revalidateTag("BLOGS")
        revalidatePath("/blogs")
        redirect('/blogs')
    } else {
        throw new Error(result.error || "Failed to create blog");
    }
}