"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

// Demo projects data
const projects = [
  {
    id: "secure-vault",
    title: "SecureVault",
    description: "End-to-end encrypted password manager with zero-knowledge architecture and biometric authentication",
    image: "https://ext.same-assets.com/20230517/d89da2d1f3c27b6eb3bac1d3507e90e4.jpg",
    tags: ["Encryption", "Go", "React", "Security"],
    link: "#projects",
    github: "#projects",
    featured: true,
    color: "#00ADD8"
  },
  {
    id: "network-sentry",
    title: "Network Sentry",
    description: "Real-time network traffic analysis tool that detects and alerts on suspicious patterns",
    image: "https://ext.same-assets.com/20230517/5d8b4bceafb7f79de3a19c58fed2dc76.jpg",
    tags: ["Cybersecurity", "C++", "Machine Learning"],
    link: "#projects",
    github: "#projects",
    featured: true,
    color: "#FF5252"
  },
  {
    id: "threat-scanner",
    title: "ThreatScanner",
    description: "Automated vulnerability assessment platform for web applications and APIs",
    image: "https://ext.same-assets.com/20230517/e04e9c55df08d71b5b4b4c8be6d9e232.jpg",
    tags: ["Python", "Security", "Cloud"],
    link: "#projects",
    github: "#projects",
    featured: false,
    color: "#6366F1"
  },
  {
    id: "crypto-tracker",
    title: "CryptoTracker",
    description: "Real-time cryptocurrency portfolio tracker with advanced analytics and alerts",
    image: "https://ext.same-assets.com/20230517/5f6e85a14a3ea7ad3f42c58c33c8d2ff.jpg",
    tags: ["Java", "Finance", "API"],
    link: "#projects",
    github: "#projects",
    featured: false,
    color: "#E76F00"
  },
  {
    id: "sec-audit",
    title: "SecAudit",
    description: "Compliance and security audit automation tool for corporate environments",
    image: "https://ext.same-assets.com/20230517/eaea7fb626cb3ade0eb38a40d74f70ee.jpg",
    tags: ["Security", "Compliance", "Go"],
    link: "#projects",
    github: "#projects",
    featured: true,
    color: "#91FF8F"
  },
];

export default function ProjectsSection() {
  const { ref: titleRef, isInView: isTitleInView } = useScrollAnimation();
  const { ref: subtitleRef, isInView: isSubtitleInView } = useScrollAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Filter featured projects for the showcase
  const featuredProjects = projects.filter(project => project.featured);
  // Get remaining projects for the grid
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-[#0A101E] to-[#050816] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#91FF8F]/20 to-transparent" />
      <div className="absolute top-0 right-0 w-full h-[500px] bg-[#91FF8F]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-[#6366F1]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/3 opacity-40" />

      <div className="container px-4 mx-auto relative z-10 max-w-7xl">
        <div className="flex flex-col items-center justify-center mb-20">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white relative">
              Featured <span className="text-gradient">Projects</span>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12"
                initial={{ opacity: 0, scale: 0 }}
                animate={isTitleInView ? { opacity: 1, scale: 1, rotate: 180 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-[#91FF8F]/20 rounded-full blur-md" />
                  <motion.div
                    className="absolute inset-0 border-2 border-[#91FF8F]/40 rounded-full"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear"
                    }}
                  />
                </div>
              </motion.div>
            </h2>

            <motion.div
              className="h-1 w-40 bg-gradient-to-r from-[#91FF8F] to-[#6366F1] mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isTitleInView ? { width: 160 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.p
            ref={subtitleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isSubtitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 mt-6 max-w-2xl mx-auto text-center text-lg"
          >
            Explore a selection of my professional projects showcasing my skills in software development,
            cybersecurity, and system optimization.
          </motion.p>
        </div>

        {/* Featured Projects Showcase - Creative, large displays */}
        <div ref={containerRef} className="mb-32">
          {featuredProjects.map((project, index) => (
            <FeaturedProject
              key={project.id}
              project={project}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-[#91FF8F] pl-4">
            More Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    github: string;
    color: string;
  };
  index: number;
  progress?: any;
}

function FeaturedProject({ project, index, progress }: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Alternate layout for even/odd indexes
  const isEven = index % 2 === 0;

  // Create directional animations based on index
  const xInitial = isEven ? 100 : -100;

  // Create scroll-linked animations
  const parallaxY = useTransform(
    progress,
    [0, 1],
    [0, -50 + (index * 15)]
  );

  const springParallaxY = useSpring(parallaxY, {
    stiffness: 50,
    damping: 30
  });

  return (
    <motion.div
      ref={ref}
      style={{ y: springParallaxY }}
      className={`relative mb-32 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
    >
      {/* Project Image - with parallax and hover effects */}
      <motion.div
        className="w-full md:w-7/12 relative group overflow-hidden rounded-xl"
        initial={{ opacity: 0, x: xInitial, scale: 0.9 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
      >
        <div className="relative overflow-hidden rounded-xl group">
          {/* Background glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#91FF8F] to-[#6366F1] opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-500 z-0 rounded-xl" />

          <div className="relative p-1 bg-[#0D1117] rounded-xl overflow-hidden z-10">
            {/* Image */}
            <motion.div
              className="relative aspect-video overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 z-10" />
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Animated overlay links */}
              <div className="absolute bottom-0 right-0 p-4 z-20 flex gap-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <a
                  href={project.github}
                  className="bg-black/60 backdrop-blur-sm hover:bg-black/80 p-2 rounded-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 text-white" />
                </a>
                <a
                  href={project.link}
                  className="bg-white p-2 rounded-full hover:bg-[#91FF8F]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-5 w-5 text-black" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Project Info */}
      <motion.div
        className="w-full md:w-5/12"
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.span
          style={{ color: project.color }}
          className="text-sm font-mono mb-2 inline-block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Featured Project
        </motion.span>

        <motion.h3
          className="text-2xl md:text-3xl font-bold mb-3 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {project.title}
        </motion.h3>

        <motion.div
          className="p-5 rounded-lg backdrop-blur-sm bg-[rgba(13,17,23,0.8)] shadow-xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-300">{project.description}</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {project.tags.map((tag) => (
            <span
              key={`${project.id}-${tag}`}
              className="px-3 py-1 text-xs font-mono rounded-full bg-[rgba(145,255,143,0.1)] text-[#91FF8F]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a
            href={project.github}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            <span>Code</span>
            <div className="w-0 group-hover:w-full h-px bg-white transition-all duration-300" />
          </a>
          <a
            href={project.link}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Live Demo</span>
            <div className="w-0 group-hover:w-full h-px bg-white transition-all duration-300" />
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: ProjectProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        className="h-full rounded-xl overflow-hidden bg-[#0D1117] border border-[#1E293B] transition-all duration-300
                  group-hover:border-[#91FF8F]/30 group-hover:shadow-[0_0_20px_rgba(145,255,143,0.15)]"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Project Image */}
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] to-transparent opacity-80" />

          {/* Floating action button */}
          <motion.a
            href={project.link}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-black
                       shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.2, backgroundColor: "#91FF8F" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#91FF8F] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={`${project.id}-card-${tag}`}
                className="px-2 py-1 text-xs rounded-md bg-[rgba(255,255,255,0.05)] text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
