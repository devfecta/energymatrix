import Dashboard from "../modules/Dashboard.js";

const dashboard = new Dashboard();

dashboard.buildDashboard(document.querySelector("#dashboard"));


/*
console.log(dashboard.clientWidth);

const chartOverallWidth = dashboard.clientWidth;


let lowestValue = 0;
let highestValue = 250;
let operationMinValue = 50;
let operationMaxValue = 200;
let currentAverageValue = 75;
let averageValue = 100;

let lowestRangeValue = lowestValue + operationMinValue;
let highestRangeValue = highestValue - operationMaxValue;
let normalRangeValue = highestValue - (highestRangeValue + lowestRangeValue);

let chartRatio = chartOverallWidth / highestValue ;

const bulletChart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
bulletChart.setAttribute("id", "bulletChart");
bulletChart.setAttribute("width", "100%");
bulletChart.setAttribute("height", "100px");
bulletChart.setAttribute("viewBox", `0 0 ${chartOverallWidth} 100`);
bulletChart.setAttribute("version", "1.1");
bulletChart.setAttribute("preserveAspectRatio", "none");

const bulletChartLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
bulletChartLayer.setAttribute("id", "bulletChartLayer");

const lowestRange = document.createElementNS("http://www.w3.org/2000/svg", "rect");
lowestRange.setAttribute("id", "lowestRange");
lowestRange.setAttribute("width", lowestRangeValue * chartRatio);
lowestRange.setAttribute("height", "20");
lowestRange.setAttribute("style", "fill:#dd2c00; fill-rule:evenodd;");
lowestRange.setAttribute("x", lowestValue);
lowestRange.setAttribute("y", "10");

console.log("lowestRange", parseInt(lowestRange.getAttribute("width")));

const normalRange = document.createElementNS("http://www.w3.org/2000/svg", "rect");
normalRange.setAttribute("id", "normalRange");
normalRange.setAttribute("width", normalRangeValue * chartRatio);
normalRange.setAttribute("height", "20");
normalRange.setAttribute("style", "fill:#006b00; fill-rule:evenodd;");
normalRange.setAttribute("x", parseInt(lowestRange.getAttribute("width")));
normalRange.setAttribute("y", "10");

console.log("normalRange", parseInt(normalRange.getAttribute("width")), "lowRange", parseInt(lowestRange.getAttribute("width")));

const highestRange = document.createElementNS("http://www.w3.org/2000/svg", "rect");
highestRange.setAttribute("id", "highestRange");
highestRange.setAttribute("width", highestRangeValue * chartRatio);
highestRange.setAttribute("height", "20");
highestRange.setAttribute("style", "fill:#dd2c00; fill-rule:evenodd;");
highestRange.setAttribute("x", parseInt(normalRange.getAttribute("width")) + parseInt(lowestRange.getAttribute("width")));
highestRange.setAttribute("y", "10");

const currentAverage = document.createElementNS("http://www.w3.org/2000/svg", "rect");
currentAverage.setAttribute("id", "currentAverage");
currentAverage.setAttribute("width", currentAverageValue * chartRatio);
currentAverage.setAttribute("height", "20");
currentAverage.setAttribute("style", "fill:#fff; fill-opacity:0.5; fill-rule:evenodd;");
currentAverage.setAttribute("x", lowestValue);
currentAverage.setAttribute("y", "10");

const average = document.createElementNS("http://www.w3.org/2000/svg", "rect");
average.setAttribute("id", "average");
average.setAttribute("width", "5");
average.setAttribute("height", "30");
average.setAttribute("style", "fill:#aaa;fill-rule:evenodd;");
average.setAttribute("x", averageValue * chartRatio);
average.setAttribute("y", "10");

bulletChartLayer.append(lowestRange, normalRange, highestRange, currentAverage, average);

// Value Labels
const lowestValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
lowestValueLabel.setAttribute("id", "lowestValue");
lowestValueLabel.setAttribute("style", "font-size:1vh; color:#000; dominant-baseline:start; text-anchor:start");
lowestValueLabel.setAttribute("x", lowestValue);
lowestValueLabel.setAttribute("y", "40");
lowestValueLabel.innerHTML = "Low Val";

const highestValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
highestValueLabel.setAttribute("id", "highestValue");
highestValueLabel.setAttribute("style", "font-size:1vh; color:#000; dominant-baseline:end; text-anchor:end");
highestValueLabel.setAttribute("x", highestValue * chartRatio);
highestValueLabel.setAttribute("y", "40");
highestValueLabel.setAttribute("xml:space", "preserve");
highestValueLabel.innerHTML = "High Val";

const operationMinValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
operationMinValueLabel.setAttribute("id", "operationMinValue");
operationMinValueLabel.setAttribute("style", "font-size:1vh; color:#000 dominant-baseline: middle; text-anchor: middle");
operationMinValueLabel.setAttribute("x", operationMinValue * chartRatio);
operationMinValueLabel.setAttribute("y", "40");
operationMinValueLabel.innerHTML = "Min Val";

const operationMaxValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
operationMaxValueLabel.setAttribute("id", "operationMaxValue");
operationMaxValueLabel.setAttribute("style", "font-size:1vh; color:#000 dominant-baseline: middle; text-anchor: middle");
operationMaxValueLabel.setAttribute("x", operationMaxValue * chartRatio);
operationMaxValueLabel.setAttribute("y", "40");
operationMaxValueLabel.setAttribute("xml:space", "preserve");
operationMaxValueLabel.innerHTML = "Max Val";

const averageValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
averageValueLabel.setAttribute("id", "averageValue");
averageValueLabel.setAttribute("style", "font-size:1vh; color:#000; dominant-baseline: middle; text-anchor: middle");
averageValueLabel.setAttribute("x", averageValue * chartRatio);
averageValueLabel.setAttribute("y", "50");
averageValueLabel.setAttribute("xml:space", "preserve");
averageValueLabel.innerHTML = "Avg Val";

bulletChartLayer.append(lowestValueLabel, highestValueLabel, operationMinValueLabel, operationMaxValueLabel, averageValueLabel);

bulletChart.append(bulletChartLayer);

dashboard.append(bulletChart);
*/