<?php
    ob_start();
    session_start();
	include("template/header.php");
?>

<style>

    canvas {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
    }

</style>

    <section class="container-fluid text-right">
        <?php
            if ($_SESSION['type'] > 0) {
        ?>
                <a href="register.php" class="btn btn-lg btn-secondary m-1">Register an Account</a> 
        <?php
            }
        ?>
        <a href="logout.php" class="btn btn-lg btn-secondary px-2 m-1">Logout</a> 
    </section>


<section class="container-fluid row">
    <div class="col-md-12">
        <h1><?php echo $_SESSION['company']; ?> - Energy Matrix</h1>
    </div>
    
    <div class="col-md-12">
        
        <form class="form-horizontal" action="api.php" method="post" name="upload_excel" enctype="multipart/form-data">

            <h3>Import CSV File</h3>

            <div class="form-group d-flex align-items-middle">

                <div class="custom-file col-md-8 my-2">
                    <input type="file" name="csvFile" id="csvFile" class="custom-file-input" />
                    <label class="custom-file-label" for="customFile">Choose file</label>                    
                </div>

                <button type="submit" id="submit" name="Import" class="btn btn-primary button-loading col-md-4 mx-2 my-2" data-loading-text="Loading...">Import</button>
                
            </div>
        </form>


    </div>

</section>

<script src="javascript/api.js"></script>

<?php
    include("template/footer.php");
	ob_flush();
?>