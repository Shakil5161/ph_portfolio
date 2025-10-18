"use server";

import { getUserSession } from "@/app/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteBlog = async (id: string) => {
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