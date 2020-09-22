require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN; //Discord Env Token

//Importing Commands Folder Files
bot.commands = new Discord.Collection();

bot.once('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`)
});

//WHEN A USER TYPES A MESSAGE
bot.on('message', msg => {
  console.log("mensaje typeado! =>", msg)
  // botsito.levels(msg,bot);
  // botsito.commands(msg,bot,gCalendarObject);
  // botResponses.responses(msg,bot,gCalendarObject);
  // botsito.banDiscordLinks(msg,bot,"comparte-tu-stream")
});

bot.login(TOKEN);
