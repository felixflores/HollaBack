# HollaBack - Any object that extends HollaBack can serve as an event emitter
# Felix Flores 2011 v0.1.0

util = require('util')

class HollaBack
  constructor: () ->

    @events = {
    }


  bind: (events, func) ->
    throw "BindMissingEventHandler" unless func

    addEvent = (label, functionNameSpaceSet) =>
      @events[label] = [] unless @events[label]?
      @events[label].push(functionNameSpaceSet)

      return null

    for _event in events.split(' ')
      identifiers = _event.split('.')
      eventName = ''
      functionNameSpaceSet = [func]

      for i in [0..identifiers.length-1]
        throw "EventNameUnacceptable" if identifiers[i].match(/^\.|^[0-9]|^$/)

        if i is 0
          eventName = identifiers[i]
        else
          functionNameSpaceSet.push(identifiers[i])

      addEvent(eventName, functionNameSpaceSet)

    return null


  unbind: (events, func) ->
    eventList = =>
      `
      var eventnames = []
      for(eventname in this.events) {
        eventnames.push(eventname);
      }
      `
      return eventnames

    for _event in events.split(' ')
      if _event[0] is '.'
        namespaces = _event.split('.')
        namespaces.shift()
        eventName = ''
      else
        identifiers = _event.split('.')
        eventName = identifiers.shift()
        namespaces = identifiers


      if eventName isnt '' and not func? and namespaces.length is 0
        delete @events[eventName]
      else
        eventNames = if eventName is '' then eventList() else [eventName]

        for name in eventNames
          for i in [0..@events[name].length-1]
            namespacedFunc = @events[name].shift()

            matchNamespace = @functionInNamepspace(namespacedFunc, namespaces)

            if func?
              matchFunction = namespacedFunc[0] is func
            else
              matchFunction = true

            @events[name].push(namespacedFunc) unless matchNamespace and matchFunction

          delete @events[name] if @events[name].length is 0

    return null


  trigger: (_event, args...) ->
    throw 'IllegalTrigger' if _event[0] is '.' or _event.indexOf(' ') > -1


    identifiers = _event.split('.')
    eventName = identifiers[0]
    namespaces = identifiers[1..identifiers.length-1]

    if @events[eventName]?
      for funcNamespace in @events[eventName]
        if @functionInNamepspace(funcNamespace, namespaces)
          funcNamespace[0].apply(this, args)

    return null

  functionInNamepspace: (namespacedFunction, userNamespaces) ->
    return true if userNamespaces.length is 0

    i = 0
    inNameSpace = false

    while i < namespacedFunction.length and not inNameSpace
      inNameSpace = namespacedFunction.indexOf(userNamespaces[i]) > -1
      i++

    return inNameSpace


if window?
  window.HollaBack = HollaBack
else
  module.exports = HollaBack
