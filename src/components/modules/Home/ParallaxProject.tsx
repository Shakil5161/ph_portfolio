"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Award, Briefcase, GraduationCap, Star } from "lucide-react"
import { useRef, useState } from "react"

const timelineData = [
  {
    year: "2024",
    title: "Lead Frontend Architect",
    company: "Tech Innovations Inc.",
    description: "Leading a team of 15 developers in building cutting-edge web applications for Fortune 500 companies.",
    icon: Briefcase,
    color: "#06b6d4",
    achievements: ["Scaled platform to 1M+ users", "Reduced load time by 60%", "Mentored 8 junior developers"]
  },
  {
    year: "2022",
    title: "Senior UI Engineer",
    company: "Digital Dreams LLC",
    description: "Specialized in creating immersive user experiences with modern frontend technologies and animations.",
    icon: Award,
    color: "#8b5cf6",
    achievements: ["Introduced design system", "Improved conversion by 35%", "Won 3 design awards"]
  },
  {
    year: "2020",
    title: "Full Stack Developer",
    company: "Startup Ventures",
    description: "Built and launched multiple SaaS products from ground up, handling both frontend and backend development.",
    icon: Star,
    color: "#10b981",
    achievements: ["Launched 5 successful products", "Grew user base to 50K", "Achieved 99.9% uptime"]
  },
  {
    year: "2018",
    title: "Computer Science Degree",
    company: "Tech University",
    description: "Graduated with honors while working on freelance projects and building personal portfolio.",
    icon: GraduationCap,
    color: "#f59e0b",
    achievements: ["Summa Cum Laude", "Best Thesis Award", "President of CS Club"]
  }
]

export function ParallaxProject() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const backgroundRotation = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section ref={containerRef} className="min-h-screen bg-slate-900 py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ rotate: backgroundRotation }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Journey Through Time
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow my professional evolution from passionate student to industry leader
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Timeline Visualization */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500" />
            
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative flex items-center gap-8 mb-12 cursor-pointer group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onHoverStart={() => setActiveIndex(index)}
              >
                {/* Year Marker */}
                <motion.div
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg border-4 border-slate-900 ${
                    activeIndex === index ? 'scale-110 shadow-2xl' : 'scale-100'
                  }`}
                  style={{ backgroundColor: item.color }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.year}
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className={`flex-1 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 ${
                    activeIndex === index ? 'scale-105 shadow-xl' : 'scale-100'
                  }`}
                  style={{ 
                    borderColor: activeIndex === index ? item.color : 'transparent',
                    backgroundColor: activeIndex === index ? `${item.color}15` : ''
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-cyan-300 font-semibold mb-2">{item.company}</p>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  
                  {/* Achievements */}
                  <div className="space-y-2">
                    {item.achievements.map((achievement, achievementIndex) => (
                      <motion.div
                        key={achievement}
                        className="flex items-center gap-2 text-sm text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: achievementIndex * 0.1 }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        {achievement}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Progress Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="sticky top-8"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Career Progression
              </h3>

              {/* Skills Radar Chart */}
              <div className="relative h-80 w-full flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Grid Circles */}
                  {[1, 2, 3, 4].map((circle) => (
                    <circle
                      key={circle}
                      cx="100"
                      cy="100"
                      r={circle * 20}
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Data Points */}
                  {['Leadership', 'Technical', 'Design', 'Strategy', 'Innovation'].map((skill, index) => {
                    const angle = (index * 360) / 5
                    const progress = [95, 90, 85, 80, 88][index] // Example values
                    const radius = (progress / 100) * 80
                    const x = 100 + Math.cos((angle * Math.PI) / 180) * radius
                    const y = 100 + Math.sin((angle * Math.PI) / 180) * radius

                    return (
                      <g key={skill}>
                        <line
                          x1="100"
                          y1="100"
                          x2={100 + Math.cos((angle * Math.PI) / 180) * 80}
                          y2={100 + Math.sin((angle * Math.PI) / 180) * 80}
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="1"
                        />
                        <motion.circle
                          cx={x}
                          cy={y}
                          r="6"
                          fill={timelineData[activeIndex].color}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        />
                        <text
                          x={100 + Math.cos((angle * Math.PI) / 180) * 95}
                          y={100 + Math.sin((angle * Math.PI) / 180) * 95}
                          textAnchor="middle"
                          fill="white"
                          fontSize="12"
                          className="font-semibold"
                        >
                          {skill}
                        </text>
                      </g>
                    )
                  })}

                  {/* Connecting Polygon */}
                  <motion.polygon
                    points={['Leadership', 'Technical', 'Design', 'Strategy', 'Innovation']
                      .map((_, index) => {
                        const angle = (index * 360) / 5
                        const progress = [95, 90, 85, 80, 88][index]
                        const radius = (progress / 100) * 80
                        const x = 100 + Math.cos((angle * Math.PI) / 180) * radius
                        const y = 100 + Math.sin((angle * Math.PI) / 180) * radius
                        return `${x},${y}`
                      })
                      .join(' ')}
                    fill={timelineData[activeIndex].color}
                    fillOpacity="0.2"
                    stroke={timelineData[activeIndex].color}
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>
              </div>

              {/* Current Focus */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-6"
              >
                <h4 className="text-lg font-semibold text-white mb-2">Current Focus</h4>
                <p className="text-gray-300" style={{ color: timelineData[activeIndex].color }}>
                  {activeIndex === 0 && "Leading large-scale architecture decisions and mentoring next-gen developers"}
                  {activeIndex === 1 && "Pushing the boundaries of user experience with advanced animations and interactions"}
                  {activeIndex === 2 && "Building full-stack applications with focus on scalability and performance"}
                  {activeIndex === 3 && "Laying the foundation for a successful career in technology"}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}