import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-neon-purple/30"
        >
          <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
          <span className="text-sm text-gray-300">AI-Powered Skill Assessment</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink bg-clip-text text-transparent">
            Deccan AI Career Coach
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your career with AI-powered skill assessment and personalized learning plans.
          Identify gaps, get expert guidance, and accelerate your growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <motion.a
            href="#assessment"
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue text-white font-semibold flex items-center justify-center space-x-2 hover:shadow-neon-glow"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(157, 78, 221, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Assessment</span>
            <FaArrowRight />
          </motion.a>
          <motion.button
            className="px-8 py-4 rounded-lg glass-thick text-white font-semibold border border-neon-blue/50 hover:border-neon-blue"
            whileHover={{ scale: 1.05, borderColor: '#00d4ff' }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            { icon: '🎯', title: 'Skill Assessment', desc: 'AI-powered evaluation of your abilities' },
            { icon: '📊', title: 'Gap Analysis', desc: 'Identify missing skills instantly' },
            { icon: '🚀', title: 'Learning Plan', desc: 'Personalized roadmap with resources' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 glass rounded-xl border border-neon-purple/20 hover:border-neon-purple/50"
              whileHover={{ y: -5, boxShadow: '0 0 20px rgba(157, 78, 221, 0.3)' }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
