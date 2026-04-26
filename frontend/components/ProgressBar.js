import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total, skillName }) {
  const progress = (current / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-dark-accent/80 backdrop-blur-md border-b border-neon-purple/30 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Assessing Skills</p>
            <h3 className="text-xl font-bold text-neon-blue">{skillName}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Progress</p>
            <p className="text-xl font-bold text-neon-purple">
              {current} of {total}
            </p>
          </div>
        </div>

        <div className="w-full h-2 bg-dark-bg rounded-full overflow-hidden border border-neon-purple/20">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-purple to-neon-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <div className="mt-3 text-sm text-gray-500">
          {Math.round(progress)}% Complete
        </div>
      </div>
    </div>
  );
}
