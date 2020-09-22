require('dotenv').config();
const Discord = require('discord.js');
const botsito = require('./vendor/botsito');
const botResponses = require('./vendor/botResponses');
const fs = require('fs');

const bot = new Discord.Client();
const gCalendarObject = botsito.startGoogleApisCalendar() //initializes calendar instance of google apis
const TOKEN = process.env.TOKEN; //Discord Env Token

//Importing Commands Folder Files
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){ const command = require(`./commands/${file}`); bot.commands.set(command.name, command);}


bot.once('ready', () => { console.info(`Logged in as ${bot.user.tag}!`) });

//WHEN A NEW USER ENTERS THE SERVER!!!
bot.on('guildMemberAdd', member => { botsito.greeting(member) })

//WHEN A USER TYPES A MESSAGE
bot.on('message', msg => {
  botsito.commands(msg,bot,gCalendarObject);
  botResponses.responses(msg,bot,gCalendarObject);
});

bot.login(TOKEN);
