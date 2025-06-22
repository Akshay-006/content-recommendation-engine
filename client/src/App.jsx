import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArticleEditor from "./pages/ArticleEditor";
import ArticleDetails from "./pages/ArticleDetails";
import Recommended from "./pages/Recommended";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <Navbar />
          <div className="max-w-6xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/editor" element={<ArticleEditor />} />
              <Route path="/article/:id" element={<ArticleDetails />} />
              <Route path="/recommended" element={<Recommended />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
