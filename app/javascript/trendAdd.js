
import Sensor from "../modules/Sensor.js";
import Trends from "../modules/Trends.js";

const sensor = new Sensor();

const trends = new Trends();

const url = new URLSearchParams(document.location.search);
const userId = url.get("userId");

const trendForm = document.querySelector("#trendForm");

const companySensor = document.querySelector("#companySensor");
companySensor.addEventListener("change", (event) => {
    trends.getFormulas();
});

sensor.getUserSensors(userId)
.then(response => {

    console.log(response);

    let optionElement = document.createElement("option");
    optionElement.setAttribute("value", "");
    optionElement.innerHTML = `Select A Sensor`;
    companySensor.append(optionElement);

    response.forEach(option => {

        optionElement = document.createElement("option");
        optionElement.setAttribute("value", option.sensorId);
        optionElement.innerHTML = `${option.sensor_name} <em class="mx-1" style="font-size: 0.75em">(ID: ${option.sensorId})</em>`;
        companySensor.append(optionElement);

    });

})
.catch(e => console.log(e));

