/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
import Services from "./Services.js";
import ChartBullet from "./ChartBullet.js";
import ChartLineGraph from "./ChartLineGraph.js";

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
     getSensorChart = (sensorId, startDateTime, endDateTime) => {
        // Sets the date picker values.
        //const minMaxDates = this.getMinMaxDates();

        let chartDiv = document.createElement("div");
        chartDiv.setAttribute("id", "lineChart" + sensorId);
        chartDiv.setAttribute("class", "col");

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
                    console.log(dataPoints);

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
                                , "sensorName" : sensor.sensor_name
                                , "verticalLabel" : dataType.data_type
                            }
                            chartCanvas = chartLineGraph.createChart(chart, points);
                            chartDiv.append(chartCanvas.canvas);

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

                            const chartLineGraph = new ChartLineGraph();
                            let chartCanvas = HTMLElement;
                            let chart = {
                                "id" : sensor.id + "-" + dataType.data_type.replace(" ", "_")
                                , "sensorName" : sensor.sensor_name
                                , "verticalLabel" : dataType.data_type
                            }

                            console.log(points);
                            chartCanvas = chartLineGraph.createChart(chart, points);
                            charts.append(chartCanvas.canvas);
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

        //const dashboard = document.querySelector("#dashboard");
        //console.log(chartDiv.clientWidth);

        let lowestValue = parseFloat(trend.lowestLevel);
        let highestValue = parseFloat(trend.highestLevel);
        let operationMinValue = parseFloat(trend.operationalMinimum);
        let operationMaxValue = parseFloat(trend.operationalMaximum);
        

        const chartOverallWidth = chartDiv.clientWidth;

        //console.log("chartOverallWidth", chartOverallWidth);

        //let chartRatio = chartOverallWidth / highestValue;

        //console.log("ID:", trend.id, "lowestValue", lowestValue, "highestValue", highestValue, "operationMinValue", operationMinValue, "operationMaxValue", operationMaxValue, "currentAverageValue", trend.currentAverageValue, "averageValue", trend.averageValue);

        let pixelRatio = chartOverallWidth / highestValue;

        let lowestRangeValue =  chartOverallWidth * (((operationMinValue - lowestValue) * pixelRatio) / chartOverallWidth);
        let normalRangeValue = chartOverallWidth * (((operationMaxValue - operationMinValue) * pixelRatio) / chartOverallWidth);
        let highestRangeValue = chartOverallWidth * (((highestValue - operationMaxValue) * pixelRatio) / chartOverallWidth);
        let totalRange = lowestRangeValue + normalRangeValue + highestRangeValue;
        
        const bulletChart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        bulletChart.setAttribute("id", "bulletSvgChart" + trend.id);
        bulletChart.setAttribute("width", "100%");
        bulletChart.setAttribute("height", "100px");
        bulletChart.setAttribute("viewBox", `0 -10 ${chartOverallWidth} 100`);
        bulletChart.setAttribute("version", "1.1");
        bulletChart.setAttribute("preserveAspectRatio", "none");

        const bulletChartLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        bulletChartLayer.setAttribute("id", "bulletChartLayer");

        const lowestRange = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        lowestRange.setAttribute("id", "lowestRange");
        lowestRange.setAttribute("width", lowestRangeValue);
        lowestRange.setAttribute("height", "20");
        lowestRange.setAttribute("style", "fill:#dd2c00; fill-rule:evenodd;");
        lowestRange.setAttribute("x", (lowestValue > 0) ? 0 : lowestValue);
        lowestRange.setAttribute("y", "30");

        //console.log("lowestRange", parseInt(lowestRange.getAttribute("width")));

        const normalRange = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        normalRange.setAttribute("id", "normalRange");
        normalRange.setAttribute("width", normalRangeValue);
        normalRange.setAttribute("height", "20");
        normalRange.setAttribute("style", "fill:#006b00; fill-rule:evenodd;");
        normalRange.setAttribute("x", parseInt(lowestRange.getAttribute("width")));
        normalRange.setAttribute("y", "30");

        //console.log("normalRange", parseInt(normalRange.getAttribute("width")), "lowRange", parseInt(lowestRange.getAttribute("width")));

        const highestRange = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        highestRange.setAttribute("id", "highestRange");
        highestRange.setAttribute("width", highestRangeValue);
        highestRange.setAttribute("height", "20");
        highestRange.setAttribute("style", "fill:#dd2c00; fill-rule:evenodd;");
        highestRange.setAttribute("x", parseInt(normalRange.getAttribute("width")) + parseInt(lowestRange.getAttribute("width")));
        highestRange.setAttribute("y", "30");

        const latestDataPoint = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        latestDataPoint.setAttribute("id", "latestDataPoint");
        latestDataPoint.setAttribute("width", chartOverallWidth * (((trend.latestDataPointValue - lowestValue) * pixelRatio) / chartOverallWidth));
        latestDataPoint.setAttribute("height", "10");
        latestDataPoint.setAttribute("style", "fill:#fcba03; fill-opacity:0.75; fill-rule:evenodd;");
        latestDataPoint.setAttribute("x", (lowestValue > 0) ? 0 : lowestValue);
        latestDataPoint.setAttribute("y", "35");

        /*
        const currentAverage = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        currentAverage.setAttribute("id", "currentAverage");
        currentAverage.setAttribute("width", chartOverallWidth * (((trend.currentAverageValue - lowestValue) * pixelRatio) / chartOverallWidth));
        currentAverage.setAttribute("height", "10");
        currentAverage.setAttribute("style", "fill:#fcba03; fill-opacity:0.75; fill-rule:evenodd;");
        currentAverage.setAttribute("x", (lowestValue > 0) ? 0 : lowestValue);
        currentAverage.setAttribute("y", "25");
        */
        const currentAverage = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        currentAverage.setAttribute("id", "currentAverage");
        currentAverage.setAttribute("width", "5");
        currentAverage.setAttribute("height", "40");
        currentAverage.setAttribute("style", "fill:#000;fill-rule:evenodd;");
        currentAverage.setAttribute("x", chartOverallWidth * (((trend.currentAverageValue - lowestValue) * pixelRatio) / chartOverallWidth));
        currentAverage.setAttribute("y", "15");

        const average = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        average.setAttribute("id", "average");
        average.setAttribute("width", "5");
        average.setAttribute("height", "40");
        average.setAttribute("style", "fill:#0000ff;fill-rule:evenodd;");
        average.setAttribute("x", chartOverallWidth * (((trend.averageValue - lowestValue) * pixelRatio) / chartOverallWidth));
        average.setAttribute("y", "25");

        bulletChartLayer.append(lowestRange, normalRange, highestRange, latestDataPoint, currentAverage, average);

        //bulletChartLayer.append(lowestRange, normalRange, highestRange, currentAverage, average);

        // Value Labels
        const lowestValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lowestValueLabel.setAttribute("id", "lowestValue");
        lowestValueLabel.setAttribute("style", "font-size:2vh; fill:#dd2c00; dominant-baseline:start; text-anchor:start");
        lowestValueLabel.setAttribute("x", lowestValue > 0 ? 0 : lowestValue);
        lowestValueLabel.setAttribute("y", "65");
        lowestValueLabel.innerHTML = lowestValue;

        const highestValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        highestValueLabel.setAttribute("id", "highestValue");
        highestValueLabel.setAttribute("style", "font-size:2vh; fill:#dd2c00; dominant-baseline:end; text-anchor:end");
        highestValueLabel.setAttribute("x", totalRange);
        highestValueLabel.setAttribute("y", "65");
        highestValueLabel.setAttribute("xml:space", "preserve");
        highestValueLabel.innerHTML = highestValue;

        const operationMinValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        operationMinValueLabel.setAttribute("id", "operationMinValue");
        operationMinValueLabel.setAttribute("style", `font-size:2vh; fill:#006b00; dominant-baseline:${(lowestValue ==! operationMinValue) ? "middle" : "start"}; text-anchor:${(lowestValue ==! operationMinValue) ? "middle" : "start"}`);
        operationMinValueLabel.setAttribute("x", parseInt(lowestRange.getAttribute("width")));
        operationMinValueLabel.setAttribute("y", "65");
        operationMinValueLabel.innerHTML = operationMinValue;

        const operationMaxValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        operationMaxValueLabel.setAttribute("id", "operationMaxValue");
        operationMaxValueLabel.setAttribute("style", `font-size:2vh; fill:#006b00; dominant-baseline:${(totalRange ==! operationMaxValue) ? "middle" : "end"}; text-anchor:${(totalRange ==! operationMaxValue) ? "middle" : "end"}`);
        operationMaxValueLabel.setAttribute("x", parseInt(normalRange.getAttribute("width")) + parseInt(lowestRange.getAttribute("width")));
        operationMaxValueLabel.setAttribute("y", "65");
        operationMaxValueLabel.setAttribute("xml:space", "preserve");
        operationMaxValueLabel.innerHTML = operationMaxValue;

        const currentAverageValueLabelPositionX = chartOverallWidth * (((trend.currentAverageValue - lowestValue) * pixelRatio) / chartOverallWidth);
        const currentAverageValueLabelPositionMinX = 50;
        const currentAverageValueLabelPositionMaxX = totalRange - 50;
        const currentAverageValueLabelPosition = (currentAverageValueLabelPositionX <= currentAverageValueLabelPositionMinX) ? "start" : (currentAverageValueLabelPositionX >= currentAverageValueLabelPositionMaxX) ? "end" : "middle";

        const currentAverageValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        currentAverageValueLabel.setAttribute("id", "averageValue");
        currentAverageValueLabel.setAttribute("style", `font-size:2vh; fill:#000; dominant-baseline:${currentAverageValueLabelPosition}; text-anchor:${currentAverageValueLabelPosition}`);
        currentAverageValueLabel.setAttribute("x", currentAverageValueLabelPositionX);
        currentAverageValueLabel.setAttribute("y", "6");
        currentAverageValueLabel.innerHTML = trend.currentAverageValue + `${trend.unit} (Current Avg)`;

        const averageValueLabelPositionX = chartOverallWidth * (((trend.averageValue - lowestValue) * pixelRatio) / chartOverallWidth);
        const averageValueLabelPositionMinX = 50;
        const averageValueLabelPositionMaxX = totalRange - 50;
        const averageValueLabelPosition = (averageValueLabelPositionX <= averageValueLabelPositionMinX) ? "start" : (averageValueLabelPositionX >= averageValueLabelPositionMaxX) ? "end" : "middle";

        const averageValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        averageValueLabel.setAttribute("id", "averageValue");
        averageValueLabel.setAttribute("style", `font-size:2vh; fill:#0000ff; dominant-baseline:${averageValueLabelPosition}; text-anchor:${averageValueLabelPosition}`);
        averageValueLabel.setAttribute("x", averageValueLabelPositionX);
        averageValueLabel.setAttribute("y", "80");
        averageValueLabel.innerHTML = trend.averageValue + `${trend.unit} (Last ${trend.operationalDuration} Hr Avg)`;

        bulletChartLayer.append(lowestValueLabel, highestValueLabel, operationMinValueLabel, operationMaxValueLabel, currentAverageValueLabel, averageValueLabel);

        bulletChart.append(bulletChartLayer);

        chartDiv.append(bulletChart);

    }


}

export default Charting;