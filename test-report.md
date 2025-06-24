# 🧪 Test Report

## 📌 Project: Blog Recommendation Engine (AI + MERN Stack)

---

## ✅ Manual Testing Summary

### 🔐 Authentication

| Feature           | Status  | Notes                                     |
| ----------------- | ------- | ----------------------------------------- |
| User Registration | ✅ Pass | Validates all fields, stores user data    |
| Login             | ✅ Pass | JWT is issued and stored in localStorage  |
| Role Assignment   | ✅ Pass | Role 'reader' or 'creator' saved properly |
| Logout            | ✅ Pass | Clears token, redirects to login          |

---

### 📰 Article Features

| Feature           | Status  | Notes                                  |
| ----------------- | ------- | -------------------------------------- |
| Create Article    | ✅ Pass | Creator only; post is saved and listed |
| View Article      | ✅ Pass | Page loads, increments views           |
| Like Article      | ✅ Pass | Like saved to readingHistory           |
| Tag/Category Save | ✅ Pass | Tags and category persist correctly    |

---

### 🧠 AI & Recommendations

| Feature                      | Status  | Notes                                                       |
| ---------------------------- | ------- | ----------------------------------------------------------- |
| Topic Extraction             | ✅ Pass | Top keywords extracted and saved                            |
| Sentiment Analysis           | ✅ Pass | Labels: positive/neutral/negative are assigned              |
| TF-IDF Vectorization         | ✅ Pass | Vectors generated and stored in article.contentVector       |
| Personalized Recommendations | ✅ Pass | Shown only after reading articles matching interests        |
| Filtering irrelevant content | ✅ Pass | Articles below threshold are filtered out (threshold = 0.4) |

---

### 📊 Dashboard (Role Based)

| Role    | Feature                          | Status  | Notes                             |
| ------- | -------------------------------- | ------- | --------------------------------- |
| Reader  | Top Category, Reads, Likes       | ✅ Pass | Updates after article views/likes |
| Creator | Articles Published, Likes, Views | ✅ Pass | Shows creator-specific stats      |

---

### 🧭 Navigation / UI

| Feature        | Status  | Notes                                    |
| -------------- | ------- | ---------------------------------------- |
| Navbar         | ✅ Pass | Conditional display based on auth + role |
| Editor Page    | ✅ Pass | Creators only                            |
| Dashboard      | ✅ Pass | Role-specific tabs, accurate analytics   |
| Responsiveness | ✅ Pass | Works on desktop and mobile              |

---

## 🛠️ Test Tools Used

- **Browser**: Google Chrome (v123+)
- **Postman**: For API Testing (`/api/auth`, `/api/articles`, etc.)
- **MongoDB Atlas**: Live data verification
- **React Developer Tools**: State and props tracking
- **Redux DevTools**: Verified actions, state transitions
- **Console Logging**: Traced issues for JWT, Axios, Recommendations

---

## ⚠️ Bugs Encountered & Fixed

| Bug                                         | Fix                                                 |
| ------------------------------------------- | --------------------------------------------------- |
| `req.user` undefined in recommendations     | Ensured auth middleware was applied and JWT decoded |
| TF-IDF not filtering articles               | Introduced scoring threshold (e.g. > 0.4)           |
| Navbar not showing username                 | Corrected Redux slice to persist user on login      |
| Creator dashboard crash (Article undefined) | Added `Article` import in dashboard route           |
| ReactQuill error                            | Switched to Tiptap for stability with React 18      |

---

## 📋 Final Status: ✅ All Critical Features Tested and Working
