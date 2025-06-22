/*const Article = require('../models/Article');
const User = require('../models/User');

class RecommendationService {
  // Simple TF-IDF implementation for content vectorization
  static calculateTFIDF(documents) {
    const vocabulary = new Set();
    const documentTerms = documents.map(doc => {
      const terms = doc.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(term => term.length > 2);
      terms.forEach(term => vocabulary.add(term));
      return terms;
    });

    const vocabArray = Array.from(vocabulary);
    const vectors = documentTerms.map(terms => {
      const termFreq = {};
      terms.forEach(term => {
        termFreq[term] = (termFreq[term] || 0) + 1;
      });

      return vocabArray.map(term => {
        const tf = (termFreq[term] || 0) / terms.length;
        const documentsWithTerm = documentTerms.filter(doc => 
          doc.includes(term)
        ).length;
        const idf = Math.log(documents.length / (documentsWithTerm + 1));
        return tf * idf;
      });
    });

    return vectors;
  }

  // Calculate cosine similarity between two vectors
  static cosineSimilarity(vectorA, vectorB) {
    if (vectorA.length !== vectorB.length) return 0;

    const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));

    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }

  // Extract topics from content using simple keyword extraction
  static extractTopics(content) {
    const commonWords = new Set([
      'the', 'is', 'at', 'which', 'on', 'and', 'a', 'to', 'are', 'as', 'was',
      'with', 'be', 'by', 'this', 'have', 'from', 'or', 'one', 'had', 'but',
      'not', 'what', 'all', 'were', 'they', 'we', 'when', 'your', 'can', 'said'
    ]);

    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.has(word));

    const wordFreq = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    return Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, freq]) => ({
        name: word,
        confidence: freq / words.length
      }));
  }

  // Analyze sentiment (simplified)
  static analyzeSentiment(content) {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'disappointing'];

    const words = content.toLowerCase().split(/\s+/);
    let score = 0;

    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1;
      if (negativeWords.includes(word)) score -= 1;
    });

    const normalizedScore = score / words.length;
    let label = 'neutral';
    if (normalizedScore > 0.01) label = 'positive';
    if (normalizedScore < -0.01) label = 'negative';

    return { score: normalizedScore, label };
  }

  // Process article content for AI features
  static async processArticleContent(article) {
    const topics = this.extractTopics(article.content);
    const sentiment = this.analyzeSentiment(article.content);

    // For content vector, we'll use a simplified approach
    const contentVector = this.calculateTFIDF([article.content])[0] || [];

    return {
      topics,
      sentiment,
      contentVector: contentVector.slice(0, 100) // Limit vector size
    };
  }

  // Get recommendations for a user
  static async getRecommendations(userId, limit = 10) {
    try {
      const user = await User.findById(userId).populate('readingHistory.articleId');
      console.log('User Interests:', user.interests);
      console.log('Reading History Count:', user.readingHistory.length);
      
      if (!user) throw new Error('User not found');

      // Get all published articles
      const allArticles = await Article.find({ isPublished: true });

      // Get articles user hasn't read
      const readArticleIds = user.readingHistory.map(h => h.articleId.toString());
      const unreadArticles = allArticles.filter(article => 
        !readArticleIds.includes(article._id.toString())
      );
      console.log('Unread Articles:', unreadArticles.length);

      // Calculate recommendations based on various factors
      const recommendations = unreadArticles.map(article => {
        let score = 0;

        // Interest-based scoring
        const userInterests = user.interests.map(i => i.toLowerCase());
        const articleTags = article.tags.map(t => t.toLowerCase());
        const interestMatch = userInterests.filter(interest => 
          articleTags.some(tag => tag.includes(interest) || interest.includes(tag))
        ).length;
        score += interestMatch * 0.3;

        // Category preference from reading history
        const readCategories = user.readingHistory
          .map(h => h.articleId.category)
          .filter(Boolean);
        const categoryFreq = readCategories.reduce((freq, cat) => {
          freq[cat] = (freq[cat] || 0) + 1;
          return freq;
        }, {});

        
        
        const categoryScore = categoryFreq[article.category] || 0;
        score += categoryScore * 0.2;

        // Popularity score
        score += (article.views * 0.001) + (article.likes * 0.01);

        // Recency boost
        const daysSincePublished = (Date.now() - article.createdAt) / (1000 * 60 * 60 * 24);
        if (daysSincePublished < 7) score += 0.1;
        

        return {
          article,
          score,
          reasons: []
        };
       
      });

      // Sort by score and return top recommendations
      return recommendations
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(rec => rec.article);

    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }
}

module.exports = RecommendationService;*/
const Article = require('../models/Article');
const User = require('../models/User');

class RecommendationService {
  static calculateTFIDF(documents) {
    const vocabulary = new Set();
    const documentTerms = documents.map(doc => {
      const terms = doc.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(term => term.length > 2);
      terms.forEach(term => vocabulary.add(term));
      return terms;
    });

    const vocabArray = Array.from(vocabulary);
    const vectors = documentTerms.map(terms => {
      const termFreq = {};
      terms.forEach(term => {
        termFreq[term] = (termFreq[term] || 0) + 1;
      });

      return vocabArray.map(term => {
        const tf = (termFreq[term] || 0) / terms.length;
        const documentsWithTerm = documentTerms.filter(doc => 
          doc.includes(term)
        ).length;
        const idf = Math.log(documents.length / (documentsWithTerm + 1));
        return tf * idf;
      });
    });

    return vectors;
  }

  static cosineSimilarity(vectorA, vectorB) {
    if (vectorA.length !== vectorB.length) return 0;

    const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));

    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }

  static extractTopics(content) {
    const commonWords = new Set([
      'the', 'is', 'at', 'which', 'on', 'and', 'a', 'to', 'are', 'as', 'was',
      'with', 'be', 'by', 'this', 'have', 'from', 'or', 'one', 'had', 'but',
      'not', 'what', 'all', 'were', 'they', 'we', 'when', 'your', 'can', 'said'
    ]);

    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.has(word));

    const wordFreq = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    return Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word, freq]) => ({
        name: word,
        confidence: freq / words.length
      }));
  }

  static analyzeSentiment(content) {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'disappointing'];

    const words = content.toLowerCase().split(/\s+/);
    let score = 0;

    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1;
      if (negativeWords.includes(word)) score -= 1;
    });

    const normalizedScore = score / words.length;
    let label = 'neutral';
    if (normalizedScore > 0.01) label = 'positive';
    if (normalizedScore < -0.01) label = 'negative';

    return { score: normalizedScore, label };
  }

  static async processArticleContent(article) {
    const topics = this.extractTopics(article.content);
    const sentiment = this.analyzeSentiment(article.content);
    const contentVector = this.calculateTFIDF([article.content])[0] || [];

    return {
      topics,
      sentiment,
      contentVector: contentVector.slice(0, 100)
    };
  }

  static async getRecommendations(userId, limit = 10) {
    try {
      const user = await User.findById(userId).populate('readingHistory.articleId');
      if (!user) throw new Error('User not found');

      const userInterests = (user.interests || []).map(i => i.toLowerCase());
      const readArticleIds = user.readingHistory.map(h => h.articleId.toString());
      const readCategories = user.readingHistory.map(h => h.articleId?.category).filter(Boolean);
      const categoryFreq = readCategories.reduce((freq, cat) => {
        freq[cat] = (freq[cat] || 0) + 1;
        return freq;
      }, {});

      const allArticles = await Article.find({ isPublished: true });
      const unreadArticles = allArticles.filter(article => !readArticleIds.includes(article._id.toString()));

      const recommendations = unreadArticles.map(article => {
        let score = 0;
        const articleTags = (article.tags || []).map(t => t.toLowerCase());

        const interestMatch = userInterests.filter(interest =>
          articleTags.some(tag => tag.includes(interest) || interest.includes(tag))
        ).length;
        score += interestMatch * 0.3;

        const categoryScore = categoryFreq[article.category] || 0;
        score += categoryScore * 0.2;

        score += (article.views * 0.001) + (article.likes * 0.01);

        const daysSincePublished = (Date.now() - article.createdAt) / (1000 * 60 * 60 * 24);
        if (daysSincePublished < 7) score += 0.1;

        return {
          article,
          score
        };
      });

      return recommendations
        .filter(rec => rec.score > 0.4 )
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(rec => rec.article);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }
}

module.exports = RecommendationService;
