"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Coffee,
  ExternalLink,
  Github,
  Heart,
  Linkedin,
  Mail,
  Phone,
  Rocket,
  Sparkles,
  Twitter
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: Github,
      color: "hover:text-gray-400"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/shakilahmed5161",
      icon: Linkedin,
      color: "hover:text-blue-400"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: Twitter,
      color: "hover:text-sky-400"
    },
    {
      name: "Email",
      url: "mailto:shakilahmed5161@gmail.com",
      icon: Mail,
      color: "hover:text-red-400"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];

  const serviceLinks = [
    { name: "Web Development", href: "#" },
    { name: "Shopify Development", href: "#" },
    { name: "E-commerce Solutions", href: "#" },
    { name: "API Integration", href: "#" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-slate-700/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,black,transparent)]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
            }}
            animate={{
              y: [0, -20, 0],
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-4">
              <motion.div
                className="flex items-center gap-3 group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition-opacity"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Shakil Ahmed</h3>
                  <p className="text-cyan-300 text-sm">Software Engineer</p>
                </div>
              </motion.div>
            </Link>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Crafting exceptional digital experiences with modern technologies 
              and innovative solutions. Let's build something amazing together!
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-gray-400 transition-all ${social.color} hover:border-cyan-500/50 hover:bg-slate-800/80 hover:scale-110`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors group"
                  >
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-purple-400" />
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <motion.li
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors group"
                  >
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform" />
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <motion.a
                href="tel:01641969790"
                className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <span>01641969790</span>
              </motion.a>

              <motion.a
                href="mailto:shakilahmed5161@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <span>shakilahmed5161@gmail.com</span>
              </motion.a>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <motion.a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" />
                  Start a Project
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>© {currentYear} Shakil Ahmed. All rights reserved.</span>
            <span className="text-gray-600">•</span>
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>and lots of</span>
              <Coffee className="w-4 h-4 text-amber-600" />
            </motion.div>
          </div>

          {/* Additional Links */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400">Available for work</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all z-50"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Rocket className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  );
}