/**
 * Company: DevFecta, LLC
 * Author: Kevin Kelm
 * Project Start Date: 2020-04-07
 */
class Services {

    constructor() {}

    postApi = async (formData) => {

        //let params = new URLSearchParams(formData);
        //console.log(formData);
    
        const url = "./api.php";
    
        return await fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            return response.json();
        })
        //.then(data => data)
        .catch(error => console.log(error.toString()));
    
    }
    
    getApi = async (className, methodName, parameters) => {

        let formData = 'class=' + className + '&method=' + methodName + '&' + parameters;
    
        let url = "./api.php";
    
        return await fetch(url + "?" + formData)
        .then(response => response.json())
        .catch(error => console.log(error));
    
    }

    deleteApi = async (formData) => {
    
        //let formData = 'class=' + className + '&method=' + methodName + '&' + parameters;
    
        let url = "./api.php";
    
        return await fetch(url, {
            method: 'DELETE',
            body: formData
        })
        .then(response => response.json())
        .then(json => json)
        .catch(error => console.log(error));
    
    }

    createTextBox = (type, id, name, maxlength, required) => {
        const formElement = document.createElement("input");
        formElement.setAttribute("type", type);
        formElement.setAttribute("id", id);
        formElement.setAttribute("name", name);
        formElement.setAttribute("class", "form-control");
        formElement.setAttribute("maxlength", maxlength);
        formElement.required = required;
        return formElement;
    }

    createDropDown = (id, name, options, required) => {
        const formElement = document.createElement("select");
        formElement.setAttribute("id", id);
        formElement.setAttribute("name", name);
        formElement.setAttribute("class", "form-control");
        formElement.required = required;

        options.forEach((option, value) => {
            let optionElement = document.createElement("option");
            optionElement.value = value;
            optionElement.innerHTML = option;
            formElement.append(optionElement);
        });

        return formElement;
    }

    createDateBox = (id, name, min, max, required) => {
        const formElement = document.createElement("input");
        formElement.setAttribute("type", "date");
        formElement.setAttribute("id", id);
        formElement.setAttribute("name", name);
        formElement.setAttribute("class", "form-control");
        formElement.setAttribute("min", min);
        formElement.setAttribute("max", max);
        formElement.setAttribute("value", min);
        formElement.style.width = "auto";
        formElement.style.display = "inline-block";
        formElement.required = required;
        return formElement;
    }

    createTimeBox = (id, name, min, max, required) => {
        const formElement = document.createElement("input");
        formElement.setAttribute("type", "time");
        formElement.setAttribute("id", id);
        formElement.setAttribute("name", name);
        formElement.setAttribute("class", "form-control");
        formElement.setAttribute("min", min);
        formElement.setAttribute("max", max);
        formElement.setAttribute("value", min);
        formElement.style.width = "auto";
        formElement.style.display = "inline-block";
        formElement.required = required;
        return formElement;
    }

    createSwitchCheckbox = (id, name, labelText, checked) => {

        const formElement = document.createElement("div");
        formElement.setAttribute("class", "form-check form-switch");

        const formCheckbox = document.createElement("input");
        formCheckbox.setAttribute("type", "checkbox");
        formCheckbox.setAttribute("id", id);
        formCheckbox.setAttribute("name", name);
        formCheckbox.setAttribute("class", "form-check-input");
        (checked) ? formCheckbox.setAttribute("checked", "checked") : formCheckbox.removeAttribute("checked");
        //formElement.style.width = "auto";
        //formElement.style.display = "inline-block";
        const formLabel = document.createElement("label");
        formLabel.setAttribute("for", id);
        formLabel.setAttribute("class", "form-check-label");
        formLabel.innerHTML = labelText;

        formElement.append(formCheckbox, formLabel);

        return formElement;
    }
    /**
     * Returns start and end date/time information for a trend.
     * @param {Date} currentDateTime 
     * @param {string} startDateTime 
     * @param {string} duration 
     * @returns {JSON}
     */
    getOperationalDuration(currentDateTime, startDateTime, duration) {

        const operationalDateTime = {
            currentDateTime: ""
            ,operationalStartDate: ""
            , operationalStartTime: ""
            , operationalStartDateTime: ""
            , operationalEndDate: ""
            , operationalEndTime: ""
            , operationalEndDateTime: ""
            , inRange: false
        };
        /*
        // OLD Way START
        let durationStartDateTime = new Date(startDateTime);

        //When changing the date it's better to change the milliseconds of time.
        durationStartDateTime.setFullYear(currentDateTime.getFullYear());
        durationStartDateTime.setMonth(currentDateTime.getMonth());
        durationStartDateTime.setDate(currentDateTime.getDate());
        
        durationStartDateTime.setTime(currentDateTime.getTime());
        
        // Looks to see if the current time is within a shift.
        let startRange = 0;
        while (startRange < 24) {

            let endRange = startRange + parseInt(duration)

            if (currentDateTime.getHours() >= startRange && currentDateTime.getHours() < endRange) {
                
                durationStartDateTime.setHours(startRange);

                break;
            }

            startRange += parseInt(duration);
        }
        

        let durationEndDateTime = new Date(durationStartDateTime);
        
        durationEndDateTime.setTime(durationEndDateTime.getTime() + parseInt(duration));
        / OLD Way END
        */
        
        // NEW Way START
        let durationEndDateTime = new Date(startDateTime);
        durationEndDateTime.setTime(currentDateTime.getTime());

        let durationStartDateTime = new Date(durationEndDateTime);
        
        durationStartDateTime.setTime(durationStartDateTime.getTime() - (parseInt(duration) * 60 * 60 * 1000));
        // NEW Way END
        
        console.log(durationStartDateTime, durationEndDateTime, duration);

        operationalDateTime.currentDateTime = currentDateTime.toLocaleDateString('fr-CA', {year: "numeric", month: "2-digit", day: "2-digit"});
        operationalDateTime.currentDateTime += " " + currentDateTime.toLocaleTimeString("en-US", {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"});
        
        operationalDateTime.operationalStartDate = durationStartDateTime.toLocaleDateString('fr-CA', {year: "numeric", month: "2-digit", day: "2-digit"});
        operationalDateTime.operationalStartTime = durationStartDateTime.toLocaleTimeString("en-US", {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"});
        
        operationalDateTime.operationalEndDate = durationEndDateTime.toLocaleDateString('fr-CA', {year: "numeric", month: "2-digit", day: "2-digit"});
        operationalDateTime.operationalEndTime = durationEndDateTime.toLocaleTimeString("en-US", {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"});

        operationalDateTime.operationalStartDateTime = operationalDateTime.operationalStartDate + " " + operationalDateTime.operationalStartTime;

        operationalDateTime.operationalEndDateTime = operationalDateTime.operationalEndDate + " " + operationalDateTime.operationalEndTime;
        
        //console.log("operationalDateTime", operationalDateTime);

        return operationalDateTime;
    }
}

export default Services;