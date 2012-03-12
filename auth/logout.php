<?php
//Set header for JSON
header('Content-type: application/json');
$options['sessionLogout'] = True;
require('options.php');
require('authlib.php');
$login = authenticate(null,null,$types,$options);
//echo json_encode($login);return True;//debug
return 0;
?>
