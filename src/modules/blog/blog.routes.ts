import express from "express";
import { PostController } from "./blog.controller";

const router = express.Router();


router.get("/", PostController.getAllBlog)
router.get("/:id", PostController.getBlogById)
router.get("/slug/:slug", PostController.getBlogBySlug)
router.patch("/:id", PostController.updateBlog);
router.delete("/:id", PostController.deleteBlog);

router.post("/", PostController.createBlog)

export const blogRoute = router;