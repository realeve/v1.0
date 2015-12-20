<?php
class LoginModel extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function TransToGBK($data){//SQL SERVER字符转换
		$data['UserName'] = iconv("utf-8","gbk",$data['UserName']);
		$data['FullName'] = iconv("utf-8","gbk",$data['FullName']);
		$data['Email'] = iconv("utf-8","gbk",$data['Email']);
		$data['Phone'] = iconv("utf-8","gbk",$data['Phone']);
		return $data;
	}

	public function logincheck($UserName,$Password){
		$UserName = iconv("utf-8","gbk",$UserName);
		$logindata = array(
		'username'  => $UserName,
		);
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		$SQLStr="SELECT top 1 UserName,UserRole,FullName,GroupID from tblUser WHERE UserName=? and UserPassword=?";
		$query=$LOGINDB->query($SQLStr,array($UserName,$Password));
		if($query->num_rows()>0)
		{			
			$logindata['message'] = 1;//登录成功
			$logindata['logged_in'] = true;			
			$row = $query->row();
			$logindata['FullName'] = iconv("gbk", "utf-8", $row->FullName);
			$logindata['GroupID'] = iconv("gbk", "utf-8", $row->GroupID);//机检组
			$logindata['userrole'] = $row->UserRole;	
		}
		else
		{
			$logindata['message'] = 2;//用户名密码错误
			$logindata['logged_in'] = false;
			$logindata['userrole'] = 0;
		}	
		$LOGINDB->close();//关闭连接
		return $logindata;//返回登录结果(登录状态、用户权限)			
	}

	public function ResetPassword($ResetData)
	{
		$this->load->helper('url');
		$ResetData['UserName'] = iconv("utf-8","gbk",$ResetData['UserName']);
		$data = array(
			'UserPassword' => md5($this->input->post('password'))
		);
		//判断用户信息是否正确
		$LOGINDB=$this->load->database('sqlsvr',TRUE);	
		$SQLStr="SELECT top 1 UserName from tblUser WHERE UserName=? and Email=?";
		$query=$LOGINDB->query($SQLStr,array($ResetData['UserName'],$ResetData['Email']));
		if($query->num_rows()>0)
		{			
			$LOGINDB->where('UserName', $ResetData['UserName']);
			$LOGINDB->update('tblUser', $data); 
			$Returndata['message'] = 8;//密码已重置
			$LOGINDB->close();//关闭连接
			return $Returndata;
		}
		else
		{
			$Returndata['message'] = 7;//验证错误
			$LOGINDB->close();//关闭连接
			return $Returndata;
		}
	}

	public function UserRegistry($RegisterData)
	{
	 	$this->load->helper('url');
	  	$data = $this ->TransToGBK($RegisterData);
	  	//判断用户名是否已存在
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		

		$SQLStr="SELECT top 1 UserName from tblUser WHERE UserName=?";
		$query=$LOGINDB->query($SQLStr,array($data['UserName']));
		if($query->num_rows()>0)
		{			
			$data['message'] = 3;//已存在用户了
			$LOGINDB->close();//关闭连接
			return $data;
		}
		$LOGINDB->insert('tblUser', $data);

		$query=$LOGINDB->query($SQLStr,array($data['UserName']));
		if($query->num_rows()>0)
		{			
			$data['message'] = 5;//注册成功
		}
		else
		{
			$data['message'] = 4;//注册失败
		}
	  	
	  	$LOGINDB->close();//关闭连接
		return $data;
	}

}