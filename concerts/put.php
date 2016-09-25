<?php

	define( "CAMAGA_ROOT", $_SERVER['DOCUMENT_ROOT'] . "/camaga/" );
	include("Concerts.php");
	include("Concert.php");
	$requestURI = strtolower($_SERVER['REQUEST_URI']);
	$paths = explode("=",$requestURI);
	$datetime=end($paths);
	$concert = new Concert($datetime);
	
	parse_str(file_get_contents('php://input'), $putVars);
	$concert_json =  stripslashes($putVars['concert_json']);
	$concert_php = json_decode($concert_json, true);
	
	$result = $concert -> setVenue($concert_php["venue"]);
	if ($result) {
	    $result = $concert -> setDetail($concert_php["detail"]);
	}
	if ($result) {
	    $result = $concert -> setArtists($concert_php["artists"]);
	 }
	if ($result) {
	    $result = $concert -> setSongs($concert_php["songs"]);
	}	
	// respond back to client
	$formattedDate = Concerts::getFormattedDate($datetime);
	if ($result) {
	    echo "Concert (" . $formattedDate .") updated successfully";
	}
	else {
	    echo "COULD NOT update (" . $formattedDate . ") Concert";
	}

?>

