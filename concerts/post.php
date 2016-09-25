<?php
	include("Concerts.php");
	include("Concert.php");

	// extract date and time from the json
	$concert_json = stripslashes($_POST["concert_json"]); 
	$date = Concerts::extract_date_from_json($concert_json);
	$time = Concerts::extract_time_from_json($concert_json);
	$datetime = str_replace("-", "", $date) . str_replace(":", "", $time);
	// create a new concert object
	$concert = new Concert($datetime);
	$result = $concert -> post($concert_json);
	// respond back to client
	$formattedDate = Concerts::getFormattedDate($datetime);
	if ($result) {
		echo "Concert (" . $formattedDate .") inserted successfully";
	}
	else {
		echo "COULD NOT insert (" . $formattedDate . ") Concert";
	}
?>

