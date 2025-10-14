"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function TrailingCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
      
      // Add new position to trail
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY }]
        // Keep only last 8 positions
        return newTrail.slice(-8)
      })
    }

    window.addEventListener("mousemove", mouseMove)
    return () => window.removeEventListener("mousemove", mouseMove)
  }, [])

  return (
    <>
      {/* Trail dots */}
      {trail.map((position, index) => (
        <motion.div
          key={index}
          className="fixed pointer-events-none z-50 rounded-full bg-cyan-400"
          initial={{ 
            x: position.x - 2, 
            y: position.y - 2,
            scale: 1,
            opacity: 0.8
          }}
          animate={{ 
            x: position.x - 2, 
            y: position.y - 2,
            scale: 1 - (index / trail.length) * 0.8,
            opacity: 0.8 - (index / trail.length) * 0.7
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            mass: 0.5
          }}
          style={{
            width: "4px",
            height: "4px",
          }}
        />
      ))}
      
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 28 
        }}
        style={{
          width: "16px",
          height: "16px",
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full border-2 border-cyan-400"
        animate={{
          x: mousePosition.x - 14,
          y: mousePosition.y - 14,
          scale: [.8, 1, .8],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          x: { type: "spring", stiffness: 500, damping: 28 },
          y: { type: "spring", stiffness: 500, damping: 28 },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 4, repeat: Infinity, ease: "linear" }
        }}
        style={{
          width: "28px",
          height: "28px",
        }}
      />
    </>
  )
}