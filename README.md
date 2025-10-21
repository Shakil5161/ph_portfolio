🌟 Overview
A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features stunning animations, interactive elements, and a fully functional dashboard for content management.

🛠 Tech Stack
Frontend Framework
Next.js 14 - React framework with App Router

TypeScript - Type safety and better development experience

React 18 - UI library with latest features

Styling & UI
Tailwind CSS - Utility-first CSS framework

shadcn/ui - Reusable component library

Framer Motion - Advanced animations

Lucide React - Beautiful icons

State Management & Data Fetching
React Hook Form - Form handling and validation

Zod - Schema validation

TanStack Query - Server state management

SWR - Data fetching (alternative)

Authentication
NextAuth.js - Complete authentication solution

JWT - Token-based authentication

Content Management
Lexical - Rich text editor

React Quill - Alternative rich text editor

Cloudinary - Image and video management

Development Tools
ESLint - Code linting

Prettier - Code formatting

Husky - Git hooks

📁 Project Structure
text
portfolio-frontend/
├── app/                    # App Router directory
│   ├── (auth)/            # Auth group routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/       # Dashboard group routes
│   │   ├── all-blog/
│   │   ├── create-blog/
│   │   ├── all-project/
│   │   └── create-project/
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   └── shared/            # Shared components
├── lib/                   # Utility libraries
│   ├── utils.ts           # Utility functions
│   ├── auth.ts            # Auth configuration
│   └── validations.ts     # Form validations
├── hooks/                 # Custom React hooks
├── services/              # API service functions
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── styles/                # Additional styles
🚀 Pages & Routes
Public Routes
Page	Route	Description
Home	/	Hero banner, skills, projects, blog
About	/about	Personal introduction and experience
Projects	/projects	Project showcase with filtering
Blog	/blog	Blog posts listing
Contact	/contact	Contact form and information
Project Detail	/projects/[slug]	Individual project details
Blog Detail	/blog/[slug]	Individual blog post
Authentication Routes
Page	Route	Description
Login	/login	User authentication
Register	/register	User registration
Dashboard Routes (Protected)
Page	Route	Description
Dashboard Home	/dashboard	Overview and statistics
All Projects	/dashboard/all-project	Project management
Create Project	/dashboard/create-project	Project creation form
All Blogs	/dashboard/all-blog	Blog post management
Create Blog	/dashboard/create-blog	Blog creation form
🧩 Components Architecture
Layout Components
typescript
// Root layout structure
<RootLayout>
  <Navbar />
  <Sidebar /> // Dashboard only
  <MainContent>
    {children}
  </MainContent>
  <Footer />
</RootLayout>
Key Components
HeroBanner
Purpose: Main landing section with animated elements

Features:

3D cursor animations

Text rotation effects

Gradient backgrounds

Interactive buttons

SkillsGalaxy
Purpose: Interactive skills visualization

Features:

3D orbiting skills

Hover interactions

Animated connections

ProjectTable & BlogTable
Purpose: Data tables for dashboard

Features:

Sorting and filtering

Pagination

Bulk actions

Responsive design

Rich Text Editors
LexicalEditor: Advanced rich text editing

ReactQuill: Alternative rich text editor

🔐 Authentication Flow
Client-Side Authentication
typescript
// Using NextAuth.js
const { data: session, status } = useSession();

// Protected route example
if (status === "loading") return <LoadingSpinner />;
if (status === "unauthenticated") redirect("/login");

// Sign out handling
const handleSignOut = async () => {
  await signOut({ 
    callbackUrl: "/login",
    redirect: true 
  });
};
Route Protection
typescript
// Middleware for route protection
export { default } from "next-auth/middleware";
export const config = { 
  matcher: ["/dashboard/:path*"] 
};

CSS Transitions: Simple interactions

Tailwind CSS: Utility-based animations

⚙ Environment Variables
Create a .env.local file:

env
# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Backend API
NEXT_PUBLIC_BASE_URL=http://localhost:5000

# Cloudinary (for images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
🚀 Installation & Setup
Prerequisites
Node.js 18+

📱 Responsive Design
Breakpoints
css
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Laptop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large Desktop */
Mobile-First Approach
tsx
// Example responsive component
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Mobile first column</div>
  <div className="w-full md:w-1/2">Responsive column</div>
</div>
🔧 Custom Hooks
useAuth
typescript
export const useAuth = () => {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
};
useApi
typescript
export const useApi = (endpoint: string, options?: any) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    options
  );
  
  return { data, error, isLoading };
};
🎯 Performance Optimization
Image Optimization
tsx
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero Image"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur"
/>
Code Splitting
tsx
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});
Bundle Optimization
Tree shaking with ES modules

Lazy loading for routes and components

Optimized images with Next.js Image component

Build Optimization
javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
  },
};

module.exports = nextConfig;
🔄 API Integration
Service Layer Pattern
typescript
// services/projectService.ts
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await fetch('/api/projects');
    return response.json();
  },
  
  create: async (data: ProjectFormData): Promise<Project> => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
Error Handling
typescript
// lib/errorHandler.ts
export const handleApiError = (error: any) => {
  if (error.response?.status === 401) {
    // Handle unauthorized
    signOut();
  }
  // ... other error handling
};
🎨 Customization Guide
Adding New Pages
Create folder in app/ directory

Add page.tsx and layout.tsx if needed

Update navigation in components/Navbar.tsx

Adding New Components
Create component in components/ directory

Export from components/index.ts

Follow TypeScript and styling conventions

Theming
typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#1d4ed8',
        },
      },
    },
  },
};
🐛 Common Issues & Solutions
CORS Issues
Ensure backend CORS is configured for frontend domain

Check environment variables for API URL

Authentication Problems
Verify NEXTAUTH_SECRET is set

Check callback URLs in auth configuration

Build Errors
Clear .next folder and node_modules

Check TypeScript types and imports


Built with ❤️ by Shakil Ahmed