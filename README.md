# Smart Habit Tracker

The Smart Habit Tracker is a Node.js application designed to help users track their daily habits. Users can add habits, mark them as complete, receive reminders for incomplete tasks, and generate weekly performance reports.
## Features
- **Add Habits**: Create new habits with a specified daily goal.
- **Update Habits**: Mark habits as complete for the day.
- **Get Habits**: Fetch all active habits and their completion status.
- **Weekly Report**: Generate a progress report for the week.
- **Daily Notifications**: Receive reminders for incomplete habits via WebSocket.
## Technologies Used
- Node.js
- Express.js
- WebSocket
- Node-Cron (for scheduling reminders)
- File System (fs) for data persistence
## Getting Started
### Prerequisites
### Installation

1. Clone the repository:
   git clone https://github.com/yourusername/smart-habit-tracker.git
   
   cd smart-habit-tracker
   
2.Install the dependencies:
npm install

3.Running the Application
Start the server:
node src/app.js

API Endpoints:
1. Add Habit
   
Endpoint: POST /habits
Request Body:
json
{
    "name": "Drink Water",
    "dailyGoal": "8 glasses"
}
Response:
Success (201):
json
{
    "status": "success",
    "data": {
        "id": 123456789,
        "name": "Drink Water",
        "dailyGoal": "8 glasses",
        "completed": false
    },
    "error": null
}
Error (400):
json
{
    "status": "error",
    "data": null,
    "error": "Name and daily goal are required."
}

3. Update Habit
Endpoint: PUT /habits/:id
Description: Marks a habit as complete for the day.
Response:
Success (200):
json
{
    "status": "success",
    "data": {
        "message": "Habit marked as complete"
    },
    "error": null
}
Error (404):
json
{
    "status": "error",
    "data": null,
    "error": "Habit not found."
}

4. Get Habits
Endpoint: GET /habits
Response:
Success (200):
json
{
    "status": "success",
    "data": [
{
"id": 1,
"name": "Drink Water",
"dailyGoal": "8 glasses",
"completed": false
},
...
],
    "error": null
}

5. Weekly Report
Endpoint: GET /habits/report
Response:
Success (200):
json
{
    "status": "success",
    "data": [
{
"name": "Drink Water",
"completed": true,
"dailyGoal": "8 glasses"
},
...
],
    "error": null
}
