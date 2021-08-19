require("dotenv").config()
const fetch = require("node-fetch")

const Discord = require("discord.js")
const client = new Discord.Client()

// import util functions
const checkString = require("./utils/checkString")
const cowsay = require("cowsay")

// contains all pre-programmed responses the the bot can give
const botResponses = {
	"interjection": "I'd just like to interject for moment. What you're refering to as Linux, is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX. Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called Linux, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project. There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine's resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called Linux distributions are really distributions of GNU/Linux!",
	"vim": "You exit Vim by simply walking to the main power switch in your basement, turn it off, leave it off for about an hour, don’t open the freezer during this time, then turn power back on and your ArchOS should be up and running again without Vim. It’s so silly to think that I used to go through all the trouble of calling my electricity company and cancelling my power contract every time I wanted to exit Vim, before I figured out the proper way to do it." 
}

client.once("ready", () => {
	console.log(`Bot has logged in as ${client.user.tag}`)
	client.user.setActivity("your webcam to LiveLeak", {
		type: "STREAMING",
		url: "https://www.twitch.tv/zer0flag"
	})
})

client.login(process.env.BOT_TOKEN)

// welcome new members
client.on("guildMemberAdd", member => {
	let general = client.channels.cache.get(process.env.GENERAL_CHANNEL_ID)
	general.send(`Welcome to hell ${member.user}`)
})

// message listener
client.on("message", msg => {
	// Exit vim meme
	if(!checkString(msg.content, ["how", ["vim", ["vi"]], ["exit", ["quit"]]], []) && msg.author.id != process.env.BOT_ID) {
		msg.reply(botResponses.vim)
	}

	// GNU/Linux interjection functionality
	if(!checkString(msg.content, ["linux", ["os", ["operating", "system"]]], ["not", "gnu"]) && msg.author.id != process.env.BOT_ID) {
		msg.reply(botResponses.interjection)
	}

	// Sends pic of RMS when he is mentioned
	if(!checkString(msg.content, [["rms", ["richard", "stallman"], ["richard", "matthew", "stallman"]]], []) && msg.author.id != process.env.BOT_ID) {
		msg.channel.send("Our Lord and Saviour!", {files: ["./img/RMS.jpg"]})
	}

	if(msg.content.startsWith("!cowsay") && msg.author.id != process.env.BOT_ID) {
		const msg_formatted = msg.content.replace(new RegExp("`", "g"), "")

		try {
		msg.channel.send("```" + cowsay.say({text: msg_formatted.substr(msg_formatted.indexOf(" ") + 1), e: "oo"}) + "```")
		} catch {
			msg.channel.send("```" + cowsay.say({text: "nice try piece of shit", e: "oo"}) + "```")
		}
	}

	if(msg.content.startsWith("!ghostping") && msg.author.id != process.env.BOT_ID) {
		msg.delete({timeout: 500})
	}

	if(msg.content.startsWith("!zer0say") && msg.author.id != process.env.BOT_ID) {
		msg.channel.send(msg.content.substr(msg.content.indexOf(" ") + 1))
		msg.delete()
	}
})

