<?php

	define( "CAMAGA_ROOT", "../" );
	include("Concerts.php");
	include("Concert.php");

	$requestURI = strtolower($_SERVER['REQUEST_URI']);
	$paths = explode("=",$requestURI);
	$datetime=end($paths);
	$concert = new Concert($datetime);
	$result = $concert -> delete();
	
	// respond back to client
	$formattedDate = Concerts::getFormattedDate($datetime);
	if ($result) {
		echo "Concert (" . $formattedDate .") deleted successfully";
	}
	else {
		echo "COULD NOT delete (" . $formattedDate . ") concert";
	}

?>

