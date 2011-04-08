util = require('util')

class EventEmitter
  constructor: () ->
    @events = {}

  bind: (events, func) ->
    throw "BindMissingEventHandler" unless func

    splitEvents = (events) ->
      names = []

      for event in events.split(' ')
        nameParts = event.split('.')
        for i in [0..nameParts.length-1]
          if i is 0
            names.push nameParts[i]
          else
            names.push nameParts[0] + "." + nameParts[i]

      return names

    for event in splitEvents(events)
      @events[event] = [] if not @events[event]?
      @events[event].push(func)

  unbind: (identifiers, func) ->
    eventList = ->
      `
      var eventnames = []
      for(eventname in this.events) {
        eventnames.push(eventname)
      }
      `
      return eventnames

    identifiers = identifiers.split(' ')
    for event in eventList()
      if func?
        handlerToBeDeleted = @events[identifiers].indexOf(func)
        if handlerToBeDeleted isnt -1
          @events[identifiers].splice(handlerToBeDeleted, 1)
      else
        delete @events[identifiers]

  trigger: (event, args...) ->
    if @events[event]?
      for func in @events[event]
        func.apply(this, args)

    return null


if window?
  window.EventEmitter = EventEmitter
else
  module.exports = EventEmitter
