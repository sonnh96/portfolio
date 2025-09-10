"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
}

export default function TypewriterText({
  words,
  className = "",
  cursorClassName = "after:content-['|'] after:ml-1 after:animate-blink",
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    if (!words.length) return;

    const word = words[currentWordIndex];

    if (phase === "typing") {
      if (currentText.length < word.length) {
        const timeoutId = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length + 1));
        }, 100); // Typing speed
        return () => clearTimeout(timeoutId);
      }

      const timeoutId = setTimeout(() => setPhase("deleting"), 1500); // Wait before deleting
      return () => clearTimeout(timeoutId);
    }

    if (currentText.length > 0) {
      const timeoutId = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length - 1));
      }, 50); // Deleting speed
      return () => clearTimeout(timeoutId);
    }

    setPhase("typing");
    setCurrentWordIndex((currentWordIndex + 1) % words.length);
  }, [words, currentWordIndex, currentText, phase]);

  return (
    <motion.span
      className={`${className} ${cursorClassName} font-mono`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {currentText}
    </motion.span>
  );
}
