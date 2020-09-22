module.exports = {
    name: 'help',
    description: "Brinda Ayuda del server",
    execute(msg, bot, args){

      let helpInfo = {
        "title": `Instrucciones para usar al Bot de iWeekHackathon 🤖`,
        "color": 15729368,
        "description": "Puedes preguntar algo directamente etiquetando a @iweekBot \n Estos son los comandos que se puedes usar:",
        "fields": [
          { "name": ">iweek-events list", "value": "Muestra la agenda del evento"},
          { "name": ">iweek-poll", "value": "Te permite hacer encuestas"}
        ]
      }
      msg.channel.send({ embed: helpInfo });

    }
}
