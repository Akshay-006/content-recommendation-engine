// server/routes/dashboard.js
const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../models/User');
const Article = require('../models/Article')

const router = express.Router();



router.get('/overview', auth, async (req, res) => {
  const user = await User.findById(req.user._id).populate('readingHistory.articleId');

  if (user.role === 'reader') {
    const totalRead = user.readingHistory.length;
    const totalLiked = user.readingHistory.filter(h => h.liked).length;
    const categoryFreq = {};

    user.readingHistory.forEach(h => {
      const cat = h.articleId?.category;
      if (cat) categoryFreq[cat] = (categoryFreq[cat] || 0) + 1;
    });

    const topCategory = Object.entries(categoryFreq).sort((a, b) => b[1] - a[1])[0]?.[0];

    return res.json({ role: 'reader', totalRead, totalLiked, topCategory });
  }


if (req.user.role === 'creator') {
  try {
    const articles = await Article.find({ author: req.user._id });

    const totalArticles = articles.length;
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
    const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);

    const tagFreq = {};
    articles.forEach(a => {
      (a.tags || []).forEach(tag => {
        tagFreq[tag] = (tagFreq[tag] || 0) + 1;
      });
    });

    const topTags = Object.entries(tagFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag]) => tag);

    return res.json({
      role: 'creator',
      totalArticles,
      totalViews,
      totalLikes,
      topTags,
    });
  } catch (e) {
    console.error('🔥 Creator-specific error:', e);
    return res.status(500).json({ message: 'Creator block failed', error: e.message });
  }
}





});

module.exports = router;
