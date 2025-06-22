import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-3xl font-bold mb-4 text-indigo-600">👤 Profile</h2>

      <div className="mb-4">
        <p><span className="font-semibold">Username:</span> {user.username}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Role:</span> {user.role}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Interests:</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests && user.interests.length > 0 ? (
            user.interests.map((interest, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                {interest}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">No interests selected.</p>
          )}
        </div>
      </div>

      <div className="text-gray-500 text-sm mt-6">
        Account created: {new Date(user.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

export default Profile;
