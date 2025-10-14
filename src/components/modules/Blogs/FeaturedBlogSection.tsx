"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, Calendar, Clock, Eye, Heart, MessageCircle } from "lucide-react"
import { useRef, useState } from "react"

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

export function FeaturedBlogSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Featured Writings
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Deep dives into web development, design systems, and cutting-edge technologies
          </motion.p>
          
          {/* Animated underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto w-24 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              index={index}
              isHovered={hoveredCard === post.id}
              onHoverStart={() => setHoveredCard(post.id)}
              onHoverEnd={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Articles</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

interface BlogCardProps {
  post: BlogPost
  index: number
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}

function BlogCard({ post, index, isHovered, onHoverStart, onHoverEnd }: BlogCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 30, stiffness: 300 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"])
  const scale = useTransform(springX, [-0.5, 0.5], [0.98, 1.02])

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mx = (event.clientX - rect.left) / width - 0.5
    const my = (event.clientY - rect.top) / height - 0.5
    mouseX.set(mx)
    mouseY.set(my)
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="group cursor-pointer"
    >
      <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-6 h-full overflow-hidden transition-all duration-500 hover:border-slate-600/70 hover:bg-slate-800/50">
        
        {/* Hover Gradient Overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${post.color}15 0%, transparent 70%)`
          }}
          animate={{ 
            background: isHovered 
              ? `radial-gradient(circle at center, ${post.color}20 0%, transparent 70%)`
              : `radial-gradient(circle at center, ${post.color}05 0%, transparent 70%)`
          }}
        />

        {/* Category Badge */}
        <motion.span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 border backdrop-blur-sm"
          style={{ 
            backgroundColor: `${post.color}15`,
            borderColor: post.color,
            color: post.color
          }}
          whileHover={{ scale: 1.05 }}
        >
          {post.category}
        </motion.span>

        {/* Title */}
        <motion.h3 
          className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-cyan-100 transition-colors duration-300"
          style={{ textShadow: isHovered ? `0 0 20px ${post.color}40` : 'none' }}
        >
          {post.title}
        </motion.h3>

        {/* Excerpt */}
        <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
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
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{post.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </div>
        </div>

        {/* Read More Button */}
        <motion.div
          className="flex items-center justify-between"
          whileHover={{ x: 5 }}
        >
          <motion.span 
            className="text-cyan-400 font-semibold flex items-center gap-2 group-hover:text-cyan-300 transition-colors duration-300"
          >
            Read Article
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </motion.span>
          
          {/* Animated underline */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Floating elements */}
        <div className="absolute -right-4 -top-4 w-20 h-20 opacity-10">
          <motion.div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: post.color }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              delay: index * 0.5 
            }}
          />
        </div>
      </div>
    </motion.article>
  )
}