<?php
function get_data($conn) {
  $sql = "SELECT * FROM cashback WHERE NOW()>startdate and NOW()<enddate;";
  $result = $conn->query($sql)->fetchAll(PDO::FETCH_NUM);
  return $result;
}

$servername = "localhost";
$username = $_SERVER["PHPMYSQLUSER"];
$password = $_SERVER["PHPMYSQLPWD"];

try {
  $conn = new PDO("mysql:host=$servername;dbname=cardwise", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
    echo $e;
    echo "error";
}

$data = get_data($conn);
echo json_encode($data);
?>