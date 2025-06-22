import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/dashboard/overview');
        setData(res.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchStats();
  }, []);

  if (!data) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded ${
            activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          Overview
        </button>
        {data.role === 'creator' && (
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded ${
              activeTab === 'insights' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            Creator Insights
          </button>
        )}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-4">
          {data.role === 'reader' ? (
            <>
              <p>📚 <strong>Articles Read:</strong> {data.totalRead}</p>
              <p>❤️ <strong>Articles Liked:</strong> {data.totalLiked}</p>
              <p>🏷️ <strong>Top Category:</strong> {data.topCategory || 'N/A'}</p>
            </>
          ) : (
            <>
              <p>📝 <strong>Total Articles:</strong> {data.totalArticles}</p>
              <p>👀 <strong>Total Views:</strong> {data.totalViews}</p>
              <p>❤️ <strong>Total Likes:</strong> {data.totalLikes}</p>
            </>
          )}
        </div>
      )}

      {activeTab === 'insights' && data.role === 'creator' && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">📌 Top Tags</h2>
          <ul className="list-disc list-inside">
            {data.topTags.length > 0 ? (
              data.topTags.map((tag, index) => <li key={index}>#{tag}</li>)
            ) : (
              <li>No tags found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
