<?php
    ob_start();
    session_start();
	include("template/header.php");
?>

<script type="module" src="./javascript/sensorTrends.js"></script>

<section id="userSectionResults" class="container-fluid row">
    <div id="charts" class="d-flex justify-content-around row"></div>
</section>

<section id="trends" class="container-fluid row"></section>

<?php
    include("template/footer.php");
	ob_flush();
?>