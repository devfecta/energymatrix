import Services from "./Services.js";

class Sensor extends Services {
    constructor() {
        super();
    }

    getSensor = async (sensorId, userId) => {
        return await this.getApi("Sensor", "getSensor", "sensorId=" + sensorId + "&userId=" + userId)
        .then(response => response)
        .catch(e => console.log(e));
    }

    addSensor = async (sensorForm) => {

        let formData = new FormData();
        formData.append("class", "Sensors");
        formData.append("method", "addSensor");
        formData.append("company", sensorForm.company.value);
        formData.append("sensorId", sensorForm.sensorId.value);
        formData.append("sensorName", sensorForm.sensorName.value);

        return await this.postApi(formData)
        .then(response => response)
        .catch(e => console.log(e));
        // Need to add some sort of confirmation
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

