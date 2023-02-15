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

$sql = "SELECT login, password FROM users WHERE login='$data->login'";
$result = $conn->query($sql);
$hashpass = "";
while ($row = mysqli_fetch_array($result)) {
  $hashpass = $row['password'];
}
if (password_verify($data->password,$hashpass)) {
    $sql = "INSERT INTO orderlist (fromcity, wherecity,mass,date,comment,userid) VALUES ('$data->cityfrom','$data->cityto','$data->weight',NOW(),'$data->comments','$data->login' );";
    $result = $conn->query($sql);
    echo "1";
} else {
  echo "0";
}
$conn->close();
?>
