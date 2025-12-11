const express = require('express');
 const cors = require('cors');
 const bodyParser = require('body-parser');
 require('dotenv').config();

 const lessonsRouter = require('./routes/lessons');
 const chatbotRouter = require('./routes/chatbot');

 const app = express();
 app.use(cors());
 app.use(bodyParser.json());

 app.use('/api/lessons', lessonsRouter);
 app.use('/api/chatbot', chatbotRouter);


 app.get('/api/health', (req, res) => res.json({ ok: true }));

 const port = process.env.PORT || 4000;
 app.listen(port, () => console.log(`Backend listening on ${port}`));
