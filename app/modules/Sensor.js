/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
import Services from "./Services.js";

class Sensor extends Services {
    constructor() {
        super();
    }

    getSensor = async (sensorId) => {
        return await this.getApi("Sensor", "getSensor", "sensorId=" + sensorId)
        .then(response => {
            //console.log(response);
            return response;
        })
        .catch(e => console.log(e));
    }

    getUserSensors = async (userId) => {
        return await this.getApi("Sensors", "getUserSensors", "&userId=" + userId)
        .then(response => {
            //console.log(response);
            return response;
        })
        .catch(e => console.log(e));
    }

    addSensor = async (sensorForm) => {
        let formData = new FormData();

        console.log(sensorForm.company.value, sensorForm.sensorId.value, sensorForm.sensorName.value);

        formData.append("class", "Sensors");
        formData.append("method", "addSensor");
        formData.append("company", sensorForm.company.value);
        formData.append("sensorId", sensorForm.sensorId.value);
        formData.append("sensorName", sensorForm.sensorName.value);
        formData.append("dataType", sensorForm.dataType.value);

        return await this.postApi(formData)
        .then(response => response)
        .catch(e => console.log(e));
    }

    updateSensor = async (sensorForm) => {

        let formData = new FormData();
        formData.append("class", "Sensors");
        formData.append("method", "updateSensor");
        formData.append("userId", sensorForm.company.value);
        formData.append("sensorId", sensorForm.sensorId.value);
        formData.append("sensorName", sensorForm.sensorName.value);
        formData.append("id", sensorForm.updateSensorButton.value);

        return await this.postApi(formData)
        .then(response => response)
        .catch(e => console.log(e));
    }

    deleteSensor = async (sensorId, userId) => {

        let formData = new FormData();
        formData.append("class", "Sensors");
        formData.append("method", "deleteSensor");
        formData.append("userId", userId);
        formData.append("sensorId", sensorId);

        return await this.postApi(formData)
        .then(response => response)
        .catch(e => console.log(e));
    }

}

export default Sensor;

