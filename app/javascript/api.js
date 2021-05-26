import Sidebar from "./Sidebar.js";

const init = () => {

    let userType = document.cookie.match(new RegExp('userType=([^=;]+)'));

    const sidebarMenu = document.querySelector('#sidebarMenu');

    const sidebar = new Sidebar(sidebarMenu, userType[1]);
    
    /*
    console.log(userType);

    sidebar.getSidebar();

    if (userType[1] <= 1) {
        console.log(userType[1]);
        
        sidebar.getUserSidebar();
    }
    else {
        sidebar.getCompaniesMenu(document.querySelector("#companiesMenu"));
    }
    */
   // 
    /*
    const currentDataTime = new Date();
    let initialDateTime = 
    currentDataTime.getFullYear() + 
    "-" + (currentDataTime.getMonth() + 1) + 
    "-" + currentDataTime.getDate() + 
    " " + currentDataTime.getHours() + 
    ":" + currentDataTime.getMinutes() + 
    ":" + currentDataTime.getSeconds();

    initializeRealTimeData(initialDateTime)
    .then(sensors => {
        const charts = initializeRealTimeCharts(sensors);
    })
    .catch(error => console.log(error));
    */
}
/**
 * Adds menu items to the user's sidebar by creating HTML button elements for specific menu categories.
 */
const getUserSidebar = () => {
    // Logs out after idle for 1 hour.
    const userSensors = document.querySelector("#userSensors");

    if (document.cookie.includes('; ') && document.cookie.includes('userId')) {
        const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];

        getApi("Sensors", "getUserSensors", "userId=" + userId)
        .then(sensors => {

            //console.log(sensors);

            sensors.forEach(sensor => {

                const menuLink = document.createElement('button');
                menuLink.setAttribute("class", "btn btn-light text-nowrap");
                menuLink.setAttribute("style", "text-align: left");
                menuLink.onclick = () => {window.location.href = "sensor.php?sensorId="+sensor.id};
                menuLink.innerHTML = sensor.sensor_name;

                userSensors.append(menuLink);
                userSensors.append(document.createElement('br'));
                
            });

        })
        .catch(error => console.log(error));
    }
    else {
        alert("logging out");
        location.href = './logout.php';
    }
}
/**
 * Creates the sidebar for an admin user.
 */
const getAdminSidebar = () => {

    

    //getCompaniesMenu(document.querySelector("#companiesMenu"));
    //getSensorsMenu(document.querySelector("#sensorsMenu"));
}
/**
 * Appends the companies menus to the admin sidebar.
 */
const getCompaniesMenu = (menu) => {

    getApi("Users", "getCompanies")
    .then(companies => {
        
        companies.forEach(company => {
            const companiesMenu = document.createElement('div');
            companiesMenu.setAttribute("class", "accordion-item");
            companiesMenu.setAttribute("id","companyMenu" + company.id);

            const companyHeader = document.createElement('h2');
            companyHeader.setAttribute("class", "accordion-header");
            companyHeader.setAttribute("id", "#companyHeader" + company.id);

            const companyLink = document.createElement('button');
            companyLink.setAttribute("class", "accordion-button collapsed");
            companyLink.setAttribute("type", "button");
            companyLink.setAttribute("data-bs-toggle", "collapse");
            companyLink.setAttribute("data-bs-target", "#companiesMenuItems" + company.id);
            companyLink.setAttribute("aria-expanded", "false");
            companyLink.setAttribute("aria-controls", "companiesMenuItems" + company.id);
            companyLink.innerHTML = company.company + ` <em class="mx-1" style="font-size: 0.75em"> (ID: ${company.id})</em>`;

            companyHeader.append(companyLink);
            companiesMenu.append(companyHeader);

            const companiesMenuItems = document.createElement('div');
            companiesMenuItems.setAttribute("id", "companiesMenuItems" + company.id);
            companiesMenuItems.setAttribute("class", "accordion-collapse collapse");
            companiesMenuItems.setAttribute("aria-labelledby", "companyHeader" + company.id);
            companiesMenuItems.setAttribute("data-bs-parent", "#companyMenu" + company.id);

            const companiesMenuItem = document.createElement('div');
            companiesMenuItem.setAttribute("id", "companiesMenuItem" + company.id);
            companiesMenuItem.setAttribute("class", "accordion-body");

            // Add Sensor Button
            const addSensor = document.createElement('div');
            addSensor.setAttribute("class", "accordion-item");
            addSensor.setAttribute("id", "addSensor" + company.id);

            const addSensorHeader = document.createElement('h2');
            addSensorHeader.setAttribute("class", "accordion-header");
            addSensorHeader.setAttribute("id", "#addSensorHeader" + company.id);

            const addSensorLink = document.createElement('button');
            addSensorLink.setAttribute("class", "btn btn-light m-2 text-nowrap");
            //addSensorLink.setAttribute("style", "text-align: left");
            //addSensorLink.setAttribute("value", company.id)
            addSensorLink.addEventListener("click", (e) => {
                window.location.href = "addSensor.php?userId="+company.id
            }, false);

            addSensorLink.innerHTML = '<span class="fas fa-plus-square"></span> Add Sensor';

            addSensorHeader.append(addSensorLink);
            addSensor.append(addSensorHeader);
            companiesMenuItem.append(addSensor);

            // Sensors Menu
            const sensorsMenu = document.createElement('div');
            sensorsMenu.setAttribute("class", "accordion-item");
            sensorsMenu.setAttribute("id", "sensorsMenu" + company.id);
            // Sensors Menu Header
            const sensorsHeader = document.createElement('h2');
            sensorsHeader.setAttribute("class", "accordion-header");
            sensorsHeader.setAttribute("id", "#sensorHeader" + company.id);
            // Sensors Menu Button
            const sensorLink = document.createElement('button');
            sensorLink.setAttribute("class", "accordion-button collapsed");
            sensorLink.setAttribute("type", "button");
            sensorLink.setAttribute("data-bs-toggle", "collapse");
            sensorLink.setAttribute("data-bs-target", "#sensorsMenuItems" + company.id);
            sensorLink.setAttribute("aria-expanded", "false");
            sensorLink.setAttribute("aria-controls", "sensorsMenuItems" + company.id);
            sensorLink.innerHTML = '<span class="fas fa-satellite-dish pe-1"></span> Sensors';
            // Adds Menu Button to the Header
            sensorsHeader.append(sensorLink);
            // Adds the Header to the Menu
            sensorsMenu.append(sensorsHeader);
            // Sensor Menu Items Group
            const sensorsMenuItems = document.createElement('div');
            sensorsMenuItems.setAttribute("id", "sensorsMenuItems" + company.id);
            sensorsMenuItems.setAttribute("class", "accordion-collapse collapse");
            sensorsMenuItems.setAttribute("aria-labelledby", "#sensorHeader" + company.id);
            sensorsMenuItems.setAttribute("data-bs-parent", "#sensorsMenu" + company.id);
            // Group of Menu Items
            const sensorsMenuGroup = document.createElement('div');
            sensorsMenuGroup.setAttribute("id", "sensorsMenuItem" + company.id);
            sensorsMenuGroup.setAttribute("class", "accordion-body");

            getApi("Sensors", "getUserSensors", "userId=" + company.id)
            .then(sensors => {

                sensors.forEach(sensor => {
                    // Sensor Menu Item
                    const sensorsMenuItem = document.createElement('div');
                    sensorsMenuItem.setAttribute("id", "sensorsMenuItem" + sensor.id);
                    sensorsMenuItem.setAttribute("class", "accordion-item d-flex justify-content-between");
                    // View Sensor Button
                    const menuLink = document.createElement('button');
                    menuLink.setAttribute("class", "btn btn-light text-nowrap");
                    menuLink.setAttribute("style", "text-align: left");
                    menuLink.setAttribute("value", company.id)
                    menuLink.addEventListener("click", (e) => {
                        document.cookie = "userId="+e.target.value;
                        window.location.href = "sensor.php?sensorId="+sensor.id
                    }, false);
                    menuLink.innerHTML = sensor.sensor_name;
                    // Edit Sensor Button
                    const editLink = document.createElement("button");
                    editLink.setAttribute("class", "btn btn-light text-nowrap align-item-end");
                    editLink.setAttribute("type", "button");
                    editLink.onclick = () => { window.location.href = "editSensor.php?sensorId=" +sensor.id }
                    editLink.innerHTML = `<span class="fas fa-pen-square"></span>`;
                    // Add Sensor Buttons to Menu Item
                    sensorsMenuItem.append(menuLink);
                    sensorsMenuItem.append(editLink);
                    // Add Menu Item to Sensor Group
                    sensorsMenuGroup.append(sensorsMenuItem);
                });

            })
            .catch(error => console.log(error));
            // Add Sensor Group to Company Specific Sensors Menu
            sensorsMenuItems.append(sensorsMenuGroup);
            // Add Sensors Menu to Company Specific Menu
            sensorsMenu.append(sensorsMenuItems);
            companiesMenuItem.append(sensorsMenu);

            companiesMenuItems.append(companiesMenuItem);
            companiesMenu.append(companiesMenuItems);
            menu.append(companiesMenu); 
        });        
    })
    .catch(error => console.log(error));
}
/**
 * Appends the sensors menu to the admin sidebar.
 */
const getSensorsMenu = (menu) => {
    getApi("Sensors", "getSensors")
    .then(sensors => {
        
        sensors.forEach(sensor => {
            const sensorsMenu = document.createElement('div');
            sensorsMenu.setAttribute("class", "accordion-item d-flex justify-content-between");
            sensorsMenu.setAttribute("id", "sensorMenu" + sensor.id);

           // const sensorHeader = document.createElement('h2');
           // sensorHeader.setAttribute("class", "accordion-header");
           // sensorHeader.setAttribute("id", "#sensorHeader" + sensor.id);

            const menuLink = document.createElement('button');
            menuLink.setAttribute("class", "btn btn-light text-nowrap");
            menuLink.setAttribute("id", "#sensorHeader" + sensor.id);
           // menuLink.setAttribute("style", "text-align: left");
            menuLink.onclick = () => { window.location.href = "sensor.php?sensorId=" + sensor.id };
            menuLink.innerHTML = sensor.sensor_name + `<em class="mx-1" style="font-size: 0.75em">(ID: ${sensor.id})</em>`;

            // Append edit
            /*
            <button onclick="window.location.href='addSensor.php'" class="btn btn-light m-2 text-nowrap" type="button">
                                        <span class="fas fa-plus-square"></span> Add Sensor
                                    </button>
            */
            const editLink = document.createElement("button");
            editLink.setAttribute("class", "btn btn-light text-nowrap align-item-end");
            editLink.setAttribute("type", "button");
            editLink.onclick = () => { window.location.href = "editSensor.php?sensorId=" +sensor.id }
            editLink.innerHTML = `<span class="fas fa-pen-square"></span>`;
            
            sensorsMenu.append(menuLink);
            sensorsMenu.append(editLink);

            //sensorHeader.append(document.createElement('br'));
            //sensorsMenu.append(sensorHeader);

            menu.append(sensorsMenu); 
        });        
    })
    .catch(error => console.log(error));
}


const addSensor = (sensorForm) => {

    //console.log(sensorForm);

    let formData = new FormData();
    formData.append("class", "Sensors");
    formData.append("method", "addSensor");
    formData.append("company", sensorForm.company.value);
    formData.append("sensorId", sensorForm.sensorId.value);
    formData.append("sensorName", sensorForm.sensorName.value);
    formData.append("sensorAttributes", sensorForm.sensorAttributes.value);
    
    postApi(formData);
    // Need to add some sort of confirmation
}
/**
 * Gets the chart(s) for a specific sensor, and can be used to get data points within a specific time frame.
 *
 * @param   {string}  startDateTime  Start date and time
 * @param   {string}  endDateTime  End date and time
 */
const getSensorChart = (startDateTime, endDateTime) => {
    // Sets the date picker values.
    getMinMaxDates();

    if (document.cookie.includes('; ') && document.cookie.includes('userId')) {
        const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];
        const urlParams = new URLSearchParams(window.location.search);
        
        getApi("Sensor", "getSensor", "userId=" + userId + "&sensorId=" + urlParams.get("sensorId"))
        .then(sensor => {

            return sensor;

        })
        .then(sensor => {

            return getApi("DataPoints", "getSensorDataTypes", "sensorId=" + urlParams.get("sensorId"))
            .then(dataTypes => {

                //console.log(dataTypes);
                sensor.dataTypes = dataTypes;
                return sensor;
                
            })
            .catch(error => console.log(error));

        })
        .then(sensor => {
            //console.log(sensor);
            startDateTime = (startDateTime === null) ? "null" : startDateTime + ":00";
            endDateTime = (endDateTime === null) ? "null" : endDateTime + ":59";
            
            return getApi("DataPoints", "getSensorDataPoints", "userId=" + userId + "&sensorId=" + urlParams.get("sensorId") + "&startDateTime=" + startDateTime + "&endDateTime=" + endDateTime)
            .then(dataPoints => {

                //console.log(dataPoints);

                sensor.dataTypes.forEach(dataType => {
                    
                    let chart = null;

                    let points = dataPoints.filter(function(dataPoint) {

                        if (dataType.data_type == "mA") {
                            // Need to change the labeling on the chart
                        }
                        else {
                            
                        }
                        return dataPoint.data_type == dataType.data_type;
                        
                        
                    });
                    // Create charts here
                    //console.log(points);
                    let chartId = sensor.id + "-" + dataType.data_type.replace(" ", "_");
                    chart = createChart(chartId);
                    // Title the Chart and Label the Chart's Axes
                    chart = chartData(chart, sensor.sensor_name + " Data", dataType.data_type);
                    
                    plotDataPoints(chart, points);
                    
                    buildChart(chart);

                });
                
            })
            .catch(error => console.log(error));
            
        })
        .catch(error => console.log(error));

    }

}
/**
 * Creates the HTML element for a chart and returns JSON of the chart data.
 *
 * @param   {string}  chartId  The ID of the the HTML element for the chart.
 *
 * @return  {json}  JSON of chart data.
 */
const createChart = (chartId) => {
    // Remove the old chart
    (document.getElementById(chartId)) ? document.getElementById(chartId).remove() : '';

    const charts = document.querySelector('#charts');
    const chart = document.createElement('canvas');
    chart.setAttribute("class", "col-lg-6 col-md");

    chart.id = chartId;
    charts.appendChild(chart);
    return chart;
}
/**
 * Sets chart specific information.
 * @returns  {json}  JSON of chart information.
 */
const chartData = (chart, title, verticalLabel) => {
    //console.log(verticalLabel);
    let chartData = {};
    chartData.canvas = chart;
    chartData.canvas.innerHTML = "";
    chartData.chartTitle = title;
    chartData.unit = verticalLabel;
    // Line Formatting
    //chartData.flow = {labelsData : []}
    chartData.datasets = [];
    chartData.labelsData = [];
    return chartData;
}
/**
 * Adds the data points to the chart, along with x-axis information and returns JSON of the chart data.
 *
 * @param   {json}  chart  JSON of chart data.
 * @param   {json}  dataPoints  JSON of data point information.
 *
 * @return  {json}  JSON of chart data.
 */
const plotDataPoints = (chart, dataPoints) => {

    let xAxislabels = []; // Time line
    let pointData = []; // Data points
    let lineShadingColor = []; // Line background color
    let lineColor = []; // Line color
    const pointColor = getRandomColor(); // Color for the line and background

    dataPoints.forEach(point => {

        const date = new Date(point.date_time);
        xAxislabels = [...xAxislabels, date.getHours() +":"+ ("0" + date.getMinutes()).slice(-2)];

        pointData = [...pointData, point.data_value];

        lineShadingColor = [...lineShadingColor, 'rgba(' + pointColor + ', 0.2)'];
        lineColor = [...lineColor, 'rgba(' + pointColor + ', 0.7)'];

    });

    /**
     * label: Colored key at the top of the chart and in the data point pop-up label.
     * data: Array of data points.
     * backgroundColor: Array of color for the background color of the data points.
     * borderColor: Array of color for the line color of the data points.
     * borderWidth: Width of the line for the data points.
     * fill: Show the background color for the line of the data points.
     */

    chart.datasets = [...chart.datasets, {
        label: dataPoints[0].data_type
        , data: pointData
        , backgroundColor: lineShadingColor
        , borderColor: lineColor
        , borderWidth: 1
        , fill: true
    }];

    chart.label = xAxislabels; // x-axis labels

    return chart;
}
/**
 * Adds property values to the chart.
 * @param {json}  chartData  JSON of chart information
 */
const buildChart = (chartData) => {

    //console.log(chartData.datasets);

    const myChart = new Chart(chartData.canvas, {
        type: 'line',
        data: {
            labels: chartData.label
            , datasets: chartData.datasets
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: chartData.chartTitle
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: chartData.unit
                    }
                }]
            }
            /*
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
            */
        }
    });

}

const getData = async () => {
    // Select form
    let searchForm = document.querySelector("#searchForm");
    // Convert form data to JSON
    const json = {};

    let formData = new FormData(searchForm);

    formData.forEach((entry, index) => {
        json[index] = entry;
    });

    json.startDateTime = searchForm.querySelector("#startDate").value + " "+ searchForm.querySelector("#startTime").value;
    json.endDateTime = searchForm.querySelector("#endDate").value + " "+ searchForm.querySelector("#startTime").value;

    getSensorChart(json.startDateTime, json.endDateTime);

}
/** REMOVE IF NOT NEEDED
const getFormFields = () => {
    // For creating the report
    const formFields = document.querySelector("#formFields");

    getApi("Reports", "getFormFields", null)
    .then(data => {
        //console.log(data);
        data.forEach(field => {

            if (field.Field !== "id" && field.Field !== "report_id" && field.Field !== "date_time") {
                
                const fieldCell = document.createElement('div');
                fieldCell.setAttribute("class", "col-md-3 form-group text-left flex-nowrap form-check-inline");
        
                const fieldRadioButton = document.createElement('input');
                fieldRadioButton.setAttribute("class", "form-control w-50");
                fieldRadioButton.setAttribute("type", "checkbox");
                fieldRadioButton.setAttribute("name", "formFields[]");
                fieldRadioButton.setAttribute("id", field.Field);
                fieldRadioButton.setAttribute("data-value", field.Field);
                fieldRadioButton.setAttribute("value", field.Field);
                fieldRadioButton.checked = true;
        
                const fieldLabel = document.createElement('label');
                fieldLabel.setAttribute("for", field.Field);
                fieldLabel.setAttribute("class", "form-check-label w-50 text-capitalize");
                fieldLabel.innerText = field.Field.replace(/_/g, " ");
    
                fieldCell.appendChild(fieldRadioButton);
                fieldCell.appendChild(fieldLabel);
                
                formFields.appendChild(fieldCell);

            }
            
        });

    })
    .catch(error => console.log(error));
}
*/
/**
 * Gets the minimum and maximum dates based on a specific sensor's data points.
 * Then assigns them to the appropriate HTML date elements.
 */
const getMinMaxDates = () => {

    if (document.cookie.includes('; ') && document.cookie.includes('userId')) {

        const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];
        const urlParams = new URLSearchParams(window.location.search);

        let searchButton = document.querySelector("#getData");
        searchButton.addEventListener("click", getData);

        getApi("DataPoints", "getMinMaxDates", "userId=" + userId + "&sensorId=" + urlParams.get('sensorId'))
        .then(data => {

            const startDate = document.querySelector("#startDate");
            const startTime = document.querySelector("#startTime");
            
            const endDate = document.querySelector("#endDate");
            const endTime = document.querySelector("#endTime");
            
            let minimumDate = new Date(data.minimum);
            startDate.value = minimumDate.toLocaleDateString("fr-CA");
            minimumDate.setFullYear(minimumDate.getFullYear() - 5);
            startDate.min = minimumDate.toLocaleDateString("fr-CA");
            startTime.value = ("0" + minimumDate.getHours()).slice(-2) + ":" + ("0" + minimumDate.getMinutes()).slice(-2);

            let maximumDate = new Date(data.maximum);
            endDate.value = maximumDate.toLocaleDateString("fr-CA");
            maximumDate.setFullYear(maximumDate.getFullYear() - 5);
            endDate.min = maximumDate.toLocaleDateString("fr-CA");
            endTime.value = ("0" + maximumDate.getHours()).slice(-2) + ":" + ("0" + maximumDate.getMinutes()).slice(-2);
        })
        .catch(error => console.log(error));

    }

}

const getRandomColor = () => {
    return (Math.floor(Math.random() * 200) + 1) + ", " + (Math.floor(Math.random() * 200) + 1) + ", " + (Math.floor(Math.random() * 200) + 1);
}



const postApi = async (formData) => {

    //let params = new URLSearchParams(formData);
    // console.log(formData);

    const url = "./api.php";

    return await fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        //console.log(response.json());
        //return response.json();
    })
    .then(data => data)
    .catch(error => console.log(error.toString()));

}

const getApi = async (className, methodName, parameters) => {

    formData = 'class=' + className + '&method=' + methodName + '&' + parameters;

    let url = "./api.php";

    return await fetch(url + "?" + formData)
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.log(error));

}

window.onload = init;