<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Erlaube CORS, um von deiner Erweiterung aufgerufen zu werden
 
$api_key = "API_KEY";
$query = $_GET['query'];
$page = $_GET['page'];
$perPage = $_GET['per_page'];
 
$url = "https://pixabay.com/api/?key=$api_key&q=" . urlencode($query) . "&page=$page&per_page=$perPage";
 
// Verwende cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
}
curl_close($ch);
 
echo $response;
?>
 
