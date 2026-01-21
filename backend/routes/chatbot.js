const express = require('express');
const router = express.Router();

const LLM_URL = process.env.LLM_PROVIDER_URL || 'http://localhost:11434/api/generate';
const LLM_MODEL = process.env.LLM_MODEL || 'gemma:2b';

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(LLM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: LLM_MODEL,
        prompt: message,
        stream: false
      })
    });

    const data = await response.json();        // Ollama: { response: "..." }
    const assistantText = data.response || 'Sorry, no reply.';

    return res.json({ reply: assistantText });
  } catch (err) {
    console.error('LLM error:', err);
    const reply =
      'Sorry, there was an error talking to the AI service.';
    return res.status(500).json({ reply });
  }
});

module.exports = router;