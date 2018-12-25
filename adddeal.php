<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
$servername = "localhost";
$username = $_SERVER["PHPMYSQLUSER"];
$password = $_SERVER["PHPMYSQLPWD"];

function add_deal($conn, $card, $category, $start, $end, $cashback) {
  $sql = "INSERT INTO cashback VALUES (?,?,?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($card, $category, $start, $end, $cashback));
}

function get_parameter($conn,$name) {
  $sql = "SELECT value FROM parameters WHERE name='".$name."'";
  $result = $conn->query($sql)->fetch();
  return $result["value"];
}

try {
  $authconn = new PDO("mysql:host=$servername;dbname=vpn_management", $username, $password);
  $authconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $execconn = new PDO("mysql:host=$servername;dbname=cardwise", $username, $password);
  $execconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
  echo $e;
  echo "error";
}

$authcode = get_parameter($authconn, "authcode");
if ($_POST["authcode"]==$authcode) {
  add_deal($execconn, $_POST["card"], $_POST["category"], $_POST["start"], $_POST["end"], $_POST["cashback"]/100);
  echo "Success.";
}
else{
  echo "Wrong auth code.";
}
?>
<br>
<a href='adddeal.html'>Add more</a>