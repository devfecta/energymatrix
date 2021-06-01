import Sensor from "../modules/Sensor.js";

const sensor = new Sensor();

const url = new URLSearchParams(document.location.search);
const userId = url.get("userId");
const sensorId = url.get("sensorId");

sensor.getSensor(sensorId, userId)
.then(response => {
    console.log(response);

    const companys = document.querySelector("#company");
    companys.childNodes.forEach(company => {
        company.selected = (company.value == response.user_id) ? true : false;
    });

    const sensorId = document.querySelector("#sensorId");
    sensorId.value = response.id;
    const sensorName = document.querySelector("#sensorName");
    sensorName.value = response.sensor_name;
    
})
.catch(e => console.log(e));
    

