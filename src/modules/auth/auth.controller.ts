import { Request, Response } from "express";
import { AuthService } from "./auth.service";


const authLogin = async (req: Request, res: Response) => {
    try {
        
        const result = await AuthService.authLogin(req.body)
        res.status(201).send(result)
    } catch (error) {
         res.status(500).send(error)
    }
}

export const authController = {
    authLogin   
}