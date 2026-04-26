import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';

export default function Navigation() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-thick"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-2 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg">
              <FaBrain className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              Deccan Career Coach
            </span>
          </motion.div>
        </Link>

        {/* Menu */}
        <div className="flex items-center space-x-8">
          <motion.a
            href="#features"
            className="text-gray-300 hover:text-white transition"
            whileHover={{ y: -2 }}
          >
            Features
          </motion.a>
          <motion.a
            href="#assessment"
            className="text-gray-300 hover:text-white transition"
            whileHover={{ y: -2 }}
          >
            Assessment
          </motion.a>
          <motion.button
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue text-white font-semibold hover:shadow-neon-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
