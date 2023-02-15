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
    $sql2 = "SELECT * FROM orderlist WHERE userid='$data->login'";
    $result1 = $conn->query($sql2);
    $counter = 0;
    while ($row = mysqli_fetch_array($result1)) {
        $counter++;
        echo "<tr>"."<td>".$counter,"</td>";
        echo "<td>".$row['fromcity']."</td>";
        echo "<td>".$row['wherecity']."</td>";
        echo "<td>".$row['mass']."</td>";
        echo "<td>".$row['date']."</td>"."</tr>";        
    }

} else {
  echo "0";
}
$conn->close();
?>
