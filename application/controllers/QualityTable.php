<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class QualityTable extends CI_Controller {

	public function __construct()
	{
	  	parent::__construct();
		$this->load->helper ( array (
			'form',
			'url' 
		) );
		$this->load->library('session');
		$this->load->model('QualityTableModel');
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
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_QualityTable', $logindata); 
				$this->load->view('templates/header/topmenu');
				$this->load->view('templates/sidebar');
				$this->load->view('QualityTable',$logindata);
				$this->load->view('templates/footer/footer_QualityTable');				
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
	public function QueryData()//通用接口
	{
		$TimeStart = $this->input->get('TimeStart');
		$TimeEnd = $this->input->get('TimeEnd');
		$Data = $this->QualityTableModel->ShowQualityTable($TimeStart,$TimeEnd);
		$this->output->set_output($Data);
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
		$LogData = $this->QualityTableModel->SaveSettings($Settings);//,JSON_UNESCAPED_UNICODE
		$this->output->set_output(json_encode($LogData));
	}
	//读取日志设置
	public function ReadSettings()
	{
		$Settings = array(
			'UserName' => $this->session->userdata('username'),
		);
		$LogData = $this->QualityTableModel->ReadSettings($Settings);
		$this->output->set_output($LogData);
	}

}

