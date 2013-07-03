<?php
$allowedExts = array("har", "harp");
$extension = end(explode(".", $_FILES["file"]["name"]));
if (($_FILES["file"]["type"] == "application/octet-stream") && 
	($_FILES["file"]["size"] < 3000000) && 
	in_array($extension, $allowedExts)) {

	if ($_FILES["file"]["error"] > 0) {
		echo "Error: " . $_FILES["file"]["error"] . "<br>";
    } else {
		$file = file_get_contents($_FILES["file"]["tmp_name"]);
		if ($extension == "harp") {
			$start = strpos($file, '{');
			$end = strrpos($file, ')');
			echo substr($file, $start, $end - $start );
		} else {
			echo $file;
		}
	}
} else {
  echo "Invalid file";
}
?> 