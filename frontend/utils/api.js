import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Upload
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return apiClient.post('/upload/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  uploadJD: (text) => {
    return apiClient.post('/upload/jd', text, {
      headers: { 'Content-Type': 'text/plain' },
    });
  },

  // Assessment
  initializeAssessment: (resumeText, jdText) => {
    return apiClient.post('/assessment/initialize', { resumeText, jdText });
  },

  getQuestions: (sessionId, skill) => {
    return apiClient.post('/assessment/questions', { sessionId, skill });
  },

  submitAnswer: (sessionId, skill, answer, questionId) => {
    return apiClient.post('/assessment/submit-answer', {
      sessionId,
      skill,
      answer,
      questionId,
    });
  },

  getResults: (sessionId) => {
    return apiClient.post('/assessment/results', { sessionId });
  },

  getSessionStatus: (sessionId) => {
    return apiClient.get(`/assessment/session/${sessionId}`);
  },

  healthCheck: () => {
    return apiClient.get('/health');
  },
};

export default apiClient;
