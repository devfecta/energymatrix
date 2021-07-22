import Sensor from "../modules/Sensor.js";

const sensor = new Sensor();

const addSensorButton = document.querySelector("#addSensorButton");
addSensorButton.addEventListener("click", (event) => {
    //document.cookie = "userId=" + e.target.value;

    sensor.addSensor(document.forms[0])
    .then(response => {

        console.log(response);
        
        if (response) {
            document.querySelector("#message").classList.remove("alert-danger");
            document.querySelector("#message").classList.add("alert-success");
            document.querySelector("#message").innerHTML = "Sensor Added";
            document.querySelectorAll('input[type="number"]').forEach(field => {field.value = ""});
            document.querySelectorAll('input[type="text"]').forEach(field => {field.value = ""});

            setInterval(() => {
                window.location.href = './';
            }, 1000);
            

        }
        else {
            document.querySelector("#message").classList.remove("alert-success");
            document.querySelector("#message").classList.add("alert-danger");
            document.querySelector("#message").innerHTML = "Sensor Was Not Added";
        }
    })
    .catch(e => console.log(e));
    
}, false);

