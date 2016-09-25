	<?php 
		$artists = $concert -> getArtists();
		foreach ($artists as $artist) {
	?> 
			<span class="artist">
	<?php 
				echo $artist["name"]; 
	?>
			</span>
			<span class="instrument">
	<?php 
				echo $artist["instrument"]; 
	?>
			</span>
    <?php
		}  // foreach artist
	?>