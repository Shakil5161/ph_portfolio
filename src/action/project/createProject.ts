"use server"

import { getUserSession } from "@/app/helpers/getUserSession"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export const createProject = async(data: FormData) => {
    const projectInfo = Object.fromEntries(data.entries())
    
    const session = await getUserSession()
    
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }


    let techStack: string[] = [];
    try {
        techStack = JSON.parse(projectInfo.techStack as string) || [];
    } catch (error) {
        console.error("Error parsing techStack:", error);
        techStack = [];
    }

    const payload = {
        title: projectInfo.title as string,
        description: projectInfo.content as string, 
        image: projectInfo.image as string, 
        liveUrl: projectInfo.liveUrl as string || null,
        githubUrl: projectInfo.githubUrl as string || null,
        videoUrl: projectInfo.videoUrl as string || null,
        featured: projectInfo.featured === 'true', 
        techStack: techStack, 
    };

    

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${session.token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();
    
    
    if(result.success){
        revalidateTag("PROJECT")
        revalidatePath("/project")
        redirect('/project')
    } else {
        throw new Error(result.error || "Failed to create project");
    }
}