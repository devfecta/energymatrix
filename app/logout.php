<?php

    session_start();
    unset($_SESSION);
    session_unset();
    session_destroy();
    session_write_close();
    ob_flush();

    header("Location: login.php");
?>