// server/routes/recommendation.js
const express = require('express');
const RecommendationService = require('../services/recommendationService');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const recommended = await RecommendationService.getRecommendations(req.user._id);
    res.json(recommended);
  } catch (err) {
    res.status(500).json({ message: 'Recommendation failed', error: err.message });
  }
});

module.exports = router;
