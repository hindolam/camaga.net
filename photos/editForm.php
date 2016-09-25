<!DOCTYPE html>
<html>
	<?php 
		include(  "../common/html_head.php"); 		
	?>
	<body>
		<?php 
			include("../common/site_header.php"); 
			include("../concerts/Concerts.php");
			include("../concerts/Concert.php");
			$datetime = $_GET["datetime"]; 
			$concert = new Concert($datetime);
		?>
		<div id="page-wrap">
			<h2>Manage Photos</h2>
			<form action="post.php?datetime=<?php echo ($datetime) ?>" method="post" enctype="multipart/form-data">		
				<input type="hidden" name="date" value="<?php  echo $concert -> getDate(); ?>">
				<input type="hidden" name="time" value="<?php  echo $concert -> getTime(); ?>">
	<?php	
				if ($concert -> photoExists()) {		
					$photos = $concert -> getPhotos();
	?>						
					<fieldset class="collapsible">
						<legend>
							<img src="img/collapse.png" height="16px" width="16px"/>
							Edit Existing Photos
						</legend>
						<table>
							<thead>
								<tr>
									<th>Delete?</th>
									<th>Photo</th>
									<th>Title</th>
								</tr>
							</thead>
							<tbody>
	<?php
								$i = 0;
								foreach ($photos as $photo) {
	?>
									<tr>
										<td>
											<input type="checkbox" name="delete[<?php echo $i ?>]">
										</td>
										<td>
											<img src="../data/concerts/<?php echo $datetime . "/" . $photo["src"];?>" height="96" width="96">
										</td>
										<td>
											<input type="text" name="title[<?php echo $i; ?>]" value="<?php echo $photo['title']; ?>">
										</td>
									</tr>
	<?php
									$i++;
								} // foreach ($photos as $photo)
	?>						
							</tbody>
						</table>
					</fieldset>
	<?php						
				} // if photoExists()
	?>					
				<fieldset class="collapsible">
					<legend>
						<img src="img/collapse.png" height="16px" width="16px"/>
						Add New Photos
					</legend>
					<div>
						<p>File to upload</p>
						<input type="file" name="files[]" id="files" multiple>
						<br>
						<output id="thumbArea"></output>
					</div>
				</fieldset>	
				<div id="fm-submit" class="fm-req">					
					<input type="submit" name="submit" value="Submit">
					<a class="button" href="../concerts/getOne.php?datetime=<?php echo $datetime ?>">Cancel</a>
				</div>	
			</form>
		</div>	<!-- page-wrap -->	
		<script>
			$(document).ready( function() {			
				// expand or collapse the fields inside the fieldset					
				$('fieldset.collapsible legend').click(function(){
					var optionalTable = $(this).next();
					optionalTable.toggle();
					var displayProperty = optionalTable.css("display");
					if (displayProperty =="none")  {
						$("img", this).attr("src","img/expand.png");
					} else {
						$("img", this).attr("src","img/collapse.png");
					}
				});
				
				function handleFileSelect(evt) {
					var files = evt.target.files; // FileList object

					// Loop through the FileList and render image files as thumbnails.
					for (var i = 0, f; f = files[i]; i++) {

					  // Only process image files.
					  if (!f.type.match('image.*')) {
						continue;
					  }

					  var reader = new FileReader();

					  // Closure to capture the file information.
					  reader.onload = (function(theFile) {
						return function(e) {
						  // Render thumbnail.
						  var span = document.createElement('span');
						  span.innerHTML = ['<img class="thumb" src="', e.target.result,
											'" title="', escape(theFile.name), '"/>'].join('');
						  document.getElementById('thumbArea').insertBefore(span, null);
						};
					  })(f);

					  // Read in the image file as a data URL.
					  reader.readAsDataURL(f);
					}
				  }
				  document.getElementById('files').addEventListener('change', handleFileSelect, false);
			});	// $(document).ready
		</script>
	</body>
</html>
