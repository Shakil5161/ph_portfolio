import compression from "compression";
import cors from "cors";
import express from "express";
import { authRoute } from "./modules/auth/auth.route";
import { blogRoute } from "./modules/blog/blog.routes";
import { projectRoutes } from "./modules/project/project.routes";
import { userRoute } from "./modules/user/user.routes";

const app = express();


// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",  
    "https://my-portfolio-jet-rho-49.vercel.app/",
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors()); 
app.use(compression()); 
app.use(express.json()); 

app.use(cors(corsOptions)); 

app.use("/api/v1/user", userRoute)

app.use("/api/v1/blog", blogRoute)

app.use("/api/v1/project", projectRoutes)

app.use("/api/v1/auth", authRoute);

app.get("/", (_req, res) => {
  res.send("Portfolio API is running");
});


app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
