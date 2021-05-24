<?php
    ob_start();
    session_start();
	include("template/header.php");
?>

<?php
    include("template/footer.php");
	ob_flush();
?>