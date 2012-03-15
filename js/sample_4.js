(function () {

  // ## 初始化
  //
  // 將 root 變數指定到全域變數裡 (一般在瀏覽器中為 `window`) 。
  var root = this;

  // 定義應用程式的 namespace 。
  var NoteApp;
  NoteApp = root.NoteApp = {};

  // ## Note 類別
  //
  // Note 類別中包含 `title` 及 `content` 兩個屬性。
  NoteApp.Note = Backbone.Model.extend({
    defaults: {
      title: '',
      content: ''
    },

    // 屬性驗證邏輯， `title` 和 `content` 不可為空白。
    validate: function(attrs) {
      if (attrs.title === '') {
        return "'title' cannot be empty";
      }
      if (attrs.content === '') {
        return "'content' cannot be empty";
      }
    }

  });

  // ## Notes 類別
  //
  // model 指向 `Note` 類別。
  NoteApp.Notes = Backbone.Collection.extend({
    model: NoteApp.Note
  });

  // ## HeaderView 類別
  //
  // 負責維護上面的按鈕狀態。
  NoteApp.HeaderView = Backbone.View.extend({

    // 將事件綁在 DOM 元素上，主要處理表單的儲存。
    events: {
      "click #buttonSave": "save"
    },

    // 列表，顯示 `Add` 按鈕。
    list: function () {
      this.$("a,button", this.el).hide();
      this.$("#buttonAdd", this.el).show();
    },

    // 列表，顯示 `Back` 按鈕。
    detail: function () {
      this.$("a,button", this.el).hide();
      this.$("#buttonBack", this.el).show();
    },

    // 列表，顯示 `Back` 及 `Save` 按鈕。
    form: function () {
      this.$("a,button", this.el).hide();
      this.$("#buttonBack,#buttonSave", this.el).show();
    },

    // 觸發 save 事件，主要是為了解耦。
    save: function (e) {
      e.preventDefault();
      this.trigger("save");
    }
  });

  // ## ListView 類別
  //
  // 主要是用來呈現 `Note` 列表。
  NoteApp.ListView = Backbone.View.extend({

    // 取得 `#list-template` 的內容做為樣版。
    template: _.template($('#list-template').html()),

    // 繪製列表初始畫面。
    render: function () {
      this.$el.html(this.template());

      // 將集合中的每個 model 塞到 `ItemView` 中，並一一加到列表中。
      $ul = $(".list", this.el);
      this.collection.forEach(function (model) {
        var noteView = new NoteApp.ItemView({
          model: model
        });
        $ul.append(noteView.render().el);
      }, this);
      return this;
    }
  });

  // ## ItemView 類別
  //
  // 用來呈現列表中的每一列，包含標題、 `Edit` 及 `Delete` 按鈕。
  NoteApp.ItemView = Backbone.View.extend({

    // 將預設的 `div` 改為 `section` 標籤。
    tagName: 'section',

    // 取得 `#item-template` 的內容做為樣版。
    template: _.template($('#item-template').html()),

    // 繪製每一列的畫面。
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  // ## DetailView
  //
  // 細節頁，主要呈現 Note 的資訊。
  NoteApp.DetailView = Backbone.View.extend({

    // 取得 `#detail-template` 的內容做為樣版。
    template: _.template($('#detail-template').html()),

    // 繪製細節頁畫面。
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  // ## Editor
  //
  // 表單頁，主要用來編輯 Note 。
  NoteApp.Editor = Backbone.View.extend({

    tagName: 'form',

    // 取得 `#editor-template` 的內容做為樣版。
    template: _.template($('#editor-template').html()),

    // 繪製表單畫面。
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    // 儲存 Note ， `e` 為 `#buttonSave` 的 `click` 事件帶過來的。
    saveModel: function () {

      // 取得 model 並在驗證錯誤時，以 `alert` 方法顯示錯誤。
      var model = this.model;
      model.on('error', function (model, error) {
        alert(error);
      });

      // 將表單欄位值對應到 model 上。
      model.set({
        title: $("#title", this.el).val(),
        content: $("#content", this.el).val(),
      });

      // 通過驗證時，就將 model 新增或更新至列表裡面。
      if (model.isValid()) {

        // 如果是新增的話，就取得列表裡最大的 `id` 值並加一，當做新的 `id` 值。
        if (!model.id) {
          notes = NoteApp.app.notes;
          var newId = _.max(notes.pluck('id')) + 1;
          model.set('id', newId);
          notes.add(model);
        }

        // 完成編輯動作。
        this.trigger("done");
      }
    }
  });

  // ## App 類別
  //
  // 繼承自 Router ，主要當做應用程式骨架。
  NoteApp.App = Backbone.Router.extend({

    // 初始用的資料。
    sampleData: [
      { id: 1, title: 'note 1', content: 'This is note 1.' },
      { id: 3, title: 'note 3', content: 'This is note 3.' },
      { id: 5, title: 'note 5', content: 'This is note 5.' },
      { id: 6, title: 'note 6', content: 'This is note 6.' },
      { id: 9, title: 'note 9', content: 'This is note 9.' }
    ],

    // 參照 `Notes` 類別所所生成的物件。
    notes: null,

    // 指向參照 `HeaderView` 類別所生成的物件。
    headerView: null,

    // 參照 `HeaderView` 類別所生成的物件。
    initialize: function () {
      NoteApp.app || (NoteApp.app = this);
      this.notes = new NoteApp.Notes(this.sampleData);
      this.headerView = new NoteApp.HeaderView({
        el: '#header'
      });
    },

    // 指定路由。
    routes: {
      '': 'index',
      'show/:id': 'show',
      'add': 'add',
      'edit/:id': 'edit',
      'delete/:id': 'delete'
    },

    // 先清空目標區域，再繪製新的畫面；然後刪掉 view 物件，避免 memory leak 。
    _render: function (view) {
      $("#page").empty().append(view.render().el);
      delete view;
    },

    // 首頁，主要為處理列表。
    index: function () {

      var notesView = new NoteApp.ListView({
        collection: this.notes
      });

      // 繪製畫面
      this._render(notesView);

      // 呈現上方按鈕群組所應該對應的按鈕。
      this.headerView.list();
    },

    // 明細頁。
    show: function (id) {

      // 以 id 從集合中取得指定的 note 物件。
      var note = this.notes.get(id);

      var noteView = new NoteApp.DetailView({
        model: note
      });

      this._render(noteView);

      this.headerView.detail();
    },

    // 新增 Note 。
    add: function () {
      var note = new NoteApp.Note();
      this._form(note);
    },

    // 編輯 Note 。
    edit: function (id) {
      var note = this.notes.get(id);
      this._form(note);
    },

    // 處理表單。
    _form: function (note) {

      editorView = new NoteApp.Editor({
        model: note
      });

      // 當編輯完成後，就回到首頁。
      editorView.on("done", function () {
        this.navigate("#", true);
      }, this);

      // 先關掉 `save` 事件，避免重複綁定 callback 。
      // 然後再重新綁定 `save` 事件至 `editorView.saveModel` 方法上。
      this.headerView.off("save")
                      .on("save", editorView.saveModel, editorView);

      this._render(editorView);

      this.headerView.form();
    },

    // 刪除 Note 。
    delete: function (id) {
      if (confirm('Delete this note?')) {
        this.notes.remove({ id: id });
        this.navigate('#', true);
      }
    },

    // 處理錯誤的 hash 網址。
    notFound: function () {
      alert('404');
    }
  });

  // 內部參考用的變數。
  NoteApp.app = null;

}).call(this);

// 啟動應用程式
$(function () {
  new NoteApp.App();
  Backbone.history.start();
});