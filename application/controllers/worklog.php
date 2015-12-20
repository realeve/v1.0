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
				$this->load->view('templates/header/header_worklog', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('worklog_edit',$logindata);
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

	//添加日志
	public function AddLog()
	{
		$WorkLogData = array(
			'WorkProcID'  => $this->input->post('WorkProc'),
	        'WorkClassID'  => $this->input->post('WorkClass'),
	        'MachineID'  => $this->input->post('MachineName'),
	        'ProductID'  => $this->input->post('ProductName'),
	        'ProStatusID'  => $this->input->post('ProStatus'),
	        'ProTime'  => $this->input->post('ProTime'),
	        'ProUserName'  => $this->input->post('ProUserName'),
	        'TransUserName'  => $this->input->post('TransUserName'),
	        'ProInfo'  => $this->input->post('ProInfo'),
	        'ReportOutput'  => $this->input->post('ReportOutput'),
	        'RecordUserName'  => $this->input->post('RecordUserName'),
	        'RecordTime'  => $this->input->post('RecordTime'),
	        'MainErrDescID'  => $this->input->post('MainDesc'),
	        'SubErrDescID'  => $this->input->post('SubDesc'),
	        'ErrDescHTML'  => $this->input->post('ErrDescHTML')
		);
		if ($WorkLogData['WorkProcID']) {
			$LogOutput = $this->WorkLogModel->AddWorkLog($WorkLogData);
			$this->output->set_output(json_encode($LogOutput));
		}else
		{
			$this->output->set_output("您没有权限进行该操作");
		}
		
	}

	//日志主要信息查询
	public function QueryLogInfo()
	{
		$ProcID = $this->input->post('ProcID');
		$Nums = $this->input->post('Nums');
		$Status = $this->input->post('Status');
		$TimeStart = $this->input->post('TimeStart');
		$TimeEnd = $this->input->post('TimeEnd');
		$CurID = $this->input->post('CurID');
		$LogData = $this->WorkLogModel->ShowWorkLog($ProcID,$Nums,$Status,$TimeStart,$TimeEnd,$CurID);
		$this->output->set_output($LogData);
	}

	//读取指定Log
	public function ReadLog()
	{
		$ID = $this->input->post('ID');
		$LogData = $this->WorkLogModel->ReadLog($ID);
		//$this->output->set_output(json_encode($LogData));
		$this->output->set_output($LogData);
	}

	//保存日志设置
	public function SaveLogQuerySettings()
	{
		$Settings = array(
			'UserName' => $this->session->userdata('username'),
			'ProcID' => $this->input->post('ProcID'),
			'NumsID' => $this->input->post('NumsID'),
			'Status' => $this->input->post('Status'),
			'RefreshTime' => $this->input->post('RefreshTime'),
			'AutoRefresh' => $this->input->post('AutoRefresh'),
		);
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

