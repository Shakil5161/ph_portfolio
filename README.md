🚀 Portfolio Backend API Documentation
📋 Table of Contents
Overview

Tech Stack

Project Structure

API Endpoints

Authentication

Models & Schemas

Environment Variables

Installation & Setup

Deployment

🌟 Overview
A robust backend API for a modern portfolio website built with Node.js, Express, and PostgreSQL. This API powers the portfolio frontend with features for project management, blog posts, authentication, and contact form handling.

🛠 Tech Stack
Backend
Node.js - Runtime environment

Express.js - Web framework

TypeScript - Type safety

PostgreSQL - Database

Prisma - ORM

JWT - Authentication

bcrypt - Password hashing

Nodemailer - Email service

Cloudinary - Image upload

DevOps & Tools
Docker - Containerization

Redis - Caching & Sessions

Jest - Testing

Swagger - API Documentation

PM2 - Process management

📁 Project Structure
text
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   └── config/          # Configuration files
├── prisma/
│   └── schema.prisma    # Database schema
├── tests/               # Test suites
├── docs/                # API documentation
└── uploads/             # File uploads directory
🔌 API Endpoints
🔐 Authentication Routes
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	User registration	No
POST	/api/auth/login	User login	No
POST	/api/auth/logout	User logout	Yes
GET	/api/auth/me	Get current user	Yes
PUT	/api/auth/profile	Update profile	Yes
📂 Projects Routes
Method	Endpoint	Description	Auth Required
GET	/api/projects	Get all projects	No
GET	/api/projects/:id	Get single project	No
GET	/api/projects/featured	Get featured projects	No
POST	/api/projects	Create project	Yes
PUT	/api/projects/:id	Update project	Yes
DELETE	/api/projects/:id	Delete project	Yes
PUT	/api/projects/:id/views	Increment views	No
📝 Blog Routes
Method	Endpoint	Description	Auth Required
GET	/api/blogs	Get all blog posts	No
GET	/api/blogs/:slug	Get blog by slug	No
GET	/api/blogs/popular	Get popular posts	No
POST	/api/blogs	Create blog post	Yes
PUT	/api/blogs/:id	Update blog post	Yes
DELETE	/api/blogs/:id	Delete blog post	Yes
PUT	/api/blogs/:id/views	Increment views	No
📧 Contact Routes
Method	Endpoint	Description	Auth Required
POST	/api/contact	Send contact message	No
GET	/api/contact/messages	Get all messages	Yes
PUT	/api/contact/messages/:id	Update message status	Yes
🖼 Upload Routes
Method	Endpoint	Description	Auth Required
POST	/api/upload/image	Upload image	Yes
POST	/api/upload/video	Upload video	Yes
DELETE	/api/upload/:publicId	Delete file	Yes
🔑 Authentication
JWT Token Flow
Login: User provides credentials → Returns JWT token

Protected Routes: Include token in Authorization: Bearer <token> header

Middleware: Verifies token validity on each request

Refresh: Implement refresh token mechanism for security

Example Request
javascript
// Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
🗄 Models & Schemas
User Model
prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  role      UserRole @default(USER)
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  projects Project[]
  blogs    Blog[]
}

enum UserRole {
  USER
  ADMIN
}
Project Model
prisma
model Project {
  id          Int      @id @default(autoincrement())
  title       String
  slug        String   @unique
  description String
  content     String?  // Rich text content
  image       String?
  liveUrl     String?
  githubUrl   String?
  videoUrl    String?
  featured    Boolean  @default(false)
  techStack   String[] // Array of technologies
  views       Int      @default(0)
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
Blog Model
prisma
model Blog {
  id          Int      @id @default(autoincrement())
  title       String
  slug        String   @unique
  content     String   // Rich text content
  excerpt     String?
  thumbnail   String?
  tags        String[]
  views       Int      @default(0)
  published   Boolean  @default(true)
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
}
⚙ Environment Variables
Create a .env file in the root directory:

env
# Server Configuration
NODE_ENV=development
PORT=5000
BASE_URL=http://localhost:3000
API_URL=http://localhost:5000/api

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d

# Email Service (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Redis (Caching)
REDIS_URL=redis://localhost:6379

# CORS
FRONTEND_URL=http://localhost:3000
🚀 Installation & Setup
Prerequisites
Node.js (v18 or higher)

PostgreSQL

Redis (optional, for caching)

Installation Steps
Clone the repository

bash
git clone https://github.com/yourusername/portfolio-backend.git
cd portfolio-backend
Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.example .env
# Edit .env with your configuration
Set up database

bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database (optional)
npx prisma db seed
Start development server

bash
# Development
npm run dev

# Production
npm start

# With PM2
npm run pm2:start
Docker Setup
bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
🧪 Testing
bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e

# Run specific test file
npm test -- controllers/auth.test.js
📊 API Response Format
Success Response
javascript
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
Error Response
javascript
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": ["Email is required", "Password must be 6 characters"]
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
🔒 Security Features
JWT Authentication with secure token handling

Password Hashing using bcrypt

CORS configuration for frontend communication

Rate Limiting on authentication endpoints

Input Validation with Joi/Yup

SQL Injection Prevention with Prisma

XSS Protection with helmet middleware

Environment Variable Security

🚢 Deployment
Production Build
bash
# Build the project
npm run build

# Start production server
npm start
PM2 Ecosystem
javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'portfolio-api',
    script: 'dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
Environment Checklist
Set NODE_ENV=production

Configure production database

Set up SSL certificate

Configure reverse proxy (Nginx)

Set up monitoring and logging

Configure backup strategy

📈 Performance Optimization
Database Indexing on frequently queried fields

Query Optimization with Prisma

Redis Caching for frequent requests

Image Compression with Cloudinary

Pagination on list endpoints

Compression with gzip

🤝 Contributing
Fork the repository

Create feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

🆘 Support
For support, email shakilahmed5161@gmail.com or create an issue in the repository.

Built with ❤️ by Shakil Ahmed

# To see all the data in my neon database
npx prisma studio

# Push schema to Neon
npx prisma db push

# Build and deploy
vercel --prod

