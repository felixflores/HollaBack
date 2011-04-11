# HollaBack - Any object that extends HollaBack can serve as an event emitter
# Felix Flores 2011 v0.1.3

# TODO Need to refactor unbind and handlerInNamespace function

class HollaBack
  constructor: () ->

    @events = {
    }


  bind: (events, func) ->
    throw "BindMissingEventHandler" unless func

    addEvent = (_event, namespacedHandler) =>
      throw "EventNameUnacceptable" if _event.match(/^\.|^[0-9]|^$/)

      @events[_event] = [] unless @events[_event]?
      @events[_event].push(namespacedHandler)

      return null

    for _event in events.split(' ')
      identifiers = _event.split('.')
      eventName = identifiers.shift()

      namespacedHandler = if identifiers.length is 0 then [func] else [func].concat(identifiers)

      addEvent(eventName, namespacedHandler)

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
            namespacedHandler = @events[name].shift()
            matchNamespace = this.handlerInNamespace(namespacedHandler, namespaces)

            if func?
              matchFunction = namespacedHandler[0] is func
            else
              matchFunction = true

            @events[name].push(namespacedHandler) unless matchNamespace and matchFunction

          delete @events[name] if @events[name].length is 0

    return null


  trigger: (_event, args...) ->
    if _event?
      throw 'IllegalTrigger' if _event[0] is '.' or _event.indexOf(' ') > -1

      identifiers = _event.split('.')
      eventName = identifiers.shift()
      namespaces = identifiers

      if @events[eventName]?
        for namespacedHandler in @events[eventName]
          if this.handlerInNamespace(namespacedHandler, namespaces, true)
            namespacedHandler[0].apply(this, args)

    return null

  handlerInNamespace: (namespacedHandler, namespaces, strict) ->
    return true if namespaces.length is 0 or namespacedHandler.length is 1

    if strict
      i = 1
      match = true

      while i < namespacedHandler.length
        match = namespaces.indexOf(namespacedHandler[i]) > -1
        i = if match then i + 1 else namespacedHandler.length

    else
      i = 0
      match = false

      while i < namespaces.length and not match
        match = namespacedHandler.indexOf(namespaces[i]) > -1
        i++

    return match


if window?
  window.HollaBack = HollaBack
else
  module.exports = HollaBack
