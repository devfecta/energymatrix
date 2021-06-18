import Services from "./Services.js";

class Trends extends Services {
    constructor() {
        super();
    }

    getTrends = async (sensorId, userId) => {

        return await this.getApi("Trends", "getTrends", "sensorId=" + sensorId + "&userId=" + userId)
        .then(response => response)
        .catch(e => console.log(e));
    }

    listTrends = (sensorId, userId) => {

        

        this.getTrends(sensorId, userId)
        .then(response => {
            const trendsListing = document.querySelector("#trends");
            // Table
            const trendsTable = document.createElement("table");
            trendsTable.setAttribute("class", "table table-striped table-hover");
            // Table Header
            const trendsTableHeader = document.createElement("thead");
            const trendsTableHeaderRow = document.createElement("tr");

            const trendsTableHeaderRowColumnSensorId = document.createElement("th");
            trendsTableHeaderRowColumnSensorId.setAttribute("scope", "col");
            trendsTableHeaderRowColumnSensorId.setAttribute("class", "col-lg-1");
            trendsTableHeaderRowColumnSensorId.innerHTML = "Sensor ID";
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnSensorId);

            const trendsTableHeaderRowColumnLowestLevel = document.createElement("th");
            trendsTableHeaderRowColumnLowestLevel.setAttribute("scope", "col");
            trendsTableHeaderRowColumnLowestLevel.setAttribute("class", "col-lg-1");
            trendsTableHeaderRowColumnLowestLevel.innerHTML = "Lowest Level";
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnLowestLevel);

            const trendsTableHeaderRowColumnHighestLevel = document.createElement("th");
            trendsTableHeaderRowColumnHighestLevel.setAttribute("scope", "col");
            trendsTableHeaderRowColumnHighestLevel.setAttribute("class", "col-lg-2");
            trendsTableHeaderRowColumnHighestLevel.innerHTML = "Highest Level";
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnHighestLevel);

            const trendsTableHeaderRowColumnOperationMin = document.createElement("th");
            trendsTableHeaderRowColumnOperationMin.setAttribute("scope", "col");
            trendsTableHeaderRowColumnOperationMin.setAttribute("class", "col-lg-2");
            trendsTableHeaderRowColumnOperationMin.innerHTML = "Operational Minimum";
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnOperationMin);

            const trendsTableHeaderRowColumnOperationMax = document.createElement("th");
            trendsTableHeaderRowColumnOperationMax.setAttribute("scope", "col");
            trendsTableHeaderRowColumnOperationMax.setAttribute("class", "col-lg-2");
            trendsTableHeaderRowColumnOperationMax.innerHTML = "Operational Maximum";
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnOperationMax);

            const trendsTableHeaderRowColumnStartTime = document.createElement("th");
            trendsTableHeaderRowColumnStartTime.setAttribute("scope", "col");
            trendsTableHeaderRowColumnStartTime.setAttribute("class", "col-lg-3");
            trendsTableHeaderRowColumnStartTime.innerHTML = "Start Time";
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnStartTime);

            const trendsTableHeaderRowColumnDuration = document.createElement("th");
            trendsTableHeaderRowColumnDuration.setAttribute("scope", "col");
            trendsTableHeaderRowColumnDuration.setAttribute("class", "col-lg-1");
            trendsTableHeaderRowColumnDuration.innerHTML = "Duration";
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnDuration);

            trendsTableHeader.append(trendsTableHeaderRow);
            trendsTable.append(trendsTableHeader);
            // Table Body
            const trendsTableBody = document.createElement("tbody");

            const trendsTableRowAddTrend = document.createElement("tr");

            const trendsTableColumnAddSensorId = document.createElement("td");
            trendsTableColumnAddSensorId.append(this.createTextBox("text", "sensorId", "sensorId", 6, false));
            trendsTableRowAddTrend.append(trendsTableColumnAddSensorId);

            const trendsTableColumnAddLowestLevel = document.createElement("td");
            trendsTableColumnAddLowestLevel.append(this.createTextBox("number", "lowestLevel", "lowestLevel", 4, true));
            trendsTableRowAddTrend.append(trendsTableColumnAddLowestLevel);

            const trendsTableColumnAddHighestLevel = document.createElement("td");
            trendsTableColumnAddHighestLevel.append(this.createTextBox("number", "highestLevel", "highestLevel", 4, true));
            trendsTableRowAddTrend.append(trendsTableColumnAddHighestLevel);

            const trendsTableColumnAddOperationMin = document.createElement("td");
            trendsTableColumnAddOperationMin.append(this.createTextBox("number", "operationMin", "operationMin", 4, true));
            trendsTableRowAddTrend.append(trendsTableColumnAddOperationMin);

            const trendsTableColumnAddOperationMax = document.createElement("td");
            trendsTableColumnAddOperationMax.append(this.createTextBox("number", "operationMax", "operationMax", 4, true));
            trendsTableRowAddTrend.append(trendsTableColumnAddOperationMax);

            const trendsTableColumnAddStartTime = document.createElement("td");

            let minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 5);

            trendsTableColumnAddStartTime.append(this.createDateBox("startDate", "startDate", minDate.toLocaleDateString("fr-CA"), "", true));
            trendsTableColumnAddStartTime.append(this.createTimeBox("startTime", "startTime", "00:00", "23:59", true));

            trendsTableRowAddTrend.append(trendsTableColumnAddStartTime);

            const trendsTableColumnAddDuration = document.createElement("td");

            let optionsDuration = new Array();
            optionsDuration[24] = "24 Hours";
            optionsDuration[12] = "12 Hours";
            optionsDuration[8] = "8 Hours";
            optionsDuration[4] = "4 Hours";
            optionsDuration[2] = "2 Hours";
            optionsDuration[1] = "1 Hour";

            trendsTableColumnAddDuration.append(this.createDropDown("duration", "duration", true, optionsDuration));
            trendsTableRowAddTrend.append(trendsTableColumnAddDuration);

            trendsTableBody.append(trendsTableRowAddTrend);

            // Loops through trends pulled from the database.
            response.forEach(trend => {

                let trendsTableBodyRow = document.createElement("tr");
                trendsTableBodyRow.addEventListener("click", event => console.log(trend.id));

                let trendsTableBodyColumnSensorId = document.createElement("td");
                trendsTableBodyColumnSensorId.innerHTML = trend.sensorId;
                trendsTableBodyRow.append(trendsTableBodyColumnSensorId);

                let trendsTableBodyColumnLowestLevel = document.createElement("td");
                trendsTableBodyColumnLowestLevel.innerHTML = trend.lowestLevel;
                trendsTableBodyRow.append(trendsTableBodyColumnLowestLevel);

                let trendsTableBodyColumnHighestLevel = document.createElement("td");
                trendsTableBodyColumnHighestLevel.innerHTML = trend.highestLevel;
                trendsTableBodyRow.append(trendsTableBodyColumnHighestLevel);

                let trendsTableBodyColumnOperationMin = document.createElement("td");
                trendsTableBodyColumnOperationMin.innerHTML = trend.operationalMinimum;
                trendsTableBodyRow.append(trendsTableBodyColumnOperationMin);

                let trendsTableBodyColumnOperationMax = document.createElement("td");
                trendsTableBodyColumnOperationMax.innerHTML = trend.operationalMaximum;
                trendsTableBodyRow.append(trendsTableBodyColumnOperationMax);

                let trendsTableBodyColumnStartTime = document.createElement("td");
                trendsTableBodyColumnStartTime.innerHTML = trend.operationalStartTime;
                trendsTableBodyRow.append(trendsTableBodyColumnStartTime);

                let trendsTableBodyColumnDuration = document.createElement("td");
                trendsTableBodyColumnDuration.innerHTML = trend.operationalDuration;
                trendsTableBodyRow.append(trendsTableBodyColumnDuration);

                trendsTableBody.append(trendsTableBodyRow);
                
            });

            trendsTable.append(trendsTableBody);
            trendsListing.append(trendsTable);
        })
        .catch(e => console.log(e));

    }
    /*
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
    }

    updateSensor = async (sensorForm) => {

        console.log(sensorForm);
        let formData = new FormData();
        formData.append("class", "Sensors");
        formData.append("method", "updateSensor");
        formData.append("userId", sensorForm.company.value);
        formData.append("sensorId", sensorForm.sensorId.value);
        formData.append("sensorName", sensorForm.sensorName.value);

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
    */
}

export default Trends;

