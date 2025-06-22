# 🧠 Blog Recommendation Engine

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

**📷 Screenshots**

![image](https://github.com/user-attachments/assets/fe057ef3-da08-4b29-a995-7a2c1873d059)
![image](https://github.com/user-attachments/assets/3d0482fe-371c-4051-9d99-0d3c553550aa)
![image](https://github.com/user-attachments/assets/ea351de6-42f3-4c70-973c-15fb90d8358f)
![image](https://github.com/user-attachments/assets/f0f0186d-4685-4144-bcda-065b7f896794)
![image](https://github.com/user-attachments/assets/ceaaa90e-fd74-40ce-89c8-12763b967905)

**📜 License**
MIT License © 2025 Akshay Ramanathan
