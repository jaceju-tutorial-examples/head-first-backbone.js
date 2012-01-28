App = {}

class App.Router extends Backbone.Router

  routes:
    "": "mainMenu"
    "/options": "setOptions"
    "/start": "startGame"
    "/about": "about"
    "*error": "notFound"

  mainMenu: ->
    $('.viewport').hide()
    $('#main-menu').show()

  setOptions: ->
    $('.viewport').hide()
    $('#options').show()

  startGame: ->
    $('.viewport').hide()
    $('#game').show()

  notFound: ->
    alert "404"

$ ->
  router = new App.Router()
  Backbone.history.start()

  $("input[type=checkbox]").iToggle
    keepLabel: true
    speed: 300