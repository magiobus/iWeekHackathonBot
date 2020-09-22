const _ = require('lodash')
const questionsData = require('../training/questions.json')
const answersData = require('../training/answers.json')

const botsito = require('../botsito');
const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['es'], forceNER: true });
manager.load('./model.nlp');
const responses = async function(msg,bot,gCalendarObject){ //responses for tagged bot

  let message = _.toLower(msg.content)
  let parsedMsg = _.lowerCase(msg.content).replace(/[0-9]/g, "")

  if(msg.content.includes(bot.user.id)){
    // Training Dataset questions
    questionsData.questions.forEach(item=>{ manager.addDocument('es',item.text,item.category) })

    //Training answers
    answersData.answers.forEach(item=>{ manager.addAnswer('es',item.category,item.text) })

    //train and save the model
    await manager.train();
    manager.save('model.nlp');
    const response = await manager.process('es', parsedMsg);

    switch(response.intent){
      case 'answers.levels':
        msg.content = '!tngo-levels'
        botsito.commands(msg, bot, gCalendarObject)
        break;
      case 'answers.rank':
        msg.content = '!tngo-rank'
        botsito.commands(msg, bot, gCalendarObject)
        break;
      case 'answers.help':
        msg.content = '!tngo-help'
        botsito.commands(msg, bot, gCalendarObject)
        break;
      case 'answers.getVideoSeries':
        msg.channel.send("muestra serie pa ver")
        break;
      case 'answers.getMovie':
        msg.content = "!tngo-getmovie"
        botsito.commands(msg, bot)
        break;
      case 'answers.tellJoke':
        msg.content = '!tngo-telljoke'
        botsito.commands(msg, bot)
        break;
      case 'answers.events':
        msg.content = '!tngo-events list'
        botsito.commands(msg, bot, gCalendarObject)
        break;
      case 'answers.minecraft':
        msg.content = '!tngo-maincra'
        botsito.commands(msg, bot, gCalendarObject)
        break;
      case 'answers.getVideoGame':
        msg.content = "!tngo-getvideogame"
        botsito.commands(msg, bot)
        break;
      default:
        let randomResponse = {"answer": "Lo siento, no te endendí ☹️"}
        if(response.answers.length>0){
          randomResponse = response.answers[Math.floor(Math.random() * response.answers.length)]
          let intent = response.intent

          let match = ["answers.love","answers.hate","answers.hello","answers.bye","answers.morning","answers.afternoon","answers.nights","answers.thanks", "answers.sorry"].filter(function(item){
              return item === intent;
          });

          if(match.length > 0){
            msg.channel.send(randomResponse.answer + ' ' + msg.author)
            return;
          }
        }
        msg.channel.send(randomResponse.answer)
    }
  }
}

exports.responses = responses;
