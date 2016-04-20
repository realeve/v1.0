<?php
class Login extends CI_Controller {

  public function __construct()
  {
    parent::__construct();
	$this->load->helper ( array (
		'form',
		'url' 
	) );
	$this->load->library('session');
    $this->load->model('LoginModel');
  }

  public function index(){
  	//$this->output->set_output(json_encode($this->session->userdata));//调试
	if ( $this->session->userdata('userrole')>0 )
	{
		$logindata['logged_in'] = true;		
		$logindata['username'] = $this->session->userdata('username');
		$logindata['userrole'] = $this->session->userdata('userrole');	
		$logindata['FullName'] = $this->session->userdata('FullName');
		$logindata['GroupID'] = $this->session->userdata('GroupID');		
		$this->load->view('templates/header', $logindata);
		$this->load->view('templates/header/topmenu');
		$this->load->view('templates/sidebar');
		$this->load->view('welcome',$logindata);
		$this->load->view('templates/footer');
	}
	elseif($this->session->userdata('userrole')==-1 && $this->session->userdata('logged_in') == true)
	{
		$this->load->view('framework/lockscreen');
	}
	else
	{
		$logindata['type'] = 0;
		$logindata['message'] = $this->loginMessage(0);
		$this->output->set_output(json_encode($logindata));
	}
	
  }
};