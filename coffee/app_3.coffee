App = {}

class App.ViewPort extends Backbone.View
  events:
    'click .home': 'hide'

  hide: ->
    $(@el).hide()

  render: ->
    $(@el).show()

class App.MenuView extends App.ViewPort

  events:
    'click a': 'hide'

class App.OptionsView extends App.ViewPort

  initialize: ->
    $("input[type=checkbox]").iToggle
      keepLabel: true
      speed: 300

class App.GameView extends App.ViewPort

class App.Router extends Backbone.Router

  initialize: ->
    @menuView = new App.MenuView
      el: '#main-menu'

    @optionsView = new App.OptionsView
      el: '#options'

    @gameView = new App.GameView
      el: '#game'

  routes:
    "": "mainMenu"
    "/options": "setOptions"
    "/start": "startGame"
    "/about": "about"
    "*error": "notFound"

  mainMenu: ->
    @menuView.render()

  setOptions: ->
    @optionsView.render()

  startGame: ->
    @gameView.render()

  notFound: ->
    alert "404"

$ ->
  router = new App.Router()
  Backbone.history.start()
