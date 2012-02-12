App = {}

class App.MenuView extends Backbone.View

  events:
    'click a': 'hide'

  hide: ->
    $(@el).hide()

  render: ->
    $(@el).show()

class App.OptionsView extends Backbone.View

  initialize: ->
    $("input[type=checkbox]").iToggle
      keepLabel: true
      speed: 300

  events:
    'click .home': 'hide'

  hide: ->
    $(@el).hide()

  render: ->
    $(@el).show()

class App.GameView extends Backbone.View

  events:
    'click .home': 'hide'

  hide: ->
    $(@el).hide()

  render: ->
    $(@el).show()

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