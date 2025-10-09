
import { Router } from 'express';
import { ProjectController } from './project.controller';

const router = Router();


router.get('/', ProjectController.getAllProject); 
router.get('/slug/:slug', ProjectController.getProjectBySlug); 
router.post('/', ProjectController.createProject); 
router.put('/:id', ProjectController.updateProject); 
router.delete('/:id', ProjectController.deleteProject); 

export const projectRoutes = router;