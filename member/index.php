<!DOCTYPE html>
<html lang="us">
	<?php 
		define( "CAMAGA_ROOT", "../" );
		include( CAMAGA_ROOT . "common/html_head.php"); 
	?>
	<body id="member">
		<div class="wrapper">
			<?php 
				include(CAMAGA_ROOT . "common/site_header.php"); 
			?>
			<div id="page-wrap">
				<h2>Membership</h2>
				<dl>
					<dt>Family</dt>
					<dd>$200</dd>
					<dt>Individual</dt>
					<dd>$100</dd>
					<dt>Student with Id</dt>
					<dd>$50</dd>
				</dl>
				<p>
					<a href="doc/2015/Membershipform_2015.doc">Membership form &nbsp;&nbsp<i class="fa fa-download"></i></a>
				</p>
				<h3>Non-members</h3>
				<dl>
					<dt>Individual</dt>
					<dd>$25 per concert</dd>
					<dt>Students with Id</dt>
					<dd>$10 per concert</dd>
				</dl>  
			</div>
			<div class="push"></div>
		</div>
		<?php 
			include(CAMAGA_ROOT . "common/site_footer.php");
		?>
	</body>
</html>

