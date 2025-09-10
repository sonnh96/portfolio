"use client";

import { useInView, type UseInViewOptions } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation(options: UseInViewOptions = { once: true, amount: 0.3 }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, options);

  return { ref, isInView };
}
