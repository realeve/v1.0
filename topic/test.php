<?php
	function handleStr($str,$params)
	{
		$iCount = count($params);
		if($iCount == 0)//无待替换字符时
		{
			$strOut = $str;
		}else if($iCount == 1)//只有一个
		{
			$strOut = str_replace("?",strval($params[0]),$str);
		}else//有多个
		{
			$strTemp = explode('?',$str);
			$strOut = " ";
			for( $i=0;$i<count($strTemp)-1;$i++ ){ 
				$strOut .= str_replace("?",$params[$i],$strTemp[$i].'?') ;
			}
			$strOut .= $strTemp[count($strTemp)-1];
		}
		var_dump($strOut);
		$strOut = str_replace("[","",$strOut);
		$strOut = str_replace("]","",$strOut);
		return $strOut;
	}
	$str = " SELECT DISTINCT A .CART_NUMBER as 车号, TO_CHAR (A .start_date, 'YYYY-MM-DD hh:mm') as 生产时间, E .MACHINE_NAME AS 机台, C.MACHINE_WASTER_NUMBER AS 缺陷条数 FROM XZHC.QFM_WIP_JOBS A INNER JOIN XZHC.QFM_QA_INSPECT_MASTER C ON C.JOB_ID = A .JOB_ID INNER JOIN XZHC.QFM_WIP_PROD_LOGS D ON A .JOB_ID = D .JOB_ID INNER JOIN XZHC.DIC_MACHINES E ON D .MACHINE_ID = E .MACHINE_ID WHERE D .MACHINE_ID NOT IN (100, 101, 102) AND TO_CHAR (A .start_date, 'YYYYMMDD') BETWEEN 20160315 AND 20160315 ORDER BY 3,4 desc";
	$params[0] = strval(201111);
	$params[1] = 2011112;
	var_dump($params[0]);
	var_dump(handleStr($str,$params));
?>