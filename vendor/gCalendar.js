const moment = require('moment-timezone');
moment.locale('es')

let TurndownService = require('turndown')
let turndownService = new TurndownService()

const getEvents = async function(msg,calendar,CALENDAR_ID, showId = false){
  try {
    let eventsList = {
      "title": `:date: Esta es la lista de eventos próximos (Hora Chihuahua)`,
      "color": 15729368,
      fields:[]
    }

    let startTime = moment().startOf('day')
    let endTime = moment().startOf('day').add(7, 'days');
    let events = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      maxResults: 30,
      singleEvents: true,
      orderBy: 'startTime'
    })
    let eventsData = events.data.items
    console.log("eventsData =>", eventsData)
    if(!eventsData.length){
      msg.channel.send("No hay eventos próximos en el server ☹️")
      return;
    }

    eventsData.map((event, i) => {
      let eventId = ""
      if(showId){ eventId = `(${event.id})` }
      const startDate = moment(event.start.dateTime) || event.start.date;
      const endDate = moment(event.end.dateTime) || event.end.date;
      const timeCUU = startDate.tz('America/Chihuahua').format('hh:mm A')
      const timeCuuEnd = endDate.tz('America/Chihuahua').format('hh:mm A')
      eventsList.fields.push({"name": `:arrow_right: ${event.summary} ${eventId} \n`, "value": `***Cuándo?:*** ${startDate.tz('America/Chihuahua').format('dddd LL')}  ${timeCUU} -  ${timeCuuEnd}`})
    });

    msg.channel.send({embed: eventsList})

  } catch (e) {
    console.log("Error en events list =>", e)
    msg.channel.send("Ocurrió un error trayendo la información de eventos ☹️")
  }
}

const addEvent = async function(msg, calendar, auth, CALENDAR_ID, newArgs){
  try {
    let [title,date,startTime,where] = [newArgs[1], newArgs[2], newArgs[3],newArgs[4]];
    let dateTime = moment(date + ' ' + startTime, 'DD/MM/YYYY HH:mm a').tz("America/Mexico_City")
    let event = {
      'summary': title,
      'description': where,
      'start': {
        'dateTime': dateTime.toISOString(),
        'timeZone': "America/Chihuahua"
      },
      'end': {
        'dateTime': dateTime.add(2,'hours').toISOString(),
        'timeZone': "America/Chihuahua"
      }
    };

    let newEvent = await calendar.events.insert({
      auth: auth,
      calendarId: CALENDAR_ID,
      resource: event
    })

    let newEventMsg = `Se ha creado el evento correctamente con el ID: ${newEvent.data.id}`
    msg.channel.send(newEventMsg)

  } catch (e) {
    console.log("Error creando evento =>", e)
    msg.channel.send("Ocurrió un error creando el evento ☹️")
  }
}


const removeEvent = async function(msg,calendar,auth,CALENDAR_ID,eventId){
try{
    let removeEventData = {
      "calendarId": 'CALENDAR_ID',
      "eventId": eventId.toString()
    };

    let deletedEvent = await calendar.events.delete({
      'calendarId': CALENDAR_ID,
      'eventId': eventId
    })

    msg.channel.send("Evento Borrado exitosamente 😎")

  } catch(e){
    console.log("e =>", e.response)
    msg.channel.send(`Ocurrió un error borrando el evento: ${e.response.data.error.message || ''}`)

  }
}

exports.addEvent = addEvent
exports.removeEvent = removeEvent
exports.getEvents = getEvents
