import Sidebar from "../modules/Sidebar.js";

const init = () => {

    let userType = document.cookie.match(new RegExp('userType=([^=;]+)'));

    const sidebarMenu = document.querySelector('#sidebarMenu');

    if (userType) {
        const sidebar = new Sidebar(sidebarMenu, userType[1]);
    }
    else {

        window.alert("System Timed Out");
        window.location.href = "/app/logout.php";
    }
}

window.onload = init;

const helpMenu = document.querySelector("#helpMenu");
const dashboardContent = document.querySelector("#dashboardContent");


const openHelpMenu = document.querySelector("#openHelpMenu");
const closeHelpMenu = document.querySelector("#closeHelpMenu");

openHelpMenu.addEventListener("click", event => {
    helpMenu.classList.add("showHelpMenu");
    dashboardContent.classList.add("contractDashboard");
    helpMenu.classList.remove("hideHelpMenu");
    dashboardContent.classList.remove("expandDashboard");
});

closeHelpMenu.addEventListener("click", event => {
    helpMenu.classList.add("hideHelpMenu");
    dashboardContent.classList.add("expandDashboard");
    helpMenu.classList.remove("showHelpMenu");
    dashboardContent.classList.remove("contractDashboard");
});

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