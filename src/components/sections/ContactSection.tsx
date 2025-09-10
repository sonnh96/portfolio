"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { Send, ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const { ref: titleRef, isInView: isTitleInView } = useScrollAnimation();
  const { ref: contentRef, isInView: isContentInView } = useScrollAnimation({ amount: 0.2 });

  // Predefined background circles with fixed positions
  const backgroundCircles = [
    { id: "bg-circle-1", width: 250, height: 250, left: "10%", top: "20%", delay: 0 },
    { id: "bg-circle-2", width: 180, height: 180, left: "70%", top: "15%", delay: 0.7 },
    { id: "bg-circle-3", width: 300, height: 300, left: "25%", top: "65%", delay: 1.4 },
    { id: "bg-circle-4", width: 120, height: 120, left: "80%", top: "60%", delay: 2.1 },
    { id: "bg-circle-5", width: 220, height: 220, left: "50%", top: "40%", delay: 2.8 },
  ];

  return (
    <section id="contact" className="py-20 bg-[#0A0F1E] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundCircles.map((circle) => (
          <motion.div
            key={circle.id}
            className="absolute rounded-full bg-gradient-to-br from-[#91FF8F]/10 to-[#6366F1]/5"
            style={{
              width: `${circle.width}px`,
              height: `${circle.height}px`,
              left: circle.left,
              top: circle.top,
            }}
            initial={{ opacity: 0.05, scale: 0.8 }}
            animate={{
              opacity: [0.05, 0.08, 0.05],
              scale: [0.8, 1, 0.8],
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: circle.delay,
            }}
          />
        ))}
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#91FF8F] to-[#6366F1] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Feel free to reach out if you want to collaborate on a project,
            discuss cybersecurity, or just have a tech chat.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-[#0D1117] border border-[#30363D] rounded-xl p-8 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#91FF8F] flex items-center">
                  <MessageSquare className="mr-2 h-6 w-6" />
                  Let's Connect
                </h3>
                <p className="text-gray-300 mb-6">
                  I'm currently active on Telegram. Feel free to send me a message
                  and I'll get back to you as soon as possible.
                </p>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-[rgba(145,255,143,0.1)] flex items-center justify-center mr-4">
                      <Send className="h-5 w-5 text-[#91FF8F]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Telegram</h4>
                      <a
                        href="https://t.me/sonnh96"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#91FF8F] hover:underline flex items-center"
                      >
                        @sonnh96 <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href="https://t.me/sonnh96"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-gradient-to-r from-[#91FF8F] to-[#6366F1] hover:opacity-90 text-black">
                      Message on Telegram <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </motion.div>
              </div>

              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, rotate: -5 }}
                  animate={isContentInView ? { opacity: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 transform rotate-3 shadow-lg w-full max-w-md"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-3 w-3 rounded-full bg-[#FF5F56] mr-2" />
                    <div className="h-3 w-3 rounded-full bg-[#FFBD2E] mr-2" />
                    <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
                    <div className="ml-auto text-xs text-gray-500 font-mono">terminal</div>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-400"
                    >
                      $ echo "Hello! 👋"
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-white"
                    >
                      Hello! 👋
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-gray-400"
                    >
                      $ curl -s https://api.example.com/availability
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      className="text-green-400"
                    >
                      {"{"} "status": "available", "for_new_projects": true {"}"}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5 }}
                      className="text-gray-400"
                    >
                      $ open https://t.me/sonnh96
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3 }}
                      className="text-white"
                    >
                      Opening Telegram...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.5 }}
                      className="flex"
                    >
                      <span className="text-gray-400">$ </span>
                      <span className="ml-1 h-4 w-2 bg-white animate-blink" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
