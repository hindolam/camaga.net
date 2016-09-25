	<?php
		if ($concert -> photoExists()) { 
	?>
			<div class="photo-box">								
	<?php 
				$photos = $concert -> getPhotos();
				foreach ($photos as $photo) {
					$imgSrc = $concert -> getDataDirUrl() . "/" . $photo["src"]; 
					$thumbSrc = $concert -> getThumbsDirUrl() . "/" . $photo["src"]; 
	?> 
					<a target="_blank" href="<?php echo $photo["link"]; ?>">
						<img class="thumb" src="<?php	echo $thumbSrc ?>">
					</a>
	<?php 
				} // foreach $photos
	?>
			</div>
	<?php 
		}  // if photoExists() 
	?>								
