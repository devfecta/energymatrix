import Charting from "../modules/Charting.js";

const dashboard = document.querySelector("#dashboard");

//dashboard.getAttribute("width")
console.log(dashboard.clientWidth);
console.log(dashboard.style.height);

const chartWidth = dashboard.clientWidth;

const bulletChart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
bulletChart.setAttribute("id", "bulletChart");
bulletChart.setAttribute("width", "100%");
bulletChart.setAttribute("height", "100px");
bulletChart.setAttribute("viewBox", `0 0 ${chartWidth} 100`);
bulletChart.setAttribute("version", "1.1");
bulletChart.setAttribute("preserveAspectRatio", "xMinYMin");

const bulletChartLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
bulletChartLayer.setAttribute("id", "bulletChartLayer");

const lowestRange = document.createElementNS("http://www.w3.org/2000/svg", "rect");
lowestRange.setAttribute("id", "lowestRange");
lowestRange.setAttribute("width", Math.round(((chartWidth * 0.333))));
lowestRange.setAttribute("height", "20");
lowestRange.setAttribute("style", "fill:#d40000;fill-rule:evenodd;");
lowestRange.setAttribute("x", "5");
lowestRange.setAttribute("y", "10");

const normalRange = document.createElementNS("http://www.w3.org/2000/svg", "rect");
normalRange.setAttribute("id", "lowestRange");
normalRange.setAttribute("width", Math.round((100 * 100) / chartWidth * 100));
normalRange.setAttribute("height", "20");
normalRange.setAttribute("style", "fill:#008000;fill-rule:evenodd;");
normalRange.setAttribute("x", Math.round((50 * 100) / chartWidth * 100));
normalRange.setAttribute("y", "10");

const highestRange = document.createElementNS("http://www.w3.org/2000/svg", "rect");
highestRange.setAttribute("id", "highestRange");
highestRange.setAttribute("width", Math.round((50 * 100) / chartWidth * 100));
highestRange.setAttribute("height", "20");
highestRange.setAttribute("style", "fill:#d40000;fill-rule:evenodd;");
highestRange.setAttribute("x", parseInt(normalRange.getAttribute("width")) + Math.round((100 * 100) / chartWidth * 100));
highestRange.setAttribute("y", "10");

const currentAverage = document.createElementNS("http://www.w3.org/2000/svg", "rect");
currentAverage.setAttribute("id", "currentAverage");
currentAverage.setAttribute("width", "75");
currentAverage.setAttribute("height", "10");
currentAverage.setAttribute("style", "fill:#000;fill-rule:evenodd;");
currentAverage.setAttribute("x", "5");
currentAverage.setAttribute("y", "15");

const average = document.createElementNS("http://www.w3.org/2000/svg", "rect");
average.setAttribute("id", "average");
average.setAttribute("width", "5");
average.setAttribute("height", "30");
average.setAttribute("style", "fill:#aaa;fill-rule:evenodd;");
average.setAttribute("x", "145");
average.setAttribute("y", "10");

bulletChartLayer.append(lowestRange, normalRange, highestRange, currentAverage, average);

// Labels
const lowestValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
lowestValueLabel.setAttribute("id", "lowestValueLabel");
lowestValueLabel.setAttribute("style", "font-size:1vh; color:#000");
lowestValueLabel.setAttribute("x", "0");
lowestValueLabel.setAttribute("y", "9");
lowestValueLabel.innerHTML = "Low";

const highestValueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
highestValueLabel.setAttribute("id", "highestValueLabel");
highestValueLabel.setAttribute("style", "font-size:1vh; color:#000");
highestValueLabel.setAttribute("x", "200");
highestValueLabel.setAttribute("y", "9");
highestValueLabel.setAttribute("xml:space", "preserve");
highestValueLabel.innerHTML = "High";

const operationMinLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
operationMinLabel.setAttribute("id", "operationMinLabel");
operationMinLabel.setAttribute("style", "font-size:1vh; color:#000");
operationMinLabel.setAttribute("x", "50");
operationMinLabel.setAttribute("y", "9");
operationMinLabel.innerHTML = "Min";

const operationMaxLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
operationMaxLabel.setAttribute("id", "operationMaxLabel");
operationMaxLabel.setAttribute("style", "font-size:1vh; color:#000");
operationMaxLabel.setAttribute("x", "150");
operationMaxLabel.setAttribute("y", "9");
operationMaxLabel.setAttribute("xml:space", "preserve");
operationMaxLabel.innerHTML = "Max";

bulletChartLayer.append(lowestValueLabel, highestValueLabel, operationMinLabel, operationMaxLabel);

// Value Labels
const lowestValue = document.createElementNS("http://www.w3.org/2000/svg", "text");
lowestValue.setAttribute("id", "lowestValue");
lowestValue.setAttribute("style", "font-size:1vh; color:#000");
lowestValue.setAttribute("x", "0");
lowestValue.setAttribute("y", "40");
lowestValue.innerHTML = "Low Val";

const highestValue = document.createElementNS("http://www.w3.org/2000/svg", "text");
highestValue.setAttribute("id", "highestValue");
highestValue.setAttribute("style", "font-size:1vh; color:#000");
highestValue.setAttribute("x", "200");
highestValue.setAttribute("y", "40");
highestValue.setAttribute("xml:space", "preserve");
highestValue.innerHTML = "High Val";

const operationMinValue = document.createElementNS("http://www.w3.org/2000/svg", "text");
operationMinValue.setAttribute("id", "operationMinValue");
operationMinValue.setAttribute("style", "font-size:1vh; color:#000");
operationMinValue.setAttribute("x", "50");
operationMinValue.setAttribute("y", "40");
operationMinValue.innerHTML = "Min Val";

const operationMaxValue = document.createElementNS("http://www.w3.org/2000/svg", "text");
operationMaxValue.setAttribute("id", "operationMaxValue");
operationMaxValue.setAttribute("style", "font-size:1vh; color:#000");
operationMaxValue.setAttribute("x", "150");
operationMaxValue.setAttribute("y", "40");
operationMaxValue.setAttribute("xml:space", "preserve");
operationMaxValue.innerHTML = "Max Val";

const averageValue = document.createElementNS("http://www.w3.org/2000/svg", "text");
averageValue.setAttribute("id", "averageValue");
averageValue.setAttribute("style", "font-size:1vh; color:#000");
averageValue.setAttribute("x", "140");
averageValue.setAttribute("y", "50");
averageValue.setAttribute("xml:space", "preserve");
averageValue.innerHTML = "Avg Val";

bulletChartLayer.append(lowestValue, highestValue, operationMinValue, operationMaxValue, averageValue);

bulletChart.append(bulletChartLayer);

dashboard.append(bulletChart);

/*
<svg
   width="210mm"
   height="297mm"
   viewBox="0 0 210 297"
   version="1.1"
   id="svg5"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs2" />
  <g
     id="layer1">
    <rect
       style="fill:#d40000;fill-rule:evenodd;stroke-width:0.316227"
       id="lowestRange"
       width="50"
       height="10"
       x="5"
       y="10" />
    <rect
       style="fill:#008000;fill-rule:evenodd;stroke-width:0.447216"
       id="normalRange"
       width="100"
       height="10"
       x="55"
       y="10" />
    <rect
       style="fill:#d40000;fill-rule:evenodd;stroke-width:0.316227"
       id="highestRange"
       width="50"
       height="10"
       x="155"
       y="10" />
    <rect
       style="fill:#000000;stroke-width:0.363719"
       id="currentAverage"
       width="75"
       height="5.2916665"
       x="5"
       y="12.5" />
    <rect
       style="fill:#999999;stroke-width:0.173907"
       id="average"
       width="1.3229166"
       height="15"
       x="115.3125"
       y="10.000001" />
    <text
       xml:space="preserve"
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:4.23333px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"
       x="4.5845218"
       y="9.2163382"
       id="lowestValueLabel"><tspan
         id="tspan825"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:4.23333px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:0.264583"
         x="4.5845218"
         y="9.2163382">Low Value</tspan></text>
    <text
       xml:space="preserve"
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:4.23333px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"
       x="182.22894"
       y="9.2163382"
       id="highestValueLabel"><tspan
         id="tspan825-1"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:4.23333px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:0.264583"
         x="182.22894"
         y="9.2163382">High Value</tspan></text>
    <text
       xml:space="preserve"
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:4.23333px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"
       x="107.3414"
       y="29.042868"
       id="averageLabel"><tspan
         id="tspan825-1-5"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:4.23333px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:0.264583"
         x="107.3414"
         y="29.042868">Average</tspan></text>
    <text
       xml:space="preserve"
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:4.23333px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"
       x="40.012287"
       y="9.2163382"
       id="operationMinLabel"><tspan
         id="tspan825-1-5-7"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:4.23333px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:0.264583"
         x="40.012287"
         y="9.2163382">Operation Min</tspan></text>
    <text
       xml:space="preserve"
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:4.23333px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"
       x="139.26228"
       y="9.2160053"
       id="operationMaxLabel"><tspan
         id="tspan825-1-5-7-6"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:4.23333px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;stroke-width:0.264583"
         x="139.26228"
         y="9.2160053">Operation Max</tspan></text>
  </g>
</svg>
*/