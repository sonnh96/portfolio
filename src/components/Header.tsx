"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "#home";

      // Detect if scrolled past threshold for header styling
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine which section is in view
      for (const section of Array.from(sections)) {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        const sectionHeight = htmlSection.clientHeight;

        if (window.scrollY >= sectionTop - 200 &&
            window.scrollY < sectionTop + sectionHeight - 200) {
          const id = htmlSection.getAttribute("id");
          if (id) {
            currentSection = `#${id}`;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0F1E]/90 backdrop-blur-md shadow-md py-3" : "py-5"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => scrollToSection("#home")}
            className="text-xl font-bold flex items-center"
          >
            <span className="text-white mr-1">Nguyen</span>
            <span className="text-gradient mr-1">Hong</span>
            <span className="text-gradient font-mono">Son</span>
          </button>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center space-x-6"
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                activeSection === link.href
                  ? "text-[#91FF8F]"
                  : "text-white hover:text-[#91FF8F]"
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              whileHover={{ scale: 1.05 }}
              custom={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            >
              {link.name}
              {activeSection === link.href && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#91FF8F] w-full"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: navLinks.length * 0.1 + 0.2 }}
          >
            <a href="https://t.me/sonnh96" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-[#91FF8F] to-[#6366F1] hover:opacity-90 text-black">
                Contact Me
              </Button>
            </a>
          </motion.div>
        </motion.nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white p-2"
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#0A0F1E] border-l border-[#30363D] w-[300px] p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold">
                  <span className="text-gradient font-mono">Nguyen Hong</span>
                  <span className="text-white ml-1">Son</span>
                </span>
                <SheetTrigger>
                  <X className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                </SheetTrigger>
              </div>

              <nav className="flex flex-col space-y-6">
                <AnimatePresence>
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className={`text-lg font-medium ${
                        activeSection === link.href
                          ? "text-[#91FF8F]"
                          : "text-white hover:text-[#91FF8F]"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </AnimatePresence>
              </nav>

              <div className="mt-auto pt-8">
                <a href="https://t.me/sonnh96" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-gradient-to-r from-[#91FF8F] to-[#6366F1] hover:opacity-90 text-black">
                    Contact Me
                  </Button>
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
