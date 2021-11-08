/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
import Services from "./Services.js";
import ChartBullet from "./ChartBullet.js";
import ChartLineGraph from "./ChartLineGraph.js";
import Trends from "./Trends.js";

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
     getSensorChart = (chartDiv, sensorId, startDateTime, endDateTime) => {
        // Sets the date picker values.
        //const minMaxDates = this.getMinMaxDates();

        //let chartDiv = document.createElement("div");
        //chartDiv.setAttribute("id", "lineChart" + sensorId);
        //chartDiv.setAttribute("class", "col");

        //let chartDiv = (document.querySelector("#lineChartSensor" + sensorId)) ? document.querySelector("#lineChartSensor" + sensorId) : document.createElement("div");
        //chartDiv.setAttribute("id", "lineChartSensor" + sensorId);
        //chartDiv.setAttribute("class", "col");

        chartDiv.innerHTML = "";




        if (document.cookie.includes('; ') && document.cookie.includes('userId')) {
            const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];
            const urlParams = new URLSearchParams(window.location.search);
            
            this.getApi("Sensor", "getSensor", "userId=" + userId + "&sensorId=" + sensorId)
            .then(sensor => {
                return sensor;
            })
            .then(sensor => {

                return this.getApi("DataPoints", "getSensorDataTypes", "sensorId=" + sensorId)
                .then(dataTypes => {
                    sensor.dataTypes = dataTypes;
                    return sensor;
                })
                .catch(error => console.log(error));

            })
            .then(sensor => {
                //console.log(sensor);

                startDateTime = (startDateTime === null) ? minMaxDates.startDate + " " + minMaxDates.startTime : startDateTime + ":00";
                endDateTime = (endDateTime === null) ? minMaxDates.endDate + " " + minMaxDates.endTime : endDateTime + ":59";
                //startDateTime = minMaxDates.startDate + " " + minMaxDates.startTime;
                //endDateTime = minMaxDates.endDate + " " + minMaxDates.endTime;

                

                //console.log("startDateTime", startDateTime, "endDateTime", endDateTime);
                
                return this.getApi("DataPoints", "getSensorDataPoints", "userId=" + userId + "&sensorId=" + sensorId + "&startDateTime=" + startDateTime + "&endDateTime=" + endDateTime)
                .then(dataPoints => {

                    //console.log(sensor);
                    //console.log(dataPoints);

                    if (sensor.dataTypes.length) {

                        sensor.dataTypes.forEach(dataType => {
                        
                            
    
                            let points = dataPoints.filter(function(dataPoint) {
    
                                //console.log(dataPoint);
    
                                if (dataType.data_type == "mA") {
                                    // Need to change the labeling on the chart
                                }
                                else {
                                    
                                }
                                return dataPoint.data_type == dataType.data_type;
                                
                            });
                            // console.log(points);

                            const chartLineGraph = new ChartLineGraph();
                            let chartCanvas = HTMLElement;
                            let chart = {
                                "id" : sensor.id + "-" + dataType.data_type.replace(" ", "_")
                                , "sensorId" : sensor.id
                                , "sensorName" : sensor.sensor_name
                                , "verticalLabel" : dataType.data_type
                            }
                            chartCanvas = chartLineGraph.createChart(chart, points);
                            chartDiv.append(chartCanvas);

                            /*
                            // Check for data points.
                            if (points.length) {
                                // Create charts here
                                const chartLineGraph = new ChartLineGraph();
                                let chartCanvas = HTMLElement;
                                
                                let chartId = sensor.id + "-" + dataType.data_type.replace(" ", "_");
                                chartCanvas = this.createSensorChart(chartId);
                                // Title the Chart and Label the Chart's Axes
                                chartCanvas = this.chartData(chartCanvas, sensor.sensor_name + " Data", dataType.data_type);
                                
                                this.plotDataPoints(chartCanvas, points);

                                this.buildChart(chartCanvas);

                                console.log(chartCanvas.canvas);

                                chartDiv.append(chartCanvas.canvas);
                                
                            }
                            else {
                                const chartsDiv = document.querySelector("#charts");
                                chartsDiv.classList.add("alert");
                                chartsDiv.classList.add("alert-warning");
                                //chartsDiv.setAttribute("class", "alert alert-warning");
                                chartsDiv.innerHTML = `No Data Points Found`;
                            }
                            */
    
                        });
                        
                    }
                    else {
                        const chartsDiv = document.querySelector("#charts");
                        chartsDiv.classList.add("alert");
                        chartsDiv.classList.add("alert-warning");
                        //chartsDiv.setAttribute("class", "alert alert-warning");
                        chartsDiv.innerHTML = `No Data Points Found`;
                    }
                    
                })
                .catch(error => console.log(error));
                
            })
            .catch(error => console.log(error));

        }

        //console.log(chartDiv);

        return chartDiv;

    }

    getTrendLineChart = (chartDiv, trendId, startDateTime, endDateTime) => {

        chartDiv.innerHTML = "";

        if (document.cookie.includes('; ') && document.cookie.includes('userId')) {
            const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];
            const urlParams = new URLSearchParams(window.location.search);

            const trends = new Trends();
            trends.getConfiguredTrend(trendId, endDateTime, startDateTime)
            .then(dataPoints => {

                const charting = new Charting();
                let chart = null;
                // Create charts here
                if (dataPoints.points.length) {
                    
                    const chartLineGraph = new ChartLineGraph();
                    let chartCanvas = HTMLElement;
                    let chart = {
                        "id" : dataPoints.trend.id
                        , "sensorName" : dataPoints.trend.trendName
                        , "verticalLabel" : dataPoints.trend.unit
                    }
                    
                    chartCanvas = chartLineGraph.createChart(chart, dataPoints.points);
    
                    chartDiv.append(chartCanvas);
                    
                }
                else {
                    //alert("No Data Points Found\rTry adjusting the date range.");
                }
                
            })
            .catch(e => console.error(e));

        }

        return chartDiv;
    }

    /**
     * Gets the chart(s) for a specific sensor, and can be used to get data points within a specific time frame.
     *
     * @param   {string}  startDateTime  Start date and time
     * @param   {string}  endDateTime  End date and time
     */
     getSensorChartByDate = (startDateTime, endDateTime) => {
        // Sets the date picker values.
        const minMaxDates = this.getMinMaxDates();

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
                // console.log(sensor);

                startDateTime = (startDateTime === null) ? minMaxDates.startDate + " " + minMaxDates.startTime : startDateTime + ":00";
                endDateTime = (endDateTime === null) ? minMaxDates.endDate + " " + minMaxDates.endTime : endDateTime + ":59";
                //startDateTime = minMaxDates.startDate + " " + minMaxDates.startTime;
                //endDateTime = minMaxDates.endDate + " " + minMaxDates.endTime;

                console.log("startDateTime", startDateTime, "endDateTime", endDateTime);
                
                return this.getApi("DataPoints", "getSensorDataPoints", "userId=" + userId + "&sensorId=" + urlParams.get("sensorId") + "&startDateTime=" + startDateTime + "&endDateTime=" + endDateTime)
                .then(dataPoints => {

                    //console.log(sensor);

                    if (sensor.dataTypes.length) {

                        sensor.dataTypes.forEach(dataType => {
                        
                            //let chart = HTMLElement;
    
                            let points = dataPoints.filter(function(dataPoint) {
    
                                //console.log(dataPoint);
    
                                if (dataType.data_type == "mA") {
                                    // Need to change the labeling on the chart
                                }
                                else {
                                    
                                }
                                return dataPoint.data_type == dataType.data_type;
                                
                            });
                            // console.log(points);

                            // Create charts here
                            const charts = document.querySelector('#charts');
                            charts.setAttribute("class", "col-md-6");
                            charts.classList.remove("alert");
                            charts.classList.remove("alert-warning");
                            charts.innerHTML = "";
                            /*
                            const chartLineGraph = new ChartLineGraph();
                            let chartCanvas = HTMLElement;
                            let chart = {
                                "id" : sensor.id + "-" + dataType.data_type.replace(" ", "_")
                                , "sensorName" : sensor.sensor_name
                                , "verticalLabel" : dataType.data_type
                            }

                            //console.log(points);
                            chartCanvas = chartLineGraph.createChart(chart, points);
                            */


                            const chartLineGraph = new ChartLineGraph();
                            let chartCanvas = HTMLElement;
                            let chart = {
                                "id" : sensor.id + "-" + dataType.data_type.replace(" ", "_")
                                , "sensorId" : sensor.id
                                , "sensorName" : sensor.sensor_name
                                , "verticalLabel" : dataType.data_type
                            }
                            chartCanvas = chartLineGraph.createChart(chart, points);
                            //chartDiv.append(chartCanvas);



                            charts.append(chartCanvas);
                            /*
                            // Check for data points.
                            if (points.length) {
                                // Create charts here
                                const charts = document.querySelector('#charts');
                                charts.classList.remove("alert");
                                charts.classList.remove("alert-warning");
                                charts.innerHTML = "";
                                
                                let chartId = sensor.id + "-" + dataType.data_type.replace(" ", "_");
                                chart = this.createChart(charts, chartId);
                                // Title the Chart and Label the Chart's Axes
                                chart = this.chartData(chart, sensor.sensor_name + " Data", dataType.data_type);
    
                                this.plotDataPoints(chart, points);
    
                                this.buildChart(chart);
                            }
                            else {
                                const chartsDiv = document.querySelector("#charts");
                                chartsDiv.classList.add("alert");
                                chartsDiv.classList.add("alert-warning");
                                //chartsDiv.setAttribute("class", "alert alert-warning");
                                chartsDiv.innerHTML = `No Data Points Found`;
                            }
                            */
                        });
                        
                    }
                    else {
                        const chartsDiv = document.querySelector("#charts");
                        chartsDiv.classList.add("alert");
                        chartsDiv.classList.add("alert-warning");
                        //chartsDiv.setAttribute("class", "alert alert-warning");
                        chartsDiv.innerHTML = `No Data Points Found`;
                    }
                    
                })
                .catch(error => console.log(error));
                
            })
            .catch(error => console.log(error));

        }

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

        this.getSensorChartByDate(json.startDateTime, json.endDateTime);

    }
    /**
    * Gets the minimum and maximum dates based on a specific sensor's data points.
    * Then assigns them to the appropriate HTML date elements.
    */
    getMinMaxDates = () => {

        var minMaxDates = {
            startDate : ""
            , startTime : ""
            , endDate : ""
            , endTime : ""
        };

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
                // Defaults to current date and time.
                let minimumDate = (data.minimum) ? new Date(data.minimum) : new Date();
                startDate.value = minimumDate.toLocaleDateString("fr-CA");
                minMaxDates.startDate = startDate.value;

                minimumDate.setFullYear(minimumDate.getFullYear() - 5);
                startDate.min = minimumDate.toLocaleDateString("fr-CA");
                startTime.value = ("0" + minimumDate.getHours()).slice(-2) + ":" + ("0" + minimumDate.getMinutes()).slice(-2);
                minMaxDates.startTime = startTime.value;
                // Defaults to current date and time.
                let maximumDate = (data.maximum) ? new Date(data.maximum) : new Date();
                endDate.value = maximumDate.toLocaleDateString("fr-CA");
                minMaxDates.endDate = endDate.value;

                maximumDate.setFullYear(maximumDate.getFullYear() - 5);
                endDate.min = maximumDate.toLocaleDateString("fr-CA");
                endTime.value = ("0" + maximumDate.getHours()).slice(-2) + ":" + ("0" + maximumDate.getMinutes()).slice(-2);
                minMaxDates.endTime = endTime.value;

            })
            .catch(error => console.log(error));

        }

        return minMaxDates;
    }

    getBulletChart = (bulletChartDiv, trend) => {

        const chartBullet = new ChartBullet();

        bulletChartDiv.append(chartBullet.createBulletChart(bulletChartDiv, trend));

        return bulletChartDiv;

    }


}

export default Charting;