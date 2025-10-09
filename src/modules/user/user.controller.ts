import { Request, Response } from "express";
import { UserService } from "./user.service";

 

const createUser = async (req: Request, res: Response) => {
    try {
        
        const result = await UserService.createUser(req.body)
        res.status(201).send(result);

    } catch (error) {
        const err = error as Error;
        if (err.message === "User already exists") {
            return res.status(400).json({
                success: false,
                error: "User already exists",
                message: "A user with this email already exists. Please use a different email."
            });
        } 
        res.status(500).json({
            success: false,
            error: "Internal server error",
            message: err.message || "Something went wrong"
        });

    }
}



export const UserController = {
    createUser,
}