<!DOCTYPE html>
<html lang="en">
	<?php 
		include( "../common/html_head.php");
		include( "../artists/Artist.php");
	?>
	<body>
		<div class="wrapper">
			<?php 
				include("../common/site_header.php"); 
				include("Concerts.php");
				include("Concert.php");
				$datetime = NULL;
				if(array_key_exists('datetime', $_GET)) {					 
					$datetime = $_GET["datetime"]; 
					$concert = new Concert($datetime);
					if ($concert -> exists()) {
						$concert_date = strtotime($concert -> getDate());
						$concert_time = strtotime($concert -> getTime());
			?>
			<div id="page-wrap">
			<?php
				include( "message.php"); 
			?>	
					<section>
						<header>
							<h2>Concert Details</h2>
						</header>		
						<div class="concert-box container">
							<div class="event-box">
		<?php
								include("../date/views/dateBox.php");
								include("../artists/views/vertical-link.php"); 
								include("../venue/views/venueBox.php");
								include("../photos/views/horizontal.php"); 
		?>															
							</div> <!-- event-box -->
		<?php 
							if ($concert -> existsDetail()) { 
		?>
							<div class="concertDetail">
							  <?php echo $concert -> getDetail(); ?> 
							</div>  
		<?php 
							}  // if detailExists() 
		?>
		<?php 
							if ($concert -> songExists()) { 
		?>
							    <h3>Song List</h3>								
								<div class="songlist">
									<table>
										<thead>
											<tr>
												<th class="number-column">#</th>
												<th>Song</th>
												<th>Ragam</th>
												<th>Talam</th>				
												<th>Composer</th>				
											</tr>
										</thead>
										<tbody>
		<?php 
											$i = 0;
											$songs = $concert -> getSongs();
											foreach ($songs as $song) {
												$i++;
		?> 
												<tr>
													<td class="number-column">
														<?php echo $i; ?> 
													</td>
													<td>
														<?php echo $song["name"]; ?> 
													</td>
													<td>
														<?php echo $song["ragam"]; ?> 
													</td>
													<td>
														<?php echo $song["talam"]; ?> 
													</td>				
													<td>
														<?php echo $song["composer"]; ?> 
													</td>				
												</tr>
											<?php } ?>
										</tbody>
									</table>
								</div> <!-- songlist -->
							<?php 
								}  // if songExists() 
							?>
							<?php if (isset($_SERVER['PHP_AUTH_USER']))	{ ?>
								<div>
									<a class="button" href="editForm.php?datetime=<?php echo ($datetime) ?>" >
										Edit Concert
									</a>
									<a class="button" href="../photos/editForm.php?datetime=<?php echo ($datetime) ?>" >
										Manage Photos
									</a>
									<button onclick="deleteConcert(<?php echo ($datetime) ?>)">
										Delete Concert
									</button>
								</div>	
							<?php }  ?>
						</div>	<!-- concert-box-container -->
					</section>
			</div> <!-- page-wrap -->
			<?php 		
					} 
				}
			?>
			<div class="push"></div>
		</div>	
		<?php 
			include("../common/site_footer.php");
		?>							
		<script src="../js/concert.js"></script>		
		<script src='../thirdparty/unitegallery/unitegallery-master/package/unitegallery/js/unitegallery.min.js'></script> 
		<script src='../thirdparty/unitegallery/unitegallery-master/package/unitegallery/themes/tilesgrid/ug-theme-tilesgrid.js'></script> 
		<script>
			jQuery(document).ready(function(){ 
				jQuery("#gallery").unitegallery({
					gallery_theme: "tilesgrid",
					gallery_min_width: 150,	
					slider_scale_mode: "down",
					theme_hide_panel_under_width: 4000,
                                        grid_space_between_cols:0,
                                        grid_space_between_rows:0,
                                        tile_enable_border:false,
                                        tile_enable_shadow:false,
                                        grid_padding:0,
                                        tile_width:250,
					grid_num_rows:2,
                    grid_space_between_cols: 5,			
					grid_space_between_rows: 5,						
					tile_width: 90,
					tile_height: 75
				});	
			}); 		
		</script>
	</body>
</html>