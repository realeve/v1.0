<?php
	function getData($sql){
		$mysql = new SaeMysql();
		$result = $mysql->getData( $sql );
		$mysql->closeDb();
		$msg[rows] = count($result);
		if($msg[rows]){
			$msg[data] =  $result;
		}else{
			$msg[data] =  [];
		}
		
		return json_encode($msg, JSON_UNESCAPED_UNICODE);
	}	
	
	function setData($sql){
		$mysql = new SaeMysql();
		$status = $mysql->runSql( $sql );
		if( $status )
	    {
	      $result[status] = 1;
		  $result[msg] = '数据操作成功';
	    }else{
		  $result[status] = 0;
		  $result[msg] = '数据操作失败';			
		}
		return json_encode($result, JSON_UNESCAPED_UNICODE);		
	}
?>