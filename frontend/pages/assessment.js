import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '../utils/api';
import SkillAssessment from '../components/SkillAssessment';
import ResultsDashboard from '../components/ResultsDashboard';
import ProgressBar from '../components/ProgressBar';

export default function AssessmentPage() {
  const router = useRouter();
  const { sessionId } = router.query;
  const [step, setStep] = useState('loading'); // loading, assessment, results
  const [sessionData, setSessionData] = useState(null);
  const [skillGaps, setSkillGaps] = useState([]);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sessionId) {
      loadSessionData();
    }
  }, [sessionId]);

  const loadSessionData = async () => {
    try {
      const storedData = JSON.parse(localStorage.getItem('assessmentSession') || '{}');
      setSkillGaps(storedData.skillGaps || []);
      setSessionData({
        sessionId,
        requiredSkills: storedData.requiredSkills || [],
      });
      setStep('assessment');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load session data');
      setStep('error');
    }
  };

  const handleSkillComplete = async () => {
    const nextIndex = currentSkillIndex + 1;
    if (nextIndex < skillGaps.length) {
      setCurrentSkillIndex(nextIndex);
    } else {
      // All skills assessed, show results
      try {
        toast.loading('Generating your learning plan...');
        const response = await api.getResults(sessionId);
        setSessionData(prev => ({ ...prev, results: response.data }));
        setStep('results');
        toast.dismiss();
        toast.success('Assessment complete!');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to generate results');
      }
    }
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-accent to-dark-bg">
      <Toaster position="top-right" />

      {step === 'assessment' && sessionData && (
        <>
          <ProgressBar
            current={currentSkillIndex + 1}
            total={skillGaps.length}
            skillName={skillGaps[currentSkillIndex]}
          />
          <SkillAssessment
            sessionId={sessionId}
            skill={skillGaps[currentSkillIndex]}
            onComplete={handleSkillComplete}
          />
        </>
      )}

      {step === 'results' && sessionData?.results && (
        <ResultsDashboard
          results={sessionData.results}
          onRestart={() => {
            localStorage.removeItem('assessmentSession');
            router.push('/');
          }}
        />
      )}

      {step === 'error' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 text-xl mb-4">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-gradient-to-r from-neon-purple to-neon-blue text-white rounded-lg"
            >
              Go Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
