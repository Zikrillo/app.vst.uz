<?php
$data = json_decode(file_get_contents('php://input'));

$servername = "localhost";
$username = "admin";
$password = "zikrillo11";
$dbname = "vst";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$pass = password_hash($data->password,PASSWORD_DEFAULT);
$sql = "INSERT INTO users (login, password) VALUES ('$data->login', '$pass');";
    
if ($conn->query($sql) === TRUE) {
  echo "1";
} else {
  echo $conn->error;
}

$conn->close();
?>