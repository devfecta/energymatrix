class Sidebar {

    constructor() {}

    /**
     * Appends the companies menus to the admin sidebar.
     */
    getCompaniesMenu = (menu) => {

        getApi("Users", "getCompanies")
        .then(companies => {
            
            companies.forEach(company => {
                const companiesMenu = document.createElement('div');
                companiesMenu.setAttribute("class", "accordion-item");
                companiesMenu.setAttribute("id","companyMenu" + company.id);

                const companyHeader = document.createElement('h2');
                companyHeader.setAttribute("class", "accordion-header");
                companyHeader.setAttribute("id", "#companyHeader" + company.id);

                const companyLink = document.createElement('button');
                companyLink.setAttribute("class", "accordion-button collapsed");
                companyLink.setAttribute("type", "button");
                companyLink.setAttribute("data-bs-toggle", "collapse");
                companyLink.setAttribute("data-bs-target", "#companiesMenuItems" + company.id);
                companyLink.setAttribute("aria-expanded", "false");
                companyLink.setAttribute("aria-controls", "companiesMenuItems" + company.id);
                companyLink.innerHTML = company.company + ` <em class="mx-1" style="font-size: 0.75em"> (ID: ${company.id})</em>`;

                companyHeader.append(companyLink);
                companiesMenu.append(companyHeader);

                const companiesMenuItems = document.createElement('div');
                companiesMenuItems.setAttribute("id", "companiesMenuItems" + company.id);
                companiesMenuItems.setAttribute("class", "accordion-collapse collapse");
                companiesMenuItems.setAttribute("aria-labelledby", "companyHeader" + company.id);
                companiesMenuItems.setAttribute("data-bs-parent", "#companyMenu" + company.id);

                const companiesMenuItem = document.createElement('div');
                companiesMenuItem.setAttribute("id", "companiesMenuItem" + company.id);
                companiesMenuItem.setAttribute("class", "accordion-body");

                // Add Sensor Button
                const addSensor = document.createElement('div');
                addSensor.setAttribute("class", "accordion-item");
                addSensor.setAttribute("id", "addSensor" + company.id);

                const addSensorHeader = document.createElement('h2');
                addSensorHeader.setAttribute("class", "accordion-header");
                addSensorHeader.setAttribute("id", "#addSensorHeader" + company.id);

                const addSensorLink = document.createElement('button');
                addSensorLink.setAttribute("class", "btn btn-light m-2 text-nowrap");
                //addSensorLink.setAttribute("style", "text-align: left");
                //addSensorLink.setAttribute("value", company.id)
                addSensorLink.addEventListener("click", (e) => {
                    window.location.href = "addSensor.php?userId="+company.id
                }, false);

                addSensorLink.innerHTML = '<span class="fas fa-plus-square"></span> Add Sensor';

                addSensorHeader.append(addSensorLink);
                addSensor.append(addSensorHeader);
                companiesMenuItem.append(addSensor);

                // Sensors Menu
                const sensorsMenu = document.createElement('div');
                sensorsMenu.setAttribute("class", "accordion-item");
                sensorsMenu.setAttribute("id", "sensorsMenu" + company.id);
                // Sensors Menu Header
                const sensorsHeader = document.createElement('h2');
                sensorsHeader.setAttribute("class", "accordion-header");
                sensorsHeader.setAttribute("id", "#sensorHeader" + company.id);
                // Sensors Menu Button
                const sensorLink = document.createElement('button');
                sensorLink.setAttribute("class", "accordion-button collapsed");
                sensorLink.setAttribute("type", "button");
                sensorLink.setAttribute("data-bs-toggle", "collapse");
                sensorLink.setAttribute("data-bs-target", "#sensorsMenuItems" + company.id);
                sensorLink.setAttribute("aria-expanded", "false");
                sensorLink.setAttribute("aria-controls", "sensorsMenuItems" + company.id);
                sensorLink.innerHTML = '<span class="fas fa-satellite-dish pe-1"></span> Sensors';
                // Adds Menu Button to the Header
                sensorsHeader.append(sensorLink);
                // Adds the Header to the Menu
                sensorsMenu.append(sensorsHeader);
                // Sensor Menu Items Group
                const sensorsMenuItems = document.createElement('div');
                sensorsMenuItems.setAttribute("id", "sensorsMenuItems" + company.id);
                sensorsMenuItems.setAttribute("class", "accordion-collapse collapse");
                sensorsMenuItems.setAttribute("aria-labelledby", "#sensorHeader" + company.id);
                sensorsMenuItems.setAttribute("data-bs-parent", "#sensorsMenu" + company.id);
                // Group of Menu Items
                const sensorsMenuGroup = document.createElement('div');
                sensorsMenuGroup.setAttribute("id", "sensorsMenuItem" + company.id);
                sensorsMenuGroup.setAttribute("class", "accordion-body");

                getApi("Sensors", "getUserSensors", "userId=" + company.id)
                .then(sensors => {

                    sensors.forEach(sensor => {
                        // Sensor Menu Item
                        const sensorsMenuItem = document.createElement('div');
                        sensorsMenuItem.setAttribute("id", "sensorsMenuItem" + sensor.id);
                        sensorsMenuItem.setAttribute("class", "accordion-item d-flex justify-content-between");
                        // View Sensor Button
                        const menuLink = document.createElement('button');
                        menuLink.setAttribute("class", "btn btn-light text-nowrap");
                        menuLink.setAttribute("style", "text-align: left");
                        menuLink.setAttribute("value", company.id)
                        menuLink.addEventListener("click", (e) => {
                            document.cookie = "userId="+e.target.value;
                            window.location.href = "sensor.php?sensorId="+sensor.id
                        }, false);
                        menuLink.innerHTML = sensor.sensor_name;
                        // Edit Sensor Button
                        const editLink = document.createElement("button");
                        editLink.setAttribute("class", "btn btn-light text-nowrap align-item-end");
                        editLink.setAttribute("type", "button");
                        editLink.onclick = () => { window.location.href = "editSensor.php?sensorId=" +sensor.id }
                        editLink.innerHTML = `<span class="fas fa-pen-square"></span>`;
                        // Add Sensor Buttons to Menu Item
                        sensorsMenuItem.append(menuLink);
                        sensorsMenuItem.append(editLink);
                        // Add Menu Item to Sensor Group
                        sensorsMenuGroup.append(sensorsMenuItem);
                    });

                })
                .catch(error => console.log(error));
                // Add Sensor Group to Company Specific Sensors Menu
                sensorsMenuItems.append(sensorsMenuGroup);
                // Add Sensors Menu to Company Specific Menu
                sensorsMenu.append(sensorsMenuItems);
                companiesMenuItem.append(sensorsMenu);

                companiesMenuItems.append(companiesMenuItem);
                companiesMenu.append(companiesMenuItems);
                menu.append(companiesMenu); 
            });        
        })
        .catch(error => console.log(error));
    }
    /**
     * Adds menu items to the user's sidebar by creating HTML button elements for specific menu categories.
     */
    getUserSidebar = () => {
        // Logs out after idle for 1 hour.
        const userSensors = document.querySelector("#userSensors");

        if (document.cookie.includes('; ') && document.cookie.includes('userId')) {
            const userId = document.cookie.split('; ').find(c => c.startsWith('userId')).split('=')[1];

            getApi("Sensors", "getUserSensors", "userId=" + userId)
            .then(sensors => {

                //console.log(sensors);

                sensors.forEach(sensor => {

                    const menuLink = document.createElement('button');
                    menuLink.setAttribute("class", "btn btn-light text-nowrap");
                    menuLink.setAttribute("style", "text-align: left");
                    menuLink.onclick = () => {window.location.href = "sensor.php?sensorId="+sensor.id};
                    menuLink.innerHTML = sensor.sensor_name;

                    userSensors.append(menuLink);
                    userSensors.append(document.createElement('br'));
                    
                });

            })
            .catch(error => console.log(error));
        }
        else {
            alert("logging out");
            location.href = './logout.php';
        }
    }
}

export default Sidebar;