
import Trends from "../modules/Trends.js";

const trends = new Trends();

const url = new URLSearchParams(document.location.search);
const userId = url.get("userId");

const trendForm = document.querySelector("#trendForm");
/*
const companySensor = document.querySelector("#companySensor");
companySensor.addEventListener("change", (event) => {
    trends.getFormulas(event.target.options[event.target.options.selectedIndex].value);
});
*/
/**
 * Appends the inputs to the form for a selected formula.
 */
const trendFormulas = document.querySelector("#trendFormulas");
trendFormulas.addEventListener("change", (event) => {

    let formulaInputs = document.querySelector("#formulaInputs");

    let selectedValue = event.target.options[event.target.options.selectedIndex].value;

    formulaInputs.innerHTML = "";

    trends.getFormulaInputs(userId, selectedValue)
    .then(inputs => {
        inputs.forEach(input => {
            formulaInputs.append(input);
        });
    })
    .catch(e => console.error(e));

});
/**
 * Creates the options for the formulas dropdown menu.
 */
trends.getFormulas()
.then(response => {

    let optionElement = document.createElement("option");
    optionElement.setAttribute("value", "");
    optionElement.innerHTML = `Select a Formula`;
    trendFormulas.append(optionElement);

    response.forEach(option => {

        optionElement = document.createElement("option");
        optionElement.setAttribute("value", option.functionName);
        optionElement.innerHTML = `${option.displayName}`;
        trendFormulas.append(optionElement);

    });

})
.catch(e => console.error(e));

const addTrendButton = document.querySelector("#addTrendButton");
addTrendButton.addEventListener("click", (event) => {

    const trendFormElements = document.querySelector("form").elements;

    let formData = new FormData();
    formData.append("class", "Trends");
    formData.append("method", "insertCalculatedTrend");

    //console.log(document.querySelector("form").elements);
    formData.append("userId", userId);

    formData.append("trendName", trendFormElements.trendName.value);
    formData.append("trendFormula", trendFormElements.trendFormulas.value);

    const inputs = {
        "heatCapacity" : null
        , "averagingFactor" : null
        , "mAMin" : null
        , "mAMax" : null
        , "processMin" : null
        , "processMax" : null
        , "density" : null
        , "voltage" : null
        , "powerFactor" : null
        , "general" : {
            "value1" : {}
            , "value2" : {}
        }
    };

    

    switch (trendFormElements.trendFormulas.value) {
        case "chillerEfficiency":
            inputs.heatCapacity = trendFormElements.heatCapacity.value;
            break;
        case "current":
            inputs.averagingFactor = trendFormElements.averagingFactor.value;
            break;
        case "maConversion":
            inputs.mAMin = trendFormElements.mAMin.value;
            inputs.mAMax = trendFormElements.mAMax.value;
            inputs.processMin = trendFormElements.processMin.value;
            inputs.processMax = trendFormElements.processMax.value;
            break;
        case "massFlow":
            inputs.density = trendFormElements.density.value;
            break;
        case "power":
            inputs.voltage = trendFormElements.voltage.value;
            inputs.powerFactor = trendFormElements.powerFactor.value;
            break;
        case "addition":
        case "subtraction":
        case "multiplication":
        case "division":
        case "exponentiation":
            // Creates a general property in the inputs JSON object.
            Object.assign(inputs, { general : {} });

            if (trendFormElements.firstParameter.nextSibling && trendFormElements.firstParameter.nextSibling.querySelector("select").value) {
                Object.assign(inputs.general, { firstTrendParameter : trendFormElements.firstParameter.nextSibling.querySelector("select").value });
            }
            else if (trendFormElements.firstParameter.parentElement && trendFormElements.firstParameter.parentElement.querySelector("select")) {
                Object.assign(inputs.general, { firstSensorParameter : trendFormElements.firstParameter.parentElement.querySelector("select").value });
            }
            else {
                Object.assign(inputs.general, { firstParameter : trendFormElements.firstParameter.value });
            }

            if (trendFormElements.secondParameter.nextSibling && trendFormElements.secondParameter.nextSibling.querySelector("select").value) {
                Object.assign(inputs.general, { secondTrendParameter : trendFormElements.secondParameter.nextSibling.querySelector("select").value });
            }
            else if (trendFormElements.secondParameter.parentElement && trendFormElements.secondParameter.parentElement.querySelector("select")) {
                Object.assign(inputs.general, { secondSensorParameter : trendFormElements.secondParameter.parentElement.querySelector("select").value });
            }
            else {
                Object.assign(inputs.general, { secondParameter : trendFormElements.secondParameter.value });
            }
            /*
            Object.assign(inputs.general, { firstParameter : (trendFormElements.firstParameter.nextSibling && trendFormElements.firstParameter.nextSibling.querySelector("select").value) ? 
                trendFormElements.firstParameter.nextSibling.querySelector("select").value : trendFormElements.firstParameter.value });
            Object.assign(inputs.general, { secondParameter : (trendFormElements.secondParameter.nextSibling && trendFormElements.secondParameter.nextSibling.querySelector("select").value) ? 
                trendFormElements.secondParameter.nextSibling.querySelector("select").value : trendFormElements.secondParameter.value });
            */
            break;
        default:
            break;
    }

    formData.append("inputs", JSON.stringify(inputs));

    formData.append("sensorId", trendFormElements.companySensors.value);

    // Check to see if any trends are selected.
    let selectedTrends = [];
    // Gets all asscociated sensor and trend groups.
    const associatedSensors = document.querySelectorAll("#associatedSensor");
    // Loops through all associated sensor and trend groups.
    associatedSensors.forEach(associatedSensor => {
        // Gets all of the dropdown menus in the asscociated sensor and trend group.
        let associatedSensorSelects = associatedSensor.querySelectorAll("select");
        console.log(associatedSensorSelects);
        // Sets associated sensor and/or trend.
        if (associatedSensorSelects[0].value) {
            selectedTrends.push({
                "sensorId" : (associatedSensorSelects[0].value)
                , "trendId" : (associatedSensorSelects[1].value) ? associatedSensorSelects[1].value : null
            });
        }
    });

    //console.log(selectedTrends);
    
/*
    if (trendFormElements.formulaTrends[0].value) {

        let formulaTrends = trendFormElements.formulaTrends;
        
        formulaTrends.forEach(element => {
            if (element.value !== "") {
                selectedTrends.push(element.value)
                
            }
        });
        
    }

    console.log(trendFormElements.formulaTrends);
    
    trendFormElements.associatedSensors.forEach(sensor => {
        console.log(sensor.value);
    });
    console.log(trendFormElements.associatedSensors);
    */
    formData.append("associatedTrends", JSON.stringify(selectedTrends));
/*
    for(var pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
     }
*/
    trends.insertCalculatedTrend(formData)
    .then(trend => {
        //console.log(trend);
        
        if (trend) {
            document.querySelector("#message").classList.remove("alert-danger");
            document.querySelector("#message").classList.add("alert-success");
            document.querySelector("#message").innerHTML = "Trend Added";
            document.querySelectorAll('input[type="number"]').forEach(field => {field.value = ""});
            document.querySelectorAll('input[type="text"]').forEach(field => {field.value = ""});

            setInterval(() => {
                window.location.href = `./sensorTrends.php?sensorId=${trend.sensorId}&userId=${trend.userId}`;
            }, 1000);
        }
        else {
            document.querySelector("#message").classList.remove("alert-success");
            document.querySelector("#message").classList.add("alert-danger");
            document.querySelector("#message").innerHTML = "Trend Was Not Added";
        }
    })
    .catch(e => console.error(e));
  
    /*
    
    formData.append("company", sensorForm.company.value);
    formData.append("sensorId", sensorForm.sensorId.value);
    formData.append("sensorName", sensorForm.sensorName.value);
    */
});

