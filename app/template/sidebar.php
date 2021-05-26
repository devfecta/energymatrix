<nav class="col-md-3 col-lg-3 d-md-block bg-light sidebar collapse">

    <div class="position-sticky pt-3">
        <div class="nav flex-column">
            <div class="accordion" id="sidebarMenu">

                <?php if ((float)$_SESSION['type'] == 0) { ?>
                    <!-- User Sidebar -->
                    <!--
                    <div class="accordion-item" id="sidebarNav">
                        <h2 class="accordion-header" id="sensorsHeader">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sensorMenuItems" aria-expanded="false" aria-controls="sensorMenuItems">
                                <span class="fas fa-satellite-dish pe-1"></span> Sensors
                            </button>
                        </h2>
                        <div id="sensorMenuItems" class="accordion-collapse collapse" aria-labelledby="sensorsHeader" data-bs-parent="#sidebarNav">
                            <div id="userSensors" class="accordion-body p-0"></div>
                        </div>
                    </div>
                    -->
                    <!--
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="placeHolderHeader">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#placeHolderMenuItems" aria-expanded="false" aria-controls="placeHolderMenuItems">
                            Place Holder Menu
                        </button>
                        </h2>
                        <div id="placeHolderMenuItems" class="accordion-collapse collapse" aria-labelledby="placeHolderHeader" data-bs-parent="#sidebarNav">
                            <div id="placeHolderMenuItem" class="accordion-body">
                                Place Holder Menu Items
                            </div>
                        </div>
                    </div>
                    -->
                    <script>
                        //getUserSidebar();
                    </script>

                <?php } else { ?>

                    <!-- Admin Sidebar -->
                    <!--
                    <div class="accordion-item" id="companiesNav">
                        <h2 class="accordion-header" id="companiesHeader">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#companies" aria-expanded="false" aria-controls="companies">
                                <span class="fas fa-building pe-1"></span> Companies
                            </button>
                        </h2>
                        <div id="companies" class="accordion-collapse collapse" aria-labelledby="companiesHeader" data-bs-parent="#companiesNav">
                            
                            <div class="accordion-item" id="addCompanyMenuItem">
                                <h2 class="accordion-header" id="addCompanyHeader">
                                    <button onclick="window.location.href='register.php'" class="btn btn-light m-2 text-nowrap" type="button">
                                        <span class="fas fa-plus-square"></span> Add Company
                                    </button>
                                </h2>
                            </div>
                            
                            <div id="companiesMenu" class="accordion-body p-0"></div>

                        </div>
                    </div>
                    -->
                    <!-- REMOVED NOT NEEDED
                    <div class="accordion-item" id="sensorsNav">
                        <h2 class="accordion-header" id="sensorsHeader">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sensors" aria-expanded="false" aria-controls="sensors">
                                <span class="fas fa-satellite-dish pe-1"></span> Sensors
                            </button>
                        </h2>
                        <div id="sensors" class="accordion-collapse collapse" aria-labelledby="sensorsHeader" data-bs-parent="#sensorsNav">
                            
                            <div class="accordion-item" id="addSensorMenuItem">
                                <h2 class="accordion-header" id="addSensorHeader">
                                    <button onclick="window.location.href='addSensor.php'" class="btn btn-light m-2 text-nowrap" type="button">
                                        <span class="fas fa-plus-square"></span> Add Sensor
                                    </button>
                                </h2>
                            </div>
                            
                            <div id="sensorsMenu" class="accordion-body p-0"></div>

                        </div>
                    </div>
                    -->
                    
                    <!--
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="placeHolderHeader">
                            <button class="accordion-button collapsed" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#placeHolderMenuItems" 
                                aria-expanded="false" 
                                aria-controls="placeHolderMenuItems">
                                Place Holder Menu
                            </button>
                        </h2>
                        <div id="placeHolderMenuItems" 
                            class="accordion-collapse collapse" aria-labelledby="placeHolderHeader" data-bs-parent="#sidebarMenu">
                            <div id="placeHolderMenuItem" class="accordion-body">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="placeHolderHeader2">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#placeHolderMenuItems2" aria-expanded="false" aria-controls="placeHolderMenuItems2">
                                        Place Holder Menu2
                                    </button>
                                    </h2>
                                    <div id="placeHolderMenuItems2" class="accordion-collapse collapse" aria-labelledby="placeHolderHeader" data-bs-parent="#placeHolderMenuItem">
                                        <div id="placeHolderMenuItem2" class="accordion-body">
                                            Place Holder Menu Items2
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="placeHolderHeader3">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#placeHolderMenuItems3" aria-expanded="false" aria-controls="placeHolderMenuItems3">
                                        Place Holder Menu2
                                    </button>
                                    </h2>
                                    <div id="placeHolderMenuItems3" class="accordion-collapse collapse" aria-labelledby="placeHolderHeader" data-bs-parent="#placeHolderMenuItem">
                                        <div id="placeHolderMenuItem3" class="accordion-body">
                                            Place Holder Menu Items2
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    -->
                    <script>
                        //getAdminSidebar();
                        //const sidebar = new Sidebar();
                        //sidebar.getCompaniesMenu(document.querySelector("#companiesMenu"));
                    </script>

                <?php } ?>
            </div>
        </div>
    </div>
</nav>