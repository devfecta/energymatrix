
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
    .catch(e => console.log(e));

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
.catch(e => console.log(e));

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
    };

    switch (trendFormElements.trendFormulas.value) {
        case "chillerEfficiency":
            inputs.heatCapacity = trendFormElements.heatCapacity.value;
            //formData.append("heatCapacity", trendFormElements.heatCapacity.value);
            break;
        case "current":
            inputs.averagingFactor = trendFormElements.averagingFactor.value;
            //formData.append("averagingFactor", trendFormElements.averagingFactor.value);
            break;
        case "maConversion":
            inputs.mAMin = trendFormElements.mAMin.value;
            inputs.mAMax = trendFormElements.mAMax.value;
            inputs.processMin = trendFormElements.processMin.value;
            inputs.processMax = trendFormElements.processMax.value;
            //formData.append("mAMin", trendFormElements.mAMin.value);
            //formData.append("mAMax", trendFormElements.mAMax.value);
            //formData.append("processMin", trendFormElements.processMin.value);
            //formData.append("processMax", trendFormElements.processMax.value);
            break;
        case "massFlow":
            inputs.density = trendFormElements.density.value;
            //formData.append("density", trendFormElements.density.value);
            break;
        case "power":
            inputs.voltage = trendFormElements.voltage.value;
            inputs.powerFactor = trendFormElements.powerFactor.value;
            //formData.append("voltage", trendFormElements.voltage.value);
            //formData.append("powerFactor", trendFormElements.powerFactor.value);
            break;
        default:
            break;
    }

    formData.append("inputs", JSON.stringify(inputs));

    formData.append("sensorId", trendFormElements.companySensors.value);


    // Check to see if any trends are selected.
    let selectedTrends = [];

    if (trendFormElements.formulaTrends[0].value) {

        let formulaTrends = trendFormElements.formulaTrends;
        
        formulaTrends.forEach(element => {
            if (element.value !== "") {
                selectedTrends.push(element.value)
                
            }
        });
        
    }

    formData.append("associatedTrends", JSON.stringify(selectedTrends));

    trends.insertCalculatedTrend(formData)
    .then(trend => {
        console.log(trend);
    })
    .catch(e => console.log(e));

    
    /*
    
    formData.append("company", sensorForm.company.value);
    formData.append("sensorId", sensorForm.sensorId.value);
    formData.append("sensorName", sensorForm.sensorName.value);
    */
});

