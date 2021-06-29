
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

    console.log(response);

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
    console.log(document.querySelector("form").elements);
});

