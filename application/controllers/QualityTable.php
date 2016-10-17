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
	}

	public function index()
	{
		//开启缓存
		//$this->output->cache(60*24);
		if ($this->session->userdata('userrole')>0)
		{
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
			$this->load->view('lockscreen-min');
		}
		else{
			$this->load->view('login');
		}
		
	}
}

