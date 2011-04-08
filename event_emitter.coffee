util = require('util')

class EventEmitter
  constructor: () ->

    # felixIsAwesome is equivalent to push method
    # I don't want to use push so that users can define an event
    # called push without conflict with my internal method
    @events = {
      felixIsAwesome: (event, func) ->
        throw "EventNameUnacceptable" if event.match(/^\.|^felixIsAwesome$|^[0-9]/)
        this[event] = [] unless this[event]?
        return this[event].push(func) - 1
    }

    # Needed to unbind events that are tied to namespace
    # { client: [[click, 2], [click, 0], [explode, 3]] }
    @namespacedEvents = {
      add: (namespace, event, functionIndex) ->
        this[namespace] = [] unless this[namespace]?
        this[namespace].push [event, functionIndex]
    }

  bind: (events, func) ->
    throw "BindMissingEventHandler" unless func

    unless events.indexOf(' ') > -1 or events.indexOf('.') > -1
      @events.felixIsAwesome events, func
    else
      for event in events.split(' ')
        if not event.match(/\./)
          @events.felixIsAwesome(event, func)
        else
          identifiers = event.split('.')
          for i in [0..identifiers.length-1]
            if i is 0
              functionIndex = @events.felixIsAwesome(identifiers[i], func)
              eventName = identifiers[0]
            else
              @events.felixIsAwesome identifiers[0] + '.' + identifiers[i], func
              @namespacedEvents.add identifiers[i], eventName, functionIndex

    return null

  unbind: (events, func) ->
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
        handlerToBeDeleted = @events[events].indexOf(func)
        if handlerToBeDeleted isnt -1
          @events[events].splice(handlerToBeDeleted, 1)
      else
        delete @events[events]

    return null

  trigger: (event, args...) ->
    if @events[event]?
      for func in @events[event]
        func.apply(this, args)

    return null


if window?
  window.EventEmitter = EventEmitter
else
  module.exports = EventEmitter
