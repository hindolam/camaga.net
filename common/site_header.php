<header class="site-header clearfix">
	<div class="company-name">
		<a href="../home">
			<img src="../img/camaga_logo.jpg">
			CAMAGA
		</a>
	</div> 
    <nav id="collapsed">
		<span style="font-size:5rem;">&equiv;</span>
	</nav>
	<nav id="expanded">
		<ul>
			<li><a class="home" href="../home">HOME</a></li>
			<li><a class="concerts" href="../concerts">CONCERTS</a></li>
			<li><a class="events" href="../events">EVENTS</a></li>
			<li><a class="articles" href="../articles">ARTICLES</a></li>
			<li><a class="member" href="../member">MEMBER</a></li>
			<li><a class="contact" href="../contact">CONTACT</a></li>
		</ul>
	</nav>
	<script>
		$( "nav#collapsed" ).click(function() {
			$( "nav#expanded").toggle();
		});	
	</script>		
</header>
<?php 
	if (isset($_SERVER['PHP_AUTH_USER']))	{ 
?>					
	<div class="login-info">
		<?php echo "Welcome " . $_SERVER['PHP_AUTH_USER']; ?>
	</div>
<?php
	}
?>	

