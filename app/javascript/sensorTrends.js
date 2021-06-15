import Trends from "../modules/Trends.js";

const trends = new Trends();

const url = new URLSearchParams(document.location.search);
const userId = url.get("userId");
const sensorId = url.get("sensorId");

trends.getTrends(sensorId, userId)
.then(response => {

    console.log(response);
    const trendsListing = document.querySelector("#trends");
    // Table
    const trendsTable = document.createElement("table");
    trendsTable.setAttribute("class", "table table-striped table-hover");
    // Table Header
    const trendsTableHeader = document.createElement("thead");
    const trendsTableHeaderRow = document.createElement("tr");

    const trendsTableHeaderRowColumnSensorId = document.createElement("th");
    trendsTableHeaderRowColumnSensorId.setAttribute("scope", "col");
    trendsTableHeaderRowColumnSensorId.innerHTML = "Sensor ID";
    trendsTableHeaderRow.append(trendsTableHeaderRowColumnSensorId);

    const trendsTableHeaderRowColumnLowestLevel = document.createElement("th");
    trendsTableHeaderRowColumnLowestLevel.setAttribute("scope", "col");
    trendsTableHeaderRowColumnLowestLevel.innerHTML = "Lowest Level";
    trendsTableHeaderRow.append(trendsTableHeaderRowColumnLowestLevel);

    const trendsTableHeaderRowColumnHighestLevel = document.createElement("th");
    trendsTableHeaderRowColumnHighestLevel.setAttribute("scope", "col");
    trendsTableHeaderRowColumnHighestLevel.innerHTML = "Highest Level";
    trendsTableHeaderRow.append(trendsTableHeaderRowColumnHighestLevel);

    const trendsTableHeaderRowColumnOperationMin = document.createElement("th");
    trendsTableHeaderRowColumnOperationMin.setAttribute("scope", "col");
    trendsTableHeaderRowColumnOperationMin.innerHTML = "Operational Minimum";
    trendsTableHeaderRow.append(trendsTableHeaderRowColumnOperationMin);

    const trendsTableHeaderRowColumnOperationMax = document.createElement("th");
    trendsTableHeaderRowColumnOperationMax.setAttribute("scope", "col");
    trendsTableHeaderRowColumnOperationMax.innerHTML = "Operational Maximum";
    trendsTableHeaderRow.append(trendsTableHeaderRowColumnOperationMax);

    const trendsTableHeaderRowColumnStartTime = document.createElement("th");
    trendsTableHeaderRowColumnStartTime.setAttribute("scope", "col");
    trendsTableHeaderRowColumnStartTime.innerHTML = "Start Time";
    trendsTableHeaderRow.append(trendsTableHeaderRowColumnStartTime);

    const trendsTableHeaderRowColumnDuration = document.createElement("th");
    trendsTableHeaderRowColumnDuration.setAttribute("scope", "col");
    trendsTableHeaderRowColumnDuration.innerHTML = "Duration";
    trendsTableHeaderRow.append(trendsTableHeaderRowColumnDuration);

    const trendsTableHeaderRowColumnButton = document.createElement("th");
    trendsTableHeaderRowColumnButton.setAttribute("scope", "col");
    trendsTableHeaderRow.append(trendsTableHeaderRowColumnButton);

    trendsTableHeader.append(trendsTableHeaderRow);
    trendsTable.append(trendsTableHeader);
    // Table Body
    const trendsTableBody = document.createElement("tbody");

    response.forEach(trend => {

        let trendsTableBodyRow = document.createElement("tr");

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

        let trendsTableBodyColumnButton = document.createElement("td");
        let trendsTableButton = document.createElement("button");
        trendsTableButton.setAttribute("type", "button");
        trendsTableButton.innerHTML = '<span class="fas fa-eye"></span>';
        trendsTableButton.addEventListener("click", event => console.log(trend.id));

        trendsTableBodyColumnButton.append(trendsTableButton);
        trendsTableBodyRow.append(trendsTableBodyColumnButton);

        trendsTableBody.append(trendsTableBodyRow);
        
    });

    trendsTable.append(trendsTableBody);
    trendsListing.append(trendsTable);
    /*
    const sensorId = document.querySelector("#trends");
    sensorId.value = response.id;
    const sensorName = document.querySelector("#sensorName");
    sensorName.value = response.sensor_name;

    const updateSensorButton = document.querySelector("#updateSensorButton");
    updateSensorButton.addEventListener("click", (event) => {
        // Need to set so it can be passed into the promise.
        let sensorId = document.forms[0].getElementsByTagName("input").namedItem("sensorId").value;
        let sensorName = document.forms[0].getElementsByTagName("input").namedItem("sensorName").value;

        sensor.updateSensor(document.forms[0])
        .then(response => {
            if (response) {
                document.querySelector("#message").classList.remove("alert-danger");
                document.querySelector("#message").classList.add("alert-success");
                document.querySelector("#message").innerHTML = "Sensor Updated";

                const menuItem = document.querySelector("#sensorsMenuItem" + sensorId);
                menuItem.childNodes[0].innerHTML = sensorName;
            }
            else {
                document.querySelector("#message").classList.remove("alert-success");
                document.querySelector("#message").classList.add("alert-danger");
                document.querySelector("#message").innerHTML = "Sensor Was Not Updated";
            }
        })
        .catch(e => console.log(e));
        
    }, false);
    */
    /*
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
    */
    
})
.catch(e => console.log(e));
    

