import { IProject } from "@/types";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`,{
            cache: "no-store"
        })

        const {data: projects} = await res.json();
        return projects;
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function getProject(slug: string): Promise<IProject> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/slug/${slug}`, {
    next: { revalidate: 60 } // ISR: revalidate every 60 seconds
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  return data.data;
  
}