import { Request, Response } from "express";
import { BlogService } from "./blog.service";


const createBlog = async (req: Request, res: Response) => {

    try{
        const result = await BlogService.createBlog(req.body)
        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: result
        });
    }
     catch (error) {
          if (error instanceof Error) {
            if (error.message === "Blog with this title already exists") {
                return res.status(400).json({
                success: false,
                error: error.message
                });
            }
            
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}

const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await BlogService.updateBlog(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Record not found to update')) {
        return res.status(404).json({
          success: false,
          error: 'Blog not found'
        });
      }
      
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
    try {
        await BlogService.deleteBlog(String(req.params.id));
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        if (error instanceof Error) {
            
            if (error.message.includes('Record to delete does not exist')) {
                return res.status(404).json({
                    success: false,
                    error: 'Blog not found'
                });
            }
            
                return res.status(500).json({
                    success: false,
                    error: error.message
                });
        }
        
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

const getAllBlog = async (req: Request, res: Response) => {

    try{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 24
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;

        const tags = req.query.tags ? (req.query.tags as string).split(',') : []
        const sortBy = (req.query.sortBy as string) || '';
        const sortOrder = (req.query.sortOrder as string) || ''

        const result = await BlogService.getAllBlog({page, limit, search, isFeatured, tags, sortBy, sortOrder})
        res.status(201).send(result)
    }
     catch (error) {
        res.status(500).send(error)
    }
}

const getBlogById = async (req: Request, res: Response) => { 
    
    try {
        const result = await BlogService.getBlogById(String(req.params.id))
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
    
}
const getBlogBySlug = async (req: Request, res: Response) => { 
    
    try {
        const { slug } = req.params
        console.log(slug, 'slug')
        const result = await BlogService.getBlogBySlug(String(slug));
        if(!result){
            return res.status(404).json({
                success: false,
                error: "Blog Not Found"
            })
        }

        res.status(201).send({
            success: true,
            message: "Blog fetched successfully",
            data: result
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
            
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
    
}



export const BlogController = {
    createBlog,
    getAllBlog,
    getBlogById,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
}