const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/article');
const recommendationRoutes = require('./routes/recommendation');
const dashboardRoutes = require('./routes/dashboard');





mongoose.connect(process.env.MONGO_DB_URI);

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
console.log("Hi");
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
