"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion, Transition, Variants } from "framer-motion";

const generateFloatVariant = (delay?: number): Variants => {
  const duration = Math.random() * 2 + 3;
  const amplitude = Math.random() * 10 + 20;

  const transition: Transition = {
    y: {
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      delay: delay || 0,
    },
  };

  return {
    initial: { y: 0 },
    animate: { y: [0, -amplitude, 0], transition },
  };
};

const EdgeAccents: React.FC = () => {
  const planetVariant = useMemo(() => generateFloatVariant(), []);
  const shipVariant = useMemo(() => generateFloatVariant(1.5), []);

  return (
    <div className="w-full h-screen absolute overflow-hidden pointer-events-none">
      <motion.div
        variants={planetVariant}
        initial="initial"
        animate="animate"
        className="absolute -left-50 top-1/2 -translate-y-1/2 hidden md:block"
      >
        <Image
          src="/planet.png"
          alt="Planet"
          width={400}
          height={400}
          className="object-contain"
          priority
          style={{ width: "100%", height: "auto" }} // <-- This fixes the warning!
        />
      </motion.div>

      <motion.div
        variants={shipVariant}
        initial="initial"
        animate="animate"
        className="absolute -right-50 top-1/2 -translate-y-1/2 hidden md:block"
      >
        <Image
          src="/spaceship.png"
          alt="Spaceship"
          width={400}
          height={400}
          className="object-contain"
          priority
          style={{ width: "100%", height: "auto" }} // <-- This too!
        />
      </motion.div>
    </div>
  );
};

export default EdgeAccents;
