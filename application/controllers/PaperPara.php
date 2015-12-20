<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class PaperPara extends CI_Controller {

	const TBL_PHYSIC 	= 'Paper_Para_PscData';
	const TBL_CHEM		= 'Paper_Para_ChemData';
	const TBL_SURFACE 	= 'Paper_Para_SurfaceData';

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

	//物理指标
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
				$logindata['FullName'] = $this->session->userdata('FuleName');	
				$logindata['GroupID'] = $this->session->userdata('GroupID');	
				$this->load->view('templates/header/header_paperpara', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('PaperPara_Psc',$logindata);
				$this->load->view('templates/footer/footer_paper_para');				
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

	//外观指标
	public function surface()
	{
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata['logged_in'] = true;		
				$logindata['username'] = $this->session->userdata('username');
				$logindata['userrole'] = $this->session->userdata('userrole');	
				$logindata['FullName'] = $this->session->userdata('FuleName');	
				$logindata['GroupID'] = $this->session->userdata('GroupID');	
				$this->load->view('templates/header/header_paperpara', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('PaperPara_surface',$logindata);
				$this->load->view('templates/footer/footer_paper_para_surface');				
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

	//化验站
	public function chemy()
	{
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata['logged_in'] = true;		
				$logindata['username'] = $this->session->userdata('username');
				$logindata['userrole'] = $this->session->userdata('userrole');	
				$logindata['FullName'] = $this->session->userdata('FuleName');	
				$logindata['GroupID'] = $this->session->userdata('GroupID');	
				$this->load->view('templates/header/header_paperpara', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('PaperPara_Chemy',$logindata);
				$this->load->view('templates/footer/footer_paper_para_chemy');				
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

	public function insert()
	{
		$data = $this->input->post(NULL);
        $this->output->set_output(json_encode($data)); 
		if (!isset($data['tbl'])) {
        	$data['message'] = '请指定插入的表单名称';
            $data['type'] = 0;        
        	$this->output->set_output(json_encode($data));  
        	return;
        };
		$data['record_time'] = $this->DataInterfaceModel->getCurDate();
		switch ($data['tbl']) {
			case 0:
				$tblName = self::TBL_PHYSIC;
				break;
			case 1:
				$tblName = self::TBL_CHEM;
				break;
			case 2:
				$tblName = self::TBL_SURFACE;
				break;
		}  ;
		unset($data['tbl']);
        //将备注信息单独处理(中文编码问题)
        $returnData['data'] = $data;
        $data['remark'] = $this->DataInterfaceModel->TransToGBK($data['remark']);
		if ($this->DataInterfaceModel->addData($data,$tblName)) {
            #插入数据成功
            $returnData['message'] = '添加数据成功';
            $returnData['type'] = 1;
        } else {
            #插入数据失败
            $returnData['message'] = '添加数据失败';
            $returnData['type'] = 0;
        };
        $this->output->set_output(json_encode($returnData));
	}

}

