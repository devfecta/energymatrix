<?php
    ob_start();
    session_start();
	include("template/header.php");
?>

<script type="module" src="./javascript/userTrends.js?v=<?php echo rand(1, 10); ?>"></script>

<section id="trends" class="container-fluid row"></section>

<?php
    include("template/footer.php");
	ob_flush();
?>