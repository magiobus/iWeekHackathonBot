module.exports = {
    name: 'help',
    description: "Brinda Ayuda del server",
    execute(msg, bot, args){

      let helpInfo = {
        "title": `Instrucciones para usar al Bot de iWeekHackathon 🤖`,
        "color": 15729368,
        "description": "Estos son los comandos que puedes usar:",
        "fields": [
          { "name": "!iweek-events list", "value": "Muestra la agenda del evento"},
          { "name": "!iweek-poll", "value": "Te permite hacer encuestas"}
        ],
        "content": "También puedes escribir preguntas directas y etiquetas a @iWeekBot en cualquier canal de texto.",
      }
      msg.channel.send({ embed: helpInfo });

    }
}
