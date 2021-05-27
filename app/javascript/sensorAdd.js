import Sensor from "../modules/Sensor.js";

const sensor = new Sensor();

const addSensorButton = document.querySelector("#addSensorButton");
addSensorButton.addEventListener("click", (e) => {
    //document.cookie = "userId=" + e.target.value;
    if (sensor.addSensor(document.forms[0])) {
        document.querySelector("#message").classList.add("alert-success");
        document.querySelector("#message").innerHTML = "Sensor Added";
    }
    else {
        document.querySelector("#message").classList.add("alert-danger");
        document.querySelector("#message").innerHTML = "Sensor Was Not Added";
    }
}, false);

