<?php

	define( "CONCERT_JSON_FILE", "concert.json");

	class Concert {

		var $datetime;

		function __construct($datetime) {
			$this -> datetime = $datetime;
   		}
		
		public function getDataDir() {
			return (Concerts::getDataDir() . "/" . $this -> datetime);
		}
		
		public function getDataDirUrl() {
			return (Concerts::getDataDirUrl() . "/" . $this -> datetime);
		}
		
		public function getthumbsDirUrl() {
			return (Concerts::getDataDirUrl() . "/" . $this -> datetime . "/thumbs");
		}
		
		private function getDataFileName() {
			return ($this -> getDataDir() . "/" . CONCERT_JSON_FILE);
		}
		
		private function update($concert_php) {
			$dataFileName = $this -> getDataFileName();
			if (file_exists($dataFileName)) { 
				$concert_json = json_encode($concert_php);
				file_put_contents( $dataFileName, $concert_json);
				return true;
			}
			else {
				return false;
			}
		}

		private function getJson() {
			$dataFileName = $this -> getDataFileName();
			$concert_json = null;
			if (file_exists($dataFileName)) { 
				$concert_json = file_get_contents($dataFileName);
			}
			return $concert_json;
		}
		
		function get($format = "json") {
			$format = strtolower($format);			
			switch ($format) {
				case "json_php":
					$concertData = json_decode($this -> getJson(), true);
					break;
				case "json":
					$concertData = $this -> getJson();
					break;
				default:
					$concertData = $this -> getJson();
			}			
			return $concertData;
		}

		function post($concert_json) {
			$dataDir = $this -> getDataDir();
			if (!file_exists($dataDir)) {
				if (!mkdir($dataDir, 0777, true)) {
					die("Unable to create data directory = " . $dataDir);
				}
				$dataFileName = $this -> getDataFileName();
				file_put_contents( $dataFileName, $concert_json, FILE_APPEND | LOCK_EX);
				return true;
			}
			else {
				return false;
			}
		}

		function delete() {
			$dataDir = $this -> getDataDir();		
			if (file_exists($dataDir)) {
				$it = new RecursiveDirectoryIterator($dataDir);
				$files = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
				foreach($files as $file) {
				    if ($file -> getFilename() === '.' || $file -> getFilename() === '..') {
	    			   	continue;
				    }
    				if ($file -> isDir()){
    				    rmdir( $file -> getRealPath());
				    } 
					else {
				        unlink( $file -> getRealPath());
				    }
				}
				rmdir($dataDir);
				return true;
			}
			else {
				return false;
			}
		}		
		
		function getDate() {
			$concert_php = $this -> get("json_php");
			return $concert_php["date"];
		}
		
		function getYear() {
			$concert_php = $this -> get("json_php");
			return substr($concert_php["date"], 0, 4);
		}
		
		function getTime() {
			$concert_php = $this -> get("json_php");
			return $concert_php["time"];
		}
		
		function getDateTime() {
			$ymdhm = str_replace("-", "", $this -> getDate() . str_replace(":", "", $this -> getTime()));
			return $ymdhm;
		}

		function getVenue() {
			$concert_php = $this -> get("json_php");
			
			if (isset($concert_php["venue"])) {
				return $concert_php["venue"];
			} else {
				return null;
			}	
		}

		function getArtists() {
			$concert_php = $this -> get("json_php");
			if (isset($concert_php["artists"])) {
				return $concert_php["artists"];
			} else {
				return null;
			}	
		}

		function getSongs() {
			$concert_php = $this -> get("json_php");
			if (isset($concert_php["songs"])) {
				return $concert_php["songs"];
			} else {
				return null;
			}	
		}
		
		function getPhotos() {
			$concert_php = $this -> get("json_php");
			if (isset($concert_php["photos"])) {
				return $concert_php["photos"];
			} else {
				return null;
			}	
		}
		
		function exists() {
			$concert_php = $this -> get("json_php");
			return ($concert_php != null);
		}	
			
		function songExists() {
			$concert_php = $this -> get("json_php");
			return (isset($concert_php["songs"]));
		}
		
		function photoExists() {
			$concert_php = $this -> get("json_php");
			return (isset($concert_php["photos"]));
		}
		
		function setArtists($artists) {
			$concert_php = $this -> get("json_php");
			if (empty($artists)) {
			    unset($concert_php["artists"]);
			} 
			else {	
			    $concert_php["artists"] = $artists;
			}
			return $this -> update($concert_php);
		}

		function setSongs($songs) {
			$concert_php = $this -> get("json_php");
			if (empty($songs)) {
				unset($concert_php["songs"]);
			} 
			else {	
				$concert_php["songs"] = $songs;
			}
			return $this -> update($concert_php);
		}				

		private function setPhotos($photos) {
			$concert_php = $this -> get("json_php");
			if (empty($photos)) {
				unset($concert_php["photos"]);
			} 
			else {	
				$concert_php["photos"] = $photos;
			}
			return $this -> update($concert_php);
		}
		
		function addPhoto($file) {
			$photo = array();
			$photo["src"]= $file["name"];
			$photo["title"] = pathinfo($file["name"], PATHINFO_FILENAME); // filename without extension
			$dataDir = $this -> getDataDir();
			move_uploaded_file($file["tmp_name"], $dataDir . "/" . $photo["src"]);		
			include('photos/SimpleImage.php'); 
			$image = new SimpleImage(); 
			$image->load($dataDir . "/" . $photo["src"]); 
			$image->resizeToHeight(75); 
			$dataDir = $this -> getDataDir();
			$thumbsDir = $dataDir ."/thumbs";
			if (!file_exists($thumbsDir)) {
				if (!mkdir($thumbsDir, 0777, true)) {
					die("Unable to create thumbs directory = " . $thumnbsDir);
				}
			}
			$image->save($thumbsDir . "/" . $photo["src"]);
			
			$photos = $this -> getPhotos();
			$photos[] = $photo;
			return $this -> setPhotos($photos);
		}
		
		function deletePhotos($indexArray) {
			$photos = $this -> getPhotos();
			$dataDir = $this -> getDataDir();
			$thumbsDir = $dataDir ."/thumbs";
			rsort($indexArray);
			foreach($indexArray as $i) {
				unlink ( $dataDir . "/" . $photos[$i]["src"]);
				unlink ( $thumbsDir . "/" . $photos[$i]["src"]);
				array_splice($photos, $i, 1);
			}
			return $this -> setPhotos($photos);
		}

		function setPhotoTitle($i, $title) {
			$photos = $this -> getPhotos();
			$photos[$i]["title"] = $title;
			return $this -> setPhotos($photos);
		}
		
		function getDetail() {
			$concert_php = $this -> get("json_php");
			
			if (isset($concert_php["detail"])) {
				return $concert_php["detail"];
			} else {
				return null;
			}	
		}
		
		function existsDetail() {
			$concert_php = $this -> get("json_php");
			return (isset($concert_php["detail"]));
		}
		
		function setDetail($detail) {
			$concert_php = $this -> get("json_php");
			if (empty($detail)) {
				unset($concert_php["detail"]);
			} 
			else {	
				$concert_php["detail"] = $detail;
			}
			return $this -> update($concert_php);
		}
		
		function setVenue($venue) {
			$concert_php = $this -> get("json_php");
			if (empty($venue)) {
				unset($concert_php["venue"]);
			} 
			else {	
				$concert_php["venue"] = $venue;
			}
			return $this -> update($concert_php);
		}				
		
	}
?>
