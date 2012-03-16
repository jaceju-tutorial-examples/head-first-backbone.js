// 定義簡易的 namespace
var App = {};

// Router 類別：
App.Router = Backbone.Router.extend({

  // 定義 routes ；
  routes: {
    '': 'index',
    'page/:page': 'page',
    'help': 'help',
    // 其他未定義的網址，就會執行 `notFound` 方法。
    // 不一定要用 `*error` ，主要是。
    '*hello': 'notFound'
  },

  // 首頁；
  index: function () {
    console.log('This is Home');
  },

  // 處理 `page/:page` ，並且把 `:page` 轉換成 `page` 參數。
  page: function (page) {
    console.log('This is page ' + page);
  },

  // Help 頁；
  help: function () {
    console.log('This is help page');
  },

  // 當輸入的網址不在定義裡的時候，就視為 404 。
  notFound: function () {
    console.log('404');
  }

});

$(function () {
  var router = new App.Router();
  var usePushState = true;
  Backbone.history.start({ pushState: usePushState });

  // 在 pushState 啟用時，當在網址列輸入
  //
  //     http://backbone.dev/#page/1
  //
  // 時，會先替代成：
  //
  //     http://backbone.dev/#/page/1
  //
  // 然後再變成：
  //
  //     http://backbone.dev/page/1

  // 這段程式主要是為了搭配 pushState: true 及 UI 使用
  // 實際上如果直接用瀏覽網址的話，是不用做這個動作的
  // 不然的話，會變成：
  //
  //     http://backbone.dev/page/1#page/1

  if (usePushState) {
    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      router.navigate($(this).attr('href'), true);
    });
  }

  // 如果連結綁定了上面的程式碼，那麼在按下時，就會執行：
  //
  //     http://backbone.dev/#page/1
});