<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Worklog extends CI_Controller {

	public function __construct()
	{
	  	parent::__construct();
		$this->load->helper ( array (
			'form',
			'url' 
		) );
		$this->load->library('session');
		$this->load->model('WorkLogModel');
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
				$this->load->view('templates/header/header_worklog', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('worklog',$logindata);
				$this->load->view('templates/footer/footer_worklog');				
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

	public function editlog()
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
				$logindata['FullName'] = $this->session->userdata('FullName');
				$logindata['GroupID'] = $this->session->userdata('GroupID');	
				$logindata['curDate'] = date("Y-m-d G:i:s");
				$this->load->view('templates/header/header_worklog_edit', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('worklog_edit',$logindata);
				$this->load->view('templates/footer/footer_worklog_edit');
				
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

	//日志主要信息查询
	public function QueryLogInfo()
	{
		$qurayData = $this->input->post(NULL);
		$LogData = $this->WorkLogModel->ShowWorkLog($qurayData);
		$this->output->set_output($LogData);
	}

	//保存日志设置
	public function SaveLogQuerySettings()
	{
		$Settings = $this->input->post(NULL);
		$Settings['UserName'] = $this->session->userdata('username');
		$LogData = $this->WorkLogModel->SaveLogQuerySettings($Settings);
		$this->output->set_output(json_encode($LogData));
	}
	//读取日志设置
	public function ReadLogQuerySettings()
	{
		$Settings = array(
			'UserName' => $this->session->userdata('username'),
		);
		$LogData = $this->WorkLogModel->ReadLogQuerySettings($Settings);
		$this->output->set_output($LogData);
	}
}

