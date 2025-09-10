"use client";

import { useEffect, useState } from "react";
import { motion, type Variant } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useEffect(() => {
    const handleLinkHoverEvents = () => {
      const links = document.querySelectorAll("a, button, [role=button]");
      const enterHandler = () => setCursorVariant("link");
      const leaveHandler = () => setCursorVariant("default");

      for (const link of Array.from(links)) {
        link.addEventListener("mouseenter", enterHandler);
        link.addEventListener("mouseleave", leaveHandler);
      }

      return () => {
        for (const link of Array.from(links)) {
          link.removeEventListener("mouseenter", enterHandler);
          link.removeEventListener("mouseleave", leaveHandler);
        }
      };
    };

    // Call it once on mount, but also set up a MutationObserver to keep track of DOM changes
    const cleanup = handleLinkHoverEvents();

    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, []);

  const variants: Record<string, Variant> = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(145, 255, 163, 0.05)",
      border: "1.5px solid rgba(145, 255, 163, 0.5)",
      transition: { type: "spring", mass: 0.1, stiffness: 100 },
    },
    link: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(145, 255, 163, 0.2)",
      border: "1.5px solid rgba(145, 255, 163, 0.7)",
      transition: { type: "spring", mass: 0.3, stiffness: 150 },
    },
  };

  // Only show custom cursor on desktop devices
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 rounded-full pointer-events-none mix-blend-difference"
      variants={variants}
      animate={cursorVariant}
    />
  );
}
