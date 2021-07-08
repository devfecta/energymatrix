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
     * Creates the Add Trend button.
     *
     * @return  {HTMLElement}
     */
     getAddTrendButton = (companyId) => {
        const menuButton = document.createElement("div");
        menuButton.setAttribute("class", "accordion-item");
        menuButton.setAttribute("id","addTrendButton");

        const addButton = document.createElement("button");
        addButton.setAttribute("type", "button");
        addButton.setAttribute("class", "btn btn-light m-2 text-nowrap");
        addButton.setAttribute("value", companyId);
        addButton.addEventListener("click", (event) => {
            window.location.href = "trendAdd.php?userId=" + event.target.value
        }, false);
        addButton.innerHTML = '<span class="fas fa-plus-square"></span> Add Trend';

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

        let userType = 0;
        if (document.cookie.includes('; ') && document.cookie.includes('userType')) {
            userType = document.cookie.split('; ').find(c => c.startsWith('userType')).split('=')[1];
        }

        let menuItem = {
            "parentId" : "copmaniesButton"
            , "subMenuId" : "companies"
            , "buttonTitle" : ""
            , "buttonText" : '<span class="fas fa-building pe-1"></span> Companies'
            , "buttonValue" : ""
            , "buttonClick" : function (event) {}
        };
        // Creates the Companies button
        let companiesMenu = this.getMenuItem(menuItem);
        // Create the companies sub-menu and adds the Add Company button
        let companiesSubMenu = this.getSubMenuItem(menuItem);
        companiesSubMenu.append(this.getAddCompanyButton());

        this.getApi("Users", "getCompanies")
        .then(companies => {
            // Creates the list of companies and adds the Add Sensor and Add Trend buttons
            companies.forEach(company => {

                menuItem = {
                    "parentId" : "company" + company.id
                    , "subMenuId" : "companyOptions" + company.id
                    , "buttonTitle" : ""
                    , "buttonText" : company.company + ` <em class="mx-1" style="font-size: 0.75em"> (ID: ${company.id})</em>`
                    , "buttonValue" : ""
                    , "buttonClick" : function (event) {}
                };
                // Company Menu
                let companyMenu = this.getMenuItem(menuItem);
                // Company Sub Menu
                let companySubMenu = this.getSubMenuItem(menuItem);
                // Append Add Sensor Button
                companySubMenu.append(this.getAddSensorButton(company.id));
                // Append Add Tremd Button
                companySubMenu.append(this.getAddTrendButton(company.id));

                companySubMenu.append(this.getSensorMenu(company.id, userType));

                // Appends Sub Menu Items
                companyMenu.append(companySubMenu);
                // Appends to Companies Sub Menu
                companiesSubMenu.append(companyMenu);
                
                /*
                let itemSub = this.getSubMenuItem(addSensorMenuItem);
                // Add Sensor Button
                itemSub.append(this.getAddSensorButton(company.id));
                // Add Trend Button
                itemSub.append(this.getAddTrendButton(company.id));

                //item.getSensorsMenu(company.id)

                //item.querySelector("button");
                //item.addEventListener();
                
                let sensorsMenuItem = this.getSensorMenuList(company.id, userType);

                itemSub.append(sensorsMenuItem);
                

                item.append(itemSub);
        
                subMenu.append(item);
                */
                
            });

            companiesMenu.append(companiesSubMenu);
        })
        .catch(error => console.log(error));

        return companiesMenu;
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

                companyMenu.append(this.getTrendsMenu(company.id));

                console.log(companyMenu);

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
    getSensorsMenuOLD = (companyId) => {
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
            // Appends Add Sensor Button
            menu.append(this.getAddSensorButton(companyId));
            // Appends Add Trend Button
            menu.append(this.getAddTrendButton(companyId));
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
     * Creates the trends menu items for specific company menu items.
     *
     * @param   {int}  companyId
     *
     * @return  {HTMLElement}
     */
     getTrendsMenu = (companyId) => {
        let userType = 0;
        if (document.cookie.includes('; ') && document.cookie.includes('userType')) {
            userType = document.cookie.split('; ').find(c => c.startsWith('userType')).split('=')[1];
        }

        // Creates the sub-menu area for the add trend button and list of trends.
        const menu = document.createElement("div");
        menu.setAttribute("id","trendsMenuItems" + companyId);
        if (userType > 0) {
            menu.setAttribute("class", "accordion-collapse border-0 collapse");
            menu.setAttribute("aria-labelledby", "companyMenu" + companyId);
            menu.setAttribute("data-bs-parent", "#companyMenu" + companyId);
            menu.append(this.getAddTrendButton(companyId));
        }
        else { }

        const menuButton = document.createElement("div");
        menuButton.setAttribute("class", "accordion-item");
        menuButton.setAttribute("id","trendsButton" + companyId);

        const trendsButton = document.createElement("button");
        trendsButton.setAttribute("type", "button");
        trendsButton.setAttribute("class", "accordion-button border-0 collapsed");
        trendsButton.setAttribute("data-bs-toggle", "collapse");
        trendsButton.setAttribute("data-bs-target", "#trends" + companyId);
        trendsButton.setAttribute("aria-expanded", "false");
        trendsButton.setAttribute("aria-controls", "trends" + companyId);
        trendsButton.innerHTML = '<span class="fas fa-chart-line pe-1"></span> Trends';

        menuButton.append(trendsButton);
        //menuButton.append(this.getTrendMenuList(companyId, userType));

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
    getSensorMenu = (companyId, userType) => {

        let menuItem = {
            "parentId" : "sensorsButton" + companyId
            , "subMenuId" : "sensors" + companyId
            , "buttonTitle" : ""
            , "buttonText" : '<span class="fas fa-satellite-dish pe-1"></span> Sensors'
            , "buttonValue" : ""
            , "buttonClick" : function (event) {}
        };
        // Creates the Sensors button
        let sensorsMenu = this.getMenuItem(menuItem);

        let sensorsSubMenu = this.getSubMenuItem(menuItem);

        this.getApi("Sensors", "getUserSensors", "userId=" + companyId)
        .then(sensors => {
            sensors.forEach(sensor => {

                menuItem = {
                    "parentId" : "sensor" + sensor.sensorId
                    , "subMenuId" : "sensorOptions" + sensor.sensorId
                    , "buttonTitle" : ""
                    , "buttonText" : sensor.sensor_name + ` <em class="mx-1" style="font-size: 0.75em"> (ID: ${sensor.sensorId})</em>`
                    , "buttonValue" : ""
                    , "buttonClick" : function (event) {}
                };

                let sensorMenu = this.getMenuItem(menuItem);

                let sensorSubMenu = this.getSubMenuItem(menuItem);

                let subMenuItem = {
                    "parentId" : "sensor" + sensor.sensorId
                    , "subMenuId" : "sensorView" + sensor.sensorId
                    , "buttonTitle" : "View Sensor"
                    , "buttonText" : `View <em class="mx-1" style="font-size: 0.75em"> (ID: ${sensor.sensorId})</em>`
                    , "buttonValue" : companyId
                    , "buttonClick" : function (event) {
                        document.cookie = "userId=" + event.target.value;
                        window.location.href = "sensor.php?sensorId=" + sensor.sensorId;
                    }
                };
                sensorSubMenu.append(this.getMenuItem(subMenuItem));

                subMenuItem = {
                    "parentId" : "sensor" + sensor.sensorId
                    , "subMenuId" : "sensorEdit" + sensor.sensorId
                    , "buttonTitle" : "Edit Sensor"
                    , "buttonText" : `Edit <span class="fas fa-pen-square"></span>`
                    , "buttonValue" : ""
                    , "buttonClick" : function (event) {
                        window.location.href = "sensorEdit.php?sensorId=" + sensor.sensorId + "&userId=" + companyId
                    }
                };
                sensorSubMenu.append(this.getMenuItem(subMenuItem));

                subMenuItem = {
                    "parentId" : "sensor" + sensor.sensorId
                    , "subMenuId" : "sensorEdit" + sensor.sensorId
                    , "buttonTitle" : "View Sensor Trends"
                    , "buttonText" : `Sensor Trends <span class="fas fa-chart-line"></span>`
                    , "buttonValue" : ""
                    , "buttonClick" : function (event) {
                        window.location.href = "sensorTrends.php?sensorId=" + sensor.sensorId + "&userId=" + companyId
                    }
                };
                sensorSubMenu.append(this.getMenuItem(subMenuItem));

                sensorMenu.append(sensorSubMenu);
                /* Only needed for a sub menu for a sensor
                let sensorSubMenu = this.getSubMenuItem(menuItem);
                sensorsSubMenu.append();
                */
                sensorsSubMenu.append(sensorMenu);

            });
        })
        .catch(error => console.log(error));
        
        sensorsMenu.append(sensorsSubMenu);

        return sensorsMenu;


        const menu = document.createElement("div");
        menu.setAttribute("id","sensors" + companyId);
        menu.setAttribute("class", "accordion-collapse border-0 collapse");
        menu.setAttribute("aria-labelledby", "sensorsButton" + companyId);
        menu.setAttribute("data-bs-parent", "#sensorsButton" + companyId);

        this.getApi("Sensors", "getUserSensors", "userId=" + companyId)
        .then(sensors => {
            
            sensors.forEach(sensor => {
                //console.log(sensor);
                // Sensor Menu Item
                const sensorsMenuItem = document.createElement('div');
                sensorsMenuItem.setAttribute("id", "sensorsMenuItem" + sensor.sensorId);
                sensorsMenuItem.setAttribute("class", "accordion-item d-flex justify-content-end");
                // View Sensor Button
                const menuLink = document.createElement('button');
                menuLink.setAttribute("class", "btn btn-light text-nowrap");
                menuLink.setAttribute("style", "text-align: left");
                menuLink.setAttribute("value", companyId)
                menuLink.addEventListener("click", (e) => {
                    document.cookie = "userId=" + e.target.value;
                    window.location.href = "sensor.php?sensorId=" + sensor.sensorId;
                }, false);
                menuLink.innerHTML = sensor.sensor_name;
                // Edit Sensor Button
                const editButton = document.createElement("button");
                editButton.setAttribute("class", "btn btn-light text-nowrap align-item-end");
                editButton.setAttribute("type", "button");
                editButton.setAttribute("title", "Edit Sensor");
                editButton.onclick = () => { window.location.href = "sensorEdit.php?sensorId=" + sensor.sensorId + "&userId=" + companyId }
                editButton.innerHTML = `<span class="fas fa-pen-square"></span>`;
                // Sensor Trends Button
                const trendsButton = document.createElement("button");
                trendsButton.setAttribute("class", "btn btn-light text-nowrap align-item-end");
                trendsButton.setAttribute("type", "button");
                trendsButton.setAttribute("title", "View Sensor Trends");
                trendsButton.onclick = () => { window.location.href = "sensorTrends.php?sensorId=" + sensor.sensorId + "&userId=" + companyId }
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
     * Creates a list of trends for a specific company's menu item.
     *
     * @param   {int}  companyId
     *
     * @return  {HTMLElement}
     */
     getTrendMenuList = (companyId, userType) => {

        const menu = document.createElement("div");
        menu.setAttribute("id","trends" + companyId);
        menu.setAttribute("class", "accordion-collapse border-0 collapse");
        menu.setAttribute("aria-labelledby", "trendsButton" + companyId);
        menu.setAttribute("data-bs-parent", "#trendsButton" + companyId);

        this.getApi("trends", "getUserTrends", "userId=" + companyId)
        .then(sensors => {
            
            sensors.forEach(sensor => {
                // Sensor Menu Item
                const sensorsMenuItem = document.createElement('div');
                sensorsMenuItem.setAttribute("id", "trendsMenuItem" + sensor.sensorId);
                sensorsMenuItem.setAttribute("class", "accordion-item d-flex justify-content-end");
                // View Sensor Button
                const menuLink = document.createElement('button');
                menuLink.setAttribute("class", "btn btn-light text-nowrap");
                menuLink.setAttribute("style", "text-align: left");
                menuLink.setAttribute("value", companyId)
                menuLink.addEventListener("click", (e) => {
                    document.cookie = "userId=" + e.target.value;
                    window.location.href = "trends.php?trendId=" + sensor.sensorId
                }, false);
                menuLink.innerHTML = sensor.sensor_name;
                // Edit Sensor Button
                const editButton = document.createElement("button");
                editButton.setAttribute("class", "btn btn-light text-nowrap align-item-end");
                editButton.setAttribute("type", "button");
                editButton.setAttribute("title", "Edit Trend");
                editButton.onclick = () => { window.location.href = "trendEdit.php?trendId=" + sensor.sensorId + "&userId=" + companyId }
                editButton.innerHTML = `<span class="fas fa-pen-square"></span>`;
                /*
                // Sensor Trends Button
                const trendsButton = document.createElement("button");
                trendsButton.setAttribute("class", "btn btn-light text-nowrap align-item-end");
                trendsButton.setAttribute("type", "button");
                trendsButton.setAttribute("title", "View Sensor Trends");
                trendsButton.onclick = () => { window.location.href = "sensorTrends.php?sensorId=" + sensor.sensorId + "&userId=" + companyId }
                trendsButton.innerHTML = `<span class="fas fa-chart-line"></span>`;
                */
                // Add Sensor Buttons to Menu Item
                sensorsMenuItem.append(menuLink);
                //sensorsMenuItem.append(trendsButton);
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




    getMenuItem = (menuItems) => {
        /*
            menuItems.parentId
            menuItems.subMenuId
            menuItems.buttonValue
        */
        let menu = document.createElement("div")
        menu.setAttribute("id", menuItems.parentId);
        menu.setAttribute("class", "accordian-item");

        let menuButton = document.createElement("button");
        menuButton.setAttribute("class", "accordian-button btn btn-light m-2 text-nowrap border-0 collapsed");
        menuButton.setAttribute("data-bs-toggle", "collapse");
        menuButton.setAttribute("data-bs-target", "#" + menuItems.subMenuId);
        menuButton.setAttribute("aria-controls", menuItems.subMenuId);
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("value", menuItems.buttonValue);
        menuButton.innerHTML = menuItems.buttonText;
        menuButton.addEventListener("click", menuItems.buttonClick, false);

        menu.append(menuButton);

        return menu;

    }

    // Append
    getSubMenuItem = (menuItem) => {

        /*
            menuItems.subMenuId
            menuItems.parentId
        */

        let subMenu = HTMLElement;

        subMenu = document.createElement("div");
        subMenu.setAttribute("id", menuItem.subMenuId);
        subMenu.setAttribute("class", "accordian-collapse collapse");
        subMenu.setAttribute("aria-labelledby", menuItem.parentId);
        subMenu.setAttribute("data-bs-parent", "#" + menuItem.parentId);
        /*
        if (menuItem.value) {
            subMenu.innerHTML = menuItem.value;
        }
        else {
            // Append submenu later
        }
        */
        /*
        menuItems.forEach(item => {
            
        });
        */
        return subMenu;
    }
}

export default Sidebar;