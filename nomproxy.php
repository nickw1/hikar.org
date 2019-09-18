<?php

$q = urlencode($_GET["q"]);

$curl = curl_init();
curl_setopt($curl, CURLOPT_HTTPHEADER, ['User-Agent: Hikar Website', "Referer: {$_SERVER['SERVER_NAME']}/{$_SERVER['PHP_SELF']}"]);
curl_setopt($curl, CURLOPT_URL, "https://nominatim.openstreetmap.org/search?format=json&q=$q");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_HEADER, 0);
$result = curl_exec($curl);
curl_close($curl);
echo $result;

?>
