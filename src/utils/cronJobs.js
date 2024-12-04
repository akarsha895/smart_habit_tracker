const cron = require('node-cron');
const habitModel = require('../models/habitModel');

const setupCronJob = (wss) => {
    cron.schedule('*/1 * * * *', () => { 
        console.log('Checking for incomplete habits...');
        
        wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
               
                const incompleteHabits = habitModel.getIncompleteHabits();
                
                if (incompleteHabits.length > 0) {
                    client.send(JSON.stringify({ 
                        message: 'Don’t forget to complete your habits today!', 
                        incompleteHabits 
                    }));
                }
            }
        });
    });
};

module.exports = { setupCronJob };