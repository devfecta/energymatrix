class Services {

    constructor() {}

    postApi = (formData) => {

        //let params = new URLSearchParams(formData);
        // console.log(formData);
    
        const url = "./api.php";
    
        return fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log(response.text());
            return response.json();
        })
        .then(data => data)
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
}

export default Services;