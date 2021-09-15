<?php
    ob_start();
    session_start();
	include("template/header.php");
?>

<script type="module" src="./javascript/index.js?v=<?php echo rand(1, 10); ?>"></script>


<div id="dashboard" class="d-flex justify-content-between flex-wrap vh-100"></div>


<?php
    include("template/footer.php");
	ob_flush();
?>