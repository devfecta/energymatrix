<?php
    ob_start();
    session_start();
	include("template/header.php");
?>

<script type="module" src="./javascript/index.js?v=<?php echo rand(1, 10); ?>"></script>


<div id="dashboard"></div>



<link href="https://cdn.anychart.com/releases/v8/css/anychart-ui.min.css" rel="stylesheet" type="text/css">
<link href="https://cdn.anychart.com/releases/v8/fonts/css/anychart-font.min.css" rel="stylesheet" type="text/css">

<script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js"></script>
<script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js"></script>
<script src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js"></script>
<script src="https://cdn.anychart.com/releases/v8/js/anychart-bullet.min.js"></script>
<script src="https://cdn.anychart.com/releases/v8/js/anychart-table.min.js"></script>
<script src="https://cdn.anychart.com/releases/v8/js/anychart-data-adapter.min.js"></script>

<script type="text/javascript">anychart.onDocumentReady(function () {
  // The data used in this sample can be obtained from the CDN
  // https://cdn.anychart.com/samples/bullet-chart/horizontal-bullet-chart-with-ranges/data.json
  anychart.data.loadJsonFile(
    './data.json',
    function (data) {
      var dataSet = data;

      var table = anychart.standalones.table();
      console.log(table);
      table.getCol(1).width(100).hAlign('right').cellPadding(0, 10, 0, 0);
      table.getRow(0).fontSize(15);
      table.cellBorder(null);
      table.getRow(1).cellBorder().bottom('1px #CECECE');
      table.getCol(1).cellBorder().right('1px #CECECE');
      table.getCol(2).cellPadding(0, 0, 0, 10);

      table.contents([
        [null, null, null, null],
        [null, 'Region', null, null],
        [null, 'Alabama', createBulletChart('Alabama'), null],
        [null, 'Alaska', createBulletChart('Alaska'), null],
        [null, null, null, null]
      ]);
      table.getCol(0).width(40);
      table.getCol(3).width(40);

      table
        .getCell(0, 1)
        .colSpan(2)
        .content('ACME corp. Sales by Region')
        .hAlign('center')
        .vAlign('bottom')
        .fontColor('#212121')
        .fontSize(16);
      table.getCell(0, 1).colSpan(2).border().right('white');

      table.getCell(1, 0).border().bottom('white');
      table.getCell(1, 3).border().bottom('red');
      //table.getCell(14, 1).border().right('white');

      table.container('container');
      table.vAlign('middle');
      table.draw();

      function createBulletChart(name) {
        console.log("name: ", name);
        var data = dataSet[name];
        var target = summ(data.toGoal);
        var actual = summ(data.actualSales);

        console.log("target: ", target, "actual: ", actual);
        /*
        var bullet = anychart.bullet([
          { Horizontal Line },
          { Vertical Line (Average) }
        ]);
        */
        var bullet = anychart.bullet([
          {
            value: Math.round((actual * 100) / target),
            type: 'bar',
            gap: 0.7,
            fill: '#545f69',
            stroke: null
          },
          {
            value: 100,
            type: 'line',
            gap: 0,
            fill: '#212121',
            stroke: {
              thickness: 3,
              color: '#212121'
            }
          }
        ]);
        // Sets the range colors red to green
        bullet.range().from(0).to(30);
        bullet.range(1).from(30).to(50);
        bullet.range(2).from(50).to(80);
        bullet.range(3).from(80).to(100);
        bullet.range(4).from(100).to(130);
        bullet.rangePalette(
          anychart.palettes
            .distinctColors()
            .items([
              '#dd2c00 0.4',
              '#dd2c00 0.3',
              '#ffa000 0.4',
              '#006B00 0.3',
              '#006B00 0.4'
            ])
        );
        bullet.scale().minimum(0).maximum(130);

        bullet
          .margin(8, 0, 8, 0)
          .axis(null)
          .title(false)
          .padding(0, -1)
          .layout('horizontal');

        return bullet;
      }

      function summ(arr) {
        var result = 0;
        for (var i = 0; i < arr.length; i++) {
          result += arr[i];
        }
        return result;
      }
    }
  );
});</script>

<style>html,
body,
#container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  margin: 0;
  padding: 0;
}</style>

<div id="container"></div>











<?php
    include("template/footer.php");
	ob_flush();
?>