import Services from "./Services.js";

class Sidebar extends Services {

    constructor(sidebarMenu, userType) {
        // Brings in the extended Service class.
        super();
        // Dashboard Button
        let menuButton = document.createElement("div");
        menuButton.setAttribute("class", "accordion-item");
        menuButton.setAttribute("id","dashboardButton");

        const dashboardButton = document.createElement("button");
        dashboardButton.setAttribute("type", "button");
        dashboardButton.setAttribute("class", "btn btn-light m-2 text-nowrap");
        dashboardButton.addEventListener("click", (event) => {
            window.location.href = "index.php"
        }, false);
        dashboardButton.innerHTML = '<span class="fas fa-home"></span> Dashboard';

        menuButton.append(dashboardButton);
        sidebarMenu.append(menuButton);
        
        if (userType > 0) {
            this.getAdminSidebar(sidebarMenu);
        }
        else {
            this.getUserSidebar(sidebarMenu, userType);
        }

        // Logout Button
        menuButton = document.createElement("div");
        menuButton.setAttribute("class", "accordion-item");
        menuButton.setAttribute("id","logoutButton");

        const logoutButton = document.createElement("button");
        logoutButton.setAttribute("type", "button");
        logoutButton.setAttribute("class", "btn btn-light m-2 text-nowrap");
        logoutButton.addEventListener("click", (event) => {
            window.location.href = "logout.php"
        }, false);
        logoutButton.innerHTML = '<span class="fas fa-sign-out-alt"></span> Logout';

        menuButton.append(logoutButton);
        sidebarMenu.append(menuButton);
    }
    /**
     * Creates the Add Company button.
     *
     * @return  {HTMLElement}
     */
    getAddCompanyButton = () => {
        const menuButton = document.createElement("div");
        menuButton.setAttribute("class", "accordion-item");
        menuButton.setAttribute("id","addCompanyButton");

        const addCompanyButton = document.createElement("button");
        addCompanyButton.setAttribute("type", "button");
        addCompanyButton.setAttribute("class", "btn btn-light m-2 text-nowrap");
        addCompanyButton.addEventListener("click", (event) => {
            window.location.href = "register.php"
        }, false);
        addCompanyButton.innerHTML = '<span class="fas fa-plus-square"></span> Add Company';

        menuButton.append(addCompanyButton);

        return menuButton;
    }
    /**
     * Creates the Add Sensor button.
     *
     * @return  {HTMLElement}
     */
     getAddSensorButton = (companyId) => {
        const menuButton = document.createElement("div");
        menuButton.setAttribute("class", "accordion-item");
        menuButton.setAttribute("id","addSensorButton");

        const addButton = document.createElement("button");
        addButton.setAttribute("type", "button");
        addButton.setAttribute("class", "btn btn-light m-2 text-nowrap");
        addButton.setAttribute("value", companyId);
        addButton.addEventListener("click", (event) => {
            window.location.href = "sensorAdd.php?companyId=" + event.target.value
        }, false);
        addButton.innerHTML = '<span class="fas fa-plus-square"></span> Add Sensor';

        menuButton.append(addButton);

        return menuButton;
    }
    /**
     * Appends the admin sidebar to the sidebar in the sidebar.php file.
     *
     * @param   {HTMLElement}  sidebarMenu
     */
    getAdminSidebar = (sidebarMenu) => {
        sidebarMenu.append(this.getCompaniesMenu());
    }
    /**
     * Creates the Companies sidebar menu item.
     *
     * @return  {HTMLElement}
     */
    getCompaniesMenu = () => {
        const menuButton = document.createElement("div");
        menuButton.setAttribute("class", "accordion-item");
        menuButton.setAttribute("id","companiesButton");

        const companiesButton = document.createElement("button");
        companiesButton.setAttribute("type", "button");
        companiesButton.setAttribute("class", "accordion-button border-0 collapsed");
        companiesButton.setAttribute("data-bs-toggle", "collapse");
        companiesButton.setAttribute("data-bs-target", "#companies");
        companiesButton.setAttribute("aria-expanded", "false");
        companiesButton.setAttribute("aria-controls", "companies");
        companiesButton.innerHTML = '<span class="fas fa-building pe-1"></span> Companies';
        // Appends the Companies button.
        menuButton.append(companiesButton);
        // Append the whole menuList to the companies button.
        menuButton.append(this.getCompanyMenuList());

        return menuButton;
    }
    /**
     * Appends the list of companies to the companies menu in the admin sidebar.
     * 
     * @return  {HTMLElement}
     */
    getCompanyMenuList = () => {

        // Creates the sub-menu area for the add companies button and list of companies.
        const menu = document.createElement("div");
        menu.setAttribute("id","companies");
        menu.setAttribute("class", "accordion-collapse border-0 collapse");
        menu.setAttribute("aria-labelledby", "companiesButton");
        menu.setAttribute("data-bs-parent", "#companiesButton");
        // Appends the Add Company button.
        menu.append(this.getAddCompanyButton());

        this.getApi("Users", "getCompanies")
        .then(companies => {
            companies.forEach(company => {
                // Company menu item.
                const companyMenu = document.createElement('div');
                companyMenu.setAttribute("class", "accordion-item");
                companyMenu.setAttribute("id","companyMenu" + company.id);
                // Company button with the company name.
                const companyButton = document.createElement('button');
                companyButton.setAttribute("class", "accordion-button border-0 collapsed");
                companyButton.setAttribute("type", "button");
                companyButton.setAttribute("data-bs-toggle", "collapse");
                companyButton.setAttribute("data-bs-target", "#sensorsMenuItems" + company.id);
                companyButton.setAttribute("aria-expanded", "false");
                companyButton.setAttribute("aria-controls", "sensorsMenuItems" + company.id);
                companyButton.innerHTML = company.company + ` <em class="mx-1" style="font-size: 0.75em"> (ID: ${company.id})</em>`;
                // Appends the company button with the company name.                
                companyMenu.append(companyButton);
                
                companyMenu.append(this.getSensorsMenu(company.id));

                menu.append(companyMenu);
            });
            
        })
        .catch(error => console.log(error));

        return menu;
    }
    /**
     * Creates the sensor menu items for specific company menu items.
     *
     * @param   {int}  companyId
     *
     * @return  {HTMLElement}
     */
    getSensorsMenu = (companyId) => {
        let userType = 0;
        if (document.cookie.includes('; ') && document.cookie.includes('userType')) {
            userType = document.cookie.split('; ').find(c => c.startsWith('userType')).split('=')[1];
        }

        
        // Creates the sub-menu area for the add sensor button and list of sensors.
        const menu = document.createElement("div");
        menu.setAttribute("id","sensorsMenuItems" + companyId);
        if (userType > 0) {
            menu.setAttribute("class", "accordion-collapse border-0 collapse");
            menu.setAttribute("aria-labelledby", "companyMenu" + companyId);
            menu.setAttribute("data-bs-parent", "#companyMenu" + companyId);
            menu.append(this.getAddSensorButton(companyId));
        }
        else { }

        const menuButton = document.createElement("div");
        menuButton.setAttribute("class", "accordion-item");
        menuButton.setAttribute("id","sensorsButton" + companyId);

        const sensorsButton = document.createElement("button");
        sensorsButton.setAttribute("type", "button");
        sensorsButton.setAttribute("class", "accordion-button border-0 collapsed");
        sensorsButton.setAttribute("data-bs-toggle", "collapse");
        sensorsButton.setAttribute("data-bs-target", "#sensors" + companyId);
        sensorsButton.setAttribute("aria-expanded", "false");
        sensorsButton.setAttribute("aria-controls", "sensors" + companyId);
        sensorsButton.innerHTML = '<span class="fas fa-satellite-dish pe-1"></span> Sensors';

        menuButton.append(sensorsButton);
        menuButton.append(this.getSensorMenuList(companyId, userType));

        menu.append(menuButton);

        return menu;
    }
    /**
     * Creates a list of sensors for a specific company's menu item.
     *
     * @param   {int}  companyId
     *
     * @return  {HTMLElement}
     */
    getSensorMenuList = (companyId, userType) => {

        const menu = document.createElement("div");
        menu.setAttribute("id","sensors" + companyId);
        menu.setAttribute("class", "accordion-collapse border-0 collapse");
        menu.setAttribute("aria-labelledby", "sensorsButton" + companyId);
        menu.setAttribute("data-bs-parent", "#sensorsButton" + companyId);

        this.getApi("Sensors", "getUserSensors", "userId=" + companyId)
        .then(sensors => {
            
            sensors.forEach(sensor => {
                // Sensor Menu Item
                const sensorsMenuItem = document.createElement('div');
                sensorsMenuItem.setAttribute("id", "sensorsMenuItem" + sensor.id);
                sensorsMenuItem.setAttribute("class", "accordion-item d-flex justify-content-end");
                // View Sensor Button
                const menuLink = document.createElement('button');
                menuLink.setAttribute("class", "btn btn-light text-nowrap");
                menuLink.setAttribute("style", "text-align: left");
                menuLink.setAttribute("value", companyId)
                menuLink.addEventListener("click", (e) => {
                    document.cookie = "userId=" + e.target.value;
                    window.location.href = "sensor.php?sensorId="+sensor.id
                }, false);
                menuLink.innerHTML = sensor.sensor_name;
                // Edit Sensor Button
                const editButton = document.createElement("button");
                editButton.setAttribute("class", "btn btn-light text-nowrap align-item-end");
                editButton.setAttribute("type", "button");
                editButton.setAttribute("title", "Edit Sensor");
                editButton.onclick = () => { window.location.href = "sensorEdit.php?sensorId=" + sensor.id + "&userId=" + companyId }
                editButton.innerHTML = `<span class="fas fa-pen-square"></span>`;
                // Sensor Trends Button
                const trendsButton = document.createElement("button");
                trendsButton.setAttribute("class", "btn btn-light text-nowrap align-item-end");
                trendsButton.setAttribute("type", "button");
                trendsButton.setAttribute("title", "View Sensor Trends");
                trendsButton.onclick = () => { window.location.href = "sensorTrends.php?sensorId=" + sensor.id + "&userId=" + companyId }
                trendsButton.innerHTML = `<span class="fas fa-chart-line"></span>`;
                // Add Sensor Buttons to Menu Item
                sensorsMenuItem.append(menuLink);
                sensorsMenuItem.append(trendsButton);
                if (userType > 0) {
                    sensorsMenuItem.append(editButton);
                }
                else {}
                
                // Add Menu Item to Sensor Group
                menu.append(sensorsMenuItem);
            });

        })
        .catch(error => console.log(error));

        return menu;
    }

    /**
     * Adds menu items to the user's sidebar by creating HTML button elements for specific menu categories.
     */
    getUserSidebar = (menu) => {
        // Logs out after idle for 1 hour.
        if (document.cookie.includes('; ') && document.cookie.includes('userId')) {
            const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];

            menu.append(this.getSensorsMenu(userId));

            return menu;
        }
        else {
            alert("logging out");
            location.href = './logout.php';
        }
        
    }
}

export default Sidebar;