<?php
    ob_start();
    session_start();
	include("template/header.php");
	//require_once('configuration/Configuration.php');
	//require_once('configuration/Sensor.php');
?>

<script type="module" src="./javascript/charting.js?v=<?php echo rand(1, 10); ?>"></script>

<style>

    canvas {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
    }

</style>

<!-- User Section -->
<section id="userSectionSearch">

    <form id="searchForm" class="form-inline d-flex justify-content-center w-100 p-2" method="post">
        
        <div class="col-md-3 mx-2 justify-content-center align-items-center">
            <label for="startDate">Start Date: </label>
            <input type="date" class="form-control m-2" id="startDate" name="startDateName" 
                value=""
                min="" 
                max="<?php echo date("Y-m-d"); ?>">
        
            <input type="time" class="form-control m-2" id="startTime" name="startTimeName"
                value=""
                min="00:00" 
                max="23:59">
        </div>

        
        <div class="col-md-3 mx-2 justify-content-center align-items-center">
            <label for="endDate">End Date: </label>
            <input type="date" class="form-control m-2" id="endDate" name="endDate" 
                value=""
                min="" 
                max="<?php echo date("Y-m-d"); ?>">

            <input type="time" class="form-control m-2" id="endTime" name="endTime"
                value=""
                min="00:00" 
                max="23:59">
        </div>
        
        <div class="col-md-2 mx-2 align-items-center">
            <input type="hidden" name="user" id="user" value="<?php echo $_SESSION['userId']; ?>" />
            <button type="button" class="btn btn-primary w-100" id="getDataButton">Get Data</button>
        </div>

    </form>


</section>
<section id="userSectionResults" class="container-fluid d-flex justify-content-around">
    <div id="charts" class="d-flex justify-content-around"></div>
</section>



<script>
    
    //getSensorChart(null, null);
    //getMinMaxDates();
</script>



<?php
    include("template/footer.php");
	ob_flush();
?>