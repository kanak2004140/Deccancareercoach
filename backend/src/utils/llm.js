import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extract text from resume (simple text extraction)
 * In production, use pdf-parse for PDFs
 */
export const extractResumeText = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading resume:', error);
    return '';
  }
};

/**
 * Mock LLM function - simulates OpenAI API calls
 * Replace with real API calls in production
 */
export const callLLM = async (prompt, type = 'skill_extraction') => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 300));

  const responses = {
    skill_extraction: {
      required_skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs', 'Git', 'Docker'],
      proficiency_levels: {
        'JavaScript': 'Expert',
        'React': 'Advanced',
        'Node.js': 'Intermediate',
        'MongoDB': 'Beginner',
        'REST APIs': 'Advanced',
        'Git': 'Intermediate',
        'Docker': 'Beginner'
      }
    },
    question_generation: {
      question: "Explain how you would implement component lifecycle optimization in React to improve performance.",
      skill: "React",
      difficulty: 7
    },
    skill_scoring: {
      score: 7,
      probability: 0.85,
      reasoning: "Candidate demonstrated good understanding of concepts with some gaps in advanced patterns."
    }
  };

  return responses[type] || responses.skill_extraction;
};

/**
 * Extract skills from JD and Resume
 */
export const analyzeSkills = async (jdText, resumeText) => {
  const skillPrompt = `
  Analyze the following Job Description and Resume.
  
  JD: ${jdText}
  Resume: ${resumeText}
  
  Return:
  1. Required skills from JD
  2. Existing skills from Resume
  3. Skill gaps
  `;

  const result = await callLLM(skillPrompt, 'skill_extraction');
  return result;
};

/**
 * Generate assessment questions for a skill
 */
export const generateAssessmentQuestions = async (skill, proficiency) => {
  const prompt = `Generate 5 challenging questions to assess ${skill} at ${proficiency} level.`;
  
  // Mock response - in production, call real LLM
  const questions = [
    { id: 1, question: `What are the key differences between var, let, and const in ${skill}?`, skill },
    { id: 2, question: `How would you optimize a slow ${skill} application?`, skill },
    { id: 3, question: `Explain the concept of closures in ${skill}.`, skill },
    { id: 4, question: `How do you handle errors in ${skill}?`, skill },
    { id: 5, question: `What are best practices for ${skill} code organization?`, skill },
  ];

  return questions;
};

/**
 * Score candidate response
 */
export const scoreResponse = async (question, answer, skill) => {
  // Mock scoring logic
  const answerLength = answer.split(' ').length;
  const hasExamples = answer.toLowerCase().includes('example') || answer.toLowerCase().includes('for instance');
  const hasDepth = answerLength > 30;
  
  let score = 5;
  if (hasDepth) score += 2;
  if (hasExamples) score += 2;
  if (answerLength > 100) score += 1;
  
  score = Math.min(10, Math.max(0, score));
  
  return {
    score: Math.round(score),
    probability: Math.min(0.99, 0.5 + (score / 20)),
    feedback: `Good ${hasExamples ? 'use of examples' : 'attempt'}. ${hasDepth ? 'Answer shows depth.' : 'Consider adding more detail.'}`
  };
};

/**
 * Generate learning roadmap
 */
export const generateLearningRoadmap = (skillGaps, existingSkills) => {
  const resources = {
    'JavaScript': {
      resources: [
        { type: 'Course', name: 'JavaScript Mastery', url: 'https://www.udemy.com', time: '40h' },
        { type: 'Tutorial', name: 'JavaScript.info', url: 'https://javascript.info', time: 'Self-paced' },
        { type: 'YouTube', name: 'Traversy Media JS Course', url: 'https://youtube.com', time: '12h' }
      ],
      timeToLearn: '4-6 weeks'
    },
    'React': {
      resources: [
        { type: 'Course', name: 'React Complete Guide', url: 'https://www.udemy.com', time: '48h' },
        { type: 'Docs', name: 'React Official Docs', url: 'https://react.dev', time: 'Self-paced' },
        { type: 'YouTube', name: 'React Patterns & Best Practices', url: 'https://youtube.com', time: '8h' }
      ],
      timeToLearn: '5-7 weeks'
    },
    'Node.js': {
      resources: [
        { type: 'Course', name: 'Node.js Complete Course', url: 'https://www.udemy.com', time: '32h' },
        { type: 'Docs', name: 'Node.js Official Docs', url: 'https://nodejs.org', time: 'Self-paced' },
        { type: 'Project', name: 'Build REST API', url: 'https://github.com', time: '20h' }
      ],
      timeToLearn: '3-4 weeks'
    },
    'MongoDB': {
      resources: [
        { type: 'Course', name: 'MongoDB University', url: 'https://university.mongodb.com', time: '36h' },
        { type: 'Docs', name: 'MongoDB Docs', url: 'https://docs.mongodb.com', time: 'Self-paced' },
        { type: 'Tutorial', name: 'CRUD Operations Guide', url: 'https://mongodb.com', time: '6h' }
      ],
      timeToLearn: '3-4 weeks'
    },
    'Docker': {
      resources: [
        { type: 'Course', name: 'Docker Mastery', url: 'https://www.udemy.com', time: '22h' },
        { type: 'Docs', name: 'Docker Documentation', url: 'https://docs.docker.com', time: 'Self-paced' },
        { type: 'Tutorial', name: 'Docker for Beginners', url: 'https://youtube.com', time: '4h' }
      ],
      timeToLearn: '2-3 weeks'
    }
  };

  return skillGaps.map(skill => ({
    skill,
    priority: skillGaps.indexOf(skill) + 1,
    ...resources[skill] || {
      resources: [
        { type: 'Course', name: 'Comprehensive Course', url: '#', time: '40h' },
        { type: 'Docs', name: 'Official Documentation', url: '#', time: 'Self-paced' }
      ],
      timeToLearn: '4-6 weeks'
    }
  }));
};

/**
 * Clean up old uploaded files
 */
export const cleanupUploads = () => {
  const uploadsDir = path.join(__dirname, '../uploads');
  try {
    if (fs.existsSync(uploadsDir)) {
      fs.readdirSync(uploadsDir).forEach(file => {
        const filePath = path.join(uploadsDir, file);
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        }
      });
    }
  } catch (error) {
    console.error('Error cleaning uploads:', error);
  }
};
