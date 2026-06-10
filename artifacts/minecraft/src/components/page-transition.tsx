import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePerformanceConfig } from "@/lib/performance";

export default function PageTransition({ children }: { children: ReactNode }) {
  const config = usePerformanceConfig();

  if (!config.enablePageTransitions) {
    return <>{children}</>;
  }

  if (config.enable3DPageTransition) {
    return (
      <motion.div
        initial={{ opacity: 0, rotateY: -12, scale: 0.95, z: -80 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
        exit={{ opacity: 0, rotateY: 12, scale: 0.95, z: -80 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
