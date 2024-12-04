const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'habits.json');
const reportPath = path.join(__dirname, 'weekly_report.json');

let habits = [];

if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    habits = JSON.parse(data);
}

const saveHabitsToFile = () => {
    fs.writeFileSync(filePath, JSON.stringify(habits, null, 2));
};

const addHabit = (habit) => {
    habits.push(habit);
    saveHabitsToFile();
};

const getHabits = () => {
    return habits;
};

const updateHabit = (id) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
        habit.completed = true;
        saveHabitsToFile();
    }
};

const getWeeklyReport = () => {

    const report = habits.map(habit => ({
        name: habit.name,
        completed: habit.completed,
        dailyGoal: habit.dailyGoal
    }));
    

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
};

const getIncompleteHabits = () => {
    return habits.filter(habit => !habit.completed);
};

module.exports = { addHabit, getHabits, updateHabit, getWeeklyReport, getIncompleteHabits };