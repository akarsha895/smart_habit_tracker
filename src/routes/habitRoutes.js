const express = require('express');
const router = express.Router();
const habitModel = require('../models/habitModel');

const createResponse = (status, data, error) => {
    return { status, data, error };
};

router.post('/', (req, res) => {
    const { name, dailyGoal } = req.body;
    
    if (!name || !dailyGoal) {
        return res.status(400).json(createResponse('error', null, 'Name and daily goal are required.'));
    }

    const newHabit = { id: Date.now(), name, dailyGoal, completed: false };
    habitModel.addHabit(newHabit);
    res.status(201).json(createResponse('success', newHabit, null));
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    
    const habitExists = habitModel.getHabits().some(h => h.id === id);
    
    if (!habitExists) {
        return res.status(404).json(createResponse('error', null, 'Habit not found.'));
    }

    habitModel.updateHabit(id);
    res.status(200).json(createResponse('success', { message: 'Habit marked as complete' }, null));
});


router.get('/', (req, res) => {
    const habits = habitModel.getHabits();
    res.status(200).json(createResponse('success', habits, null));
});


router.get('/report', (req, res) => {
    const report = habitModel.getWeeklyReport();
    res.status(200).json(createResponse('success', report, null));
});

module.exports = router;