<?php 
	$strUrl = "http://125.70.227.212:9875/Handler/DefaultHandler.ashx?action=GetRealTimeData&_=".$_REQUEST["t"];
	$ctx = stream_context_create(array( 
		'http' => array( 
			'timeout' => 1 //设置一个超时时间，单位为秒 
		) 
	)); 
	echo file_get_contents($strUrl, 0, $ctx);
?>