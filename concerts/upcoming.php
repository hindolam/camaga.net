    <?php
		define( "CAMAGA_ROOT", "../" );
		include("Concerts.php");
		include("Concert.php");
		include( CAMAGA_ROOT . "artists/Artist.php");
		$datetime = NULL;
		$concerts = Concerts::getUpcoming();
	?>
	<section>
		<header>
			<h2>Upcoming Concerts</h2>
		</header>
	<?php 
		if (empty($concerts)) {
	?>	
		<div class="no-upcoming-concerts">
			No concerts scheduled as of now. Please check back again later.
			In the meanwhile, browse the <a href="concerts/main.php">Past Concerts</a>

		</div>
	<?php 
		}
	?>	
	<?php 
		foreach ( $concerts as &$concert) {
			if ($concert -> exists()) {
				$ymdhm = $concert -> getDateTime();	
				$concert_date = strtotime($concert -> getDate());
				$concert_time = strtotime($concert -> getTime());
				$month = date("m", $concert_date);				
	?>			
				<div class="list-concert-box">
	<?php 
					if (isset($_SERVER['PHP_AUTH_USER']))	{ 
	?>					
                                                <a href="index.php?datetime=<?php echo $ymdhm ?>">
	<?php 
					} 
	?>
							<div class="event-box">
	<?php
								include(CAMAGA_ROOT . "date/views/dateBox.php");
	?>
								<div class="artist-venue-box">
	<?php						
									include(CAMAGA_ROOT . "artists/views/vertical-link.php"); 
									include(CAMAGA_ROOT . "venue/views/venueBox.php");
	?>					
								</div>	
    <?php								
					if (isset($_SERVER['PHP_AUTH_USER']))	{
	?>
						</a>
	<?php					
					} 
								include(CAMAGA_ROOT . "concerts/photos/views/artist-link.php"); 
	?>
					</div>
				
					<?php
					    if ($concert -> existsDetail()) {
					?>    
						<div class="detail-box">
						    <?php echo $concert -> getDetail(); ?>
						</div>
					<?php
					    }
					?>
				</div>	
	<?php
			} // if concert exists
		} // foreach concert					
	?>
	</section>   
