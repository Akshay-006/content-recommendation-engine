import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosInstance';
import { useSelector } from 'react-redux';

function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`/articles/${id}`);
        setArticle(res.data);
        setLikeCount(res.data.likes);
      } catch (err) {
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await axios.post(`/articles/${id}/like`);
      setLiked(true);
      setLikeCount(res.data.likes);
    } catch (err) {
      console.error('Error liking article:', err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!article) return <div className="p-6">Article not found.</div>;

  const isAuthor = user?._id === article.author?._id;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">{article.title}</h1>
      <p className="text-gray-600 mb-1">By {article.author.username}</p>
      <p className="text-sm text-gray-500 mb-4">{article.views} views | {article.readingTime} min read</p>

      <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: article.content }} />

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, i) => (
            <span key={i} className="bg-gray-200 text-sm px-2 py-1 rounded-full">#{tag}</span>
          ))}
        </div>

        <button
          onClick={handleLike}
          disabled={liked}
          className={`ml-auto px-4 py-2 rounded ${
            liked ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {liked ? `Liked (${likeCount})` : `Like (${likeCount})`}
        </button>
      </div>
      {isAuthor && (
        <div className="mt-6">
          <Link
            to={`/editor/${article._id}`}
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            ✏️ Edit Article
          </Link>
        </div>
      )}
    </div>
  );
}

export default ArticleDetails;

