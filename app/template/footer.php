				</section>

				<div id="helpMenu" class="row">
					<div id="openHelpMenu" class="col-2 vh-100">
						<div class="m-0" style="position: relative; top: 35px; width: 100px; left: -40px; transform: rotate(-90deg);">Help Menu</div>
					</div>

					<div id="" class="col-10 p-0">
						<div id="closeHelpMenu" class="col m-0 bg-dark text-light" style="padding: 1em 2em; text-align: right;">Close X</div>

						<div id="helpContent" class="row m-0" style="background-color: #fff;">Content</div>
					</div>
					<!--
					<div id="closeHelpMenu" class="row m-0 offset" style="padding-right: 1em; text-align: right; width: 270px">Close X</div>
					
					<div id="helpContent" class="row m-0 p-0" style="background-color: #fff; padding-right: 1em; width: 270px">Content</div>
					-->
				</div>
			</main>


		<footer></footer>
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
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.min.js"></script>
		<!-- JavaScript Bundle with Popper -->
		<!--
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
		-->
	</body>
</html>
<?php
	ob_flush();
?>