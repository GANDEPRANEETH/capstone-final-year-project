
const express = require('express');
const router = express.Router();


const STEM_LESSONS = [
        { id: 1, title: 'Bright Bulbs: Simple Circuits', subject: 'Science – Electricity', content: '...' },
        { id: 2, title: 'Fractions in Daily Life',      subject: 'Mathematics – Fractions', content: '...' },
        { id: 3, title: 'First Steps in Coding',        subject: 'Technology – Programming', content: '...' },
        { id: 4, title: 'Build a Strong Bridge',        subject: 'Engineering – Structures', content: '...' },

    {
        id: 1,
        title: 'Bright Bulbs: Simple Circuits',
        subject: 'Science – Electricity',
        content: '...',
        quiz: [
            { id: 1, text: 'Does electricity need a complete path (circuit) to flow?' },
            { id: 2, text: 'Is a battery a source of electrical energy?' }
        ]
    },
    {
        id: 2,
        title: 'Fractions in Daily Life',
        subject: 'Mathematics – Fractions',
        content: '...',
        quiz: [
            { id: 1, text: 'Is 1/2 greater than 1/3?' },
            { id: 2, text: 'Can a pizza cut into 4 equal pieces be written as 1/4 each?' }
        ]
    },
    {
        id: 3,
        title: 'First Steps in Coding',
        subject: 'Technology – Programming',
        content: '...',
        quiz: [
            { id: 1, text: 'Is an algorithm a set of steps to solve a problem?' },
            { id: 2, text: 'Is Python a programming language?' }
        ]
    },
    {
        id: 4,
        title: 'Build a Strong Bridge',
        subject: 'Engineering – Structures',
        content: '...',
        quiz: [
            { id: 1, text: 'Do triangles help make bridges stronger?' },
            { id: 2, text: 'Is concrete used in many bridges?' }
        ]
    }
];

const lessons = STEM_LESSONS;


router.get('/', (req, res) => {
    res.json(lessons);
});

router.get('/:id', (req, res) => {
    const l = lessons.find(x => x.id === Number(req.params.id));
    if (!l) return res.status(404).json({ error: 'Not found' });
    res.json(l);
});


const progressStore = {};

router.post('/progress', (req, res) => {
    const { studentId = 'guest', lessonId, progress } = req.body;
    if (!progressStore[studentId]) progressStore[studentId] = {};
    progressStore[studentId][lessonId] = progress;
    res.json({ ok: true });
});

router.get('/progress/:studentId', (req, res) => {
    res.json(progressStore[req.params.studentId] || {});
});

module.exports = router;
