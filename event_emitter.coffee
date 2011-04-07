util = require('util')

class EventEmitter
  constructor: () ->
    @events = {}

  # obj.bind('event-name', function)
  # obj.bind('event-name.namespace', function)
  # obj.bind('event-name1 event-name2', function)
  #
  # These are equivalent
  # obj.bind('event-name.namespace1.namespace2', function)
  # obj.bind('event-name.namespace2.namespace1', function)
  bind: (events, func) ->
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

  # obj.unbind('.namespace')
  # obj.unbind('event-name')
  # obj.unbind('event-name1 event-name2')
  # obj.unbind('event-name.namespace')
  # obj.unbind('.namespace1 .namespace1')
  # all accepts handler matching
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
