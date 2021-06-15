<?php
    ob_start();
    session_start();
	include("template/header.php");
?>

<script type="module" src="./javascript/sensorTrends.js"></script>

<div id="trends" class="row"></div>

<?php
    include("template/footer.php");
	ob_flush();
?>