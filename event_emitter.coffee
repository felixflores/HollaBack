util = require('util')

class EventEmitter
  constructor: () ->
    @events = {}

  bind: (events, func) ->
    throw "MissingHandler" unless func

    for event in @splitEvents(events)
      @events[event] = [] if not @events[event]?
      @events[event].push(func)

  unbind: (identifiers, func) ->
    identifiers = identifiers.split(' ')
    for event in @eventList()
      if func?
        handlerToBeDeleted = @events[identifiers].indexOf(func)
        if handlerToBeDeleted isnt -1
          @events[identifiers].splice(handlerToBeDeleted, 1)
      else
        delete @events[identifiers]

  trigger: (event, args...) ->
    if @events[event]
      for func in @events[event]
        do (func) ->
          func.apply(this, args)

  splitEvents: (events) ->
    names = []

    for event in events.split(' ')
      nameParts = event.split('.')
      for i in [0..nameParts.length-1]
        if i is 0
          names.push nameParts[i]
        else
          names.push nameParts[0] + "." + nameParts[i]

    return names

  eventList: ->
    `
    var eventnames = []
    for(eventname in this.events) {
      eventnames.push(eventname)
    }
    `
    eventnames

if window?
  window.EventEmitter = EventEmitter
else
  module.exports = EventEmitter
