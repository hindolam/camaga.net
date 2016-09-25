		function addConcert() {
			var formDataJSON = form2js('concert', '.', true); 
			var formDataJSONStr = JSON.stringify(formDataJSON);	
			$.post(
				'/concerts/post.php', 
				'concert_json=' + encodeURIComponent(formDataJSONStr), 
				function(replyData) {
					window.location = "/concerts/" + "?message=" + replyData;
				} // function(replyData)
				
			); // $.post
		} // save	
		
		function deleteConcert(datetime) {
			if (confirm("Are you sure you want to permanently delete this concert?")) {	
				$.ajax({	
					url: '/concerts/delete.php?datetime=' + datetime,
					type: 'DELETE',
					success: function(replyData) {
						window.location = "/concerts/"+ "?message=" + replyData;						
					}
				});			
			}	
		} // deleteConcert			

		function updateConcert(datetime) {
			var formDataJSON = form2js('concert', '.', true); 
			var formDataJSONStr = JSON.stringify(formDataJSON);	
			$.ajax({
				url: '/concerts/put.php?datetime=' + datetime,
				type: 'PUT',
				data : 'concert_json=' + encodeURIComponent(formDataJSONStr), 
				success: function(replyData) {				  
					window.location = "/concerts/getOne.php?datetime=" + datetime + "&message=" + replyData;						
				}
			});			
		} // save	
		
		function changeArtistRowIndex(thisTableRow, change) {
			var	rowIndexElement = 	thisTableRow.children('.rowIndex')[0];
			var newRowIndex = Number(rowIndexElement.innerHTML);
			rowIndexElement.innerHTML = newRowIndex + change;
			inputElements = thisTableRow.find('input[type="text"]');
			if (inputElements.length > 0) {
					inputElements.eq(0).attr('name', 'artists[' +  newRowIndex + '].name');
					inputElements.eq(1).attr('name', 'artists[' +  newRowIndex + '].instrument');
			}	
		}
		
		function insertArtistRow(thisInsertButton) {
			var thisTableRow = $(thisInsertButton).parent().parent();
			var rowIndex =  Number(thisTableRow.children('.rowIndex')[0].innerHTML) - 1;
			// insert the new row one row above the button clicked
			var newTableRow = $('<tr><td><input class="deleteRowButton" type="button" onclick="deleteArtistRow(this)" value="-"><input class="insertRowButton" type="button" onclick="insertArtistRow(this)" value="+"></td><td class="rowIndex">' +								
				(rowIndex + 1)  +
				'</td><td><input type="text" name="artists['+ 
				rowIndex +
				'].name" placeholder="Artist Name"></td><td><input type="text" name="artists[' +
				rowIndex +
				'].instrument" placeholder="Instrument" list="instrumentList"></td></tr>'
			).insertBefore(thisTableRow);

			// now that a row has been added above increment the row numbers of all following rows by 1
			var followingTableRows = newTableRow.nextUntil('table');		
			followingTableRows.each ( function(i) {
				changeArtistRowIndex($(this), 1);
			});
		} // insertArtistRow()		
		
		function deleteArtistRow(thisDeleteButton) {
			var thisTableRow = $(thisDeleteButton).parent().parent();
			var rowIndex =  thisTableRow.children('.rowIndex')[0].innerHTML;
			// first gather all the followint rows and delete that row.
			var followingTableRows = thisTableRow.nextUntil('table');		
			thisTableRow.remove();
			// now that a row has been deleted decrement the row numbers of all following rows by 1
			followingTableRows.each(function (i) {
				changeArtistRowIndex($(this), -1);
			});				
		} // deleteArtistRow()		

		// Songs
		function changeSongRowIndex(thisTableRow, change) {
			var	rowIndexElement = 	thisTableRow.children('.rowIndex')[0];
			var newRowIndex = Number(rowIndexElement.innerHTML);
			rowIndexElement.innerHTML = newRowIndex + change;
			inputElements = thisTableRow.find('input[type="text"]');
			console.log(inputElements);
			if (inputElements.length > 0) {
				inputElements.eq(0).attr('name', 'songs[' +  newRowIndex + '].name');
				inputElements.eq(1).attr('name', 'songs[' +  newRowIndex + '].ragam');
				inputElements.eq(2).attr('name', 'songs[' +  newRowIndex + '].talam');
				inputElements.eq(3).attr('name', 'songs[' +  newRowIndex + '].composer');
			}	
		} // changeSongRowIndex
		
		function insertSongRow(thisInsertButton) {
			var thisTableRow = $(thisInsertButton).parent().parent();
			var rowIndex =  Number(thisTableRow.children('.rowIndex')[0].innerHTML) - 1;
			// insert the new row one row above the button clicked
			var newTableRow = $('<tr><td><input class="deleteRowButton" type="button" onclick="deleteSongRow(this)" value="-"><input class="insertRowButton" type="button" onclick="insertSongRow(this)" value="+"></td><td class="rowIndex">' +								
				(rowIndex + 1)  +
				'</td><td><input type="text" name="songs['+ 
				rowIndex +
				'].name" placeholder="Song Name"></td><td><input type="text" name="songs['+ 
				rowIndex +
				'].ragam" placeholder="Ragam"></td><td><input type="text" name="songs['+ 
				rowIndex +
				'].talam"  placeholder="Talam"></td><td><input type="text" name="songs[' +
				rowIndex +
				'].composer" placeholder="Composer"></td></tr>'
			).insertBefore(thisTableRow);

			// now that a row has been added above increment the row numbers of all following rows by 1
			var followingTableRows = newTableRow.nextUntil('table');		
			followingTableRows.each ( function(i) {
				changeSongRowIndex($(this), 1);
			});
		} // insertSongRow()		
				
		function deleteSongRow(thisDeleteButton) {
			var thisTableRow = $(thisDeleteButton).parent().parent();
			var rowIndex =  thisTableRow.children('.rowIndex')[0].innerHTML;
			// first gather all the followint rows and delete that row.
			var followingTableRows = thisTableRow.nextUntil('table');		
			thisTableRow.remove();
			// now that a row has been deleted decrement the row numbers of all following rows by 1
			followingTableRows.each(function (i) {
				changeSongRowIndex($(this), -1);
			});				
		} // deleteSongRow()
						
		
