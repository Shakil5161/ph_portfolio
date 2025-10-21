// "use client";

// import { motion } from "framer-motion";
// import { Award, Code, GraduationCap, Linkedin, Mail, Phone, Rocket, Target, Zap } from "lucide-react";
// import { useState } from "react";

// export default function AboutPage() {
//   const [activeTab, setActiveTab] = useState("experience");

//   const fadeInUp = {
//     initial: { opacity: 0, y: 60 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 }
//   };

//   const stagger = {
//     animate: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <motion.h1
//             className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//               S H A K I L &nbsp; A H M E D
//             </span>
//           </motion.h1>
          
//           <motion.div
//             className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm mb-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <Code className="w-5 h-5 text-blue-600" />
//             <span className="text-lg font-semibold text-gray-700">
//               Software Engineer at Echnologyx
//             </span>
//           </motion.div>

//           <motion.p
//             className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7 }}
//           >
//             Introducing a highly skilled and results-driven software engineer with a passion 
//             for web development and a flair for innovation!
//           </motion.p>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Sidebar - Contact & Education */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="space-y-6"
//           >
//             {/* Contact Information */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                 Contact Information
//               </h3>
              
//               <div className="space-y-3">
//                 <motion.a
//                   href="tel:01641969790"
//                   className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
//                   whileHover={{ x: 5 }}
//                 >
//                   <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
//                     <Phone className="w-4 h-4 text-blue-600" />
//                   </div>
//                   <span className="text-gray-700">01641969790</span>
//                 </motion.a>
                
//                 <motion.a
//                   href="mailto:shakilahmed5161@gmail.com"
//                   className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
//                   whileHover={{ x: 5 }}
//                 >
//                   <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
//                     <Mail className="w-4 h-4 text-blue-600" />
//                   </div>
//                   <span className="text-gray-700">shakilahmed5161@gmail.com</span>
//                 </motion.a>
                
//                 <motion.a
//                   href="https://linkedin.com/in/shakilahmed5161"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
//                   whileHover={{ x: 5 }}
//                 >
//                   <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
//                     <Linkedin className="w-4 h-4 text-blue-600" />
//                   </div>
//                   <span className="text-gray-700">/in/shakilahmed5161</span>
//                 </motion.a>
//               </div>
//             </div>

//             {/* Education */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <GraduationCap className="w-5 h-5 text-green-600" />
//                 Education
//               </h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="font-medium text-gray-900">B.Sc. in Computer Science & Engineering</h4>
//                   <p className="text-gray-600 text-sm">Green University of Bangladesh</p>
//                 </div>
                
//                 <div className="space-y-2">
//                   <motion.a
//                     href="#"
//                     className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm transition-colors"
//                     whileHover={{ x: 3 }}
//                   >
//                     <Award className="w-4 h-4" />
//                     Certificate
//                   </motion.a>
//                   <motion.a
//                     href="#"
//                     className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm transition-colors"
//                     whileHover={{ x: 3 }}
//                   >
//                     <Award className="w-4 h-4" />
//                     Transcript
//                   </motion.a>
//                   <motion.a
//                     href="#"
//                     className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm transition-colors"
//                     whileHover={{ x: 3 }}
//                   >
//                     <Award className="w-4 h-4" />
//                     MOI
//                   </motion.a>
//                 </div>
//               </div>
//             </div>

//             {/* Courses & Certifications */}
//             <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Zap className="w-5 h-5 text-yellow-600" />
//                 Courses & Certifications
//               </h3>
              
//               <div className="space-y-3">
//                 {[
//                   "Creative IT (Web Design)",
//                   "Programming Hero (Full Stack Web Level 1 & 2)",
//                   "Udemy and various online platforms"
//                 ].map((course, index) => (
//                   <motion.div
//                     key={course}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.5 + index * 0.1 }}
//                     className="flex items-center gap-3 p-2"
//                   >
//                     <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
//                     <span className="text-gray-700 text-sm">{course}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Main Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="lg:col-span-2"
//           >
//             <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
//               {/* Tab Navigation */}
//               <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8">
//                 {[
//                   { id: "experience", label: "Experience", icon: Rocket },
//                   { id: "skills", label: "Skills", icon: Target },
//                 ].map((tab) => {
//                   const Icon = tab.icon;
//                   return (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
//                         activeTab === tab.id
//                           ? "bg-white text-blue-600 shadow-sm"
//                           : "text-gray-600 hover:text-gray-900"
//                       }`}
//                     >
//                       <Icon className="w-4 h-4" />
//                       {tab.label}
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Tab Content */}
//               {activeTab === "experience" && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="space-y-6"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="p-3 bg-blue-100 rounded-xl">
//                       <Rocket className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                         3.5+ Years of Professional Experience
//                       </h3>
//                       <div className="grid gap-4">
//                         {[
//                           {
//                             title: "Shopify Store Optimization",
//                             description: "Successfully optimized Shopify stores for performance and user experience"
//                           },
//                           {
//                             title: "Dynamic Sections Development",
//                             description: "Created dynamic sections using Shopify Liquid for enhanced customization"
//                           },
//                           {
//                             title: "API Integration",
//                             description: "Integrated third-party APIs to extend store functionality"
//                           },
//                           {
//                             title: "Shopify Extensions",
//                             description: "Developed Shopify checkout extensions and custom apps"
//                           },
//                           {
//                             title: "A/B Testing",
//                             description: "Implemented impactful A/B tests to drive conversions and improve metrics"
//                           }
//                         ].map((item, index) => (
//                           <motion.div
//                             key={item.title}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.2 + index * 0.1 }}
//                             className="flex gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
//                           >
//                             <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
//                             <div>
//                               <h4 className="font-semibold text-gray-900 mb-1">
//                                 {item.title}
//                               </h4>
//                               <p className="text-gray-600 text-sm">
//                                 {item.description}
//                               </p>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === "skills" && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                   className="space-y-6"
//                 >
//                   <div className="grid md:grid-cols-2 gap-6">
//                     {[
//                       {
//                         category: "Frontend Development",
//                         skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Shopify Liquid"]
//                       },
//                       {
//                         category: "Backend Development",
//                         skills: ["Node.js", "API Integration", "Database Design"]
//                       },
//                       {
//                         category: "E-commerce",
//                         skills: ["Shopify Development", "Checkout Extensions", "Store Optimization"]
//                       },
//                       {
//                         category: "Tools & Methods",
//                         skills: ["A/B Testing", "Performance Optimization", "Conversion Rate Optimization"]
//                       }
//                     ].map((skillGroup, index) => (
//                       <motion.div
//                         key={skillGroup.category}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.2 + index * 0.1 }}
//                         className="p-4 rounded-lg border border-gray-200 bg-gray-50/50"
//                       >
//                         <h4 className="font-semibold text-gray-900 mb-3">
//                           {skillGroup.category}
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {skillGroup.skills.map((skill) => (
//                             <span
//                               key={skill}
//                               className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
//                             >
//                               {skill}
//                             </span>
//                           ))}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}

//               {/* Call to Action */}
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }}
//                 className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center"
//               >
//                 <h3 className="text-xl font-semibold mb-2">
//                   Ready to Build Something Amazing?
//                 </h3>
//                 <p className="mb-4 opacity-90">
//                   Let's collaborate on your next project and create exceptional digital experiences.
//                 </p>
//                 <motion.a
//                   href="mailto:shakilahmed5161@gmail.com"
//                   className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Mail className="w-4 h-4" />
//                   Get In Touch
//                 </motion.a>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }


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