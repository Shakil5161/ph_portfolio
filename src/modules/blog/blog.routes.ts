import express from "express";
import { BlogController } from "./blog.controller";

const router = express.Router();


router.get("/", BlogController.getAllBlog)
router.get("/:id", BlogController.getBlogById)
router.get("/slug/:slug", BlogController.getBlogBySlug)
router.patch("/:id", BlogController.updateBlog);
router.delete("/:id", BlogController.deleteBlog);

router.post("/", BlogController.createBlog)

export const blogRoute = router;