import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowDown, FaDownload, FaHome } from 'react-icons/fa';
import Link from 'next/link';

export default function ResultsDashboard({ results, onRestart }) {
  const [activeTab, setActiveTab] = useState('skills');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'from-green-500 to-emerald-500';
    if (score >= 6) return 'from-blue-500 to-cyan-500';
    if (score >= 4) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return 'Expert';
    if (score >= 6) return 'Proficient';
    if (score >= 4) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto text-center mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink bg-clip-text text-transparent">
            Your Assessment Results
          </span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 mb-8"
        >
          Here's your personalized learning plan based on your assessment
        </motion.p>

        {/* Summary Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'Skills Assessed', value: results.summary.totalSkillsAssessed },
            { label: 'Skill Gaps', value: results.summary.skillsWithGaps },
            { label: 'Avg Score', value: results.summary.averageScore },
            { label: 'Learning Time', value: results.summary.estimatedLearningTime },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass rounded-lg p-4 border border-neon-purple/30"
              whileHover={{ y: -5 }}
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-neon-blue">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          {[
            { id: 'skills', label: '📊 Skill Scores' },
            { id: 'gaps', label: '⚠️ Skill Gaps' },
            { id: 'learning', label: '🎯 Learning Plan' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-neon-glow'
                  : 'glass text-gray-300 hover:text-white border border-neon-purple/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Skill Scores */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6"
            >
              {results.skillScores.map((skill, i) => (
                <motion.div
                  key={skill.skill}
                  variants={itemVariants}
                  className="glass rounded-xl p-6 border border-neon-purple/30 hover:border-neon-purple/50"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{skill.skill}</h3>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-neon-blue">{skill.score}</p>
                      <p className="text-sm text-gray-400">/ 10</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full h-3 bg-dark-bg rounded-full overflow-hidden border border-neon-purple/20">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${getScoreColor(skill.score)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(skill.score / 10) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: i * 0.1 }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-neon-blue/20 text-neon-blue text-sm font-semibold">
                        {getScoreLabel(skill.score)}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-sm">
                        {Math.round(skill.probability * 100)}% Confidence
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {skill.assessmentCount} questions answered
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Skill Gaps */}
          {activeTab === 'gaps' && (
            <motion.div
              key="gaps"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6"
            >
              {results.skillGaps.length > 0 ? (
                results.skillGaps.map((skill, i) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    className="glass rounded-xl p-6 border border-neon-pink/30 bg-neon-pink/5"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{i + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{skill}</h3>
                        <p className="text-sm text-gray-400">
                          Priority #{i + 1} - Start with this skill
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-neon-pink">0</p>
                        <p className="text-xs text-gray-400">Current</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-12 glass rounded-xl border border-neon-blue/30"
                >
                  <p className="text-xl text-neon-blue font-semibold mb-2">✨ No Skill Gaps!</p>
                  <p className="text-gray-400">You already possess all required skills!</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Learning Plan */}
          {activeTab === 'learning' && (
            <motion.div
              key="learning"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {results.learningPlan.map((item, i) => (
                <motion.div
                  key={item.skill}
                  variants={itemVariants}
                  className="glass rounded-xl p-6 border border-neon-blue/30 overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-neon-purple/20">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-neon-purple">#{item.priority}</span>
                        <h3 className="text-2xl font-bold text-white">{item.skill}</h3>
                      </div>
                      <p className="text-sm text-gray-400">
                        ⏱️ Estimated time: {item.timeToLearn}
                      </p>
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-neon-blue mb-4">📚 Recommended Resources:</p>
                    {item.resources.map((resource, j) => (
                      <motion.div
                        key={j}
                        className="flex items-start gap-4 p-3 bg-dark-accent/50 rounded-lg hover:bg-dark-accent/80 transition border border-neon-purple/20"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-neon-blue/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-neon-blue">
                            {resource.type === 'Course' && '🎓'}
                            {resource.type === 'Tutorial' && '📖'}
                            {resource.type === 'YouTube' && '▶️'}
                            {resource.type === 'Docs' && '📚'}
                            {resource.type === 'Project' && '🛠️'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white">{resource.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{resource.type} • {resource.time}</p>
                        </div>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neon-blue hover:text-neon-purple text-sm font-semibold"
                        >
                          Visit →
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="max-w-6xl mx-auto mt-16 flex gap-6 justify-center flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.button
          onClick={() => {
            const element = document.createElement('a');
            element.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(results, null, 2))}`);
            element.setAttribute('download', 'assessment-results.json');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }}
          className="px-8 py-4 rounded-lg glass border border-neon-blue/50 text-white font-semibold flex items-center gap-2 hover:border-neon-blue hover:bg-neon-blue/5"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload />
          Download Results
        </motion.button>

        <motion.button
          onClick={onRestart}
          className="px-8 py-4 rounded-lg glass border border-neon-purple/50 text-white font-semibold flex items-center gap-2 hover:border-neon-purple hover:bg-neon-purple/5"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaHome />
          Start New Assessment
        </motion.button>

        <Link href="/">
          <motion.a
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue text-white font-semibold flex items-center gap-2 hover:shadow-neon-glow"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(157, 78, 221, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome />
            Go Home
          </motion.a>
        </Link>
      </motion.div>
    </div>
  );
}
