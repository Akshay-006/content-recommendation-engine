# 🧠 Content Recommendation Engine for Blogs

An AI-powered blog recommendation platform with role-based user access. Readers get personalized article suggestions based on their reading behavior and interests. Creators can write, manage, and track engagement on their posts.

## 🚀 Features

- ✍️ Article creation with rich text editor (TipTap)
- 🔐 JWT-based user authentication
- 🧑‍💼 Role-based access: Reader & Creator
- 💡 AI-powered recommendations (TF-IDF, content vectorization, cosine similarity)
- 📊 Personalized dashboard for reading analytics
- ❤️ Like system with reading history
- 🔍 Dynamic tag/category filtering
- 🏗️ Fully responsive with Tailwind CSS

---

## 🛠️ Tech Stack

| Area         | Tools & Frameworks                              |
|--------------|--------------------------------------------------|
| Frontend     | React, Redux Toolkit, React Router, TipTap, Axios |
| Backend      | Node.js, Express, Mongoose (MongoDB)             |
| AI Processing| Custom logic (TF-IDF, sentiment, cosine similarity) |
| Styling      | Tailwind CSS                                     |
| Auth         | JWT, Role-based access                           |

---

## ⚙️ Setup Instructions

### 1. Clone the project

```bash
git clone https://github.com/your-username/blog-recommendation.git
cd blog-recommendation

**### 2. Install dependencies**

# Backend
cd server
npm install

# Frontend
cd ../client
npm install

**### 3. Environment variables**

Create a .env file in server/:

PORT=5000
MONGO_DB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

**###4. Run the app**

# Start backend
cd server
nodemon index.js

# Start frontend
cd ../client
npm run dev


**🤖 AI-Powered Tools Used**

TF-IDF for content vector generation

Cosine Similarity for user-article matching

Topic Extraction from text using frequency analysis

Sentiment Analysis using keyword scoring




**📜 License**
MIT License © 2025 Akshay Ramanathan
