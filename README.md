# zer0bot
A bot for the zer0flag programming Discord server. https://discord.gg/cQcaqFRFm6

The bot instance on my Discord server is currently being hosted on Heroku and is synced with this GitHub repository.

To use the bot on your own Discord server:
- Fork this repository
- Create a file called .env in the root of the project, the .env file should contain
```
BOT_TOKEN=your bot token
GENERAL_CHANNEL_ID=the ID of the main channel in your server
BOT_ID=the id of your zer0bot user
ADMIN_ID=the id of the server owner
```

NPM commands:
```
npm install # set up node_modules dir
npm run dev # start bot in dev mode (with nodemon)
npm start # start bot in production mode (with just node)
```
