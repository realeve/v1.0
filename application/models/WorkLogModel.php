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

	public function AddWorkLog($WorkLogData)
	{
	 	$this->load->helper('url');
	  	$data = $this ->TransToGBK($WorkLogData); 
		$LOGINDB=$this->load->database('sqlsvr',TRUE);	 
		
		$LOGINDB->insert('tblWorkLog_Record', $data);//写入信息

		$istStatus = 0;
		$istStatus = $LOGINDB->insert_id();
	  	
	  	$LOGINDB->close();//关闭连接
		return $istStatus;
	}

	//工序，每页多少条，处理状态，时间范围,当前ID
	public function ShowWorkLog($ProcID,$Nums,$Status,$TimeStart,$TimeEnd,$CurID)
	{
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		$this->load->helper('url');
		//,a.ErrDescHTML
		$SQLStr="SELECT top ". $Nums ." a.ID,b.ClassName,c.ProcName,e.StatusName,f.MainErrDesc,f.SubErrDesc,convert(char(16),a.ProTime,120) as ProTime,a.ProUserName,a.ProInfo,a.RecordUserName,convert(char(20),a.RecordTime,100) as RecordTime from tblWorkLog_Record a inner join tblworkclass b on a.workclassid=b.classid inner join tblWorkProc c on a.WorkProcID=c.procid ";
		$SQLStr.="inner join tblworkprostatus e on e.statusid=a.ProStatusID inner join tblworkerrdesc f on f.suberrid=a.SubErrDescID WHERE a.HideLog=0 and convert(varchar(10),a.RecordTime,112) between ? and ?";
		if ($Status == 1) {
			$SQLStr." and a.ProStatusID<4 ";
		}elseif($Status == 2){
			$SQLStr." and a.ProStatusID>3 ";
		}
		//往前加载
		//if ($CurID > 0) {
		//	$SQLStr." and a.ID <" .$CurID;
		//}
		if($ProcID <5)
		{
			$SQLStr.=" and a.WorkProcID =" .$ProcID;
		}
		$SQLStr .=" and a.ID>". $CurID . " order by a.ID DESC";
//		$LOGINDB->db_debug = TRUE;
		$query = $LOGINDB->query($SQLStr,array($TimeStart,$TimeEnd));
		$strJson = $query->result_json();

		$query->free_result(); //清理内存
		$LOGINDB->close();//关闭连接
		return $strJson;		
	}

	public function ReadLog($ID)
	{
		$LOGINDB = $this->load->database('sqlsvr',TRUE);		
		$SQLStr = "SELECT ErrDescHTML from tblWorkLog_Record where ID=".$ID;
		$query = $LOGINDB->query($SQLStr);
		$row = $query->row();
		$strJson = $this->TransToUTF($row->ErrDescHTML);
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
			'NumsID' => $data['NumsID'],
			'Status' => $data['Status'],
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

		/*if($query->num_rows()>0)
		{				
			foreach ($query->result_array() as $row)
			{
			   $row['ClassName'] = $this ->TransToUTF($row['ClassName']);
			   $row['ProcName'] = $this ->TransToUTF($row['ProcName']);
			   $row['StatusName'] = $this ->TransToUTF($row['StatusName']);
			   $row['MainErrDesc'] = $this ->TransToUTF($row['MainErrDesc']);
			   $row['SubErrDesc'] = $this ->TransToUTF($row['SubErrDesc']);
			   $row['ProUserName'] = $this ->TransToUTF($row['ProUserName']);
			   $row['RecordUserName'] = $this ->TransToUTF($row['RecordUserName']);
			  // $row['ErrDescHTML'] = $this ->TransToUTF($row['ErrDescHTML']);
			}

		}*/