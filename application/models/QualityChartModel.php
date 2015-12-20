<?php
class QualityChartModel extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	//保存日志查询设置
	public function SaveSettings($data)
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
			'RefreshTime' => $data['RefreshTime'],
			'AutoRefresh' => $data['AutoRefresh'],
			'FixTblHead' => $data['FixTblHead'],
			'FixTblCol' => $data['FixTblCol'],
			'FootSearch' => $data['FootSearch'],
			'InputToggle' => $data['InputToggle'],
			'InputInner' => $data['InputInner'],
		);

		$SQLStr = "SELECT top 1 UserID from tblQualityTable_Settings WHERE UserID=".$UserID;
		$query = $LOGINDB->query($SQLStr);
		if($query->num_rows()>0)
		{			
			$LOGINDB->where('UserID', $UserID);
			$LOGINDB->update('tblQualityTable_Settings', $Settings); 
		}
		else
		{
			$LOGINDB->insert('tblQualityTable_Settings', $Settings);
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
}