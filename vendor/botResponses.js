const _ = require('lodash')
const questionsData = require('../training/questions.json')
const answersData = require('../training/answers.json')

const botsito = require('./botsito');
const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['es'], forceNER: true });
manager.load('./model.nlp'); //comment this first time you run the file
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
      case 'answers.help':
        msg.content = '>iweek-help'
        botsito.commands(msg, bot, gCalendarObject)
        break;
      case 'answers.events':
        msg.content = '>iweek-events list'
        botsito.commands(msg, bot, gCalendarObject)
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
            msg.channel.send(`${randomResponse.answer} ${msg.author}`)
            return;
          }
        }
        msg.channel.send(randomResponse.answer)
    }
  }
}

exports.responses = responses;
