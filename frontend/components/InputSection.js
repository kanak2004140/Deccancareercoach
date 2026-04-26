import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaFileUpload, FaPaste, FaArrowRight } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '../utils/api';

export default function InputSection() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      toast.success('Resume selected!');
    }
  };

  const handleStartAssessment = async () => {
    try {
      if (!resumeFile || !jdText.trim()) {
        toast.error('Please upload resume and paste job description');
        return;
      }

      setLoading(true);

      // Read resume file
      const resumeText = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsText(resumeFile);
      });

      // Initialize assessment
      const response = await api.initializeAssessment(resumeText, jdText);
      const sessionId = response.data.sessionId;

      // Store session data
      localStorage.setItem('assessmentSession', JSON.stringify({
        sessionId,
        skillGaps: response.data.skillGaps,
        requiredSkills: response.data.requiredSkills,
      }));

      toast.success('Assessment initialized! Starting assessment...');
      router.push(`/assessment?sessionId=${sessionId}`);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.error || 'Failed to initialize assessment');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="assessment" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <Toaster position="top-right" />
      
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              Upload Your Documents
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Paste your resume and job description to get started with the assessment
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          <motion.button
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-neon-glow'
                : 'glass text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('upload')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFileUpload className="inline mr-2" />
            Upload Resume
          </motion.button>
          <motion.button
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'paste'
                ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-neon-glow'
                : 'glass text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('paste')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaste className="inline mr-2" />
            Paste Data
          </motion.button>
        </div>

        {/* Form */}
        <motion.div
          className="glass rounded-2xl p-8 border border-neon-purple/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label className="block text-lg font-semibold mb-4 text-neon-blue">
                📄 Resume
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.txt,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className={`block w-full p-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition ${
                    resumeFile
                      ? 'border-neon-blue/50 bg-neon-blue/5'
                      : 'border-neon-purple/50 hover:border-neon-purple/80'
                  }`}
                >
                  {resumeFile ? (
                    <div className="text-neon-blue">
                      <FaFileUpload className="text-3xl mx-auto mb-2" />
                      <p className="font-semibold">{resumeFile.name}</p>
                      <p className="text-sm text-gray-400">Click to change</p>
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      <FaFileUpload className="text-3xl mx-auto mb-2" />
                      <p className="font-semibold mb-1">Drop your resume here</p>
                      <p className="text-sm">or click to browse (PDF, TXT, DOCX)</p>
                    </div>
                  )}
                </label>
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label className="block text-lg font-semibold mb-4 text-neon-blue">
                📋 Job Description
              </label>
              <textarea
                placeholder="Paste the job description here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                className="w-full h-32 p-4 rounded-xl glass border border-neon-purple/50 focus:border-neon-blue/80 focus:shadow-neon-blue-glow resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {jdText.length} characters
              </p>
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleStartAssessment}
            disabled={loading || !resumeFile || !jdText.trim()}
            className="w-full mt-8 px-8 py-4 rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold text-lg flex items-center justify-center space-x-2 hover:shadow-neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(157, 78, 221, 0.8)' }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Start Assessment</span>
                <FaArrowRight />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Sample Data */}
        <motion.div
          className="mt-8 p-6 glass rounded-xl border border-neon-blue/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-400 mb-4">
            💡 Try with sample data to see how it works:
          </p>
          <motion.button
            onClick={() => {
              const sampleJD = `Senior Full Stack Developer
              
Requirements:
- 5+ years JavaScript/TypeScript experience
- React.js expertise
- Node.js & Express
- MongoDB & PostgreSQL
- AWS & Docker
- REST API & GraphQL
- Git & CI/CD
- System design

Responsibilities:
- Build scalable web applications
- Lead technical discussions
- Mentor junior developers
- Optimize performance`;
              setJdText(sampleJD);
              toast.success('Sample JD loaded!');
            }}
            className="text-neon-blue hover:text-neon-purple text-sm underline"
          >
            Load Sample Job Description
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
