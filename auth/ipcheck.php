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
    function checkServer ($host, $port) {
        $check = @fsockopen($host, $port, $errno, $errstr, 1);
        if (!$check) {
            return 'offline';
        }
        return 'online';
    }
    
    $data = array();
    for ($i = 0; $i < count($iplist['servers']); $i++) {
        $data['servers'][$i]['description'] = $iplist['servers'][$i]['description'];
        $data['servers'][$i]['ip'] = $iplist['servers'][$i]['ip'];
        $data['servers'][$i]['status'] = checkServer($iplist['servers'][$i]['ip'], $iplist['servers'][$i]['port']);
    }
    for ($i = 0; $i < count($iplist['switches']); $i++) {
        $data['switches'][$i]['description'] = $iplist['switches'][$i]['description'];
        $data['switches'][$i]['ip'] = $iplist['switches'][$i]['ip'];
        $data['switches'][$i]['status'] = checkServer($iplist['switches'][$i]['ip'], $iplist['switches'][$i]['port']);
    }
    array_multisort($data['servers']);
    array_multisort($data['switches']);
    echo json_encode($data);
    return 1;
?>
