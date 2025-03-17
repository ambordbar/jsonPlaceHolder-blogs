"use client";

import { motion } from "framer-motion";
import Loader from "../ui/loader";

interface AuthLoaderProps {
  message?: string;
}

export default function AuthLoader({
  message = "Please wait...",
}: AuthLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white/10 p-6 rounded-lg shadow-lg text-center space-y-4">
        <Loader size="md" />
        <p className="text-white text-sm">{message}</p>
      </div>
    </motion.div>
  );
}
