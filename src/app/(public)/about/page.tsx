

"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Binary,
  ChevronRight,
  CircuitBoard,
  Code2,
  Cpu,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  Scan,
  Server,
  Sparkles,
  Terminal,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [activeSystem, setActiveSystem] = useState("core");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    // Simulate terminal boot sequence
    const bootSequence = [
      "> INITIATING SYSTEM BOOT...",
      "> LOADING PROFILE_DATA...",
      "> SHAKIL_AHMED.sys [LOADED]",
      "> SOFTWARE_ENGINEER.exe [RUNNING]",
      "> 3.5+ YEARS EXPERIENCE [VERIFIED]",
      "> SYSTEM READY FOR QUERY...",
      "> TYPE 'help' FOR COMMANDS"
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, line]);
      }, index * 300);
    });

    setTimeout(() => setIsScanning(false), 2500);
  }, []);

  const systems = [
    { 
      id: "core", 
      name: "CORE SYSTEMS", 
      icon: Cpu, 
      color: "#06b6d4",
      data: [
        "Software Engineer At Echnologyx",
        "3.5+ Years Professional Experience",
        "Full-Stack Development Specialist",
        "Results-Driven Innovator"
      ]
    },
    { 
      id: "shopify", 
      name: "SHOPIFY EXPERTISE", 
      icon: Globe, 
      color: "#8b5cf6",
      data: [
        "Store Optimization & Development",
        "Shopify Liquid & Checkout Extensions",
        "Third-party API Integration",
        "A/B Testing & Conversion Optimization"
      ]
    },
    { 
      id: "tech", 
      name: "TECH STACK", 
      icon: Code2, 
      color: "#10b981",
      data: [
        "Frontend: React, Next.js, TypeScript",
        "Backend: Node.js, API Development",
        "E-commerce: Shopify Ecosystem",
        "Tools: Git, Testing, Performance"
      ]
    },
    { 
      id: "education", 
      name: "EDUCATION", 
      icon: GraduationCap, 
      color: "#f59e0b",
      data: [
        "B.Sc. Computer Science & Engineering",
        "Green University of Bangladesh",
        "Certificates & Transcripts Available",
        "Continuous Learning Enthusiast"
      ]
    }
  ];

  const currentSystem = systems.find(sys => sys.id === activeSystem);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix-style background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-green-400 shadow-lg shadow-green-400/50 z-20"
        animate={{ y: ["0vh", "100vh"] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 border-b border-green-500/30 pb-8"
        >
          <motion.div
            className="inline-flex items-center gap-4 px-6 py-3 bg-green-950/50 border border-green-500/30 rounded-lg mb-6"
            animate={{ 
              boxShadow: ["0 0 20px rgba(6,182,212,0.3)", "0 0 40px rgba(139,92,246,0.3)", "0 0 20px rgba(6,182,212,0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CircuitBoard className="w-6 h-6 text-cyan-400" />
            <span className="text-green-300 font-bold text-lg">SYSTEM_ACTIVE</span>
            <div className="flex gap-1">
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-green-400">
              &gt; SHAKIL_AHMED
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-green-300 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            SOFTWARE_ENGINEER // ECHNOLOGYX
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-black/80 border border-green-500/30 rounded-xl overflow-hidden shadow-2xl shadow-green-500/20"
          >
            {/* Terminal Header */}
            <div className="bg-green-950/50 border-b border-green-500/30 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm font-bold">SYSTEM_TERMINAL</span>
            </div>

            {/* Terminal Output */}
            <div className="p-4 h-96 overflow-y-auto font-mono text-sm">
              <AnimatePresence>
                {terminalOutput.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-1"
                  >
                    <span className="text-cyan-400">{line}</span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {!isScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 mt-4"
                >
                  <span className="text-green-400">&gt;</span>
                  <motion.span
                    className="w-2 h-4 bg-green-400"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <span className="text-green-200">system_status --user shakil</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right Panel - System Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            {/* System Selector */}
            <div className="bg-black/50 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-green-300 font-bold text-lg mb-4 flex items-center gap-2">
                <Scan className="w-5 h-5 text-cyan-400" />
                SYSTEM_NAVIGATION
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {systems.map((system, index) => {
                  const Icon = system.icon;
                  return (
                    <motion.button
                      key={system.id}
                      onClick={() => setActiveSystem(system.id)}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        activeSystem === system.id
                          ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20"
                          : "border-green-500/30 bg-black/50 hover:border-green-400"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5" style={{ color: system.color }} />
                        <span className="text-green-300 font-semibold text-sm">
                          {system.name}
                        </span>
                      </div>
                      <ChevronRight 
                        className={`w-4 h-4 transition-transform ${
                          activeSystem === system.id ? "text-cyan-400 rotate-90" : "text-green-600"
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Active System Display */}
            {currentSystem && (
              <motion.div
                key={activeSystem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/50 border border-green-500/30 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <currentSystem.icon className="w-6 h-6" style={{ color: currentSystem.color }} />
                  <h3 className="text-green-300 font-bold text-lg">{currentSystem.name}</h3>
                </div>
                
                <div className="space-y-3">
                  {currentSystem.data.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-green-950/30 rounded border border-green-500/20 hover:border-green-400/50 transition-colors"
                    >
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: currentSystem.color }}
                      />
                      <span className="text-green-200 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contact Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-black/50 border border-green-500/30 rounded-xl p-6"
            >
              <h3 className="text-green-300 font-bold text-lg mb-4 flex items-center gap-2">
                <Binary className="w-5 h-5 text-purple-400" />
                CONTACT_MATRIX
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Phone, label: "01641969790", href: "tel:01641969790", color: "text-green-400" },
                  { icon: Mail, label: "EMAIL", href: "mailto:shakilahmed5161@gmail.com", color: "text-cyan-400" },
                  { icon: Linkedin, label: "LINKEDIN", href: "https://linkedin.com/in/shakilahmed5161", color: "text-blue-400" },
                ].map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : '_self'}
                    className="p-3 border border-green-500/30 rounded-lg text-center hover:border-green-400 hover:bg-green-400/10 transition-all group"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <contact.icon className={`w-6 h-6 mx-auto mb-2 ${contact.color}`} />
                    <span className="text-green-300 text-xs font-semibold group-hover:text-white">
                      {contact.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Initiate Protocol Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="text-center"
            >
              <motion.a
                href="mailto:shakilahmed5161@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 via-cyan-600 to-green-600 text-white font-bold rounded-lg border border-green-400 shadow-2xl shadow-green-500/30 hover:shadow-cyan-500/40 transition-all"
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(45deg, #10b981, #06b6d4, #10b981)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-5 h-5" />
                INITIATE_COLLABORATION_PROTOCOL
                <Sparkles className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-12 border-t border-green-500/30 pt-4"
        >
          <div className="flex flex-wrap items-center justify-between text-green-600 text-sm">
            <div className="flex items-center gap-4">
              <span>STATUS: ONLINE</span>
              <span>•</span>
              <span>EXP: 3.5+ YEARS</span>
              <span>•</span>
              <span>SPECIALTY: FULL-STACK</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>SYSTEM_OPTIMAL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}