require('dotenv').config();
const moment = require('moment-timezone');
moment().tz("America/Chihuahua").format();
moment.locale('es')

const gCalendar = require('../vendor/gCalendar')
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID

module.exports = {
    name: 'events',
    description: "Lista y crea eventos del server",
    async execute(msg, bot,args, gCalendarObject){

      if(!args.length){
        let eventsInfo = {
          "title": `Commandos para usar al Bot de Eventos 🤖`,
          "color": 15729368,
          "description": "",
          fields:[
            {"name": ">iweek-events list", "value": "Muestra la agenda de eventos del hackathon"}
          ]
        }
        msg.channel.send({ embed: eventsInfo });
        return;
      }

      let calendar = gCalendarObject.calendar
      let auth = gCalendarObject.auth

      //Subcommands
      if(args[0] === 'list'){ //Lists Events
        gCalendar.getEvents(msg,calendar,CALENDAR_ID)
      }  else if (args[0] === 'listid') {
        gCalendar.getEvents(msg,calendar,CALENDAR_ID, true)
      } else if (args[0] === 'add') {
        if(!args[1]){
          let eventsAddInfo = {
            "title": `Cómo usar el comando para añadir eventos 📅`,
            "color": 15729368,
            "description": "Escribe de la siguiente manera el comando \n ``` >iweek-events add 'Nombre del evento' 'DD/MM/YYYY' '3:00pm' 'donde' ``` ",
            "footer": {
              "text": 'Ejemplo: >iweek-events add "El evento de Magio" "20/07/2020" "8:00pm" "En Mentorias 🔊"'
            },

          }
          msg.channel.send({embed:eventsAddInfo})
          return;
        }

        let newArgs = args.join(" ").split('"').filter(entry => entry.trim() != '');

        if(newArgs.length === 5){
          gCalendar.addEvent(msg,calendar,auth,CALENDAR_ID,newArgs)
        } else {
          msg.channel.send("Escribe bien tu comando porfis")
        }

      } else if (args[0] === 'remove') {
        if(!args[1]){
          let eventsRemoveInfo = {
            "title": `Cómo usar el comando para remover eventos 📅`,
            "color": 15729368,
            "description": "Escribe de la siguiente manera el comando \n ``` >iweek-events remove 'id de tu evento'```",
            "footer": {
              "text": 'Ejemplo: >iweek-events remove "82363287238hdbjdjh2"'
            }
          }
          msg.channel.send({embed:eventsRemoveInfo})
          return;
        }

        let newArgs = args.join(" ").split('"').filter(entry => entry.trim() != '');
        if(newArgs.length === 2){ gCalendar.removeEvent(msg,calendar,auth,CALENDAR_ID,newArgs[1])}
      }
    }
}
