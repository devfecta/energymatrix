import Services from "./Services.js";


class Users extends Services {
    constructor() {
        super();
    }

    deleteCompany = async (userId) => {
        let formData = new FormData();
        formData.append("class", "Users");
        formData.append("method", "deleteCompany");
        formData.append("userId", userId);

        return await this.postApi(formData)
        .then(response => response)
        .catch(e => console.log(e));
    }
}

export default Users;