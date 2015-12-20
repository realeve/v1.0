<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MicroBlog extends CI_Controller {

	public function __construct()
	{
	  	parent::__construct();
		$this->load->helper ( array (
			'form',
			'url' 
		) );
		$this->load->library('session');
		$this->load->model('MicroBlogModel');
	}

	public function index()
	{
		//$this->output->set_output(json_encode($this->session->userdata));//调试
		if ($this->session->userdata('userrole')>0)
		{
			//$this->output->set_output($logindata);//调试
			//$this->session->sess_destroy();//注销
			if($this->session->userdata('logged_in')==true)
			{
				$logindata['logged_in'] = true;		
				$logindata['username'] = $this->session->userdata('username');
				$logindata['userrole'] = $this->session->userdata('userrole');	
				$logindata['FullName'] = $this->session->userdata('FuleName');	
				$logindata['GroupID'] = $this->session->userdata('GroupID');	
				$this->load->view('templates/header/header_MicroBlog', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('MicroBlog',$logindata);
				$this->load->view('templates/footer/footer_MicroBlog');				
			}	
		}
		elseif($this->session->userdata('userrole')==-1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username')!='')
		{
			$this->load->view('framework/lockscreen');
		}
		else{
			$this->load->view('login');
		}
		
	}

	//添加日志
	public function AddLog()
	{
		$MicroBlogData = array(			
	        'UserName'  => $this->session->userdata('username'),       
	        'RecordTime'  => date("Y-m-d G:i:s"),
	        'BlogHTML'  => $this->input->post('BlogHTML'),
	        'HideBlog' => 0,//默认每条记录均显示
		);
		if ($MicroBlogData['BlogHTML']) {
			$LogOutput = $this->MicroBlogModel->AddMicroBlog($MicroBlogData);
			$this->output->set_output(json_encode($LogOutput));
		}else
		{
			$this->output->set_output("您没有权限进行该操作");
		}
		
	}

	//日志主要信息查询
	public function QueryLogInfo()
	{
		$UserName = $this->session->userdata('username');
		$Nums = $this->input->post('Nums');
		$TimeStart = $this->input->post('TimeStart');
		$TimeEnd = $this->input->post('TimeEnd');
		$CurID = $this->input->post('CurID');
		$LogData = $this->MicroBlogModel->ShowMicroBlog($Nums,$TimeStart,$TimeEnd,$CurID,$UserName);
		$this->output->set_output($LogData);
	}

	//读取指定Log
	public function ReadLog()
	{
		$ID = $this->input->post('ID');
		$LogData = $this->MicroBlogModel->ReadLog($ID);
		//$this->output->set_output(json_encode($LogData));
		$this->output->set_output($LogData);
	}
	
	//保存日志设置
	public function SaveLogQuerySettings()
	{
		$Settings = array(
			'UserName' => $this->session->userdata('username'),
			'NumsID' => $this->input->post('NumsID'),
			'RefreshTime' => $this->input->post('RefreshTime'),
			'AutoRefresh' => $this->input->post('AutoRefresh'),
		);
		$LogData = $this->MicroBlogModel->SaveLogQuerySettings($Settings);
		$this->output->set_output(json_encode($LogData));
	}
	//读取日志设置
	public function ReadLogQuerySettings()
	{
		$Settings = array(
			'UserName' => $this->session->userdata('username'),
		);
		$LogData = $this->MicroBlogModel->ReadLogQuerySettings($Settings);
		$this->output->set_output($LogData);
	}
}

