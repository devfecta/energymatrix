

        <nav class="sidebar bg-light vh-100 d-flex flex-column align-items-start" style="overflow-y: auto; position: fixed; box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);">
            
            <button class="btn btn-light m-2 border-0 collapsed" 
                    data-bs-toggle="collapse" data-bs-target="#navSidebar" aria-controls="navItems" aria-expanded="false" 
                    value=""><span class="fas fa-bars"></span></button>
            
            <div id="navSidebar" aria-labelledby="navSidebar" data-bs-parent="#navSidebar" class="collapse pt-1 w-100">

                <div class="nav flex-column">
                    <div class="accordion" id="sidebarMenu">

                    <!--
                        <div id="menuItem" class="accordian-item m-2">

                            <button class="accordian-button btn btn-light mx-2 text-nowrap border-0 collapsed" 
                                data-bs-toggle="collapse" data-bs-target="#subMenu1" aria-controls="menuItems" aria-expanded="false" 
                                value=""><span class="fas fa-building"></span><span class="fas fa-building pe-1"></span> Menu</button>

                            <div id="subMenu1" class="accordian-collapse collapse" aria-labelledby="menuItem" data-bs-parent="#menuItem">
                                <button class="accordian-button btn btn-light mx-2 text-nowrap border-0 collapsed" 
                                    data-bs-toggle="collapse" data-bs-target="#subMenu2" aria-controls="subMenu1" aria-expanded="false" 
                                    value=""><span class="fas fa-building pe-1"></span> Sub Menu 1</button>
                            
                                <div id="subMenu2" class="accordian-collapse collapse" aria-labelledby="subMenu1" data-bs-parent="#subMenu1">
                                    <button class="accordian-button btn btn-light mx-2 text-nowrap border-0 collapsed" 
                                        data-bs-toggle="collapse" data-bs-target="#subMenu3" aria-controls="subMenu2" aria-expanded="false" 
                                        value=""><span class="fas fa-building pe-1"></span> Sub Menu 2</button>
                                    
                                </div>
                            
                            </div>

                        </div>
                    -->
        
                    </div>
                </div>
            </div>


            <button class="btn btn-light m-2 border-0 collapsed" 
                    data-bs-toggle="collapse" data-bs-target="#helpSidebar" aria-controls="navItems" aria-expanded="false" 
                    value=""><span class="fas fa-question-circle"></span></button>

            <div id="helpSidebar" aria-labelledby="helpSidebar" data-bs-parent="#helpSidebar" class="collapse bg-dark w-100">Help Menu</div>

            <button class="btn btn-light m-2 border-0" onclick="window.location.href='logout.php'"><span class="fas fa-sign-out-alt"></span></button>
        </nav>