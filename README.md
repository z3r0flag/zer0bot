# zer0bot
A bot originially created for the zer0flag programming Discord server: https://discord.gg/cQcaqFRFm6 (but can be used on your own server as well). 

### Bot commands: 
The below text is sent by the bot if the server owner sends the bot prefix !0 on its own or with an invalid command. If an unprivileged member does so, the ADMIN COMMANDS section will be ommited.

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

The welcome functionality of the bot is disabled by default until you set the welcome channel. To set the welcome channel use the according command with the name of the channel as an argument e.g. `set_welcome_channel general-chat`.

### To run a separate instance of this bot on your own:

* Create a file called .env
* Inside .env specify the following information:

```
BOT_TOKEN=token_for_your_instance_of_this_bot
```

* Start the bot with `npm start` for production mode, or `npm run dev` for development mode (development mode just runs it with nodemon).
