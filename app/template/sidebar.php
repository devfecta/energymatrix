<nav class="col-md-3 col-lg-3 d-md-block bg-light sidebar collapse vh-100" style="overflow-y: auto;">

    <div class="position-sticky pt-3">
        <div class="nav flex-column">
            <div class="accordion" id="sidebarMenu">

                <?php if ((float)$_SESSION['type'] == 0) { ?>
                    <!-- User Sidebar -->
                    <script>
                        //getUserSidebar();
                    </script>

                <?php } else { ?>

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