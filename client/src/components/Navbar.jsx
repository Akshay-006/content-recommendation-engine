import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  console.log("user: ",user);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        BlogReco
      </Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-indigo-600">
          Home
        </Link>
        {token && (
          <>
            {user?.role === 'creator' && (
              <Link to="/editor" className="text-gray-700 hover:text-indigo-600 font-medium">
                ✍️ Write
              </Link>
            )}
            <Link to="/recommended" className="text-gray-700 hover:text-indigo-600">
              Recommended
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
            {user?.username && (
              <div className="inline-flex items-center space-x-2 ml-6">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  {user.username[0].toUpperCase()}
                </div>
              <span className="text-sm font-medium text-gray-700">{user.username}</span>
            </div>
          )}
          </>
        )}
        {!token && (
          <>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-indigo-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 