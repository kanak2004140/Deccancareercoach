import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { api } from '../utils/api';
import { FaPaperPlane } from 'react-icons/fa';

export default function SkillAssessment({ sessionId, skill, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [scores, setScores] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadQuestions();
  }, [skill]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [questions, scores]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await api.getQuestions(sessionId, skill);
      setQuestions(response.data.questions || []);
      setCurrentQuestionIndex(0);
      setAnswer('');
      setScores([]);
      setIsAnswered(false);
      setFeedback('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      toast.error('Please provide an answer');
      return;
    }

    try {
      setSubmitting(true);
      const question = questions[currentQuestionIndex];
      const response = await api.submitAnswer(
        sessionId,
        skill,
        answer,
        question.id
      );

      setScores([...scores, response.data.score]);
      setFeedback(response.data.feedback);
      setIsAnswered(true);

      // Auto-advance after 2 seconds
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setAnswer('');
          setIsAnswered(false);
          setFeedback('');
        } else {
          onComplete();
        }
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <p className="text-gray-400">Loading assessment questions...</p>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Question Counter */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-gray-400 mb-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
          <div className="w-full h-2 bg-dark-accent rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-purple to-neon-blue"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Chat Container */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {/* AI Question */}
            <motion.div
              key={`q-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div className="flex-1">
                <div className="glass rounded-lg p-4 border border-neon-purple/30">
                  <motion.p
                    className="text-gray-200 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentQuestion.question}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* User Answer */}
            {isAnswered && (
              <motion.div
                key={`a-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="flex gap-4 justify-end"
              >
                <div className="flex-1">
                  <div className="glass-thick rounded-lg p-4 border border-neon-blue/30 bg-neon-blue/5">
                    <p className="text-gray-200 leading-relaxed">{answer}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">👤</span>
                </div>
              </motion.div>
            )}

            {/* Feedback & Score */}
            {isAnswered && feedback && (
              <motion.div
                key={`f-${currentQuestionIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✨</span>
                </div>
                <div className="flex-1">
                  <div className="glass-thick rounded-lg p-4 border border-neon-purple/50">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-neon-blue">Assessment Result</p>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-neon-purple">
                            {scores[currentQuestionIndex]}/10
                          </p>
                          <p className="text-xs text-gray-400">Score</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{feedback}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {!isAnswered && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-dark-bg to-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="glass-thick rounded-xl p-4 border border-neon-purple/30">
                <div className="flex gap-3">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="flex-1 bg-transparent text-white outline-none resize-none max-h-24 scrollbar-hide"
                    rows="2"
                  />
                  <motion.button
                    onClick={handleSubmitAnswer}
                    disabled={submitting || !answer.trim()}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue text-white font-semibold flex items-center justify-center disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {submitting ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    ) : (
                      <FaPaperPlane />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
