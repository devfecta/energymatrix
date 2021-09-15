<?php
    ob_start();
    session_start();

    if (session_id() && !isset($_SESSION['userId'])) {
        header("Location: login.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Energy Matrix</title>

        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" />

        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />

        <link rel="stylesheet" href="./css/dashboard.css" />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js"></script>

        <script type="module" src="javascript/api.js"></script>

    </head>
    <body>
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-3 me-0 px-3" href="#">
                <?php echo $_SESSION['company']; ?>
                <p class="m-0 p-0" style="font-size:60%">Energy Matrix</p>
            </a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <input class="form-control form-control-dark w-100 me-md-3" type="text" placeholder="Search" aria-label="Search">
            
        </header>

        
        <div class="container-fluid">
            <div class="row">

            <?php
                include("./template/sidebar.php");
            ?>


                <main class="col-md-9 ms-sm-auto col-lg-9">
                    <section class="py-3 h-100">