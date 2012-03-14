IPCheck
https://github.com/korylprince/IPCheck

#Installing#

This was installed on a variety of servers. It should work on any machine as long as it is running a webserver and PHP (5+).
If you are using a different authentication method, you may need something more. Check the KAuth requirements here:
https://github.com/korylprince/KAuth

If you are running this on a windows box, need to set the windows option to True in auth/options.php

Simply copy the IPCheck folder to your web directory, copy auth/options.php.def to options.php, and edit it for authentication and your list of ips. Then navigate to your website and login. 

If you just want a single login, copy auth/users.list.def to auth/users.list. You can use auth/mkpasswd.php to change the password. See https://github.com/korylprince/KAuth for usage.

If you have any issues or questions, email the email address below, or open an issue at:
https://github.com/korylprince/IPCheck/issues

#Usage#

This distribution is a simple web interface for checking IPs.
The default username/password is administrator/admin.

The list can be changed by editing the $iplist array in auth/options.php.
Each entry follows the form of:

array("description"=>"Windows Server","ip"=>"192.168.0.1","port"=>"445")

Where description is a description or name of the server/switch, ip is the IP address of the server/switch, and port is a port to check connectivity on.

Port 445 is common for a Windows machine.

Port 22 for a Linux machine (with an ssh-server.)

Ports 80 or 23 are commonly used for switches.


This builds upon the "KAuth" Library:
https://github.com/korylprince/KAuth
The authentication can be extend using that library. Note: sessions must be used.

#Copyright Information#

jQuery and jQuery UI are produced by the jQuery team: http://jquery.com/ and http://jqueryui.com/

session\_lib.php was taken from the PHP manual: http://php.net/manual/en/function.session-set-save-handler.php

jQuery Cookie was taken from https://github.com/carhartl/jquery-cookie

All other code is Copyright 2012 Kory Prince (korylprince at gmail dot com.) This code is licensed under the GPL v3 which is included in this distribution.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

