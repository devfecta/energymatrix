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
}

export default Services;