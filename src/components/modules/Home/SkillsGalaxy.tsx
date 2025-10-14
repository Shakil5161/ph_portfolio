"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cloud, Code2, Database, LucideIcon, Palette, Smartphone, Zap } from "lucide-react";
import { useRef, useState } from "react";

interface Skill {
  icon: LucideIcon;
  name: string;
  tech: string;
  level: number;
  color: string;
}

const skills: Skill[] = [
  { icon: Code2, name: "Frontend", tech: "React/Next.js", level: 95, color: "#06b6d4" },
  { icon: Palette, name: "UI/UX Design", tech: "Figma/Framer", level: 90, color: "#8b5cf6" },
  { icon: Database, name: "Backend", tech: "Node.js/PostgreSQL", level: 85, color: "#10b981" },
  { icon: Smartphone, name: "Mobile", tech: "React Native", level: 80, color: "#f59e0b" },
  { icon: Cloud, name: "DevOps", tech: "AWS/Docker", level: 75, color: "#ef4444" },
  { icon: Zap, name: "AI/ML", tech: "TensorFlow/Python", level: 70, color: "#d946ef" },
]

export function SkillsGalaxy() {
  const [activeSkill, setActiveSkill] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 300 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"])

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

  // Get the current active skill
  const currentSkill = skills[activeSkill]
  const SkillIcon = currentSkill.icon

  return (
    <section className="min-h-screen bg-slate-900 py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Tech Galaxy
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my universe of skills and technologies. Each orbit represents a different domain of expertise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Galaxy */}
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative h-96 w-full flex items-center justify-center"
          >
            {/* Central Sphere */}
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-2xl shadow-cyan-500/25"
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              Core
            </motion.div>

            {/* Orbiting Skills */}
            {skills.map((skill, index) => {
              const SkillOrbIcon = skill.icon
              const angle = (index * 360) / skills.length
              const radius = 180
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius

              return (
                <motion.div
                  key={skill.name}
                  className={`absolute cursor-pointer w-20 h-20 rounded-2xl bg-slate-800 border-2 flex flex-col items-center justify-center p-2 backdrop-blur-sm transition-all duration-300 ${
                    activeSkill === index ? 'scale-110 shadow-lg' : 'scale-100'
                  }`}
                  style={{
                    x,
                    y,
                    borderColor: skill.color,
                  }}
                  animate={{
                    rotateZ: 360,
                    x: Math.cos((angle * Math.PI) / 180) * radius,
                    y: Math.sin((angle * Math.PI) / 180) * radius,
                  }}
                  transition={{
                    rotateZ: { duration: 20, repeat: Infinity, ease: "linear" },
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  whileHover={{ scale: 1.2 }}
                  onHoverStart={() => setActiveSkill(index)}
                >
                  <SkillOrbIcon className="w-6 h-6" style={{ color: skill.color }} />
                  <span className="text-xs text-white mt-1 font-medium">{skill.name}</span>
                </motion.div>
              )
            })}

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {skills.map((_, index) => {
                const angle1 = (index * 360) / skills.length
                const angle2 = ((index + 1) * 360) / skills.length
                const x1 = Math.cos((angle1 * Math.PI) / 180) * 180 + 200
                const y1 = Math.sin((angle1 * Math.PI) / 180) * 180 + 200
                const x2 = Math.cos((angle2 * Math.PI) / 180) * 180 + 200
                const y2 = Math.sin((angle2 * Math.PI) / 180) * 180 + 200

                return (
                  <motion.line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, 10] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                )
              })}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Skill Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-700">
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${currentSkill.color}20` }}
                >
                  <SkillIcon 
                    className="w-6 h-6" 
                    style={{ color: currentSkill.color }} 
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentSkill.name}</h3>
                  <p className="text-cyan-300">{currentSkill.tech}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Proficiency</span>
                  <span>{currentSkill.level}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <motion.div
                    className="h-3 rounded-full"
                    style={{ backgroundColor: currentSkill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${currentSkill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              <motion.p 
                className="text-gray-300 mt-4 leading-relaxed"
                key={activeSkill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {activeSkill === 0 && "Building responsive, performant web applications with modern React ecosystem and TypeScript. Specialized in creating scalable frontend architectures and optimizing user experiences."}
                {activeSkill === 1 && "Creating intuitive user interfaces and experiences with attention to detail and user psychology. Expertise in design systems, prototyping, and user-centered design methodologies."}
                {activeSkill === 2 && "Developing robust server-side applications and database architectures with scalability in mind. Experience with microservices, API design, and cloud infrastructure."}
                {activeSkill === 3 && "Crafting native-feeling mobile experiences with cross-platform development frameworks. Focus on performance optimization and seamless user interactions."}
                {activeSkill === 4 && "Implementing cloud infrastructure and deployment pipelines for reliable applications. Expertise in CI/CD, containerization, and infrastructure as code."}
                {activeSkill === 5 && "Integrating artificial intelligence and machine learning capabilities into applications. Experience with neural networks, data analysis, and AI-driven features."}
              </motion.p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {skills.map((skill, index) => {
                const SkillButtonIcon = skill.icon
                return (
                  <motion.button
                    key={skill.name}
                    className={`p-3 rounded-xl text-center transition-all duration-300 ${
                      activeSkill === index 
                        ? 'bg-slate-700 border-2' 
                        : 'bg-slate-800/50 border border-slate-700'
                    }`}
                    style={{ 
                      borderColor: activeSkill === index ? skill.color : 'transparent',
                      backgroundColor: activeSkill === index ? `${skill.color}15` : ''
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSkill(index)}
                  >
                    <SkillButtonIcon className="w-5 h-5 mx-auto mb-1" style={{ color: skill.color }} />
                    <span className="text-xs text-white font-medium">{skill.name}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}