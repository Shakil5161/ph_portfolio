import { Request, Response } from "express";
import { AuthService } from "./auth.service";


const authLogin = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.authLogin(req.body);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid email or password") {
        return res.status(401).json({
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

export const authController = {
    authLogin   
}