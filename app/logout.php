<?php

    session_start();
    unset($_SESSION);
    session_unset();
    session_destroy();
    session_write_close();
    ob_flush();

    ?>
    <html>
        <head>
        <script>
            
            document.cookie.split(";").forEach(cookie => {
                console.log(cookie.split("="));
                document.cookie = cookie.split("=")[0] + "=;";
            });
            
        </script>
        </head>
    </html>
    <?php

    header("Location: login.php");
?>