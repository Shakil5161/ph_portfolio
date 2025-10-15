"use server"

import { getUserSession } from "@/app/helpers/getUserSession"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export const create = async(data: FormData) => {
    const blogInfo = Object.fromEntries(data.entries())
    const session = await getUserSession()
    const modifiedData = {
        ...blogInfo,
        tags: blogInfo.tags.toString().split(",").map((tag) => tag.trim()),
        authorId: session?.user?.id,
        isFeatured: Boolean(blogInfo.isFeatured)
    }
    console.log(modifiedData)


     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`,{
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(modifiedData)
     })

     const result = await res.json();

     if(result.id){
        revalidateTag("BLOGS")
        revalidatePath("/blogs")
        redirect('/')
     }

}


