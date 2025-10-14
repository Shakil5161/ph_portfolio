"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { useRef, useState } from "react"

// Reusing the same BlogPost interface and data from above
interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  image: string
  views: number
  likes: number
  comments: number
  color: string
}

const featuredPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of React in 2024: Concurrent Features and Beyond",
    excerpt: "Exploring the latest React 18 features and how they're shaping modern web development with concurrent rendering and suspense.",
    category: "React",
    readTime: "8 min read",
    date: "2024-01-15",
    image: "/blog-react-future.jpg",
    views: 1242,
    likes: 89,
    comments: 23,
    color: "#61dafb"
  },
  {
    id: 2,
    title: "Building Microfrontends: A Comprehensive Guide",
    excerpt: "Learn how to break down monolithic frontend applications into scalable, independent microfrontends using modern tools.",
    category: "Architecture",
    readTime: "12 min read",
    date: "2024-01-12",
    image: "/blog-microfrontends.jpg",
    views: 956,
    likes: 67,
    comments: 18,
    color: "#8b5cf6"
  },
  {
    id: 3,
    title: "Animating the Web with Framer Motion: Advanced Patterns",
    excerpt: "Deep dive into advanced animation patterns, gesture handling, and performance optimization with Framer Motion.",
    category: "Animation",
    readTime: "6 min read",
    date: "2024-01-08",
    image: "/blog-animations.jpg",
    views: 1873,
    likes: 124,
    comments: 42,
    color: "#06b6d4"
  },
  {
    id: 4,
    title: "TypeScript Best Practices for Large Scale Applications",
    excerpt: "Essential TypeScript patterns and practices that will save you hours of debugging in enterprise-level applications.",
    category: "TypeScript",
    readTime: "10 min read",
    date: "2024-01-05",
    image: "/blog-typescript.jpg",
    views: 2105,
    likes: 156,
    comments: 31,
    color: "#3178c6"
  }
]

export function MagneticBlog() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredPosts.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)
  }

  return (
    <section className="min-h-screen bg-slate-900 py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Latest Thoughts
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fresh perspectives on technology, design, and development
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              onClick={prevSlide}
              className="p-3 rounded-full border border-slate-600 text-slate-400 hover:text-white hover:border-cyan-400 transition-all duration-300"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              onClick={nextSlide}
              className="p-3 rounded-full border border-slate-600 text-slate-400 hover:text-white hover:border-purple-400 transition-all duration-300"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Carousel */}
          <div ref={carouselRef} className="relative h-96">
            {featuredPosts.map((post, index) => (
              <CarouselCard
                key={post.id}
                post={post}
                index={index}
                currentIndex={currentIndex}
                totalItems={featuredPosts.length}
              />
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {featuredPosts.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-cyan-400' : 'bg-slate-600'
                }`}
                whileHover={{ scale: 1.2 }}
                animate={{
                  scale: index === currentIndex ? 1.2 : 1,
                  backgroundColor: index === currentIndex ? "#06b6d4" : "#475569"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface CarouselCardProps {
  post: BlogPost
  index: number
  currentIndex: number
  totalItems: number
}

function CarouselCard({ post, index, currentIndex, totalItems }: CarouselCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const position = (index - currentIndex + totalItems) % totalItems
  const isActive = position === 0
  const isNext = position === 1
  const isPrev = position === totalItems - 1

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, { damping: 30, stiffness: 300 })
  const springY = useSpring(y, { damping: 30, stiffness: 300 })
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current || !isActive) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = (event.clientX - rect.left) / width - 0.5
    const mouseY = (event.clientY - rect.top) / height - 0.5
    x.set(mouseX)
    y.set(mouseY)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`absolute inset-0 bg-slate-800/50 backdrop-blur-sm rounded-3xl border p-8 cursor-pointer transition-all duration-500 ${
        isActive 
          ? 'border-cyan-400/50 z-20 shadow-2xl shadow-cyan-500/20' 
          : isNext || isPrev
          ? 'border-slate-600/30 z-10 opacity-60'
          : 'border-slate-600/20 z-0 opacity-30'
      }`}
      style={{
        x: isActive ? 0 : position === 1 ? '25%' : position === totalItems - 1 ? '-25%' : 0,
        y: isActive ? 0 : 20,
        scale: isActive ? 1 : 0.9,
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      animate={{
        x: isActive ? 0 : position === 1 ? '25%' : position === totalItems - 1 ? '-25%' : 0,
        y: isActive ? 0 : 20,
        scale: isActive ? 1 : 0.9,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Content */}
      <div className="h-full flex flex-col">
        <span 
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 border w-fit"
          style={{ 
            backgroundColor: `${post.color}15`,
            borderColor: post.color,
            color: post.color
          }}
        >
          {post.category}
        </span>

        <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h3>

        <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <motion.a
            href={`/blog/${post.id}`}
            className="flex items-center gap-2 text-cyan-400 font-semibold group"
            whileHover={{ x: 5 }}
          >
            Read More
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}