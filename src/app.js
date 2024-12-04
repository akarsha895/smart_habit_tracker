const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const habitRoutes = require('./routes/habitRoutes');
const cronJobs = require('./utils/cronJobs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/habits', habitRoutes);

wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.on('close', () => console.log('Client disconnected'));
});
cronJobs.setupCronJob(wss);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});