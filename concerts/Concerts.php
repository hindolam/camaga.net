<?php
	define( "CONCERTS_DATA_DIR", "../data/concerts");
	define( "CONCERTS_DATA_DIR_URL", "../data/concerts");
	
	define( "ALL", 0);
	define( "PAST", -1);
	define( "FUTURE", 1);
	
	class Concerts {

		public static function getDataDir() {
			return CONCERTS_DATA_DIR;
		}
		
		public static function getDataDirUrl() {
			return CONCERTS_DATA_DIR_URL;
		}
		
		public static function get($period = ALL, $sorting_order = 1) {
			$today = date('Ymd').'0000';
			$concerts = array();
			$datetimes = scandir(CONCERTS_DATA_DIR, $sorting_order);
			$inTimePeriod = true;
			foreach ( $datetimes as &$datetime) {
				switch($period) {
					case PAST:
						$inTimePeriod = $datetime < $today;
						break;
					case FUTURE:
						$inTimePeriod = $datetime > $today;
						break;
					default:
						$inTimePeriod = true;
				}				
				if ($inTimePeriod) {			
					$concert = new concert($datetime);
					$concerts[] = $concert;
				}	
			}
			return $concerts;
		}

		public static function getPast() {
			return self::get(PAST);
		}
		
		public static function getUpcoming() {
			return self::get(FUTURE, 0);
		}
		
		public static function extract_date_from_json($concert_json) {
			$concert = json_decode($concert_json, true);
			return $concert["date"];
		}

		public static function extract_time_from_json($concert_json) {
			$concert = json_decode($concert_json, true);			
			return $concert["time"];
		}
		
		public static function getFormattedDate($datetime) {
			return (substr($datetime, 0, 4) . "-" .substr($datetime, 4, 2) . "-" . substr($datetime, 6, 2));	
		}	

	}
?>
