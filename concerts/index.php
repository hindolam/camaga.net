<?php
    $requestMethod = strtolower($_SERVER['REQUEST_METHOD']);

	switch ($requestMethod) {  
        case 'get': 
			if(array_key_exists('datetime', $_GET)) {					 
				$datetime = $_GET["datetime"];
				if (strlen($datetime) == 12) {
					include('getOne.php');
				} 
				else {
					include('getMore.php');
				} 	
			}
			else {
				include('getMore.php');
			}	
            break;  
        case 'post': 
			include('post.php');
            break;  
        case 'put':  
			include('put.php');
            break;  
        case 'delete':  
			include('delete.php');
            break;  
    }
?>
