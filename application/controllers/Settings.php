<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class settings extends CI_Controller {

	public function __construct()
	{
	  	parent::__construct();
		$this->load->helper ( array (
			'form',
			'url' 
		) );
		$this->load->library('session');
		$this->load->model('PaperParaModel');
		$this->load->model('DataInterfaceModel');
	}

	//概览
	public function index()
	{
		//$this->output->set_output(json_encode($this->session->userdata));//调试
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata['logged_in'] = true;		
				$logindata['username'] = $this->session->userdata('username');
				$logindata['userrole'] = $this->session->userdata('userrole');	
				$logindata['FullName'] = $this->session->userdata('FullName');	
				$logindata['GroupID'] = $this->session->userdata('GroupID');	
				$this->load->view('templates/header/header_settings', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('settings',$logindata);
				$this->load->view('templates/footer/footer_settings');				
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

	//帐户设置
	public function account()
	{
		//$this->output->set_output(json_encode($this->session->userdata));//调试
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata['logged_in'] = true;		
				$logindata['username'] = $this->session->userdata('username');
				$logindata['userrole'] = $this->session->userdata('userrole');	
				$logindata['FullName'] = $this->session->userdata('FullName');	
				$logindata['GroupID'] = $this->session->userdata('GroupID');	
				$this->load->view('templates/header/header_settings', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('settings_account',$logindata);
				$this->load->view('templates/footer/footer_settings');				
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

	//下拉选项卡管理
	public function select()
	{
		//$this->output->set_output(json_encode($this->session->userdata));//调试
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata['logged_in'] = true;		
				$logindata['username'] = $this->session->userdata('username');
				$logindata['userrole'] = $this->session->userdata('userrole');	
				$logindata['FullName'] = $this->session->userdata('FullName');	
				$logindata['GroupID'] = $this->session->userdata('GroupID');	
				$this->load->view('templates/header/header_settings', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('settings_select',$logindata);
				$this->load->view('templates/footer/footer_settings');				
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

	//保存日志设置
	public function SaveSettings()
	{
		$Settings = array(
			'UserName' => $this->session->userdata('username'),
			'RefreshTime' => $this->input->post('RefreshTime'),
			'AutoRefresh' => $this->input->post('AutoRefresh'),
			'FixTblHead' => $this->input->post('FixTblHead'),
			'FixTblCol' => $this->input->post('FixTblCol'),
			'FootSearch' => $this->input->post('FootSearch'),
			'InputToggle' => $this->input->post('InputToggle'),
			'InputInner' => $this->input->post('InputInner'),
		);
		$LogData = $this->QualityChartModel->SaveSettings($Settings);//,JSON_UNESCAPED_UNICODE
		$this->output->set_output(json_encode($LogData));
	}
	//读取日志设置
	public function ReadSettings()
	{
		$Settings = array(
			'UserName' => $this->session->userdata('username'),
		);
		$LogData = $this->QualityChartModel->ReadSettings($Settings);
		$this->output->set_output($LogData);
	}

}

