	<div class="artist-box">
	<?php 
		$artists = $concert -> getArtists();
		foreach ($artists as $artist) {
	?> 
			<div>
				<span class="artist">
					<strong><?php echo $artist["name"]; ?></strong>
				</span>
				<span  class="instrument">
					<?php echo $artist["instrument"]; ?>
				</span>
			</div>
	<?php
		} // foreach artist
	?>
	</div> <!-- artist-box -->
	
	
