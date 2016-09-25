<!DOCTYPE html>
<html>
	<?php 
		define( "CAMAGA_ROOT", "../" );
		include( CAMAGA_ROOT . "common/html_head.php"); 		
	?>
	<body>
		<?php include(CAMAGA_ROOT . "common/site_header.php"); ?>
		<datalist id="instrumentList">
			<option value="Vocal">
			<option value="Vocal Support">
			<option value="Violin">
			<option value="Mridangam">
			<option value="Flute">
		</datalist>
		<div id="page-wrap">
			<h2>Add Concert</h2>
			
			<form id="concert" method="POST" action="javascript:addConcert()">
				<fieldset class="event-info">
					<legend>Event Information</legend>
					<div class="fm-req">
						<label for="date">Date</label>
						<input type="date" name="date" placeholder="Concert Date" required="required">
					</div>							
					<div class="fm-req">
						<label for="time">Time</label>
						<input type="time" name="time" value="16:00" placeholder="Concert Time" required="required">
					</div>
					<div class="fm-opt">
						<label for="venue">Venue</label>
						<input type="text" name="venue" value="Hindu Temple of Atlanta" placeholder="Concert Venue">
					</div>
					<div class="fm-opt">
						<label for="detail">Detail</label>
						<textarea name="detail" rows="3" cols="60"></textarea>
					</div>
				</fieldset>	
				<fieldset class="artist-info collapsible">
					<legend>
						Artist Information
					</legend>
					<table>
						<thead>
							<tr>
								<th></th>
								<th></th>
								<th>Name</th>
								<th>Instrument</th>
							</tr>
						</thead>	
						<tbody>
							<tr>
							<td><input class="deleteRowButton" type="button" onclick="deleteArtistRow(this)" value="-" >
						<input class="insertRowButton" type="button" onclick="insertArtistRow(this)" value="+" ></td>
						<td class="rowIndex">1</td>
						<td><input type="text" name="artists[0].name" placeholder="Artist Name"></td>
						<td><input type="text" name="artists[0].instrument" placeholder="Instrument" list="instrumentList"></td>
						</tr>
						<tr>
							<td><input class="deleteRowButton" type="button" value="-" style="visibility:hidden">
						<input class="insertRowButton" type="button" onclick="insertArtistRow(this)" value="+"></td>
						<td class="rowIndex" style="visibility:hidden">2</td>
						<td></td>
						<td></td>
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
								<th></th>
								<th></th>
								<th>Song</th>
								<th>Ragam</th>
								<th>Talam</th>
								<th>Composer</th>
							</tr>
						</thead>	
						<tbody>
							<tr>
						<td>
							<input class="deleteRowButton" type="button" onclick="deleteSongRow(this)" value="-">	
							<input class="insertRowButton" type="button" onclick="insertSongRow(this)" value="+">
						</td>
						<td class="rowIndex">1</td>
						<td><input type="text" name="songs[0].name" placeholder="Song Name"></td>
						<td><input type="text" name="songs[0].ragam" placeholder="Ragam"></td>
						<td><input type="text" name="songs[0].talam" placeholder="Talam"></td>
						<td><input type="text" name="songs[0].composer" placeholder="Composer"></td>
						</tr>
						<tr>
						<td>
							<input class="deleteRowButton" type="button" value="-" style="visibility:hidden">
							<input class="insertRowButton" type="button" onclick="insertSongRow(this)" value="+">
						</td>
						<td class="rowIndex" style="visibility:hidden">2</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						</tr>
					</tbody>
					</table>
				</fieldset>
				<div id="fm-submit" class="fm-req">
					<input name="Submit" value="Save" type="submit">
					<a class="button" href=".">Cancel</a>
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
