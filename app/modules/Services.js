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
        .then(json => json)
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

    createDropDown = (id, name, required, options) => {
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
        formElement.style.width = "auto";
        formElement.style.display = "inline-block";
        formElement.required = required;
        return formElement;
    }
}

export default Services;