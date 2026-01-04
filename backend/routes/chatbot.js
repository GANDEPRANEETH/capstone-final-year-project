const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const GEMINI_API_KEY= process.env.GEMINI_API_KEY;
const LLM_PROVIDER_URL = process.env.LLM_PROVIDER_URL || 'http://localhost:11434/api/generatet';
const url = `${LLM_PROVIDER_URL}?key=${GEMINI_API_KEY}`;

router.post('/', async (req, res) => {
    try {
        const { message, studentProfile } = req.body;

        if (GEMINI_API_KEY) {
            ///const url = `${LLM_PROVIDER_URL}?key=${GEMINI_API_KEY}`;
            console.log('Gemini URL:', 'http://localhost:11434/api/generate');


            const payload = {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: message }]
                    }
                ]
            };

            const r = await axios.post(url, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            const assistantText =
                r.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no reply.';

            return res.json({ reply: assistantText });
        }


        return res.json({ reply: `I received: "${message}".` });
    } catch (err) {
        console.error('Gemini error:', err.response?.data || err.message);

        const isQuotaError = err?.response?.data?.error?.code === 'insufficient_quota';
        const reply = isQuotaError
            ? 'The AI service is out of quota right now. Please try again later or contact the admin.'
            : 'Sorry, there was an error talking to the AI service.';

        return res.status(500).json({ reply });
    }

});


module.exports = router;
