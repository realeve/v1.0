<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------
| DATABASE CONNECTIVITY SETTINGS
| -------------------------------------------------------------------
| This file will contain the settings needed to access your database.
|
| For complete instructions please consult the 'Database Connection'
| page of the User Guide.
|
| -------------------------------------------------------------------
| EXPLANATION OF VARIABLES
| -------------------------------------------------------------------
|
| ['dsn'] The full DSN string describe a connection to the database.
| ['hostname'] The hostname of your database server.
| ['username'] The username used to connect to the database
| ['password'] The password used to connect to the database
| ['database'] The name of the database you want to connect to
| ['dbdriver'] The database driver. e.g.: mysqli.
|   Currently supported:
|     cubrid, ibase, mssql, mysql, mysqli, oci8,
|     odbc, pdo, postgre, sqlite, sqlite3, sqlsrv
| ['dbprefix'] You can add an optional prefix, which will be added
|     to the table name when using the Query Builder class
| ['pconnect'] TRUE/FALSE - Whether to use a persistent connection
| ['db_debug'] TRUE/FALSE - Whether database errors should be displayed.
| ['cache_on'] TRUE/FALSE - Enables/disables query caching
| ['cachedir'] The path to the folder where cache files should be stored
| ['char_set'] The character set used in communicating with the database
| ['dbcollat'] The character collation used in communicating with the database
|     NOTE: For MySQL and MySQLi databases, this setting is only used
|      as a backup if your server is running PHP < 5.2.3 or MySQL < 5.0.7
|     (and in table creation queries made with DB Forge).
|      There is an incompatibility in PHP with mysql_real_escape_string() which
|      can make your site vulnerable to SQL injection if you are using a
|      multi-byte character set and are running versions lower than these.
|      Sites using Latin-1 or UTF-8 database character set and collation are unaffected.
| ['swap_pre'] A default table prefix that should be swapped with the dbprefix
| ['encrypt'] Whether or not to use an encrypted connection.
| ['compress'] Whether or not to use client compression (MySQL only)
| ['stricton'] TRUE/FALSE - forces 'Strict Mode' connections
|       - good for ensuring strict SQL while developing
| ['failover'] array - A array with 0 or more data for connections if the main should fail.
| ['save_queries'] TRUE/FALSE - Whether to "save" all executed queries.
|     NOTE: Disabling this will also effectively disable both
|     $this->db->last_query() and profiling of DB queries.
|     When you run a query, with this setting set to TRUE (default),
|     CodeIgniter will store the SQL statement for debugging purposes.
|     However, this may cause high memory usage, especially if you run
|     a lot of SQL queries ... disable this to avoid that problem.
|
| The $active_group variable lets you choose which connection group to
| make active. By default there is only one group (the 'default' group).
|
| The $query_builder variables lets you determine whether or not to load
| the query builder class.
*/

//$active_group = 'default';
$active_group = 'Quality';
$query_builder = TRUE;

//DBID = 0
$db['sqlsvr'] = array(
 //'dsn' => '',
 'hostname' => '10.9.5.133',
 'username' => 'sa',
 'password' => 'julien',
 'database' => 'QuaCenter',
 'dbdriver' => 'mssql',
 'dbprefix' => '',
 'pconnect' => FALSE,
 'db_debug' => FALSE,
 //数据库缓存
 'cache_on' => FALSE,
 'cachedir' => './dbcache',
 'char_set' => 'utf8',
 'dbcollat' => 'utf8_general_ci',
 'swap_pre' => '',
 //'encrypt' => FALSE,
 //'compress' => FALSE,
 'autoinit'=>TRUE,
 'stricton' => FALSE,
 //'failover' => array(),
 //'save_queries' => TRUE
);

//DBID=1
$db['XZHC'] = array(
 'hostname' =>'(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.9.3.22)(PORT = 1521)) ) (CONNECT_DATA = (SERVICE_NAME = SJJC) ) )',
 'username' => 'xzhc',
 'password' => 'xzhc',
 'dbdriver' => 'oci8',
 'char_set' => 'utf8',
 'dbcollat' => 'utf8_general_ci',
 'db_debug' => FALSE
);
//DBID=2
$db['QFM'] = $db['XZHC'];
$db['QFM']['hostname'] = '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.9.3.21)(PORT = 1521)) ) (CONNECT_DATA = (SERVICE_NAME = SJJC) ) )';
$db['QFM']['char_set'] = 'zhs16gbk';

//DBID=3
$db['JTZY'] = $db['XZHC'];
$db['JTZY'] ['hostname'] = '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.9.5.40)(PORT = 1521)) ) (CONNECT_DATA = (SID = orcl) ) )';
$db['JTZY']['username']='cdyc_user';
$db['JTZY']['password'] ='sky123';
$db['JTZY']['char_set'] = 'zhs16gbk';

// DBID=4
// $db['KG'] = $db['XZHC'];
// $db['KG'] ['hostname'] = '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.8.2.38)(PORT = 1521)) ) (CONNECT_DATA =  (SID = BPAUTO) ) ';
// $db['KG']['username']='jitai';
// $db['KG']['password'] ='jitai';
// $db['KG']['char_set'] = 'zhs16gbk';

$db['KG'] = $db['XZHC'];
$db['KG'] ['hostname'] = '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = mac.cdyc.cbpm)(PORT = 1521)) ) (CONNECT_DATA =  (SID = bpauto.localdomain) ) ';
$db['KG']['username']='jitai';
$db['KG']['password'] ='jitai';
$db['KG']['char_set'] = 'zhs16gbk';

//DBID = 5
$db['Quality'] = $db['sqlsvr'];
$db['Quality']['database'] = 'NotaCheck_DB';
$db['Quality']['pconnect'] = TRUE;

//DBID=6
$db['SHY'] = $db['XZHC'];
$db['SHY'] ['hostname'] = '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.9.3.24)(PORT = 1521)) ) (CONNECT_DATA = (SERVICE_NAME = dcdb) ) )';
$db['SHY']['username']='hmzx';
$db['SHY']['password'] ='hmzx';
$db['SHY']['char_set'] = 'zhs16gbk';

//DBID=7
$db['ZXQS'] = $db['XZHC'];
$db['ZXQS'] ['hostname'] = '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.9.5.51)(PORT = 1521)) ) (CONNECT_DATA = (SID = zxqs) ) )';
$db['ZXQS']['username']='zxqs';
$db['ZXQS']['password'] ='zxqs';

$db['XZHC']['char_set'] = 'zhs16gbk';

//DBID=8
$db['OFFICEHELPER'] = $db['sqlsvr'];
$db['OFFICEHELPER']['hostname'] = '10.8.2.114';
$db['OFFICEHELPER']['username']='sa';
$db['OFFICEHELPER']['password'] ='nutdungeon';
$db['OFFICEHELPER']['database'] = 'officehelper';

//DBID=9
$db['CZUSER'] = array(
 'hostname' =>'(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.9.5.210)(PORT = 1521)) ) (CONNECT_DATA = (SERVICE_NAME = ORCL) ) )',
 'username' => 'czuser',
 'password' => 'czuser',
 'dbdriver' => 'oci8',
 'char_set' => 'utf8',
 'dbcollat' => 'utf8_general_ci',
 'db_debug' => FALSE
);
//DBID=10
$db['IMG'] = $db['sqlsvr'];
$db['IMG']['database'] = 'NotaCheck_IMGDB';

//DBID=11
$db['DATASHARE'] = $db['XZHC'];
$db['DATASHARE'] ['hostname'] = '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.8.2.34)(PORT = 1521)) ) (CONNECT_DATA = (SID = DSPDB) ) )';
$db['DATASHARE']['username']='dwuser';
$db['DATASHARE']['password'] ='dwuser';
$db['DATASHARE']['char_set'] = 'zhs16gbk';

//DBID=12
// 检封装箱数据库
$db['JFZX'] = $db['XZHC'];
$db['JFZX'] ['hostname'] = '(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 10.9.5.25)(PORT = 1521)) ) (CONNECT_DATA = (SID = ORCL) ) )';
$db['JFZX']['username']='CC_JFZX';
$db['JFZX']['password'] ='CC_JFZX';

// dbid=13
$db['jwlx'] = $db['sqlsvr'];
$db['jwlx']['database'] = 'jwlx';
$db['jwlx']['pconnect'] = TRUE;

// dbid=14
$db['mes'] = $db['sqlsvr'];
$db['mes']['database'] = 'soadb';
$db['mes']['pconnect'] = TRUE;
$db['mes']['hostname'] = 'mes-sql.cdyc.cbpm';
$db['mes']['username']= 'sa';
$db['mes']['password']= '123pw!!'; 
