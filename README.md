This is a Discord Bot to answer some questions on a hackathon.

Instructions:

Install dependencies
 ```npm install```

 Create .env file on root with your discord bot token and google aplicattion and calendar
  ```TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
    GOOGLE_APPLICATION_CREDENTIALS=./gCalendarConfig.json
    GOOGLE_CALENDAR_ID=your_id@group.calendar.google.com
  ```

  Create .gCalendarConfig.json file on root with your google service_account json

  Run your bot
   ```node index.js```
