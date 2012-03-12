<?php
//Set header for JSON
header('Content-type: application/json');
/* Get data from POST */
if(!isset($_POST['sessionID'])) {
    $returnArray = array('login'=>'Error', 'errorCode'=>1);
    echo json_encode($returnArray);
}
else {
    $options['sessionID'] = $_POST['sessionID'];
}
require('options.php');
require('authlib.php');
$login = authenticate(null,null,$types,$options);
//echo json_encode($login);return 0;//debug
if($login['Login'] != "True"){
    $returnArray = array('login'=>'Error', 'errorCode'=>1);
    echo json_encode($returnArray);
    return 0;
}
    $ip = preg_replace("/[^0-9\.]/", "", $_POST["data"]["ip"]);
    if($options['windows']) {
    exec("ping -n 4 $ip", $output);
    }
    else {
        exec("ping -c 4 $ip", $output);
    }
    echo "{\"output\":\"";
    for($i=0;$i<count($output);$i++)
    {
        echo $output[$i]."<br />";
    }
    echo "\"}";
?>
