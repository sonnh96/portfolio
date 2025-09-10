"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "@/components/animations/ParticlesBackground";
import TypewriterText from "@/components/animations/TypewriterText";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.5,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Particle background */}
      <ParticlesBackground />

      {/* Content */}
      <motion.div
        className="container z-10 px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-block px-4 py-2 bg-secondary/60 backdrop-blur-sm rounded-full text-sm font-medium">
            Developer • Hacker • Pentester
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
        >
          <span className="block">Hello, I am</span>
          <span className="text-gradient glow">Nguyen Hong Son</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono"
        >
          I am a <TypewriterText
            words={["Developer", "Hacker", "Pentester", "Tech Enthusiast"]}
            className="text-terminal-green"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center"
        >
          <Button className="bg-gradient-to-r from-[#91FF8F] to-[#6366F1] hover:opacity-90 text-black">
            View Projects
          </Button>
          <Button variant="outline" className="border-[#91FF8F] text-[#91FF8F] hover:bg-[#91FF8F]/10">
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="text-[#91FF8F] h-8 w-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
