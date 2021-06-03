<?php
    ob_start();
    session_start();
	include("template/header.php");

    require_once('configuration/Users.php');
?>

<script type="module" src="./javascript/sensorEdit.js"></script>

<section class="container-fluid row">
    
    <div class="col-md-12">
        <h1 class="h3 mb-3 font-weight-normal">Edit Sensor</h1>

        <div id="message" class="alert" role="alert"></div>
        <!-- action="api.php?class=Sensors&method=addSensor" -->
        <form class="form-signin needs-validation" method="post" enctype="application/x-www-form-urlencoded" novalidate>
            

            <div class="row">
                <div class="col-md-12 form-group">
                    <label for="company">Company: </label>
                    <select class="form-control" id="company" name="company" readonly>
                        <?php
                            $Users = new Users();
                            $companies = $Users->getCompanies();

                            foreach ($companies as $company) {
                                $selected = ($_GET['userId'] == $company->getId()) ? ' selected' : '';
                                if ($_GET['userId'] == $company->getId()) {
                                    echo '<option value="' . $company->getId() . '"' . $selected . '>' . $company->getCompany() . '</option>';
                                }
                            }

                        ?>
                    </select>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-12 form-group">
                    <label for="sensorId">Sensor ID: </label>
                    <input type="number" class="form-control" id="sensorId" name="sensorId" maxlength="6" required readonly />
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 form-group">
                    <label for="sensorName">Sensor Name: </label>
                    <input type="text" class="form-control" id="sensorName" name="sensorName" maxlength="32" required />
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 form-group">
                    <p>NOTE: Any changes to the sensor name will need to be reflected on the sensor side too.</p>
                </div>
            </div>
<!--
            <div class="row">
                <div class="col-md-12 form-group">
                    <label for="sensorAttributes">Sensor Attributes: (JSON)</label>
                    <input type="text" class="form-control" id="sensorAttributes" name="sensorAttributes" placeholder='{"name": "value", "name": "value"}' maxlength="32" />
                </div>
            </div>
-->
            <div class="row">
                <div class="col-md-12 form-group">
                    <button type="button" id="updateSensorButton" class="btn btn-lg btn-primary mt-2">Update Sensor</button>
                    <button type="button" id="deleteSensorButton" class="btn btn-lg btn-danger mt-2">Delete Sensor</button>
                </div>
            </div>

        </form>

    </div>

</section>

<?php
    include("template/footer.php");
	ob_flush();
?>