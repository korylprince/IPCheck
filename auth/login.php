<?php
//Set header for JSON
header('Content-type: application/json');
/* Get data from POST */
if (!isset($_POST['data'])){dieWithError('postVarible does not exist!',1);}
$postData = $_POST['data'];
if (!isset($postData['username'])){dieWithError('username does not exist!',2);}
if (!isset($postData['password'])){dieWithError('password does not exist!',3);}
$username = $postData['username'];
$password = $postData['password'];
require('options.php');
require('authlib.php');
$login = authenticate($username,$password,$types,$options);
//echo json_encode($login);return True;//debug
$return['login'] = $login['Login'];
if(isset($login['data']['sessionID'])){$return['sessionID'] = $login['data']['sessionID'];}
echo json_encode($return);
return 0;

//simple helper function
function dieWithError($string, $errorCode) {
    $returnArray = array('login'=>'Error', 'errorCode'=>$errorCode);
    echo json_encode($returnArray);
    die($string);
}
?>
