const express = require('express');
const Article = require('../models/Article');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const RecommendationService = require('../services/recommendationService');

const router = express.Router();

//Get all articles

router.get('/', async(req,res) => {
    try {
        const {page=1, limit = 10, category , tag} = req.query;
        const query = {isPublished : true};

        if (category) query.category = category;
        if (tag) query.tags = {$in : [tag]};

        const articles = await Article.find(query)
            .populate('author', 'username')
            .sort({createdAt : -1})
            .limit(limit*1)
            .skip((page-1)*limit);

        const total = await Article.countDocuments(query);

        res.json({
            articles,
            totalPages : Math.ceil(total/limit),
            currentPage : page,
        });
    }catch(err){
        res.status(500).json({message : "Serve Error", error : error.message})
    };
});





router.get('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'username');

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.views += 1;
    await article.save();

    const hasRead = req.user.readingHistory.some(
      (entry) => entry.articleId.toString() === article._id.toString()
    );

    if (!hasRead) {
      req.user.readingHistory.push({
        articleId: article._id,
        readAt: new Date(),
        timeSpent: 1,
        liked: false,
      });

      await req.user.save();
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Create new article (Creators only)

router.post('/', auth, async(req,res) => {
    try {
        const {title , content , excerpt, tags, category} = req.body;

        const article = new Article({
            title,
            content,
            excerpt,
            author : req.user._id,
            tags: tags || [],
            category,
            isPublished : true
        });

        //Process content for AI features

        const aiFeatures = await RecommendationService.processArticleContent(article);
        article.topics = aiFeatures.topics;
        article.sentiment = aiFeatures.sentiment;
        article.contentVector = aiFeatures.contentVector;

        await article.save();
        await article.populate('author','username');

        res.status(201).json({message : "Article created successfully"});

    }catch(error){
        res.status(500).json({message : "Server error", error : error.message});
    };
});

//Update article

router.put('/:id', async(req,res) => {
    try{
        const article = await Article.findById(req.params.id);

        if (!article){
            return res.status(404).json({message : "Article not found !"});
        }

        if (article.author.toString() !== req.userId){
            return res.json(403).json({message : "Not authorized"});
        }

        Object.assign(article, req.body);

        // If content is changed, process the content

        if (req.body.content){
            const aiFeatures = await RecommendationService.processArticleContent(article);
            article.topics =  aiFeatures.topics;
            article.sentiment = aiFeatures.sentiment;
            article.contentVector = aiFeatures.contentVector;
        };

        await article.save();
        await article.populate('author', 'username');

        res.json(article);
    }catch(error){
        res.status(500).json({message : "Server error", error : error.message});
    }
});

router.post('/:id/like', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    // Prevent double like
    const hasLiked = req.user.readingHistory.some(
      h => h.articleId.toString() === article._id.toString() && h.liked
    );

    if (hasLiked) {
      return res.status(400).json({ message: 'Already liked' });
    }

    // Update article likes
    article.likes += 1;
    await article.save();

    // Update user reading history
    const user = await User.findById(req.user._id);
    const historyEntry = user.readingHistory.find(
      h => h.articleId.toString() === article._id.toString()
    );
    if (historyEntry) {
      historyEntry.liked = true;
    } else {
      user.readingHistory.push({
        articleId: article._id,
        readAt: new Date(),
        timeSpent: 1,
        liked: true,
      });
    }

    await user.save();
    res.json({ message: 'Article liked!' });

  } catch (err) {
    console.error('Like error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;

