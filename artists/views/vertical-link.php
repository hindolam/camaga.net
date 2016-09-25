	<div class="artist-box">
	<?php

		$artists = $concert -> getArtists();
		for ($index= 0; $index < count($artists); $index++) {

			$artist = new artist($concert, $index);

	?>
			<div>
				<span class="artist">
					<a  target="_blank" href="<?php echo $artist -> getLink(); ?>">
					<strong><?php echo $artist -> getName(); ?></strong>
					</a>
				</span>
				<span  class="instrument">
					<?php echo $artist -> getInstrument(); ?>
				</span>
			</div>
	<?php
		} // foreach artist
	?>
	</div> <!-- artist-box -->


