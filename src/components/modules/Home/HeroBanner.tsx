
"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Code2, Github, Palette, Rocket, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { TrailingCursor } from "./modern-trailing-cursor"


export function HeroBanner() {
  const [currentText, setCurrentText] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const texts = [
    "Creative Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Tech Enthusiast"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [texts.length])

  const floatingElements = [
    { icon: Code2, delay: 0, x: "20%", y: "20%" },
    { icon: Palette, delay: 0.5, x: "80%", y: "30%" },
    { icon: Sparkles, delay: 1, x: "20%", y: "70%" },
    { icon: Rocket, delay: 1.5, x: "70%", y: "60%" },   
    { icon: Github, delay: 1, x: "15%", y: "40%" },   
  ]


  return (
    <>
    
      <TrailingCursor/>
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {floatingElements.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                className="absolute text-white/10"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 8,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: item.x,
                  top: item.y,
                }}
              >
                <Icon size={48} />
              </motion.div>
            )
          })}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        {/* Main Content */}
        <div className="relative z-10 text-center pb-10 pt-40 max-w-6xl mx-auto">
          
          <motion.div
            className="relative mb-8 mx-auto w-32 h-32"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-[length:200%_100%] animate-gradient">
              Hello, I'm
            </span>
            <br />
            <motion.span
              className="block mt-4"
              animate={{ 
                scale: isHovered ? 1.05 : 1,
                textShadow: isHovered ? "0 0 30px rgba(139, 92, 246, 0.5)" : "none"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Your Name
            </motion.span>
          </motion.h1>

          {/* Animated Text Rotator */}
          <motion.div
            className="h-16 mb-8 text-2xl md:text-4xl font-light text-cyan-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-4"
              >
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                <span>{texts[currentText]}</span>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Crafting exceptional digital experiences with modern technologies 
            and innovative design solutions that make a difference.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              className={cn(
                "px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600",
                "text-white rounded-full font-semibold text-lg",
                "shadow-lg shadow-purple-500/25",
                "hover:shadow-xl hover:shadow-purple-500/40",
                "transition-all duration-300",
                "relative overflow-hidden group"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className={cn(
                "px-8 py-4 border-2 border-white/20",
                "text-white rounded-full font-semibold text-lg",
                "backdrop-blur-sm bg-white/5",
                "hover:bg-white/10 hover:border-white/30",
                "transition-all duration-300"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>
    </>
  )
}