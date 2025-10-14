"use client"

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, BookOpen, Calendar, Clock, Sparkles, Zap } from "lucide-react"
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
  gradient: string
  tags: string[]
}

const featuredPosts: BlogPost[] = [
  {
    id: 1,
    title: "Mastering React 18: Concurrent Rendering & Suspense",
    excerpt: "Deep dive into React 18's groundbreaking features that are revolutionizing how we build performant web applications.",
    category: "React",
    readTime: "8 min read",
    date: "2024-01-15",
    image: "/blog-react-future.jpg",
    views: 1242,
    likes: 89,
    comments: 23,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-500",
    tags: ["React", "Performance", "Concurrent"]
  },
  {
    id: 2,
    title: "The Art of Microfrontends: Scaling Frontend Architecture",
    excerpt: "Learn how to break down monolithic applications into scalable, independent microfrontends with modern tooling.",
    category: "Architecture",
    readTime: "12 min read",
    date: "2024-01-12",
    image: "/blog-microfrontends.jpg",
    views: 956,
    likes: 67,
    comments: 18,
    color: "#8b5cf6",
    gradient: "from-purple-500 to-violet-600",
    tags: ["Microfrontends", "Architecture", "Scalability"]
  },
  {
    id: 3,
    title: "Framer Motion Magic: Advanced Animation Patterns",
    excerpt: "Unlock the full potential of Framer Motion with advanced gestures, layout animations, and performance optimizations.",
    category: "Animation",
    readTime: "6 min read",
    date: "2024-01-08",
    image: "/blog-animations.jpg",
    views: 1873,
    likes: 124,
    comments: 42,
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-500",
    tags: ["Animation", "Framer Motion", "UX"]
  },
  {
    id: 4,
    title: "TypeScript Pro: Enterprise-Grade Patterns & Practices",
    excerpt: "Advanced TypeScript techniques that will transform how you build large-scale, maintainable applications.",
    category: "TypeScript",
    readTime: "10 min read",
    date: "2024-01-05",
    image: "/blog-typescript.jpg",
    views: 2105,
    likes: 156,
    comments: 31,
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-600",
    tags: ["TypeScript", "Best Practices", "Enterprise"]
  }
]

export function HolographicBlogSection() {
  const [activePost, setActivePost] = useState<number | null>(null)
  const [isGrid, setIsGrid] = useState(true)

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 font-semibold">Featured Writings</span>
            <Zap className="w-5 h-5 text-purple-400" />
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-[length:200%_100%] animate-gradient">
              Mind Spark
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Exploring the intersection of technology, design, and innovation through 
            in-depth articles and cutting-edge tutorials.
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          {isGrid ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-2 gap-8 mb-16"
            >
              {featuredPosts.map((post, index) => (
                <HolographicCard
                  key={post.id}
                  post={post}
                  index={index}
                  isActive={activePost === post.id}
                  onHoverStart={() => setActivePost(post.id)}
                  onHoverEnd={() => setActivePost(null)}
                  onClick={() => setIsGrid(false)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-16"
            >
              <BlogDetailView onBack={() => setIsGrid(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row gap-4 items-center"
            whileHover="hover"
          >
            <motion.a
              href="/blog"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold text-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                Explore All Articles
                <ArrowUpRight className="w-5 h-5" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.button
              className="px-6 py-4 border-2 border-slate-600 text-slate-300 rounded-full font-semibold hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe to Updates
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

interface HolographicCardProps {
  post: BlogPost
  index: number
  isActive: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
  onClick: () => void
}

function HolographicCard({ post, index, isActive, onHoverStart, onHoverEnd, onClick }: HolographicCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springX = useSpring(mouseX, { damping: 30, stiffness: 300 })
  const springY = useSpring(mouseY, { damping: 30, stiffness: 300 })
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-12deg", "12deg"])
  
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
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group cursor-pointer perspective-1000"
    >
      <div className="relative bg-slate-800/20 backdrop-blur-xl rounded-3xl border border-slate-700/30 p-8 h-full overflow-hidden transition-all duration-500 hover:border-slate-500/50 hover:bg-slate-800/30">
        
        {/* Holographic Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(45deg, ${post.color}15, transparent 50%)`,
          }}
          animate={{ 
            opacity: isActive ? 0.3 : 0,
          }}
        />

        {/* Glow Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
          style={{
            boxShadow: `0 0 60px 20px ${post.color}20`,
          }}
          animate={{ 
            opacity: isActive ? 0.6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Category Badge with Glow */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-6 relative overflow-hidden"
          style={{ 
            backgroundColor: `${post.color}15`,
            borderColor: post.color,
          }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className="text-sm font-semibold"
            style={{ color: post.color }}
          >
            {post.category}
          </motion.span>
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: post.color }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Title with Gradient */}
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
          animate={{
            textShadow: isActive ? `0 0 30px ${post.color}40` : 'none'
          }}
        >
          {post.title}
        </motion.h3>

        {/* Excerpt */}
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="px-3 py-1 rounded-full text-xs border backdrop-blur-sm"
              style={{ 
                backgroundColor: `${post.color}10`,
                borderColor: `${post.color}30`,
                color: `${post.color}90`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: tagIndex * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Metadata & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-2 text-cyan-400 group/cta"
            whileHover={{ x: 5 }}
          >
            <span className="font-semibold">Read More</span>
            <motion.div
              animate={{ rotate: isActive ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -right-6 -top-6 w-24 h-24 opacity-20"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity }
          }}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-r ${post.gradient}`} />
        </motion.div>
      </div>
    </motion.article>
  )
}

function BlogDetailView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      className="bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-cyan-400 mb-6 group"
        whileHover={{ x: -5 }}
      >
        ← Back to Articles
      </motion.button>
      
      <div className="text-center">
        <h3 className="text-4xl font-bold text-white mb-4">
          Detailed Blog View
        </h3>
        <p className="text-gray-300">
          This would show the full blog post content
        </p>
      </div>
    </motion.div>
  )
}