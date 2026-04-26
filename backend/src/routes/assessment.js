import express from 'express';
import {
  analyzeSkills,
  generateAssessmentQuestions,
  scoreResponse,
  generateLearningRoadmap
} from '../utils/llm.js';

const router = express.Router();

// Store session data
const sessions = new Map();

/**
 * Initialize Assessment
 */
router.post('/initialize', async (req, res) => {
  try {
    const { resumeText, jdText } = req.body;

    if (!resumeText || !jdText) {
      return res.status(400).json({ error: 'Resume and JD text are required' });
    }

    // Analyze skills
    const skillAnalysis = await analyzeSkills(jdText, resumeText);

    // Extract gaps
    const requiredSkills = skillAnalysis.required_skills || [
      'JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs', 'Git', 'Docker'
    ];
    const existingSkills = Object.keys(skillAnalysis.proficiency_levels || {});
    const skillGaps = requiredSkills.filter(skill => !existingSkills.includes(skill));

    // Create session
    const sessionId = Date.now().toString();
    const sessionData = {
      resumeText,
      jdText,
      requiredSkills,
      existingSkills,
      skillGaps,
      assessmentProgress: {},
      scores: {}
    };

    sessions.set(sessionId, sessionData);

    res.json({
      sessionId,
      requiredSkills,
      existingSkills,
      skillGaps,
      totalSkills: requiredSkills.length,
      gapCount: skillGaps.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Assessment Questions for a Skill
 */
router.post('/questions', async (req, res) => {
  try {
    const { sessionId, skill } = req.body;

    const session = sessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const proficiency = session.existingSkills.includes(skill) ? 'Advanced' : 'Intermediate';
    const questions = await generateAssessmentQuestions(skill, proficiency);

    res.json({
      skill,
      questions,
      proficiency
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Submit Answer & Get Score
 */
router.post('/submit-answer', async (req, res) => {
  try {
    const { sessionId, skill, answer, questionId } = req.body;

    const session = sessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const scoringResult = await scoreResponse(`Question ${questionId}`, answer, skill);

    // Store score
    if (!session.scores[skill]) {
      session.scores[skill] = [];
    }
    session.scores[skill].push(scoringResult.score);

    // Calculate average for skill
    const avgScore = Math.round(
      session.scores[skill].reduce((a, b) => a + b, 0) / session.scores[skill].length
    );

    res.json({
      score: scoringResult.score,
      probability: scoringResult.probability,
      feedback: scoringResult.feedback,
      skillAverageScore: avgScore,
      responseCount: session.scores[skill].length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Final Results & Learning Plan
 */
router.post('/results', (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = sessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Calculate final scores
    const finalScores = Object.entries(session.scores).map(([skill, scores]) => ({
      skill,
      score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      probability: Math.min(0.99, 0.5 + (scores.reduce((a, b) => a + b, 0) / scores.length / 20)),
      assessmentCount: scores.length
    }));

    // Generate learning roadmap
    const learningPlan = generateLearningRoadmap(session.skillGaps, session.existingSkills);

    res.json({
      sessionId,
      skillScores: finalScores,
      skillGaps: session.skillGaps,
      requiredSkills: session.requiredSkills,
      learningPlan,
      summary: {
        totalSkillsAssessed: session.requiredSkills.length,
        skillsWithGaps: session.skillGaps.length,
        averageScore: Math.round(
          finalScores.reduce((sum, s) => sum + s.score, 0) / finalScores.length
        ),
        estimatedLearningTime: `${8 + session.skillGaps.length * 4}-${12 + session.skillGaps.length * 6} weeks`
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get Session Status
 */
router.get('/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.json({
    sessionId,
    skillGaps: session.skillGaps,
    assessmentProgress: {
      completed: Object.keys(session.scores).length,
      total: session.skillGaps.length
    },
    scores: session.scores
  });
});

export default router;
