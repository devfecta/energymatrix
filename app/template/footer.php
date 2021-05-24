					</section>
				</main>
			</div>
		</div>
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
		<!-- JavaScript Bundle with Popper -->
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
	</body>
</html>
<?php
	ob_flush();
?>