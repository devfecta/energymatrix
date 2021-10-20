/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2021-10-20
 */
 import Services from "./Services.js";

 class ChartBullet extends Services {
 
     constructor() {
         super();
     }

     createBulletChart = (chartDiv, trend) => {

        //const dashboard = document.querySelector("#dashboard");

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

        return bulletChart;

        //chartDiv.append(bulletChart);

    }
 
 }
 
 export default ChartBullet;