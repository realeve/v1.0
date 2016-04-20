<?php
class WorkLogModel extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function TransToGBK($data){//SQL SERVER字符转换
		$data['ProUserName'] = iconv("utf-8","gbk",$data['ProUserName']);
		$data['TransUserName'] = iconv("utf-8","gbk",$data['TransUserName']);
		$data['RecordUserName'] = iconv("utf-8","gbk",$data['RecordUserName']);
		$data['ErrDescHTML'] = iconv("utf-8","gbk",$data['ErrDescHTML']);
		return $data;
	}

	public function TransToUTF($data){
		return iconv("gbk","utf-8",$data);
	}

	//工序，每页多少条，处理状态，时间范围,当前ID
	public function ShowWorkLog($qurayData)
	{
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		$this->load->helper('url');
		//,a.ErrDescHTML
		$SQLStr = "SELECT a.ID,a.proStatus_id,a.proc_id,b.ProcName,c.ClassName,a.machine_id,a.prod_id,f.StatusName,convert(char(16),a.process_time,120) as process_time,a.oper_name,a.prod_info,a.rec_user_name,convert(char(16),a.rec_time,120) as rec_time,g.MainErrDesc,g.SubErrDesc,a.ErrDesc FROM tblWorkLog_Record a LEFT JOIN tblWorkProc b ON a.proc_id=b.ProcID LEFT JOIN tblWorkClass c ON a.class_id=c.ClassID LEFT JOIN tblWorkProStatus f ON f.StatusID = a.proStatus_id LEFT JOIN tblWorkErrDesc g ON a.sub_err = g.SubErrID WHERE HideLog = 0 AND convert(varchar(10),a.rec_time,112) BETWEEN ? and ? AND a.ID> ? ";
		
		//工序名称
		if($qurayData['proc_id']<4){
			$SQLStr .=" AND a.proc_id = ".$qurayData['proc_id'];
		}
		//处理状态
		if ($qurayData['Status'] == 1) {
			$SQLStr.=" AND a.proStatus_id<=3 ";
		}elseif($qurayData['Status'] == 2){
			$SQLStr.=" AND a.proStatus_id>3 ";
		}
		if($qurayData['KeyWord'] !="")
		{
			$SQLStr.=" AND a.ErrDesc like '%" .$qurayData['KeyWord']."%'";
		}
		$SQLStr.=" ORDER BY ID DESC";
		$query = $LOGINDB->query($SQLStr,array($qurayData['TimeStart'],$qurayData['TimeEnd'],$qurayData['icurID']));
		$strJson = $query->result_json();

		$query->free_result(); //清理内存
		$LOGINDB->close();//关闭连接
		return $strJson;
	}

	//保存日志查询设置
	public function SaveLogQuerySettings($data)
	{
		$this->load->helper('url');
	  	//判断用户名是否已存在
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		//先获取当前用户ID
		$data['UserName'] = iconv("utf-8","gbk",$data['UserName']);
		$SQLStr="SELECT top 1 ID from tblUser WHERE UserName=?";
		$query=$LOGINDB->query($SQLStr,array($data['UserName']));
		if($query->num_rows()>0)
		{
			$row = $query->row();
			$UserID = $row->ID;
		}else
		{
			$data['message'] = '当前用户名不存在';//注册失败
			return $data;
		}

		$Settings = array(
			'UserID' => $UserID,
			'ProcID' => $data['ProcID'],
			'RefreshTime' => $data['RefreshTime'],
			'AutoRefresh' => $data['AutoRefresh'],
		);

		$SQLStr = "SELECT top 1 UserID from tblWorkLog_Settings WHERE UserID=".$UserID;
		$query = $LOGINDB->query($SQLStr);
		if($query->num_rows()>0)
		{			
			$LOGINDB->where('UserID', $UserID);
			$LOGINDB->update('tblWorkLog_Settings', $Settings); 
		}
		else
		{
			$LOGINDB->insert('tblWorkLog_Settings', $Settings);
		}
		$query=$LOGINDB->query($SQLStr);
		if($query->num_rows()>0)
		{			
			$Logout['message'] = '保存设置成功';//注册成功
		}
		else
		{
			$Logout['message'] = '保存设置失败';//注册失败
		}
	  	
	  	$LOGINDB->close();//关闭连接
		return $Logout;
	}

	//读取日志查询设置
	public function ReadLogQuerySettings($data)
	{
		$this->load->helper('url');
	  	//判断用户名是否已存在
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		//先获取当前用户ID
		$data['UserName'] = iconv("utf-8","gbk",$data['UserName']);
		$SQLStr="SELECT top 1 ID from tblUser WHERE UserName=?";
		$query=$LOGINDB->query($SQLStr,array($data['UserName']));
		if($query->num_rows()>0)
		{
			$row = $query->row();
			$UserID = $row->ID;
		}

		$SQLStr = "SELECT top 1 * from tblWorkLog_Settings WHERE UserID=".$UserID;
		$query=$LOGINDB->query($SQLStr);
		$strJson = $query->result_json();

		$query->free_result(); //清理内存
		$LOGINDB->close();//关闭连接
		return $strJson;	
	}

}
