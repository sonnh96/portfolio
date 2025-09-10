"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import {
  Terminal,
  MapPin,
  MessageSquare,
  Code,
  Monitor,
  Cpu,
  Github,
  Shield
} from "lucide-react";

export default function AboutSection() {
  const { ref: titleRef, isInView: isTitleInView } = useScrollAnimation();
  const { ref: contentRef, isInView: isContentInView } = useScrollAnimation({ amount: 0.2 });
  const { ref: statsRef, isInView: isStatsInView } = useScrollAnimation({ amount: 0.3 });
  const terminalRef = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Terminal animation state
  const [terminalLine, setTerminalLine] = useState(0);
  const terminalLines = [
    { command: "whoami", output: "sonnh" },
    { command: "cat profile.json", output: JSON.stringify({
      name: "Nguyen Hong Son",
      location: "Cau Giay, Ha Noi, Viet Nam",
      occupation: "Professional Developer & Security Expert",
      skills: ["C/C++", "Java", "Python", "Go"],
      interests: ["Cybersecurity", "System Architecture", "Video Games"]
    }, null, 2) },
    { command: "uname -a", output: "Arch Linux x86_64" },
    { command: "cat /etc/contact.info", output: "Telegram: @sonnh96" },
  ];

  // Advance terminal lines every 3 seconds
  useState(() => {
    const interval = setInterval(() => {
      setTerminalLine((prev) => (prev + 1) % terminalLines.length);
    }, 4000);

    return () => clearInterval(interval);
  });

  // Stats animation
  const stats = [
    { label: "Years Coding", value: "5+", icon: <Code className="h-5 w-5 text-[#91FF8F]" /> },
    { label: "Projects", value: "25+", icon: <Github className="h-5 w-5 text-[#91FF8F]" /> },
    { label: "Systems", value: "100+", icon: <Cpu className="h-5 w-5 text-[#91FF8F]" /> },
    { label: "Security Audits", value: "50+", icon: <Shield className="h-5 w-5 text-[#91FF8F]" /> },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 relative overflow-hidden bg-gradient-to-b from-[#050816] to-[#0A101E]"
    >
      {/* Background decorations */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#91FF8F]/5 rounded-full blur-[100px]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        {/* Line decorations */}
        <div className="absolute top-20 left-10 w-[1px] h-[30%] bg-gradient-to-b from-[#91FF8F]/50 to-transparent" />
        <div className="absolute top-1/3 right-10 w-[1px] h-[40%] bg-gradient-to-b from-[#91FF8F]/20 to-transparent" />
      </motion.div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-7xl">
        <motion.div
          ref={titleRef}
          style={{ y: contentY }}
          className="mb-16 relative"
        >
          <div className="flex flex-col items-center justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-4xl md:text-5xl font-bold mb-3 text-center"
            >
              About <span className="text-gradient">Me</span>
            </motion.h2>

            <motion.div
              className="h-1 w-16 bg-gradient-to-r from-[#91FF8F] to-[#6366F1] rounded-full"
              initial={{ width: 0 }}
              animate={isTitleInView ? { width: 64 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-gray-400 max-w-2xl text-center mt-6 text-lg"
            >
              Professional developer and cybersecurity specialist with a passion for
              building secure, optimized systems and exploring security vulnerabilities.
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left side content */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="p-1 bg-gradient-to-r from-[#91FF8F]/30 to-[#6366F1]/30 rounded-xl">
                <div className="bg-[#0D1117] p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    <span className="text-gradient">Nguyen Hong Son</span>
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    I am a passionate technologist with expertise in software development and cybersecurity.
                    My journey in technology is driven by the desire to build robust systems and uncover
                    security vulnerabilities that others might miss.
                  </p>

                  <p className="text-gray-300 mb-8 leading-relaxed">
                    With a foundation in multiple programming languages and a deep understanding of
                    system architecture, I approach problems from both a developer and security
                    perspective, finding optimal solutions that are both efficient and secure.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem
                      icon={<MapPin className="h-5 w-5 text-[#91FF8F]" />}
                      title="Location"
                      value="Cau Giay, Ha Noi, Viet Nam"
                    />
                    <InfoItem
                      icon={<Monitor className="h-5 w-5 text-[#91FF8F]" />}
                      title="Operating System"
                      value="Arch Linux"
                    />
                    <InfoItem
                      icon={<Code className="h-5 w-5 text-[#91FF8F]" />}
                      title="Tech Stack"
                      value="C/C++, Java, Python, Go"
                    />
                    <InfoItem
                      icon={<MessageSquare className="h-5 w-5 text-[#91FF8F]" />}
                      title="Contact"
                      value="Telegram: @sonnh96"
                      link="https://t.me/sonnh96"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Counters */}
              <motion.div
                ref={statsRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
                    className="bg-[rgba(13,17,23,0.8)] backdrop-blur-sm border border-[#1E293B] p-4 rounded-lg text-center group hover:border-[#91FF8F]/30 transition-colors duration-300"
                  >
                    <div className="rounded-full bg-[rgba(145,255,143,0.1)] p-2 w-10 h-10 flex items-center justify-center mx-auto mb-2 group-hover:bg-[rgba(145,255,143,0.2)] transition-colors duration-300">
                      {stat.icon}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isStatsInView ? { opacity: 1 } : {}}
                      transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                      className="text-xl font-bold text-white"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Decorative glowing orb */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#91FF8F]/5 rounded-full blur-[50px] pointer-events-none" />
          </motion.div>

          {/* Right side terminal */}
          <motion.div
            ref={terminalRef}
            initial={{ opacity: 0, x: 50, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
            className="lg:mt-20"
          >
            <div className="bg-[#0D1117] rounded-lg border border-[#30363D] shadow-2xl overflow-hidden">
              <div className="flex items-center bg-[#161B22] px-4 py-3 border-b border-[#30363D]">
                <Terminal className="h-5 w-5 text-[#91FF8F] mr-2" />
                <span className="text-sm font-mono text-gray-300">sonnh@ubuntu:~</span>
                <div className="ml-auto flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                  <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
                </div>
              </div>

              <div className="p-4 md:p-6 font-mono text-sm md:text-base h-80 overflow-y-auto terminal-scrollbar">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={`cmd-${i}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: i <= terminalLine ? 1 : 0,
                      height: i <= terminalLine ? "auto" : 0
                    }}
                    transition={{ duration: 0.5, delay: i === terminalLine ? 0.2 : 0 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="flex items-center mb-1">
                      <span className="text-[#5D6CBC]">sonnh@ubuntu</span>
                      <span className="text-gray-400">:</span>
                      <span className="text-[#6A9955]">~</span>
                      <span className="text-gray-400">$</span>
                      <motion.span
                        className="text-gray-300 ml-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: i === terminalLine ? 0.3 : 0 }}
                      >
                        {line.command}
                      </motion.span>
                    </div>

                    <motion.pre
                      className="text-[#e2e2e2] ml-2 overflow-x-auto whitespace-pre-wrap break-all"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: i === terminalLine ? 0.8 : 0 }}
                    >
                      {line.output}
                    </motion.pre>
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex items-center"
                >
                  <span className="text-[#5D6CBC]">sonnh@ubuntu</span>
                  <span className="text-gray-400">:</span>
                  <span className="text-[#6A9955]">~</span>
                  <span className="text-gray-400">$</span>
                  <span className="ml-2 h-4 w-2 bg-white animate-blink" />
                </motion.div>
              </div>
            </div>

            {/* Matrix-like falling characters animation */}
            <div className="absolute mt-4">
              <MatrixRain />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Info item component
function InfoItem({ icon, title, value, link }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="rounded-full bg-[rgba(145,255,143,0.1)] p-2 flex items-center justify-center
                    group-hover:bg-[rgba(145,255,143,0.2)] transition-colors duration-300 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-1">{title}</h4>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white group-hover:text-[#91FF8F] transition-colors duration-300"
          >
            {value}
          </a>
        ) : (
          <p className="text-white">{value}</p>
        )}
      </div>
    </div>
  );
}

// Matrix-like rain animation (a subtle effect in the background)
function MatrixRain() {
  const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const columns = 10;
  const raindrops = Array.from({ length: columns }, (_, i) => ({
    id: `raindrop-${i}`,
    x: Math.random() * 100,
    speed: Math.random() * 1 + 0.5,
    chars: Array.from({ length: Math.floor(Math.random() * 5) + 3 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    )
  }));

  return (
    <div className="pointer-events-none select-none fixed">
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-[#91FF8F]/20 text-xs font-mono"
          style={{ left: `${drop.x}%` }}
        >
          {drop.chars.map((char, i) => (
            <motion.div
              key={`${drop.id}-${i}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: 800,
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: drop.speed * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "linear"
              }}
            >
              {char}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
