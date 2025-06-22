import React, { useEffect, useState } from 'react';
import axios from '../services/axiosInstance';
import ArticleCard from '../components/ArticleCard';

function Recommended() {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await axios.get('/recommendations');
        setRecommended(res.data);
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommended();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Recommended For You</h1>
      {loading ? (
        <p>Loading...</p>
      ) : recommended.length === 0 ? (
        <p>No personalized recommendations at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommended;
