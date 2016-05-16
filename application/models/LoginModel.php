<?php
class LoginModel extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function TransToGBK($data){
		return iconv("utf-8","gbk",$data);
	}
	public function TransToUTF($data){
		return iconv("gbk","utf-8",$data);
	}


	public function logincheck($UserName,$Password){
		$UserName = $this->TransToGBK($UserName);
		$logindata = array(
		'username'  => $UserName,
		);
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		
		$SQLStr="SELECT top 1 b.segment_html,a.[id] as id,a.UserName,a.UserRole,a.FullName,a.GroupID,a.set_avatar from tblUser a LEFT JOIN tbl_menu_list b on ISNULL(a.default_menu_id,0) = b.id WHERE UserName=? and UserPassword=?";
		$query=$LOGINDB->query($SQLStr,array($UserName,$Password));
		if($query->num_rows()>0)
		{			
			$logindata['message'] = 1;//登录成功
			$logindata['logged_in'] = true;			
			$row = $query->row();

			$logindata['FullName'] = $this->TransToUTF(trim($row->FullName));
			$logindata['username'] = $this->TransToUTF(trim($row->UserName));
			$logindata['GroupID'] = $row->GroupID;//机检组
			$logindata['userrole'] = $row->UserRole;
			$logindata['uid'] = $row->id;
			//全局函数，记录用户登录信息
			$logindata['set_avatar'] = $row->set_avatar;
			$logindata['avatar'] = base64_encode($logindata['uid'].$logindata['username']);

			//菜单信息
			$logindata['segment_html'] = $row->segment_html;
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
		$ResetData['UserName'] = $this->TransToGBK($ResetData['UserName']);
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
		}
		else
		{
			$Returndata['message'] = 7;//验证错误
			$LOGINDB->close();//关闭连接
		}
			return $Returndata['message'];
	}

	public function UserRegistry($RegisterData)
	{
	 	$this->load->helper('url');

		$RegisterData['UserName'] = $this->TransToGBK($RegisterData['UserName']);
		$RegisterData['FullName'] = $this->TransToGBK($RegisterData['FullName']);
		$RegisterData['Email'] = $this->TransToGBK($RegisterData['Email']);
		$RegisterData['set_avatar'] = 0;//默认无头像
		//$RegisterData['avatar_url'] = 0;//头像文件链接名
		$RegisterData['default_menu_id'] = 0;//默认菜单项0

	  	//判断用户名是否已存在
		$LOGINDB=$this->load->database('sqlsvr',TRUE);		

		$SQLStr="SELECT top 1 UserName from tblUser WHERE UserName=?";
		$query=$LOGINDB->query($SQLStr,array($RegisterData['UserName']));
		if($query->num_rows()>0)
		{			
			$data['message'] = 3;//已存在用户了
			$LOGINDB->close();//关闭连接
			return $data['message'];
		}
		$RegisterData['GroupID'] = 0;		
		$LOGINDB->insert('tblUser', $RegisterData);
		$data['ID'] = $LOGINDB->insert_id();
		if($data['ID'])
		{			
			$data['message'] = 5;//注册成功
		}
		else
		{
			$data['message'] = 4;//注册失败
		}

		//更新图像地址信息
		/*$avatarData['avatar_url'] = base64_encode($data['ID'].$RegisterData['UserName']);
		$LOGINDB->where('id', $data['ID']);
		$LOGINDB->update('tblUser', $avatarData); */

		//工作日志默认数据
		$WorkLogSettingData['UserID'] = $data['ID'];
		$WorkLogSettingData['ProcID'] = 0;
		$WorkLogSettingData['RefreshTime'] = 300;
		$WorkLogSettingData['AutoRefresh'] = 1;
	  	$LOGINDB->insert('tblWorkLog_Settings', $WorkLogSettingData);

		$MicroBlogSettingData['UserID'] = $data['ID'];
		$MicroBlogSettingData['NumsID'] = 4;
	  	$LOGINDB->insert('tblMicroBlog_Settings', $MicroBlogSettingData);

	  	$LOGINDB->close();//关闭连接
		return $data['message'];
	}

}