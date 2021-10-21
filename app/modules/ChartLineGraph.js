/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2021-10-20
 */
import Services from "./Services.js";

class ChartLineGraph extends Services {

    constructor() {
        super();
    }

    createChart = (chart, points) => {
        // Remove the old chart
        //(document.getElementById(chart.id)) ? document.getElementById(chart.id).remove() : '';
        (document.getElementById("lineChartCanvas" + chart.id)) ? document.getElementById("lineChartCanvas" + chart.id).remove() : '';

        //const chart = document.createElement("div");
        //chart.setAttribute("class", "col-md-4");
        
        let chartCanvas = document.createElement('canvas');
        
        chartCanvas.setAttribute("class", "");

        if (points.length) {
            //chartCanvas.setAttribute("id", "lineChartCanvas" + chart.id);
            chartCanvas.id = chart.id;

            chartCanvas = this.chartData(chartCanvas, chart.sensorName + " Data", chart.verticalLabel);
                                    
            this.plotDataPoints(chartCanvas, points);
    
            this.buildChart(chartCanvas);
        }
        else {
            //const chartsDiv = document.querySelector("#charts");
            chartCanvas.classList.add("alert");
            chartCanvas.classList.add("alert-warning");
            chartCanvas.innerHTML = `No Data Points Found`;
        }

        return chartCanvas;
    }

    /**
    * Sets chart specific information.
    * @returns  {json}  JSON of chart information.
    */
    chartData = (chart, title, verticalLabel) => {
        //console.log(verticalLabel);
        let chartData = {};
        chartData.canvas = chart;
        chartData.canvas.innerHTML = "";
        chartData.chartTitle = title;
        chartData.unit = verticalLabel;
        // Line Formatting
        //chartData.flow = {labelsData : []}
        chartData.datasets = [];
        chartData.labelsData = [];
        return chartData;
    }
    /**
    * Adds the data points to the chart, along with x-axis information and returns JSON of the chart data.
    *
    * @param   {json}  chart  JSON of chart data.
    * @param   {json}  dataPoints  JSON of data point information.
    *
    * @return  {json}  JSON of chart data.
    */
    plotDataPoints = (chart, dataPoints) => {

        let xAxislabels = []; // Time line
        let pointData = []; // Data points
        let lineShadingColor = []; // Line background color
        let lineColor = []; // Line color
        const pointColor = this.getRandomColor(); // Color for the line and background

        dataPoints.forEach(point => {

            const date = new Date(point.date_time);
            xAxislabels = [...xAxislabels, (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() +":"+ ("0" + date.getMinutes()).slice(-2)];
//console.log(parseFloat(point.data_value).toFixed(3));
            pointData = [...pointData, parseFloat(point.data_value).toFixed(1)];

            lineShadingColor = [...lineShadingColor, 'rgba(' + pointColor + ', 0.2)'];
            lineColor = [...lineColor, 'rgba(' + pointColor + ', 0.7)'];

        });

        /**
        * label: Colored key at the top of the chart and in the data point pop-up label.
        * data: Array of data points.
        * backgroundColor: Array of color for the background color of the data points.
        * borderColor: Array of color for the line color of the data points.
        * borderWidth: Width of the line for the data points.
        * fill: Show the background color for the line of the data points.
        */
        chart.datasets = [...chart.datasets, {
            label: dataPoints[0].data_type
            , data: pointData
            , backgroundColor: lineShadingColor
            , borderColor: lineColor
            , borderWidth: 1
            , fill: true
        }];

        chart.label = xAxislabels; // x-axis labels

        return chart;
    }
    /**
    * Adds property values to the chart.
    * @param {json}  chartData  JSON of chart information
    */
    buildChart = (chartData) => {

        //console.log(chartData.datasets);

        const myChart = new Chart(chartData.canvas, {
            type: 'line',
            data: {
                labels: chartData.label
                , datasets: chartData.datasets
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: chartData.chartTitle
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time Range'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: chartData.unit
                        }
                    }]
                }
                /*
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
                */
            }
        });

    }

    getRandomColor = () => {
        return (Math.floor(Math.random() * 200) + 1) + ", " + (Math.floor(Math.random() * 200) + 1) + ", " + (Math.floor(Math.random() * 200) + 1);
    }

}

export default ChartLineGraph;