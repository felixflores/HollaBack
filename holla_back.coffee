# HollaBack - Any object that extends HollaBack can serve as an event emitter
# Felix Flores 2011 v0.1.0

class HollaBack
  constructor: () ->

    @events = {
    }


  bind: (events, func) ->
    throw "BindMissingEventHandler" unless func

    addEvent = (_event, handlerWithNamspace) =>
      throw "EventNameUnacceptable" if _event.match(/^\.|^[0-9]|^$/)

      @events[_event] = [] unless @events[_event]?
      @events[_event].push(handlerWithNamspace)

      return null

    for _event in events.split(' ')
      identifiers = _event.split('.')
      eventName = identifiers.shift()

      handlerWithNamspace = if identifiers.length is 0 then [func] else [func].concat(identifiers)

      addEvent(eventName, handlerWithNamspace)

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

            matchNamespace = this.functionInNamepspace(namespacedFunc, namespaces)

            if func?
              matchFunction = namespacedFunc[0] is func
            else
              matchFunction = true

            @events[name].push(namespacedFunc) unless matchNamespace and matchFunction

          delete @events[name] if @events[name].length is 0

    return null


  trigger: (_event, args...) ->
    if _event?
      throw 'IllegalTrigger' if _event[0] is '.' or _event.indexOf(' ') > -1

      identifiers = _event.split('.')
      eventName = identifiers.shift()
      namespaces = identifiers

      if @events[eventName]?
        for funcNamespace in @events[eventName]
          if this.functionInNamepspace(funcNamespace, namespaces, true)
            funcNamespace[0].apply(this, args)

    return null

  functionInNamepspace: (listenerFunction, namespaces, strict) ->
    return true if namespaces.length is 0 or listenerFunction.length is 1

    if strict
      i = 1
      isInNameSpace = true
      while i < listenerFunction.length
        isInNameSpace = namespaces.indexOf(listenerFunction[i]) > -1

        if isInNameSpace
          i++
        else
          i = listenerFunction.length

    else
      i = 0
      isInNameSpace = false
      while i < namespaces.length and not isInNameSpace
        isInNameSpace = listenerFunction.indexOf(namespaces[i]) > -1
        i++

    return isInNameSpace


if window?
  window.HollaBack = HollaBack
else
  module.exports = HollaBack
