"use server";

import { getUserSession } from "@/app/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteProject = async (id: string) => {
    try {
        const session = await getUserSession()

        if(!session?.token){
            throw new Error("Authentication required")
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session.token}`
            }
        })

        const result = await res.json();
        if(result.success){
            revalidateTag("PROJECT")
            revalidatePath("/project")
            return { success: true, message: result.message } 
        } else {
            throw new Error(result.error || "Failed to delete blog") 

        }

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('Delete blog error:', error);
        return { success: false, error: message };
    }
}