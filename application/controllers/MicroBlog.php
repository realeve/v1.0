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
		//开启缓存
		$this->output->cache(60*24);
		//$this->output->set_output(json_encode($this->session->userdata));//调试
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_MicroBlog', $logindata);  
				$this->load->view('templates/header/topmenu');
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

	//日志主要信息查询
	public function ReadMicroBlog()
	{
		$qurayData = $this->input->post(NULL);
		//$qurayData['UserName'] = $this->session->userdata('username');
		$LogData = $this->MicroBlogModel->ReadMicroBlog($qurayData);
		$this->output->set_output($LogData);
	}

	//保存日志设置
	public function SaveSettings()
	{
		$Settings = $this->input->post(NULL);
		$Settings['UserName'] = $this->session->userdata('username');
		if (isset($Settings['NumsID'])) {
			$LogData = $this->MicroBlogModel->SaveSettings($Settings);
			$this->output->set_output(json_encode($LogData));
		}else
		{
			$str['message'] = "您没有权限进行该操作";
			$this->output->set_output(json_encode($str));
		}
	}
	//读取日志设置
	public function ReadSettings()
	{
		$Settings = array(
			'UserName' => $this->session->userdata('username'),
		);
		$LogData = $this->MicroBlogModel->ReadSettings($Settings);
		$this->output->set_output($LogData);
	}
}

