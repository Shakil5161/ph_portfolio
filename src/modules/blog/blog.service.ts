import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import { generateSlug } from "../../utils/generateSlug";

export type CreateBlogPayload = Omit<Prisma.BlogCreateInput, 'author'> & {
  authorId: number;
};

export type UpdateBlogPayload = Partial<CreateBlogPayload>;


const createBlog = async (payload: CreateBlogPayload): Promise<Blog> => {

    const { title, content, excerpt, thumbnail, tags, isPublished, authorId } = payload;

     const slug = generateSlug(title);

    const existingBlog = await prisma.blog.findUnique({
        where: {
            slug
        }
    })

    if(existingBlog){
        throw new Error("Blog with this title already exists")
    }


    const createPost = await prisma.blog.create({
        data: {
            title,
            slug,
            content,
            excerpt: excerpt || content.substring(0, 150) + '....',
            thumbnail,
            tags: tags || [],
            isPublished: isPublished || false,
            author: {
                connect: { id: authorId }
            }
        },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                }
            }
        }
    })

    return createPost
}

const getAllBlog = async ({page, limit, search, isFeatured, tags, sortBy, sortOrder}: {page: number, limit: number, search?: string, isFeatured?: boolean, tags?: string[], sortBy?: string, sortOrder?: string}) => {

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

    const getAllPost = await prisma.blog.findMany({
        skip,
        take: limit,
        where,
        include:{
            author: {
                select: {
                    name: true,
                    email: true,
                }
            }
        },
        orderBy
    });

    const total = await prisma.blog.count({where})

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

const getBlogById =  async (id: string) => {

    return await prisma.$transaction(async (tx) => {
        await tx.blog.update({
            where: {id},
            data: {
                views: {
                    increment: 1
                }
            }
        })

        return await prisma.blog.findUnique({
            where: {
                id
            },
            include:{
                author: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
        })

    })

    
}

const getBlogBySlug = async (slug: string) => {

    return await prisma.$transaction(async(tx)=>{
        await tx.blog.update({
            where: {slug},
            data: {
                views:{
                    increment: 1
                }
            }
        })
        return await prisma.blog.findUnique({
            where: {
                slug
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })
    })
 
}

const updateBlog = async (id: string, payload: UpdateBlogPayload): Promise<Blog> => {
  const { title, ...rest } = payload;
  
  const data: Prisma.BlogUpdateInput = { ...rest };

  if (title) {
    data.slug = generateSlug(title);
    data.title = title;
  }

  const blog = await prisma.blog.update({
    where: { id },
    data,
    include: {
      author: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });

  return blog;
};

const deleteBlog = async (id: string) => {
    return await prisma.blog.delete({ where: { id } });
};

export const BlogService = {
    createBlog,
    getAllBlog,
    getBlogById,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
}