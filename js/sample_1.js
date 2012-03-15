// ## 初始化
//
// 定義 namespace 。
var Sample1 = {};

// ## Model 類別
//
// 建立有三個值的 model ，是很簡單的 Value Object 。
Sample1.Model = Backbone.Model.extend({
  'defaults': {
    'value1': 1,
    'value2': 2,
    'value3': 3
  }
});

// ## ValueInput 類別
//
// 輸入介面；在文字輸入框有輸入值的時候，更新 model 的屬性值。
Sample1.ValueInput = Backbone.View.extend({
  'events': {
    'keyup #value1,#value2,#value3': 'updateModel',
  },
  'updateModel': function (e) {
    var data = {};
    var id = e.target.id;
    data[id] = parseInt($('#' + id).val(), 10);
    this.model.set(data);
  }
});

// ## Chart 類別
//
// 用來輸出圖表，主要是透過 Google Chart Tools 繪製。
Sample1.Chart = Backbone.View.extend({

  // 圖表預設屬性；
  // 不要用 `options` 當名稱，因為會被 `Backbone.View` 內建的 `options` 蓋掉。
  'chartOptions': {
    'title': 'Demo',
    'width': 400,
    'height': 300
  },

  // 圖表資料；
  'data': null,

  // 圖表物件；
  'chart': null,

  // 圖表類型；
  'type': 'PieChart',

  // 初始化；
  'initialize': function () {

    // 非 `Backbone.View` 內建的自訂屬性要用 `this.options` 接。
    this.data = this.options.data ? this.options.data : this.data;
    this.type = this.options.type ? this.options.type : this.type;
    this.chartOptions = this.options.chartOptions ? this.options.chartOptions : this.chartOptions;

    // 將 `this.type` 轉為 Google Chart Tools 的類別名稱。
    var chartName = google.visualization[this.type];

    // 上一行取得的類別名稱在初始化時，要帶入要當做作容器的 DOM 元素，
    // 所以這裡直接使用 `this.el` 。
    this.chart = new chartName(this.el);

    // 當 model 的值改變時，就呼叫 `this.render` 方法。
    this.model.bind('change', this.render, this);
  },
  'render': function () {
    // 先清空 `DataTables` 物件裡舊的資料，
    // 然後再重新指定為 model 的內容。
    this.data.removeRows(0, this.data.getNumberOfRows());
    this.data.addRows([
      ['Value 1', this.model.get('value1')],
      ['Value 2', this.model.get('value2')],
      ['Value 3', this.model.get('value3')]
    ]);
    // 重新繪製圖表。
    this.chart.draw(this.data, this.chartOptions);
  }
});

// ## App 類別
Sample1.App = {
  // 這裡的函式名稱用 `run` 而不用 `initialize` ，
  // 主要只是為了讓程式有執行的感覺。
  //
  // 事實上這個函式可以直接命名為 `initialize` ，
  // 然後稍後直接執行 `new Sample1.App()` 即可，
  // 而不用再執行 `run` 。
  'run': function () {
    try {
      var model = new Sample1.Model();

      // 初始化一個 DataTable 物件，
      // 並且給定欄位名稱與型態。
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Name');
      data.addColumn('number', 'Value');

      // 初始化輸入介面。
      var valueInput = new Sample1.ValueInput({
        'el': '#value-input',
        'model': model
      });

      // 建立一個會顯示圓餅圖的 view 物件。
      var chart1 = new Sample1.Chart({
        'el': '#chart-1',
        'model': model,
        'data': data,
        'type': 'PieChart'
      });

      // 建立一個會顯示長條圖的 view 物件。
      var chart2 = new Sample1.Chart({
        'el': '#chart-2',
        'model': model,
        'data': data,
        'type': 'BarChart'
      });

      // 繪製圖表。
      chart1.render();
      chart2.render();

    } catch (e) {
      console.log(e);
    }
  }
};

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(Sample1.App.run);
