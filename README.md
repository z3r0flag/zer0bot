# zer0bot
A bot originially created for the zer0flag programming Discord server: https://discord.gg/cQcaqFRFm6 (but can be used on your own serve as well). 

To use the bot on your own Discord server:
- Fork this repository
- Create a file called .env in the root of the project, the .env file should contain
```
BOT_TOKEN=your bot token
BOT_ID=the id of your zer0bot user
```

NPM commands:
```
npm install # set up node_modules dir
npm run dev # start bot in dev mode (with nodemon)
npm start # start bot in production mode (with just node)
```

Bot commands:
```
USER COMMANDS:
================
!0 cowsay
!0 ghostping
!0 zer0say

ADMIN COMMANDS:
================
!0 set_welcome_channel
```

The welcome functionality of the bot is disabled by default until you set the welcome channel.
