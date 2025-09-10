"use client";

import { motion } from "framer-motion";
import { HeartIcon, Send } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080B14] border-t border-[#30363D] py-8">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 md:mb-0"
          >
            <span className="text-xl font-bold flex items-center">
              <span className="text-white mr-1">Nguyen</span>
              <span className="text-gradient mr-1">Hong</span>
              <span className="text-gradient font-mono">Son</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center text-sm text-gray-400"
          >
            <div className="mb-2 md:mb-0 md:mr-6 flex items-center">
              <span>Crafted with</span>
              <HeartIcon className="h-4 w-4 mx-1 text-[#FF5252]" />
              <span>using modern web technologies</span>
            </div>

            <div className="flex items-center">
              <span>© {currentYear} Nguyen Hong Son</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 md:mt-0"
          >
            <motion.a
              href="https://t.me/sonnh96"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#91FF8F] hover:underline"
              whileHover={{ x: 3 }}
            >
              <Send className="h-4 w-4 mr-1" />
              <span>Contact on Telegram</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
