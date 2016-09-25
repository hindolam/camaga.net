<?php
    $requestMethod = strtolower($_SERVER['REQUEST_METHOD']);

	switch ($requestMethod)  {  
        case 'post': 
			include('post.php');
            break;  
    }
?>
