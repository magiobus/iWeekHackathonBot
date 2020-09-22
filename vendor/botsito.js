const random = require("random");
const fs = require("fs");

const prefix = '>';
let stats = {}


//WELCOMES NEW USERS
const greeting = function(member){
  const channel = member.guild.channels.find(channel => channel.name === "general👋");
  const rulesChannel = member.guild.channels.find(channel => channel.name == "📐reglas")
  if(!channel) return;
  if(!rulesChannel) return;
  //Sends Welcome Msg to New User
  channel.send(`Hey hola ${member}, bienvenid@ al server de iWeekHackathon! 🙌 \n Por favor, checa el channel de ${rulesChannel} para explicarte cómo funciona el servidor de Discord!` )
}

const commands = function(msg,bot,){
  if(!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'iweek-help'){
    bot.commands.get('help').execute(msg,args);
  } else if (command === 'iweek-poll') {
    bot.commands.get('poll').execute(msg,args);
  }
}


exports.greeting = greeting;
exports.commands = commands;
