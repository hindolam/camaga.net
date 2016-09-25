	<?php
		if ($concert -> photoExists()) { 
	?>
			<div id="gallery">								
	<?php 
				$photos = $concert -> getPhotos();
				foreach ($photos as $photo) {
					$imgSrc = $concert -> getDataDirUrl() . "/" . $photo["src"]; 
					$thumbSrc = $concert -> getThumbsDirUrl() . "/" . $photo["src"]; 
	?> 
					<img src="<?php	echo $imgSrc ?>"
						 data-image="<?php echo $imgSrc ?>" 
						 data-description="<?php echo ($photo['title'])?>"
					/>	 
					
	<?php 
				} // foreach $photos
	?>
			</div> <!-- unite gallery -->
	<?php 
		}  // if photoExists() 
	?>								
