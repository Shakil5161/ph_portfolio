"use server";

import { getUserSession } from "@/app/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const updateBlog = async (data: FormData) => {
  const blogInfo = Object.fromEntries(data.entries());
  const session = await getUserSession();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const payload = {
    title: blogInfo.title as string,
    content: blogInfo.content as string,
    excerpt: "",
    thumbnail: blogInfo.thumbnail as string,
    tags: blogInfo.tags
      ? (blogInfo.tags as string).split(",").map((tag) => tag.trim())
      : [],
    isPublished: true,
  };


  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogInfo.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();
   

    if (result.success) {
      revalidateTag("BLOGS");
      revalidatePath("/blogs");
      redirect("/dashboard/all-blog");
    } else {
      throw new Error(result.error || "Failed to update blog");
    }
  } 
  
  catch (err: any) {
    
    if (err.message?.includes('NEXT_REDIRECT')) {
      throw err; // Re-throw redirect errors
    }
    throw new Error(err.message || "Failed to update blog");
  }
};
