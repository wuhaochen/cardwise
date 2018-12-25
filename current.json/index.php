<?php
function get_data($conn) {
  $sql = "SELECT * FROM cashback;";
  $result = $conn->query($sql)->fetchAll(PDO::FETCH_NUM);
  return $result;
}

$servername = "localhost";
$username = "phpquery";
$password = "php";

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

