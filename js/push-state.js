var App = {};
App.Router = Backbone.Router.extend({

  routes: {
    '': 'index',
    'page/:page': 'page',
    'help': 'help',
    '*error': 'notFound'
  },

  index: function () {
    console.log('This is Home');
  },

  page: function (page) {
    console.log('This is page ' + page);
  },

  help: function () {
    console.log('This is help page');
  },

  notFound: function () {
    console.log('404');
  }

});

$(function () {
var router = new App.Router();
var usePushState = true;
Backbone.history.start({ pushState: usePushState });

  // 在 pushState 啟用時，當在網址列輸入
  //     http://backbone.dev/#page/1
  // 時，會先替代成：
  //     http://backbone.dev/#/page/1
  // 然後再變成：
  //     http://backbone.dev/page/1

  // 這段程式主要是為了搭配 pushState: true 及 UI 使用
  // 實際上如果直接用瀏覽網址的話，是不用做這個動作的
  // 不然的話，會變成：
  //     http://backbone.dev/page/1#page/1
  //
if (usePushState) {
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    router.navigate($(this).attr('href'), true);
  });
}
  //
  // 如果連結綁定了上面的程式碼，那麼在按下時，就會執行：
  //     http://backbone.dev/#page/1
  //
});