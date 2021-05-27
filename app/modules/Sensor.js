import Services from "./Services.js";

class Sensor extends Services {
    constructor() {
        super();
    }

    addSensor = (sensorForm) => {

        let formData = new FormData();
        formData.append("class", "Sensors");
        formData.append("method", "addSensor");
        formData.append("company", sensorForm.company.value);
        formData.append("sensorId", sensorForm.sensorId.value);
        formData.append("sensorName", sensorForm.sensorName.value);

        let result = this.postApi(formData);
console.log(result);
        return result;
        // Need to add some sort of confirmation
    }

}

export default Sensor;

