import Services from "./Services.js";

class Charting extends Services {

    constructor() {
        super();
    }

    /**
     * Gets the chart(s) for a specific sensor, and can be used to get data points within a specific time frame.
     *
     * @param   {string}  startDateTime  Start date and time
     * @param   {string}  endDateTime  End date and time
     */
    getSensorChart = (startDateTime, endDateTime) => {
        // Sets the date picker values.
        this.getMinMaxDates();

        if (document.cookie.includes('; ') && document.cookie.includes('userId')) {
            const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];
            const urlParams = new URLSearchParams(window.location.search);
            
            this.getApi("Sensor", "getSensor", "userId=" + userId + "&sensorId=" + urlParams.get("sensorId"))
            .then(sensor => {

                return sensor;

            })
            .then(sensor => {

                return this.getApi("DataPoints", "getSensorDataTypes", "sensorId=" + urlParams.get("sensorId"))
                .then(dataTypes => {

                    //console.log(dataTypes);
                    sensor.dataTypes = dataTypes;
                    return sensor;
                    
                })
                .catch(error => console.log(error));

            })
            .then(sensor => {
                //console.log(sensor);
                startDateTime = (startDateTime === null) ? "null" : startDateTime + ":00";
                endDateTime = (endDateTime === null) ? "null" : endDateTime + ":59";

                console.log(sensor);
                
                return this.getApi("DataPoints", "getSensorDataPoints", "userId=" + userId + "&sensorId=" + urlParams.get("sensorId") + "&startDateTime=" + startDateTime + "&endDateTime=" + endDateTime)
                .then(dataPoints => {

                    console.log(dataPoints);

                    sensor.dataTypes.forEach(dataType => {
                        
                        let chart = null;

                        let points = dataPoints.filter(function(dataPoint) {

                            if (dataType.data_type == "mA") {
                                // Need to change the labeling on the chart
                            }
                            else {
                                
                            }
                            return dataPoint.data_type == dataType.data_type;
                            
                            
                        });
                        // Create charts here
                        //console.log(points);
                        let chartId = sensor.id + "-" + dataType.data_type.replace(" ", "_");
                        chart = this.createChart(chartId);
                        // Title the Chart and Label the Chart's Axes
                        chart = this.chartData(chart, sensor.sensor_name + " Data", dataType.data_type);
                        
                        this.plotDataPoints(chart, points);
                        
                        this.buildChart(chart);

                    });
                    
                })
                .catch(error => console.log(error));
                
            })
            .catch(error => console.log(error));

        }

    }
    /**
    * Creates the HTML element for a chart and returns JSON of the chart data.
    *
    * @param   {string}  chartId  The ID of the the HTML element for the chart.
    *
    * @return  {json}  JSON of chart data.
    */
    createChart = (chartId) => {
        // Remove the old chart
        (document.getElementById(chartId)) ? document.getElementById(chartId).remove() : '';

        const charts = document.querySelector('#charts');
        const chart = document.createElement('canvas');
        chart.setAttribute("class", "col-lg-6 col-md");

        chart.id = chartId;
        charts.appendChild(chart);
        return chart;
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

            pointData = [...pointData, point.data_value.toFixed(3)];

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

    getData = async () => {
        // Select form
        let searchForm = document.querySelector("#searchForm");
        // Convert form data to JSON
        const json = {};

        let formData = new FormData(searchForm);

        formData.forEach((entry, index) => {
            json[index] = entry;
        });

        json.startDateTime = searchForm.querySelector("#startDate").value + " "+ searchForm.querySelector("#startTime").value;
        json.endDateTime = searchForm.querySelector("#endDate").value + " "+ searchForm.querySelector("#endTime").value;

        this.getSensorChart(json.startDateTime, json.endDateTime);

    }
    /**
    * Gets the minimum and maximum dates based on a specific sensor's data points.
    * Then assigns them to the appropriate HTML date elements.
    */
    getMinMaxDates = () => {

        if (document.cookie.includes('; ') && document.cookie.includes('userId')) {

            const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];
            const urlParams = new URLSearchParams(window.location.search);

            let searchButton = document.querySelector("#getDataButton");
            searchButton.addEventListener("click", this.getData);

            this.getApi("DataPoints", "getMinMaxDates", "userId=" + userId + "&sensorId=" + urlParams.get('sensorId'))
            .then(data => {

                const startDate = document.querySelector("#startDate");
                const startTime = document.querySelector("#startTime");
                
                const endDate = document.querySelector("#endDate");
                const endTime = document.querySelector("#endTime");
                
                let minimumDate = new Date(data.minimum);
                startDate.value = minimumDate.toLocaleDateString("fr-CA");

                minimumDate.setFullYear(minimumDate.getFullYear() - 5);
                startDate.min = minimumDate.toLocaleDateString("fr-CA");
                startTime.value = ("0" + minimumDate.getHours()).slice(-2) + ":" + ("0" + minimumDate.getMinutes()).slice(-2);

                let maximumDate = new Date(data.maximum);
                endDate.value = maximumDate.toLocaleDateString("fr-CA");

                maximumDate.setFullYear(maximumDate.getFullYear() - 5);
                endDate.min = maximumDate.toLocaleDateString("fr-CA");
                endTime.value = ("0" + maximumDate.getHours()).slice(-2) + ":" + ("0" + maximumDate.getMinutes()).slice(-2);
            
            })
            .catch(error => console.log(error));

        }

    }

    getRandomColor = () => {
        return (Math.floor(Math.random() * 200) + 1) + ", " + (Math.floor(Math.random() * 200) + 1) + ", " + (Math.floor(Math.random() * 200) + 1);
    }


}

export default Charting;