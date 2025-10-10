import express from "express";
import { authMiddleware } from "../../middleware/checkAuth";
import { BlogController } from "./blog.controller";

const router = express.Router();


router.get("/",  BlogController.getAllBlog)
router.get("/:id",  BlogController.getBlogById)
router.get("/slug/:slug",  BlogController.getBlogBySlug)
router.patch("/:id", authMiddleware, BlogController.updateBlog);
router.delete("/:id", authMiddleware, BlogController.deleteBlog);

router.post("/", authMiddleware, BlogController.createBlog)

export const blogRoute = router;