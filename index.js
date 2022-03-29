require("dotenv").config()
const fetch = require("node-fetch")

const Discord = require("discord.js")
const client = new Discord.Client()
const { exec } = require("child_process")

// import util functions
const checkString = require("./utils/checkString")
const cowsay = require("cowsay")

// contains all pre-programmed responses the the bot can give
const botResponses = {
	"interjection": "I'd just like to interject for moment. What you're refering to as Linux, is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX. Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called Linux, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project. There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine's resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called Linux distributions are really distributions of GNU/Linux!",
	"vim": "You exit Vim by simply walking to the main power switch in your basement, turn it off, leave it off for about an hour, don’t open the freezer during this time, then turn power back on and your ArchOS should be up and running again without Vim. It’s so silly to think that I used to go through all the trouble of calling my electricity company and cancelling my power contract every time I wanted to exit Vim, before I figured out the proper way to do it." 
}

// message on join
client.once("ready", () => {
        console.log(`Bot has logged in as ${client.user.tag}`)
        global.BOT_ID = client.user.id // Make sure the bot has authenticated first.
})

client.login(process.env.BOT_TOKEN)

// welcome new members
client.on("guildMemberAdd", member => {
	// member.guild.channels.cache.get(get_welcome_channel(member.guild.id)).send(`Welcome to hell, <@${member.user.id}>!`)
	exec(`./zer0bot_tools get_welcome_channel ${member.guild.id}`, (err, stdout, stderr) => {
		const welcome_channel = stdout.replace(/[\n\r]/g, '')
		try {
			setTimeout(() => member.guild.channels.cache.get(welcome_channel).send(`Welcome to hell ${member.user}`), 200)
		} catch { }
	})
})

// message listener
client.on("message", msg => {
	if(msg.content.length < 1900) {
		let msg_formatted_lmao = msg.content.replace(/[^a-zA-Z ]/g, "")
		if(msg_formatted_lmao.length > 1900 && msg.content[0] == "!") {
			return 1
		}

		// Exit vim meme
		if(!checkString(msg_formatted_lmao, ["how", ["vim", ["vi"]], ["exit", ["quit"]]], []) && msg.author.id != process.env.BOT_ID) {
			msg.reply(botResponses.vim)
		}

		// GNU/Linux interjection functionality
		if(!checkString(msg_formatted_lmao, ["linux", ["os", ["operating", "system"]]], ["not", "gnu"]) && msg.author.id != process.env.BOT_ID) {
			msg.reply(botResponses.interjection)
		}

		// Sends pic of RMS when he is mentioned
		if(!checkString(msg_formatted_lmao, [["rms", ["richard", "stallman"], ["richard", "matthew", "stallman"]]], []) && msg.author.id != process.env.BOT_ID) {
			msg.channel.send("Our Lord and Saviour!", {files: ["./img/RMS.jpg"]})
		}

		// commands
		if(msg.content.startsWith("!0") && msg.author.id != process.env.BOT_ID) {
			const msg_formatted = msg.content.replace(new RegExp("`", "g"), "")
			const command = msg_formatted.split(" ")[1]
			const args = msg_formatted.replace(/^([^ ]+ ){2}/, '')
			
			switch(command) {
				case "cowsay":
					try {
						msg.channel.send("```" + cowsay.say({text: args, e: "oo"}) + "```")
					} catch {
						msg.channel.send("```" + cowsay.say({text: "nice try", e: "oo"}) + "```")
					}
					break
				case "ghostping":
					msg.delete({timeout: 500})
					break
				case "zer0say":
					msg.channel.send({ content: args, allowedMentions: { parse: [] }})
					msg.delete()
					break
				case "set_welcome_channel":
					if(msg.guild.ownerID == msg.author.id) {
						try {
							const channel_id = msg.guild.channels.cache.find(channel => channel.name === args).id
							exec(`./zer0bot_tools set_welcome_channel ${msg.guild.id} ${channel_id}`, (err, stdout, stderr) => {
								msg.channel.send(`Set the welcome channel for this guild to ${args} (id: ${channel_id})!`)
							})
						} catch {
							msg.channel.send("Invalid channel name!")
						}
					} else { msg.channel.send("This command is limited to the owner of the guild!") }
					break
				default:
					if(msg.guild.ownerID != msg.author.id) {
						msg.channel.send('```This is an invalid command!\n\nVALID COMMANDS:\n================\n!0 cowsay\n!0 ghostping\n!0 zer0say```')
					} else {
						msg.channel.send('```This is an invalid command!\n\nVALID COMMANDS:\n================\n!0 cowsay\n!0 ghostping\n!0 zer0say\n\nADMIN COMMANDS:\n================\n!0 set_welcome_channel```')
					}
					break
			}
		}
	}
})
