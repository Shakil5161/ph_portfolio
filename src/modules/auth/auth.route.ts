import express from "express";
import { authController } from "./auth.controller";


const router = express.Router();

router.post("/login", authController.authLogin)

export const authRoute = router;