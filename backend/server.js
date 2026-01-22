// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const lessonsRouter = require('./routes/lessons');
const chatbotRouter = require('./routes/chatbot');

const app = express();

// global middlewares
app.use(cors());
app.use(bodyParser.json());          // parses JSON bodies (same as express.json())

// route mounting
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonsRouter);
app.use('/api/chatbot', chatbotRouter);

// optional health check
app.get('/api/health', (req, res) => {
 res.json({ status: 'ok' });
});
console.log("------------------------------------------------");
console.log("Trying to connect to:", process.env.MONGO_URI); 
console.log("------------------------------------------------");
// start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
