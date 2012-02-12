var Sample1 = {};

Sample1.Model = Backbone.Model.extend({
  'defaults': {
    'value1': 1,
    'value2': 2,
    'value3': 3
  }
});

Sample1.ValueInput = Backbone.View.extend({
  'events': {
    'keyup #value1': 'updateModel',
    'keyup #value2': 'updateModel',
    'keyup #value3': 'updateModel',
  },
  'updateModel': function (e) {
    var data = {};
    var id = e.target.id;
    data[id] = parseInt($('#' + id).val(), 10);
    console.log(data);
    this.model.set(data);
  }
});

Sample1.Chart = Backbone.View.extend({
  'chartOptions': { // 不要用 options 當名稱，因為會被 Backbone 內建的蓋掉
    'title': 'Demo',
    'width': 400,
    'height': 300
  },
  'data': null,
  'chart': null,
  'type': 'PieChart',
  'initialize': function () {
    // 要用 this.options 接資料
    this.data = this.options.data ? this.options.data : this.data;
    this.type = this.options.type ? this.options.type : this.type;
    this.chartOptions = this.options.chartOptions ? this.options.chartOptions : this.chartOptions;

    var chartName = google.visualization[this.type];
    this.chart = new chartName(this.el);
    this.model.bind('change', this.render, this);
  },
  'render': function () {
    this.data.removeRows(0, this.data.getNumberOfRows());
    this.data.addRows([
      ['Value 1', this.model.get('value1')],
      ['Value 2', this.model.get('value2')],
      ['Value 3', this.model.get('value3')]
    ]);
    this.chart.draw(this.data, this.chartOptions);
  }
});

Sample1.App = {
  'run': function () {
    try {
      var model = new Sample1.Model();
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Name');
      data.addColumn('number', 'Value');
      var valueInput = new Sample1.ValueInput({
        'el': '#value-input',
        'model': model
      });
      var chart1 = new Sample1.Chart({
        'el': '#chart-1',
        'model': model,
        'data': data,
        'type': 'PieChart'
      });
      var chart2 = new Sample1.Chart({
        'el': '#chart-2',
        'model': model,
        'data': data,
        'type': 'BarChart'
      });
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
