<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="images/Kinergetics-Favicon.png"type="image/png">

    <title>Energy Matrix</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />

    <link href="css/signin.css" rel="stylesheet">

    <style>
        .bd-placeholder-img {
           font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style> 

</head>
<body class="text-center">

    <form action="api.php?class=User&method=login" class="form-signin needs-validation" method="post" enctype="application/x-www-form-urlencoded" novalidate>
        <img class="mb-4" src="images/Kinergetics-Logo.png" alt="Kinergetic, LLC" class="w-100" />
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
        <label for="username" class="sr-only">Username</label>
        <input type="text" id="username" name="username" class="mb-2 form-control" placeholder="Username" required autofocus>
        <div class="invalid-feedback">Please Enter A Username</div>
        <label for="password" class="sr-only">Password</label>
        <input type="password" id="password" name="password" class="mb-2 form-control" placeholder="Password" required>
        <div class="mb-2 invalid-feedback">Please Enter A Password</div>
        <button class="btn btn-lg btn-primary btn-block mt-1" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">Kinergetics &copy; <?php echo date('Y'); ?></p>
    </form>

    <script>
        (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
            });
        }, false);
        })();
    </script>

	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</body>
</html>