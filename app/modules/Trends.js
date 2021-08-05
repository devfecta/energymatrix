import Services from "./Services.js";
import Sensor from "./Sensor.js";
import Charting from "./Charting.js";

class Trends extends Services {
    constructor() {
        super();
    }
    /**
     * Gets the trend data for a specific sensor.
     *
     * @param   {int}  sensorId
     * @param   {int}  userId
     *
     * @return  {array} Array of trend data.
     */
    getTrends = async (sensorId, userId) => {

        return await this.getApi("Trends", "getTrends", "sensorId=" + sensorId + "&userId=" + userId)
        .then(response => response)
        .catch(e => console.error(e));
    }
    /**
     * Gets the calculated trend data for a specific sensor.
     *
     * @param   {int}  sensorId
     * @param   {int}  userId
     *
     * @return  {array} Array of trend data.
     */
     getConfiguredTrends = async (sensorId, userId) => {
        //console.log(sensorId, userId);
        return await this.getApi("Trends", "getConfiguredTrends", "sensorId=" + sensorId + "&userId=" + userId)
        .then(response => response)
        .catch(e => console.error(e));
    }

    /**
     * Gets the calculated trend data for a specific trend.
     *
     * @param   {int}  trendId
     *
     * @return  {array} Array of trend data.
     */
     getConfiguredTrend = async (trendId) => {
        return await this.getApi("Trends", "getConfiguredTrend", "trendId=" + trendId)
        .then(response => response)
        .catch(e => console.error(e));
    }

    listConfiguredTrends = (sensorId, userId) => {
        
        this.getConfiguredTrends(sensorId, userId)
        .then(response => {
            const trendsList = document.querySelector("#trends");

            const trendsListGroup = document.createElement("div");
            trendsListGroup.setAttribute("class", "list-group");

            response.forEach(trend => {
                const trendButton = document.createElement("button");
                trendButton.setAttribute("type", "button");
                trendButton.setAttribute("class", "d-flex flex-wrap list-group-item list-group-item-action");
                trendButton.setAttribute("value", trend.id);
                trendButton.addEventListener("click", (event) => {this.viewTrend(trendButton.value)});
                
                let trendColumn = document.createElement("div");
                trendColumn.setAttribute("class", "col-md-4 h5");
                trendColumn.innerHTML = trend.trendName;

                trendButton.append(trendColumn);

                trendColumn = document.createElement("div");
                trendColumn.setAttribute("class", "col-md-4 h5");
                trendColumn.innerHTML = trend.trendFormula;

                trendButton.append(trendColumn);

                // Inputs Row
                trendColumn = document.createElement("div");
                trendColumn.setAttribute("class", "col-md-12 d-flex");

                let trendDetailRow = document.createElement("div");
                trendDetailRow.setAttribute("class", "col-md-1");
                trendDetailRow.innerHTML = `<strong>Inputs: </strong>`;
                trendColumn.append(trendDetailRow);

                Object.entries(trend.inputs).forEach(input => {
                    trendDetailRow = document.createElement("div");
                    trendDetailRow.setAttribute("class", "col-md-2");
                    trendDetailRow.innerHTML += input[0] + " : " + input[1];
                    trendColumn.append(trendDetailRow);
                });

                trendButton.append(trendColumn);

                // Associated Trends Row
                trendColumn = document.createElement("div");
                trendColumn.setAttribute("class", "col-md-12 d-flex");

                trendDetailRow = document.createElement("div");
                trendDetailRow.setAttribute("class", "col-md-2");
                trendDetailRow.innerHTML = `<strong>Associated Trend(s): </strong>`;
                trendColumn.append(trendDetailRow);

                trend.associatedTrends.forEach(trend => {
                    trendDetailRow = document.createElement("div");
                    trendDetailRow.setAttribute("class", "col-md-2");
                    trendDetailRow.innerHTML += trend.trendName;
                    trendColumn.append(trendDetailRow);
                });

                trendButton.append(trendColumn);

                trendsListGroup.append(trendButton);
            });

            trendsList.append(trendsListGroup);
            //console.log(response);
        })
        .catch(e => console.error(e));
    }
// WIP
    viewTrend = (trendId) => {        
        console.log(trendId);
        this.getConfiguredTrend(trendId)
        .then(dataPoints => {
            console.log(dataPoints);

            const charting = new Charting();

            //const charts = document.createElement('div');
            //charts.setAttribute("id", "charts");
            //charts.setAttribute("class", "d-flex justify-content-around row");

            let chart = null;
            /*
            let points = dataPoints.filter(function(dataPoint) {

                if (dataType.data_type == "mA") {
                    // Need to change the labeling on the chart
                }
                else {
                    
                }
                return dataPoint.data_type == dataType.data_type;
                
                
            });
            */
            // Create charts here
            console.log(dataPoints.points[0]);
            let chartId = dataPoints.sensorId + "-" + dataPoints.points[0].data_type.replace(" ", "_");
            chart = charting.createChart(chartId);
            // Title the Chart and Label the Chart's Axes
            
            chart = charting.chartData(chart, dataPoints.sensor_name + " Data", dataPoints.points[0].data_type);
            
            charting.plotDataPoints(chart, dataPoints.points);
            
            charting.buildChart(chart);

            
            /*
            const trendsList = document.querySelector("#trends");

            const trendRow = document.createElement("section");
            trendRow.setAttribute("class", "row");

            response.forEach(trend => {
                const trendButton = document.createElement("button");
                trendButton.setAttribute("type", "button");
                trendButton.setAttribute("class", "d-flex flex-wrap list-group-item list-group-item-action");
                trendButton.setAttribute("value", trend.id);
                trendButton.addEventListener("click", (event) => {this.viewTrend(trendButton.value)});
                
                let trendColumn = document.createElement("div");
                trendColumn.setAttribute("class", "col-md-4 h5");
                trendColumn.innerHTML = trend.trendName;

                trendButton.append(trendColumn);

                trendColumn = document.createElement("div");
                trendColumn.setAttribute("class", "col-md-4 h5");
                trendColumn.innerHTML = trend.trendFormula;

                trendButton.append(trendColumn);

                // Inputs Row
                trendColumn = document.createElement("div");
                trendColumn.setAttribute("class", "col-md-12 d-flex");

                let inputs = JSON.parse(trend.inputs);

                let trendDetailRow = document.createElement("div");
                trendDetailRow.setAttribute("class", "col-md-1");
                trendDetailRow.innerHTML = `<strong>Inputs: </strong>`;
                trendColumn.append(trendDetailRow);

                Object.entries(inputs).forEach(input => {
                    if (input[1]) {
                        trendDetailRow = document.createElement("div");
                        trendDetailRow.setAttribute("class", "col-md-2");
                        trendDetailRow.innerHTML += input[0] + " : " + input[1];
                        trendColumn.append(trendDetailRow);
                    }
                });

                trendButton.append(trendColumn);

                // Associated Trends Row
                trendColumn = document.createElement("div");
                trendColumn.setAttribute("class", "col-md-12 d-flex");

                trendDetailRow = document.createElement("div");
                trendDetailRow.setAttribute("class", "col-md-2");
                trendDetailRow.innerHTML = `<strong>Associated Trend(s): </strong>`;
                trendColumn.append(trendDetailRow);

                trend.associatedTrends.forEach(trend => {
                    trendDetailRow = document.createElement("div");
                    trendDetailRow.setAttribute("class", "col-md-2");
                    trendDetailRow.innerHTML += trend.trendName;
                    trendColumn.append(trendDetailRow);
                });

                trendButton.append(trendColumn);

                trendsListGroup.append(trendButton);
            });

            trendsList.append(trendsListGroup);
            */
            
        })
        .catch(e => console.error(e));
    }

    /**
     * Builds the list of trends for a specific sensor.
     *
     * @param   {int}  sensorId
     * @param   {int}  userId
     */
    MOVEtoUSERSIDElistTrends = (sensorId, userId) => {

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
            trendsTableHeaderRowColumnSensorId.innerHTML = "Sensor ID<br/>";
            trendsTableHeaderRowColumnSensorId.append(this.createTextBox("text", "sensorId", "sensorId", 6, false));
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnSensorId);

            const trendsTableHeaderRowColumnLowestLevel = document.createElement("th");
            trendsTableHeaderRowColumnLowestLevel.setAttribute("scope", "col");
            trendsTableHeaderRowColumnLowestLevel.setAttribute("class", "col-lg-1");
            trendsTableHeaderRowColumnLowestLevel.innerHTML = "Lowest Level<br/>";
            trendsTableHeaderRowColumnLowestLevel.append(this.createTextBox("number", "lowestLevel", "lowestLevel", 4, true));
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnLowestLevel);

            const trendsTableHeaderRowColumnHighestLevel = document.createElement("th");
            trendsTableHeaderRowColumnHighestLevel.setAttribute("scope", "col");
            trendsTableHeaderRowColumnHighestLevel.setAttribute("class", "col-lg-1");
            trendsTableHeaderRowColumnHighestLevel.innerHTML = "Highest Level<br/>";
            trendsTableHeaderRowColumnHighestLevel.append(this.createTextBox("number", "highestLevel", "highestLevel", 4, true));
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnHighestLevel);

            const trendsTableHeaderRowColumnOperationMin = document.createElement("th");
            trendsTableHeaderRowColumnOperationMin.setAttribute("scope", "col");
            trendsTableHeaderRowColumnOperationMin.setAttribute("class", "col-lg-1");
            trendsTableHeaderRowColumnOperationMin.innerHTML = "Operational Minimum<br/>";
            trendsTableHeaderRowColumnOperationMin.append(this.createTextBox("number", "operationMin", "operationMin", 4, true));
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnOperationMin);

            const trendsTableHeaderRowColumnOperationMax = document.createElement("th");
            trendsTableHeaderRowColumnOperationMax.setAttribute("scope", "col");
            trendsTableHeaderRowColumnOperationMax.setAttribute("class", "col-lg-1");
            trendsTableHeaderRowColumnOperationMax.innerHTML = "Operational Maximum<br/>";
            trendsTableHeaderRowColumnOperationMax.append(this.createTextBox("number", "operationMax", "operationMax", 4, true));
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnOperationMax);

            const trendsTableHeaderRowColumnStartTime = document.createElement("th");
            trendsTableHeaderRowColumnStartTime.setAttribute("scope", "col");
            trendsTableHeaderRowColumnStartTime.setAttribute("class", "col-lg-4");
            trendsTableHeaderRowColumnStartTime.innerHTML = "Start Date/Time<br/>";
            let minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 5);
            trendsTableHeaderRowColumnStartTime.append(this.createDateBox("startDate", "startDate", minDate.toLocaleDateString("fr-CA"), "", true));
            trendsTableHeaderRowColumnStartTime.append(this.createTimeBox("startTime", "startTime", "00:00", "23:59", true));
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnStartTime);

            const trendsTableHeaderRowColumnDuration = document.createElement("th");
            trendsTableHeaderRowColumnDuration.setAttribute("scope", "col");
            trendsTableHeaderRowColumnDuration.setAttribute("class", "col-lg-2");
            trendsTableHeaderRowColumnDuration.innerHTML = "Duration<br/>";
            let optionsDuration = new Array();
            optionsDuration[24] = "24 Hours";
            optionsDuration[12] = "12 Hours";
            optionsDuration[8] = "8 Hours";
            optionsDuration[4] = "4 Hours";
            optionsDuration[2] = "2 Hours";
            optionsDuration[1] = "1 Hour";
            trendsTableHeaderRowColumnDuration.append(this.createDropDown("duration", "duration", optionsDuration, true));
            trendsTableHeaderRow.append(trendsTableHeaderRowColumnDuration);
            const trendsTableHeaderRowColumnButtons = document.createElement("th");
            trendsTableHeaderRowColumnButtons.setAttribute("scope", "col");
            trendsTableHeaderRowColumnButtons.setAttribute("class", "col-lg-1");
            const addTrendButton = document.createElement("button");
            addTrendButton.setAttribute("type", "button");
            addTrendButton.setAttribute("title", "Add Trend");
            addTrendButton.setAttribute("class", "btn btn-light m-0 text-nowrap");
            addTrendButton.addEventListener("click", (event) => {

                let formData = new FormData();
                formData.append("class", "Trends");
                formData.append("method", "insertTrend");
                formData.append("userId", userId);
                formData.append("sensorId", document.querySelector("#sensorId").value);
                formData.append("lowestLevel", document.querySelector("#lowestLevel").value);
                formData.append("highestLevel", document.querySelector("#highestLevel").value);
                formData.append("operationalMinimum", document.querySelector("#operationMin").value);
                formData.append("operationalMaximum", document.querySelector("#operationMax").value);
                formData.append("operationalStartTime", document.querySelector("#startDate").value + " " + document.querySelector("#startTime").value);
                formData.append("operationalDuration", document.querySelector("#duration").value);

                this.insertTrend(formData)
                .then(response => {
                    document.querySelector("#trendsList").prepend(this.createTrendRow(response));
                })
                .catch(e => console.error(e));;


            }, false);
            addTrendButton.innerHTML = '<span class="fas fa-plus-square"></span>';

            trendsTableHeaderRowColumnButtons.append(addTrendButton);

            trendsTableHeaderRow.append(trendsTableHeaderRowColumnButtons);

            trendsTableHeader.append(trendsTableHeaderRow);
            trendsTable.append(trendsTableHeader);
            // Table Body
            const trendsTableBody = document.createElement("tbody");
            trendsTableBody.id = "trendsList";

            // Loops through trends pulled from the database.
            response.forEach(trend => {
                trendsTableBody.append(this.createTrendRow(trend));
            });

            trendsTable.append(trendsTableBody);
            trendsListing.append(trendsTable);
        })
        .catch(e => console.error(e));

    }
    /**
     * Inserts a new trend into the database.
     *
     * @param   {FormData}  trendForm  Form data of the new trend.
     *
     * @return  {json}  JSON of the new trend data.
     */
    insertTrend = async (trendForm) => {

        return await this.postApi(trendForm)
        .then(response => response)
        .catch(e => console.error(e));
    
    }
    /**
     * Inserts a new trend into the database.
     *
     * @param   {FormData}  trendForm  Form data of the new trend.
     *
     * @return  {json}  JSON of the new trend data.
     */
     insertCalculatedTrend = async (trendForm) => {

        return await this.postApi(trendForm)
        .then(response => response)
        .catch(e => console.error(e));
    
    }
    /**
     * Creates a trend row in the list of trends.
     *
     * @param   {json}  trend  JSON of trend data
     *
     * @return  {HTMLElement}
     */
    createTrendRow = (trend) => {
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

        let trendsTableBodyColumnButtons = document.createElement("td");
        //trendsTableBodyColumnButtons.innerHTML = trend.operationalDuration;
        trendsTableBodyRow.append(trendsTableBodyColumnButtons);

        return trendsTableBodyRow;
    }
    /*
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

    getFormulas = async () => {
        return await this.getApi("Trends", "getFormulas", null)
        .then(response => response)
        .catch(e => console.error(e));
    }
    /**
     * Gets the form inputs required for each formula.
     *
     * @param   {int}  userId	Company ID
     * @param   {string}  selectedValue	The formula name
     *
     * @return  {array}	Returns an array of HTML elements.
     */
    getFormulaInputs = async (userId, selectedValue) => {

        let formulaSelected = true;

        let formulaInputs = new Array();
        
        let inputGroup = HTMLElement;
		let inputLabel = HTMLElement;

        switch (selectedValue) {
            case "chillerEfficiency":
                // Heat Capacity
				inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "heatCapacity");
                inputLabel.innerHTML = "Heat Capacity: ";
                inputGroup.append(inputLabel);
                inputGroup.append(this.createTextBox("number", "heatCapacity", "heatCapacity", 4, true));

                formulaInputs.push(inputGroup);

                // Associated Sensors
				inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "associatedSensors");
                inputLabel.innerHTML = "Associated Sensors: ";
                inputGroup.append(inputLabel);

                
                let optionsAssociatedSensors = new Array();
                let associatedSensors = await this.getApi("Sensors", "getUserSensors", "&userId=" + userId)
                .then(response => {
                    //console.log(response);
                    response.forEach(sensor => optionsAssociatedSensors[parseInt(sensor.id)] = sensor.sensor_name);
                    return optionsAssociatedSensors;
                })
                .catch(e => console.log(e));
                
                inputGroup.append(this.createDropDown("associatedSensors", "associatedSensors", associatedSensors, true));

                formulaInputs.push(inputGroup);

                break;
            case "current":
				// Averaging Factor
				inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "averagingFactor");
                inputLabel.innerHTML = "Averaging Factor: ";
                inputGroup.append(inputLabel);
                inputGroup.append(this.createTextBox("number", "averagingFactor", "averagingFactor", 4, true));

                formulaInputs.push(inputGroup);
                break;
            case "maConversion":
				// mA Minimum
				inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "mAMin");
                inputLabel.innerHTML = "mA Minimum: ";
                inputGroup.append(inputLabel);
                inputGroup.append(this.createTextBox("number", "mAMin", "mAMin", 4, true));

                formulaInputs.push(inputGroup);
				// mA Maximum
				inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "mAMax");
                inputLabel.innerHTML = "mA Maximum: ";
                inputGroup.append(inputLabel);
                inputGroup.append(this.createTextBox("number", "mAMax", "mAMax", 4, true));

                formulaInputs.push(inputGroup);
				// Process Minimum
				inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "processMin");
                inputLabel.innerHTML = "Process Minimum: ";
                inputGroup.append(inputLabel);
                inputGroup.append(this.createTextBox("number", "processMin", "processMin", 4, true));

                formulaInputs.push(inputGroup);
				// Process Maximum
				inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "processMax");
                inputLabel.innerHTML = "Process Maximum: ";
                inputGroup.append(inputLabel);
                inputGroup.append(this.createTextBox("number", "processMax", "processMax", 4, true));

                formulaInputs.push(inputGroup);
                break;
            case "massFlow":
				// Density
                inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "density");
                inputLabel.innerHTML = "Density: ";
                inputGroup.append(inputLabel);
                inputGroup.append(this.createTextBox("number", "density", "density", 4, true));

                formulaInputs.push(inputGroup);
                
                /*
                let optionsDuration = new Array();
                optionsDuration[24] = "24 Hours";
                optionsDuration[12] = "12 Hours";
                optionsDuration[8] = "8 Hours";
                optionsDuration[4] = "4 Hours";
                optionsDuration[2] = "2 Hours";
                optionsDuration[1] = "1 Hour";
                trendsTableHeaderRowColumnDuration.append(this.createDropDown("duration", "duration", true, optionsDuration));
                */
                break;
            case "power":
				// Voltage
                inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "voltage");
                inputLabel.innerHTML = "Voltage: ";
                inputGroup.append(inputLabel);
                inputGroup.append(this.createTextBox("number", "voltage", "voltage", 4, true));

                formulaInputs.push(inputGroup);
				// Power Factor
                inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "powerFactor");
                inputLabel.innerHTML = "Power Factor: ";
                inputGroup.append(inputLabel);
                inputGroup.append(this.createTextBox("number", "powerFactor", "powerFactor", 4, true));

                formulaInputs.push(inputGroup);
                break;
            default:
                formulaSelected = false;
                break;
        }
        
        if (formulaSelected) {
            const sensor = new Sensor();

            await sensor.getUserSensors(userId)
            .then(response => {

                inputGroup = document.createElement("div");
                inputGroup.setAttribute("class", "col-md-12 form-group");

                inputLabel = document.createElement("label");
                inputLabel.setAttribute("for", "companySensors");
                inputLabel.innerHTML = "Sensor: ";
                inputGroup.append(inputLabel);

                const formElement = document.createElement("select");
                formElement.setAttribute("id", "companySensors");
                formElement.setAttribute("name", "companySensors");
                formElement.setAttribute("class", "form-control");


                formElement.addEventListener("change", (event) => {

                    // Create trend dropdown and append to formulaInputs

                    let formulaInputs = document.querySelector("#formulaInputs");
                
                    let sensorId = event.target.options[event.target.options.selectedIndex].value;

                    formElement.setAttribute("disabled", true);
                    
                    this.getFormulaTrends(userId, sensorId)
                    .then(dropdown => {
                        formulaInputs.append(dropdown);
                    })
                    .catch(e => console.error(e));
                    
                });


                formElement.required = true;

                let optionElement = document.createElement("option");
                optionElement.setAttribute("value", "");
                optionElement.innerHTML = `Select A Sensor`;
                formElement.append(optionElement);

                response.forEach(option => {

                    //console.log(option);
                    let optionElement = document.createElement("option");
                    optionElement.setAttribute("value", option.id);
                    optionElement.innerHTML = `${option.sensor_name} <em class="mx-1" style="font-size: 0.75em">(ID: ${option.sensorId})</em>`;
                    formElement.append(optionElement);
                });

                inputGroup.append(formElement);

                //console.log(inputGroup);

                formulaInputs.push(inputGroup);

            })
            .catch(e => console.error(e));
        }

        return formulaInputs;
    }

    getFormulaTrends = async (userId, sensorId) => {

        let inputGroup = HTMLElement;
		let inputLabel = HTMLElement;

        await this.getApi("Trends", "getFormulaTrends", "userId=" + userId + "&sensorId=" + sensorId)
        .then(trends => {
            
            inputGroup = document.createElement("div");
            inputGroup.setAttribute("class", "col-md-12 form-group");

            inputLabel = document.createElement("label");
            inputLabel.setAttribute("for", "formulaTrends[]");
            inputLabel.innerHTML = "Sensor Trend: ";
            inputGroup.append(inputLabel);

            const formElement = document.createElement("select");
            formElement.setAttribute("id", "formulaTrends[]");
            formElement.setAttribute("name", "formulaTrends");
            formElement.setAttribute("class", "form-control");

            formElement.addEventListener("change", (event) => {

                let formulaInputs = document.querySelector("#formulaInputs");
            
                //sensorId = event.target.options[event.target.options.selectedIndex].value;
                
                this.getFormulaTrends(userId, sensorId)
                .then(dropdown => {
                    formulaInputs.append(dropdown);
                })
                .catch(e => console.error(e));
                
            });

            let optionElement = document.createElement("option");
            optionElement.setAttribute("value", "");
            optionElement.innerHTML = `Select A Sensor`;
            formElement.append(optionElement);

            trends.forEach(option => {
                let optionElement = document.createElement("option");
                optionElement.setAttribute("value", option.id);
                optionElement.innerHTML = `${option.trendName} <em class="mx-1" style="font-size: 0.75em">(Sensor ID: ${option.sensorId})</em>`;
                formElement.append(optionElement);
            });

            inputGroup.append(formElement);
        })
        .catch(e => console.error(e));

        return inputGroup;
    }
}

export default Trends;

