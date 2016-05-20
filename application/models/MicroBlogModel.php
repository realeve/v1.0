<?php
class MicroBlogModel extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function TransToGBK($data){//SQL SERVER字符转换
		return iconv("utf-8","gbk",$data);
	}

	public function TransToUTF($data){
		return iconv("gbk","utf-8",$data);
	}

	//工序，每页多少条，处理状态，时间范围,当前ID
	public function ReadMicroBlog($qurayData)
	{
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		$this->load->helper('url');
		$SQLStr="SELECT top ". $qurayData['Nums'] ." a.ID,a.UserName,convert(char(20),a.RecordTime,120) as RecordTime,a.BlogHTML from tblMicroBlog_Record a WHERE convert(varchar(10),a.RecordTime,120) between ? and ?";
		$SQLStr .=" and a.ID>". $qurayData['CurID'] ." and a.HideBlog=0 and a.UserName = ? ";
		if($qurayData['KeyWord'] !="")
		{
			$SQLStr.=" AND a.BlogHTML like '%" .$qurayData['KeyWord']."%' ";
		}
		$SQLStr .=" order by a.ID DESC";
		$query = $LOGINDB->query($SQLStr,array($qurayData['TimeStart'],$qurayData['TimeEnd'],$qurayData['UserName']));
		$strJson = $query->result_json();
		$query->free_result(); //清理内存
		$LOGINDB->close();//关闭连接
		return $strJson;		
	}

	//保存日志查询设置
	public function SaveSettings($data)
	{
		$this->load->helper('url');
	  	//判断用户名是否已存在
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		//先获取当前用户ID
		$data['UserName'] =  $this->TransToGBK($data['UserName']);
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
			'NumsID' => $data['NumsID'],
			'RefreshTime' => $data['RefreshTime'],
			'AutoRefresh' => $data['AutoRefresh'],
		);

		$SQLStr = "SELECT top 1 UserID from tblMicroBlog_Settings WHERE UserID=".$UserID;
		$query = $LOGINDB->query($SQLStr);
		if($query->num_rows()>0)
		{			
			$LOGINDB->where('UserID', $UserID);
			$LOGINDB->update('tblMicroBlog_Settings', $Settings); 
		}
		else
		{
			$LOGINDB->insert('tblMicroBlog_Settings', $Settings);
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
		$data['UserName'] = $this->TransToGBK($data['UserName']);
		$SQLStr = "SELECT top 1 a.* from tblMicroBlog_Settings a INNER JOIN tblUser b on a.UserID = b.ID WHERE b.UserName = ?";
		$query=$LOGINDB->query($SQLStr,array($data['UserName']));
		$strJson = $query->result_json();
		$query->free_result(); //清理内存
		$LOGINDB->close();//关闭连接
		return $strJson;	
	}

}