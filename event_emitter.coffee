util = require('util')

class EventEmitter
  constructor: () ->

    @events = {
    }


  bind: (events, func) ->
    addEvent = (label, functionNameSpaceSet) =>
      @events[label] = [] unless @events[label]?
      @events[label].push(functionNameSpaceSet)

      return null

    throw "BindMissingEventHandler" unless func

    for _event in events.split(' ')
      identifiers = _event.split('.')
      eventName = ''
      functionNameSpaceSet = [func]

      for i in [0..identifiers.length-1]
        throw "EventNameUnacceptable" if identifiers[i].match(/^\.|^add$|^remove$|^[0-9]|^$/)

        if i is 0
          eventName = identifiers[i]
        else
          functionNameSpaceSet.push(identifiers[i])

      addEvent(eventName, functionNameSpaceSet)

      if functionNameSpaceSet.length > 1
        for i in [1..functionNameSpaceSet.length-1]
          addEvent(eventName + '.' + functionNameSpaceSet[i], [func])

    return null


  unbind: (events, func) ->

    return null


  trigger: (events, args...) ->
    for _event in events.split(' ')
      throw 'IllegalTrigger' if _event[0] is '.'

      eventsToBeTriggered = []

      identifiers = _event.split('.')
      if identifiers.length is 1
        eventsToBeTriggered.push identifiers[0]
      else
        for i in [1..identifiers.length-1]
          eventsToBeTriggered.push identifiers[0] + '.' + identifiers[i]

      for eventToBeTriggered in eventsToBeTriggered
        if @events[eventToBeTriggered]?
          for func in @events[eventToBeTriggered]
            func[0].apply(this, args)

    return null


if window?
  window.EventEmitter = EventEmitter
else
  module.exports = EventEmitter
