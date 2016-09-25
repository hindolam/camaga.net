	<?php
		if ($concert -> photoExists()) { 
			$photos = $concert -> getPhotos();
			foreach ($photos as $index=>$photo) {
				$imgSrc = $concert -> getDataDirUrl() . "/" . $photo["src"]; 
				$thumbSrc = $concert -> getThumbsDirUrl() . "/" . $photo["src"]; 
	?> 
				<a href="<?php echo $imgSrc ?>" data-lightbox="<?php echo $concert -> getDataDirUrl(); ?>" data-title="<?php echo ($photo['title'])?>" <?php if ($index > 2) { ?> class="hidden" <?php } ?> >
					<img src="<?php echo $thumbSrc ?>">
				</a>
	<?php 
			} // foreach $photos
		}  // if photoExists() 
	?>								
