import Sensor from "../modules/Sensor.js";

const sensor = new Sensor();

const url = new URLSearchParams(document.location.search);
const userId = url.get("userId");
const sensorId = url.get("sensorId");

sensor.getSensor(sensorId, userId)
.then(response => {

    const companys = document.querySelector("#company");
    companys.childNodes.forEach(company => {
        company.selected = (company.value == response.user_id) ? true : false;
    });

    const sensorId = document.querySelector("#sensorId");
    sensorId.value = response.id;
    const sensorName = document.querySelector("#sensorName");
    sensorName.value = response.sensor_name;

    const deleteSensorButton = document.querySelector("#deleteSensorButton");
    deleteSensorButton.addEventListener("click", (event) => {
        // Need to set so it can be passed into the promise.
        let sensorId = response.id;
        
        sensor.deleteSensor(response.id, response.user_id)
        .then(response => {
            if (response) {
                document.querySelector("#message").classList.remove("alert-danger");
                document.querySelector("#message").classList.add("alert-success");
                document.querySelector("#message").innerHTML = "Sensor Deleted";
                document.querySelector("form").innerHTML = "";
                // Removes it from the sidebar.
                const menuItem = document.querySelector("#sensorsMenuItem" + sensorId);
                menuItem.parentNode.removeChild(menuItem);
            }
            else {
                document.querySelector("#message").classList.remove("alert-success");
                document.querySelector("#message").classList.add("alert-danger");
                document.querySelector("#message").innerHTML = "Sensor Was Not Deleted";
            }
        })
        .catch(e => console.log(e));
        
    }, false);

    
})
.catch(e => console.log(e));
    

