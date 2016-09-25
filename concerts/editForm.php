<!DOCTYPE html>
<html>
	<?php 
		define( "CAMAGA_ROOT", "../" );
		include( CAMAGA_ROOT . "common/html_head.php"); 		
	?>
	<body>
		<?php 
			include(CAMAGA_ROOT . "common/site_header.php"); 
			include("Concerts.php");
			include("Concert.php");
			$datetime = $_GET["datetime"]; 
			$concert = new Concert($datetime);
		?>
		
		<div id="page-wrap">
			<h2>Edit Concert</h2>
			<form id="concert" method="POST" action="javascript:updateConcert('<?php echo ($datetime) ?>')">
				<fieldset class="event-info">
					<legend>Event Information</legend>
					<div class="fm-opt">
						<label for="date">Date</label>
						<input type="text" name="date" disabled="disabled" value="<?php  echo $concert -> getDate(); ?>">
					</div>							
					<div class="fm-opt">
						<label for="time">Time</label>
						<input type="text" name="time" disabled="disabled" value="<?php  echo $concert -> getTime(); ?>">
					</div>
					<div class="fm-opt">
						<label for="venue">Venue</label>
						<input type="text" name="venue" value="<?php  echo $concert -> getVenue(); ?>">
					</div>
					<div class="fm-opt">
						<label for="detail">Detail</label>
						<textarea name="detail" rows="3" cols="60"><?php if ($concert -> existsDetail()) { echo $concert -> getDetail(); } ?></textarea>
					</div>
				</fieldset>					
				<fieldset class="artist-info collapsible">
					<legend>
						Artist Information
					</legend>
					<table>
						<thead>
							<tr>
								<th/>
								<th/>
								<th>Name</th>
								<th>Instrument</th>
							</tr>
						</thead>
						<tbody>
					<?php 
							$i = 0;						
							$artists = $concert -> getArtists();
							foreach ($artists as $artist) {
					?>			
						<tr>
							<td>
							    <input class="deleteRowButton" type="button" onclick="deleteArtistRow(this)" value="-">								
							    <input class="insertRowButton" type="button" onclick="insertArtistRow(this)" value="+">								
							</td>
							<td class="rowIndex"><?php echo ++$i ?></td>
							<td><input type="text" name="artists[<?php echo ($i -1) ?>].name" value="<?php echo $artist["name"]; ?>"></td>
							<td><input type="text" name="artists[<?php echo ($i -1) ?>].instrument"  value="<?php echo $artist["instrument"]; ?>"></td>
						</tr>
					<?php } ?>
							<tr>
								<td>
									<input class="deleteRowButton" type="button" onclick="deleteArtistRow(this)" value="-" style="visibility:hidden">								
									<input class="insertRowButton" type="button" onclick="insertArtistRow(this)" value="+" >								
								</td>
								<td class="rowIndex" style="visibility:hidden"><?php echo ++$i ?></td>
								<td/>
								<td/>
							</tr>
						</tbody>
					</table>
				</fieldset>
				<fieldset class="songs-info collapsible">
					<legend>
						Songs Information
					</legend>
					<table>
						<thead>
						<tr>
							<th/>
							<th/>
							<th>Song</th>
							<th>Ragam</th>
							<th>Talam</th>
							<th>Composer</th>
						</tr>
					</thead>
					<tbody>
					<?php 
							$i = 0;
							if ($concert -> songExists()) {
								$songs = $concert -> getSongs();								
								foreach ($songs as $song) {
					?>			
									<tr>
										<td>
											<input class="deleteRowButton" type="button" onclick="deleteSongRow(this)" value="-">	
											<input class="insertRowButton" type="button" onclick="insertSongRow(this)" value="+">								
										</td>
										<td class="rowIndex"><?php echo ++$i ?></td>
										<td><input type="text" name="songs[<?php echo ($i -1) ?>].name"  value="<?php echo $song["name"]; ?>"></td>
										<td><input type="text" name="songs[<?php echo ($i -1) ?>].ragam"  value="<?php echo $song["ragam"]; ?>"></td>
										<td><input type="text" name="songs[<?php echo ($i -1) ?>].talam"  value="<?php echo $song["talam"]; ?>"></td>
										<td><input type="text" name="songs[<?php echo ($i -1) ?>].composer"  value="<?php echo $song["composer"]; ?>"></td>
									</tr>	
					<?php } } ?>
					
						<tr>
							<td>
								<input class="deleteRowButton" type="button" onclick="deleteSongRow(this)" value="-" style="visibility:hidden">
								<input class="insertRowButton" type="button" onclick="insertSongRow(this)" value="+">
							</td>	
							<td class="rowIndex" style="visibility:hidden"><?php echo ++$i ?></td>
							<td/>
							<td/>
							<td/>
							<td/>
						</tr>
					</tbody>
					</table>
				</fieldset>
				<div id="fm-submit" class="fm-req">
					<input name="Submit" value="Save" type="submit">
					<a class="button" href="getOne.php?datetime=<?php echo $datetime ?>">Cancel</a>
				</div>						
			</form>
		</div>
                <script src="../js/jquery-ui-timepicker-addon.js"></script>
		<script src="../js/form2js.js"></script>
		<script src="../js/json2.js"></script>  
		<script src="../js/concert.js"></script>
		<script>
			$(document).ready( function() {			
				if (!Modernizr.inputtypes.date) {
					$('input[type=date]').datepicker({ dateFormat: "yy-mm-dd" });
				}
				if (!Modernizr.inputtypes.time) {
					$('input[type=time]').timepicker();
				}
				$('.collapsible').each(function() {
					var headingE = $('h1,h2,h3,h4,h5,h6,legend', this).first();
					headingE.addClass('clickable');
					var key = headingE.text();
					if ((key in sessionStorage) && sessionStorage[key]) {
						$('*', this).show();
						headingE.prepend('<i class="fa fa-caret-down"></i>').show();
					}
					else {
						$('*', this).hide();
						headingE.prepend('<i class="fa fa-caret-right"></i>').show();
					}
					var icon = $("i", this);
					icon.show();
					icon.parents().show();
				});
				
				$('.collapsible .clickable').click(function(){
					var collapsible = $(this).closest('.collapsible');
					collapsible.find('*').toggle();					
					var icon = $("i", this);
					icon.show();
					icon.parents().show();
					icon.toggleClass('fa-caret-right fa-caret-down');
					var key = $(this).text();
					if (icon.attr('class') === 'fa-caret-down') {
						sessionStorage[key] =  true;
					}
					else {
						delete sessionStorage[key];
					}	
				});					
			});	
		</script>
	</body>
</html>
