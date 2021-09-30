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
}

export default Services;