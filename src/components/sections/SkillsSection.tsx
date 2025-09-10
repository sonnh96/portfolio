"use client";

import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { useRef, useState } from "react";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import {
  Code,
  ShieldAlert,
  Terminal,
  Cpu,
  Database,
  Network
} from "lucide-react";

export default function SkillsSection() {
  const { ref: titleRef, isInView: isTitleInView } = useScrollAnimation();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger section animation when in view
  if (isTitleInView) {
    controls.start("visible");
  }

  const skills = [
    {
      id: "cpp",
      name: "C/C++",
      icon: <Code className="h-12 w-12 group-hover:text-[#00599C] transition-colors duration-500" />,
      description: "Low-level programming with focus on system optimization",
      level: 95,
      color: "#00599C",
      category: "Programming Languages"
    },
    {
      id: "java",
      name: "Java",
      icon: <Cpu className="h-12 w-12 group-hover:text-[#E76F00] transition-colors duration-500" />,
      description: "Object-oriented development for robust applications",
      level: 85,
      color: "#E76F00",
      category: "Programming Languages"
    },
    {
      id: "python",
      name: "Python",
      icon: <Code className="h-12 w-12 group-hover:text-[#3776AB] transition-colors duration-500" />,
      description: "Versatile scripting for automation and data analysis",
      level: 90,
      color: "#3776AB",
      category: "Programming Languages"
    },
    {
      id: "go",
      name: "Go",
      icon: <Code className="h-12 w-12 group-hover:text-[#00ADD8] transition-colors duration-500" />,
      description: "Concurrent programming for efficient backend systems",
      level: 80,
      color: "#00ADD8",
      category: "Programming Languages"
    },
    {
      id: "hacking",
      name: "Ethical Hacking",
      icon: <ShieldAlert className="h-12 w-12 group-hover:text-[#FF5252] transition-colors duration-500" />,
      description: "Security vulnerability assessment and exploitation techniques",
      level: 92,
      color: "#FF5252",
      category: "Security"
    },
    {
      id: "pentesting",
      name: "Penetration Testing",
      icon: <Terminal className="h-12 w-12 group-hover:text-[#91FF8F] transition-colors duration-500" />,
      description: "Comprehensive system and network security assessment",
      level: 88,
      color: "#91FF8F",
      category: "Security"
    },
    {
      id: "network",
      name: "Network Security",
      icon: <Network className="h-12 w-12 group-hover:text-[#6366F1] transition-colors duration-500" />,
      description: "Securing network infrastructure against attacks",
      level: 85,
      color: "#6366F1",
      category: "Security"
    },
    {
      id: "database",
      name: "Database Security",
      icon: <Database className="h-12 w-12 group-hover:text-[#9F8FFF] transition-colors duration-500" />,
      description: "Protection of database systems from unauthorized access",
      level: 82,
      color: "#9F8FFF",
      category: "Security"
    },
  ];

  // Group skills by category
  const groupedSkills = skills.reduce((groups, skill) => {
    const category = skill.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
    return groups;
  }, {} as Record<string, typeof skills>);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-[#050816] to-[#0A101E] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#1a1e30]/30 to-transparent" />

        {/* Animated background circles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bg-shape-${i}`}
            className="absolute rounded-full bg-[#1E293B]/10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0
            }}
            initial={{ opacity: 0.03 }}
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="container px-4 mx-auto relative z-10 max-w-7xl">
        <motion.div
          ref={titleRef}
          variants={titleVariants}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
          className="mb-16 text-center relative"
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-[#91FF8F]/5 rounded-full blur-3xl" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-[#91FF8F] to-[#6366F1] mx-auto rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={isTitleInView ? { width: 80, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.p
            className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            My technical skills span from low-level programming to advanced cybersecurity techniques,
            enabling me to approach challenges from multiple perspectives.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <div key={category} className="relative">
              <motion.h3
                variants={categoryVariants}
                className="text-2xl font-bold mb-8 text-[#91FF8F] inline-block border-b-2 border-[#91FF8F]/30 pb-2"
              >
                {category}
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[#91FF8F]" />
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categorySkills.map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index + (categoryIndex * 10)} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface SkillCardProps {
  skill: {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    level: number;
    color: string;
  };
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const cardVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 10,
        delay: index * 0.05
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${skill.level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: index * 0.05 + 0.5
      }
    }
  };

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    x.set(mouseX);
    y.set(mouseY);
  }

  return (
    <motion.div
      className="group"
      variants={cardVariants}
      style={{
        perspective: 1000,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="h-full bg-[rgba(16,18,27,0.4)] border border-[rgba(255,255,255,0.1)] rounded-xl p-5 backdrop-blur-sm
                 relative overflow-hidden flex flex-col"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          boxShadow: isHovered ? `0 10px 30px -5px ${skill.color}20` : "0 10px 20px -5px rgba(0,0,0,0.2)"
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 200,
        }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br opacity-0 rounded-xl"
          style={{
            backgroundImage: `linear-gradient(135deg, ${skill.color}15, transparent 50%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Skill content with 3D effect */}
        <div className="relative flex flex-col h-full z-10">
          <div className="mb-4 flex justify-center items-center">
            <motion.div
              className="p-3 rounded-xl bg-[rgba(0,0,0,0.2)] backdrop-blur-sm text-white"
              animate={{
                y: isHovered ? -5 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {skill.icon}
            </motion.div>
          </div>

          <motion.h3
            className="text-xl font-bold mb-2 text-center"
            animate={{
              color: isHovered ? skill.color : "white",
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {skill.name}
          </motion.h3>

          <p className="text-gray-400 mb-4 text-sm text-center flex-grow">
            {skill.description}
          </p>

          <div className="mt-auto">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Proficiency</span>
              <span>{skill.level}%</span>
            </div>

            <div className="w-full h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                variants={progressVariants}
              />
            </div>

            {/* Animated dots on hover */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`dot-${i}`}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 4 + 2,
                      height: Math.random() * 4 + 2,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: skill.color,
                      opacity: 0
                    }}
                    animate={{
                      y: [0, -Math.random() * 50 - 20],
                      opacity: [0, 0.7, 0]
                    }}
                    transition={{
                      duration: Math.random() * 1 + 1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
