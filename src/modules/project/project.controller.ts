
import { Request, Response } from 'express';
import { ProjectService } from './project.service';
// Create Project
const createProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectService.createProject(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Project with this title already exists") {
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
};

const getAllProject = async (req: Request, res: Response) => {

    try{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 24
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;

        const tags = req.query.tags ? (req.query.tags as string).split(',') : []
        const sortBy = (req.query.sortBy as string) || '';
        const sortOrder = (req.query.sortOrder as string) || ''

        const result = await ProjectService.getAllProject({page, limit, search, isFeatured, tags, sortBy, sortOrder})
        res.status(201).send(result)
    }
     catch (error) {
        res.status(500).send(error)
    }
}
const getProjectBySlug = async (req: Request, res: Response) => { 
    
    try {
        const { slug } = req.params;
        
        const result = await ProjectService.getProjectBySlug(String(slug));
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
const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await ProjectService.updateProject(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Record to update not found')) {
        return res.status(404).json({
          success: false,
          error: 'Project not found'
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

const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ProjectService.deleteProject(id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Record to delete does not exist')) {
        return res.status(404).json({
          success: false,
          error: 'Project not found'
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

export const ProjectController = {
  createProject,
  getAllProject,
  getProjectBySlug,
  updateProject,
  deleteProject 
};