
import { Prisma, Project } from "@prisma/client";
import { prisma } from "../../config/db";
import { generateSlug } from "../../utils/generateSlug";

// Types
export type CreateProjectPayload = Omit<Prisma.ProjectCreateInput, 'slug'> & {
  techStack?: string[];
};

export type UpdateProjectPayload = Partial<CreateProjectPayload>;


const createProject = async (payload: CreateProjectPayload): Promise<Project> => {
  const { title, description, content, image, liveUrl, githubUrl, videoUrl, featured, techStack } = payload;

  const slug = generateSlug(title);

  const existingProject = await prisma.project.findUnique({
    where: { slug }
  });

  if (existingProject) {
    throw new Error("Project with this title already exists");
  }

  const project = await prisma.project.create({
    data: {
      title,
      slug,
      description,
      content: content || '',
      image,
      liveUrl,
      githubUrl,
      videoUrl,
      featured: featured || false,
      techStack: techStack || []
    }
  });

  return project;
};

const getAllProject = async ({page, limit, search, isFeatured, tags, sortBy, sortOrder}: {page: number, limit: number, search?: string, isFeatured?: boolean, tags?: string[], sortBy?: string, sortOrder?: string}) => {

    const skip = (page - 1) * limit

    const where: any = {
        AND : [
            search && {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { content: { contains: search, mode: "insensitive" } },
                ]
            },
            typeof isFeatured === "boolean" && {isFeatured},
            (tags &&  tags.length > 0) && {tags: {hasEvery: tags}}
        ].filter(Boolean)
    }

 
  const allowedSortFields = ["title", "createdAt", "updatedAt", "isFeatured"];
  const validSortBy = allowedSortFields.includes(sortBy as string) ? sortBy : "createdAt";
  const validSortOrder = sortOrder === "asc" ? "asc" : "desc";

  const orderBy = {
    [validSortBy as string]: validSortOrder
  };

    const getAllPost = await prisma.project.findMany({
        skip,
        take: limit,
        where,
        orderBy
    });

    const total = await prisma.project.count({where})

    return {
        data: getAllPost,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total/limit)
        }
    }
}

const getProjectBySlug = async (slug: string) => {
    
    return await prisma.$transaction(async(tx)=>{
        await tx.project.update({
            where: {slug},
            data: {
                views:{
                    increment: 1
                }
            }
        })
        return await prisma.project.findUnique({
            where: {
                slug
            }
        })
    })
 
}

const updateProject = async (id: string, payload: UpdateProjectPayload): Promise<Project> => {
  const { title, ...rest } = payload;
  
  const data: Prisma.ProjectUpdateInput = { ...rest };

  // Regenerate slug if title is being updated
  if (title) {
    data.slug = generateSlug(title);
    data.title = title;
  }

  const project = await prisma.project.update({
    where: { id },
    data
  });

  return project;
};

const deleteProject = async (id: string): Promise<Project> => {
  const project = await prisma.project.delete({
    where: { id }
  });

  return project;
};

export const ProjectService = {
  createProject,
  getAllProject,
  getProjectBySlug,
  updateProject,
  deleteProject
};