require('dotenv').config();
const random = require("random");
const fs = require("fs");
const {google} = require('googleapis');
const jsonfile = require("jsonfile");

const prefix = '>';
let stats = {}

//WELCOMES NEW USERS
const greeting = async function(member){
  const channel = member.guild.channels.find(channel => channel.name === "general👋");
  const rulesChannel = member.guild.channels.find(channel => channel.name == "📐reglas")
  if(!channel) return;
  if(!rulesChannel) return;
  //Sends Welcome Msg to New User
  await channel.send(`Hey hola ${member}, bienvenid@ al server de iWeekHackathon! 🙌 \n Por favor, checa el channel de ${rulesChannel} para explicarte cómo funciona el servidor de Discord!` )
  await member.addRole(process.env.DEFAULT_ROLE)
  console.log(`se agrego ${member} al rol de participantes...`)
}

const commands = function(msg,bot,gCalendarObject){
  if(!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'iweek-help'){
    bot.commands.get('help').execute(msg,args);
  } else if (command === 'iweek-poll') {
    bot.commands.get('poll').execute(msg,args);
  } else if (command === 'iweek-events') {
    bot.commands.get('events').execute(msg,bot,args,gCalendarObject);
  } else if (command === 'iweek-roles') {
    bot.commands.get('roles').execute(msg,bot,args);
  }
}

const startGoogleApisCalendar = function(){
  const auth = new google.auth.GoogleAuth({
    keyFile: './gCalendarConfig.json', //this file is the keyfile of google service account
    scopes: ['https://www.googleapis.com/auth/calendar']
  });

  const calendar = google.calendar({version: 'v3', auth});
  return {"calendar": calendar, "auth": auth}
}


exports.greeting = greeting;
exports.commands = commands;
exports.startGoogleApisCalendar = startGoogleApisCalendar;
