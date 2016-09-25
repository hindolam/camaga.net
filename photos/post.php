<?php
	function arrayImages ( &$file_post ) {
		$file_ary = array();
		$file_count = count($file_post['name']);
		$file_keys = array_keys($file_post);
		for ($i=0; $i<$file_count; $i++) {
			foreach ($file_keys as $key) {
				$file_ary[$i][$key] = $file_post[$key][$i];
			}
		}
		return $file_ary;	
		
	}
	define( "CAMAGA_ROOT", "../" );

	include("../concerts/Concerts.php");
	include("../concerts/Concert.php");
	$requestURI = strtolower($_SERVER['REQUEST_URI']);
	$paths = explode("=",$requestURI);
	$datetime = end($paths);
	$concert = new Concert($datetime);
	
	$existingPhotos = $concert -> getPhotos();
	$deletePhotosArray = array();
	$i = 0;
	if ( !empty($existingPhotos)) {
		foreach ($existingPhotos as $photo) {
			if (isset($_POST['delete'][$i])){
				$deletePhotosArray[] = $i;
			} 
			else {
				$concert -> setPhotoTitle($i, $_POST['title'][$i]);
			}
			$i++;
		}
		$concert -> deletePhotos($deletePhotosArray);
	}
	
	// new photos uploaded
	$file_ary = arrayImages($_FILES['files']);
	if ($file_ary[0]["error"] != UPLOAD_ERR_NO_FILE) {
		foreach ($file_ary as $file) {
			if ($file["error"] > 0) {
				echo "Error: " . $file["error"] . "<br>";
			} 
			else {
				$concert -> addPhoto($file);
			}	
		}
	}
	
	$host  = $_SERVER['HTTP_HOST'];
	$uri =  "/concerts/getOne.php?datetime=" . $datetime;
	header("Location: http://$host/$uri");
	exit;
	
	// respond back to client
	/*
	$formattedDate = Concerts::getFormattedDate($datetime);
	if ($result) {
		echo "Concert (" . $formattedDate .") updated successfully";
	}
	else {
		echo "COULD NOT update (" . $formattedDate . ") Concert";
	}
	*/

?>

