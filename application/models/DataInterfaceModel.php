<?php
class DataInterfaceModel extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function TransToUTF($data){
		return iconv("gbk","utf-8",$data);
	}
	public function TransToGBK($data){
		return iconv("utf-8","gbk",$data);
	}

	public function GetNewApiID($UserName)
	{
		$LOGINDB=$this->load->database('sqlsvr',TRUE);	
		$StrSQL = "SELECT ISNULL(MAX(ApiID),0)+1 as NewID  FROM  tblDataInterface  where Author=?";
		$query = $LOGINDB->query($StrSQL,array(sha1($UserName)));
		$strJson = $query->result_json();	
		$strReturn = json_decode($strJson)->data[0]->NewID;
		$query->free_result(); //清理内存
		$LOGINDB->close();//关闭连接
		return $strReturn;
	}

	public function SaveAPI($data)
	{
		$this->load->helper('url');
	  	//判断用户名是否已存在
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		//先获取当前用户ID		
		$data['ApiName'] = $this->TransToGBK($data['ApiName']);
		$data['Author'] = sha1($data['Author']);
		$data['ApiDesc'] = $this->TransToGBK($data['ApiDesc']);
		$data['strSQL'] = $this->TransToGBK($data['strSQL']);

		$SQLStr="SELECT top 1 ID from tblDataInterface WHERE Author= '". $data['Author'] ."' and ApiID = ".$data['ApiID'];
		$query=$LOGINDB->query($SQLStr);
		if($query->num_rows()>0)
		{
			//更新
			$LOGINDB->where('Author', $data['Author']);
			$LOGINDB->where('ApiID', $data['ApiID']);
			$LOGINDB->update('tblDataInterface', $data); 
		}else
		{
			//添加
			$LOGINDB->insert('tblDataInterface', $data); 
		}

		$query=$LOGINDB->query($SQLStr);
		if($query->num_rows()>0)
		{			
			$Logout['message'] = '操作成功';//注册成功
			$Logout['status'] = '1';
			$Logout['NewID'] = (int)$data['ApiID']+1;
		}
		else
		{
			$Logout['message'] = '操作失败';//注册失败
			$Logout['status'] = '0';
			$Logout['NewID'] = $data['ApiID'];
		}
	  	$LOGINDB->close();//关闭连接
		return $Logout;
	}

	//M:1预览模式;0输出SQL语句；
	//2输出质量数据;3预览模式（输出最多10行数据）;4.输出列名
	public function Api($data)
	{
		$this->load->helper('url');
	  	//判断用户名是否已存在
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		//先获取当前用户ID
		$SQLStr = "SELECT a.ApiID,a.ApiName,a.Author,a.strSQL,a.Params,a.DBID,a.URL,b.DBName from tblDataInterface a INNER JOIN tblDataBaseInfo b on a.DBID=B.DBID WHERE Author = ? and ApiID=".$data['ID'];
		$query=$LOGINDB->query($SQLStr,array($data['Author']));
		$strJson = $query->result_json();
		//return $strJson;
		$ApiInfo = json_decode($strJson);
		$query->free_result(); //清理内存
		$LOGINDB->close();//关闭连接
		if(!$ApiInfo->rows){
			return $strJson;
		}
		//解析params,用于SQL查询参数
		$aParTemp = explode(',',$ApiInfo->data[0]->Params);
		for($i=0;$i<count($aParTemp);$i++){ 
			$aParams[$i] = $data[$aParTemp[$i]];
		} 

		switch ($data['M']) {
			case 'edit':
				$strApiInfo = $strJson;			
				break;
			case '0':
			case '2':
			case '3':
				$strApiInfo = $this->ShowApiData($aParams,$ApiInfo->data[0],$data['M']);//输出质量数据
				break;
			case '1':
				$strApiInfo = $this->ShowApiData($aParams,$ApiInfo->data[0],$data['M']);//输出列名
				return '{"rows":"0",'.$strApiInfo.',"title":"'.$ApiInfo->data[0]->ApiName.'","source":"数据来源:'.$ApiInfo->data[0]->DBName.'"}';
				break;
		}
		//方案1：JSON编码
		//$Api = json_decode($strApiInfo,FALSE);//为TRUE时转换为Object
		//$Api->title = $ApiInfo->data[0]->ApiName;
		//$Api->source = '数据来源:'.$ApiInfo->data[0]->DBName;
		//JSON ENCODE加入 编码说明，支持中文
		//$strJson = json_encode($Api,JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
		
		//方案2：字符串拼接
		$strJson = rtrim($strApiInfo,'}').',"title":"'.$ApiInfo->data[0]->ApiName.'","source":"数据来源:'.$ApiInfo->data[0]->DBName.'"}';
		return $strJson;		
	}

	//工序，每页多少条，处理状态，时间范围,当前ID
	public function ShowApiData($aParams,$ApiInfo,$mode)
	{
		$SQLStr = $ApiInfo->strSQL;
		switch ($ApiInfo->DBID) {
			case '0':
				$LOGINDB=$this->load->database('Quality',TRUE);	
				break;
			
			case '5':
				$LOGINDB=$this->load->database('sqlsvr',TRUE);	
				break;
		}		

		if ($mode == 0 ) {
			$query = $LOGINDB->query($this->TransToGBK($SQLStr),$aParams);
			$strJson = $query->result_json();	
		}
		else if($mode == 1 ) {
			$SQLStr = str_ireplace('select ', 'SELECT TOP 0 ',$SQLStr);
			$query = $LOGINDB->query($this->TransToGBK($SQLStr),$aParams);
			$query = $LOGINDB->query($this->TransToGBK($SQLStr),$aParams);
			$strJson = $query->result_json();
			//$strFileds = $query->list_fields();
			//$strJson = $query->Array2Head($strFileds);
		}	
		else if($mode == 2 ) {
			$SQLStr = str_ireplace('select ', 'SELECT TOP 10 ',$SQLStr);
			$query = $LOGINDB->query($this->TransToGBK($SQLStr),$aParams);
			$strJson = $query->result_json();
		}		
		else if ($mode == 3 ) {
			$query = $LOGINDB->query($this->TransToGBK($SQLStr),$aParams);
			$strJson = $query->result_datatable_json();
		}
		$query->free_result(); //清理内存
		$LOGINDB->close();//关闭连接
		return $strJson;
	}

	//读取日志查询设置
	public function ReadSettings($data)
	{
		$this->load->helper('url');
	  	//判断用户名是否已存在
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		//先获取当前用户ID
		$data['UserName'] = iconv("utf-8","gbk",$data['UserName']);
		$SQLStr = "SELECT top 1 a.* from tblQualityTable_Settings a INNER JOIN tblUser b on a.UserID = b.ID WHERE b.UserName = ?";
		$query=$LOGINDB->query($SQLStr,array($data['UserName']));
		$strJson = $query->result_json();
		$query->free_result(); //清理内存
		$LOGINDB->close();//关闭连接
		return $strJson;	
	}

	public function addData($data,$tblName)
	{
		$LOGINDB=$this->load->database('Quality',TRUE);		
		return $LOGINDB->insert($tblName, $data);
	}

	public function getCurDate()
	{
		$a=date("Y");
	    $b=date("m");
	    $c=date("d");
	    $d=date("G");
	    $e=date("i");
	    $f=date("s");
	    return $a.'-'.$b.'-'.$c.' '.$d.':'.$e.':'.$f;
	}
}