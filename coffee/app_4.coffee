App = {}

class App.OptionsModel extends Backbone.Model

  initialize: ->
    @set
      'playSound': true
      'playMusic': true

class App.ViewPort extends Backbone.View

  render: ->
    $(@el).show()

class App.MenuView extends App.ViewPort

class App.OptionsView extends App.ViewPort

  initialize: ->
    $("#play-music").prop 'checked', @model.get 'playSound'
    $("#play-sound").prop 'checked', @model.get 'playMusic'
    $(":checkbox").iphoneStyle
      onChange: (target, checked) ->
        $(target).trigger 'changeStatus'

  events:
    'changeStatus #play-music': 'setPlayMusic'
    'changeStatus #play-sound': 'setPlaySound'

  setPlayMusic: (e) =>
    @model.set 'playMusic': $(e.target).prop 'checked'

  setPlaySound: (e) =>
    @model.set 'playSound': $(e.target).prop 'checked'

class App.GameView extends App.ViewPort

  initialize: ->
    @musicIcon = $('#music-icon')
    @soundIcon = $('#sound-icon')
    @model.bind 'change', @updateOptions

  updateOptions: =>
    if @model.get 'playMusic' then @musicIcon.show() else @musicIcon.hide()
    if @model.get 'playSound' then @soundIcon.show() else @soundIcon.hide()

class App.Router extends Backbone.Router

  initialize: ->
    @options = new App.OptionsModel

    @views = $('.viewport')

    @menuView = new App.MenuView
      el: '#main-menu'

    @optionsView = new App.OptionsView
      el: '#options'
      model: @options

    @gameView = new App.GameView
      el: '#game'
      model: @options

  routes:
    "": "mainMenu"
    "/options": "setOptions"
    "/start": "startGame"
    "/about": "about"
    "*error": "notFound"

  mainMenu: ->
    @views.hide()
    @menuView.render()

  setOptions: ->
    @views.hide()
    @optionsView.render()

  startGame: ->
    @views.hide()
    @gameView.render()

  notFound: ->
    alert "404"

$ ->
  router = new App.Router()
  Backbone.history.start()
