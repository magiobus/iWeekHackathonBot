const _ = require('lodash');
const pollEmojis = require('../vendor/pollEmojis');

module.exports = {
    name: 'poll',
    description: "Hace Encuestas!!!",
    execute(msg, args){

      // No Args, description of command
      if(!args.length){
        let info = {
          "title": "📊 Instrucciones para hacer encuestas:",
          "color": 15729368,
          "fields": [
            { "name": "Si/No", "value": `>iweek-poll "Haz tu pregunta"`},
            { "name": "Opción Multiple", "value": `>iweek-poll "Haz tu pregunta Multiple aquí" "Opcion1" "Opcion2" "Opcion3"`}
          ]
        }
        msg.channel.send({ embed: info });
        return;
      }

      //strip question and options
      let newArgs = args.join(" ").split('"').filter(entry => entry.trim() != '');

      let pollMessage = {
        "title": `📊 ${newArgs[0]}`,
        "color": 15729368,
        "description": "Vota aquí abajo ⬇️⬇️⬇️⬇️ \n \n"
      }
      console.log("new args =>", newArgs)

      let reactions = function(){
        console.log("inside reactions")
        //YES-NO Question
        if(newArgs.length === 1){
          msg.channel.send({ embed: pollMessage }).then(async messageReaction => {
              await messageReaction.react("👍🏻")
              await messageReaction.react("👎🏻")
          })
        } else {
          //MULTIPLE Question
          for(let i=1; i<=newArgs.length-1; i++){
            pollMessage.description +=  `:regional_indicator_${String.fromCharCode(96 + i)}: ${newArgs[i]}\n`
          }

          msg.channel.send({ embed: pollMessage }).then(async messageReaction => {
            for(let i=1; i<=newArgs.length-1; i++){
              let option = newArgs[i]
              await messageReaction.react(pollEmojis[i])
            }
          })
        }
      }

      reactions()
    }
}
