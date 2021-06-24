<?php
    ob_start();
    session_start();
	include("template/header.php");

    require_once('configuration/Users.php');
?>

<script type="module" src="./javascript/trendAdd.js"></script>

<section class="container-fluid row">
    
    <div class="col-md-12">
        <h1 class="h3 mb-3 font-weight-normal">Add Trend</h1>

        <div id="message" class="alert" role="alert"></div>
        <!-- action="api.php?class=Sensors&method=addSensor" -->
        <form id="trendForm" class="form-signin needs-validation" method="post" enctype="application/x-www-form-urlencoded" novalidate>

            <div class="row">
                <div class="col-md-12 form-group">
                    <label for="trendName">Trend Name: </label>
                    <input type="text" class="form-control" id="trendName" name="trendName" maxlength="32" required />
                </div>
            </div>

            <div class="row">
                <div class="col-md-12 form-group">
                    <label for="companySensor">Sensor: </label>
                    <select class="form-control" id="companySensor" name="companySensor"></select>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12 form-group">
                    <button type="button" id="addSensorButton" class="btn btn-lg btn-primary mt-2">Add Trend</button>
                </div>
            </div>

        </form>

    </div>

</section>

<?php
    include("template/footer.php");
	ob_flush();
?>