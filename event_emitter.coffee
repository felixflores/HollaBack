util = require('util')

class EventEmitter
  constructor: () ->
    @events = {}

  bind: (events, func) ->
    throw "MissingHandler" unless func
    events = events.split(' ')

    for event in events
      identifiers = event.split('.')

      for i in [0..identifiers.length-1]
        if i is 0
          identifier = identifiers[i]
        else
          identifier = identifiers[0] + "." + identifiers[i]

        @events[identifier] = [] if not @events[identifier]?
        @events[identifier].push(func)

  unbind: (identifiers, func) ->
    identifiers = identifiers.split(' ')
    for event in this.eventList()
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
