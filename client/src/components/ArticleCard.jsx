import React from 'react';
import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  return (
    <div className="bg-white shadow rounded p-4 hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-indigo-700 mb-1">
        <Link to={`/article/${article._id}`}>{article.title}</Link>
      </h3>
      <p className="text-sm text-gray-600 mb-2">By {article.author.username}</p>
      <p className="text-gray-700 mb-3 line-clamp-3">{article.excerpt}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{article.views} views</span>
        <span>{article.readingTime} min read</span>
        <Link
          to={`/article/${article._id}`}
          className="text-indigo-600 hover:underline"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;
