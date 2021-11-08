<?php
    ob_start();
    session_start();
	include("template/header.php");
?>

<script type="module" src="./javascript/trend.js?v=<?php echo rand(1, 10); ?>"></script>

<section id="userSectionResults" class="container-fluid d-flex justify-content-around">
    <div id="charts" class="d-flex justify-content-around"></div>
</section>

<section id="trends" class="container-fluid">

<div class="row justify-content-center align-items-center">
    <div class="col-md-5 mx-2 d-flex">
        <label for="startDate" class="text-nowrap align-self-center">Start Date: </label>
        <input type="date" class="form-control m-2" id="startDate" name="startDateName" 
            value="<?php echo date("Y-m-d"); ?>"
            min="" 
            max="<?php echo date("Y-m-d"); ?>">
    
        <input type="time" class="form-control m-2" id="startTime" name="startTimeName"
            value="<?php echo date("H:m:s"); ?>"
            min="00:00" 
            max="23:59">
    </div>

    
    <div class="col-md-5 mx-2 d-flex">
        <label for="endDate" class="text-nowrap align-self-center">End Date: </label>
        <input type="date" class="form-control m-2" id="endDate" name="endDate" 
            value="<?php echo date("Y-m-d"); ?>"
            min="" 
            max="<?php echo date("Y-m-d"); ?>">

        <input type="time" class="form-control m-2" id="endTime" name="endTime"
            value="<?php echo date("H:m:s"); ?>"
            min="00:00" 
            max="23:59">
    </div>
</div>

</section>

<?php
    include("template/footer.php");
	ob_flush();
?>