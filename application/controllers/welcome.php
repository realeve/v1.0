<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

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

				$this->load->view('templates/header', $logindata);  
				$this->load->view('templates/sidebar');
				$this->load->view('welcome',$logindata);
				$this->load->view('templates/footer');
				//$this->load->view('templates/worklog/footer_worklog');
			}	
		}
		elseif($this->session->userdata('userrole')==-1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username'))
		{
			$this->load->view('framework/lockscreen');
		}
		else{
			$this->load->view('login');
		}
		
	}

	 //登录
  public function trylogin(){
	$UserName = $this->input->post('username');
	$Password = md5($this->input->post('password'));

	if($this->session->userdata('userrole')==-1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username')!='')//如果注销
	{
		$this->load->view('framework/lockscreen');
	}

	$logindata = $this->LoginModel->logincheck($UserName,$Password);
	if ($logindata['logged_in'] == true) {
		if ($logindata['userrole'] >0) {//帐号激活
			$this->session->set_userdata($logindata);

			$this->load->view('templates/header', $logindata);  
			$this->load->view('templates/sidebar');
			$this->load->view('welcome',$logindata);
			$this->load->view('templates/footer');
		}
		else//未激活
		{
			$logindata['message'] = $this->loginMessage(6);//未激活
			$this->load->view('login', $logindata);
		}
		
	}
	else
	{
		//$this->output->set_output(json_encode($logindata));
		$logindata['message'] = $this->loginMessage($logindata['message']);
		$this->load->view('login', $logindata);
	}

  }

  //注册
  public function register(){
	 $RegisterData = array(
		'UserName' => $this->input->post('username'),
		'UserPassword' => md5($this->input->post('password')),
		'FullName' => $this->input->post('fullname'),
		'Email' => $this->input->post('email'),
		'Phone' => $this->input->post('phone'),
		'DepartMent' => $this->input->post('department'),
		'regIPAdress' => $this->input->ip_address(),
		'UserRole' => 0,
		'regTime' =>  date("Y-m-d H:i:s")
	  );
	 //$this->output->set_output(json_encode($RegisterData));
	 $RegisterOutput = $this->LoginModel->UserRegistry($RegisterData);
	 $RegisterOutput['message'] = $this->loginMessage($RegisterOutput['message']);
	 $this->load->view('login', $RegisterOutput);//注册完毕
  }

	public function resetpassword()
	{
		$ResetData = array(
			'UserName' => $this->input->post('username'),
			'UserPassword' => md5($this->input->post('password')),		
			'Email' => $this->input->post('email')
		);
		$ResetOutput = $this->LoginModel->ResetPassword($ResetData);
		$ResetOutput['message'] = $this->loginMessage($ResetOutput['message']);
	 	$this->load->view('login', $ResetOutput);//注册完毕
	}

	public function lockscreen()
	{
		$array_items = array('userrole' => '-1','logged_in'=>'true');
		$this->session->set_userdata($array_items);//设置数据
		if ($this->session->userdata('username')=='') {
			$logindata['message'] = '';
			$this->load->view('login', $logindata);
			return;
		}
		//$this->output->set_output(json_encode($this->session->userdata));
		$this->load->view('framework/lockscreen');
	}

	public function logout()
	{
		$array_items = array('username' => '', 'password'=>'','email' => '','userrole' => '','logged_in'=>'');
		$this->session->unset_userdata($array_items);//清除数据
		$this->session->sess_destroy();//注销
		$logindata['message'] = '';
		$this->load->view('login', $logindata);
	}

	//注销后重登录
  public function relogin(){
	$UserName = $this->session->userdata('username');
	$Password = md5($this->input->post('password'));
	$logindata = $this->LoginModel->logincheck($UserName,$Password);
	if ($logindata['logged_in'] == true) {
		if ($logindata['userrole'] >0) {//帐号激活
			$this->session->set_userdata($logindata);
			$this->load->view('templates/header', $logindata);  
			$this->load->view('templates/sidebar');
			$this->load->view('welcome',$logindata);
			$this->load->view('templates/footer');
		}
		else//未激活
		{
			$logindata['message'] = $this->loginMessage(6);//未激活
			$this->load->view('login', $logindata);
		}
	}
	else
	{
		$this->load->view('framework/lockscreen');
	}

  }

  	//返回的提示信息
	public function loginMessage($message){
  		$strMes='';
  		switch($message){
		case 2:
			$strMes="<div class=\"alert alert-danger\">
						<button class=\"close\" data-close=\"alert\"></button>
						<span>
						用户名或密码错误. </span>
					</div>";
			break;
		case 3:
			$strMes="<div class=\"alert alert-danger\">
						<button class=\"close\" data-close=\"alert\"></button>
						<span>
						该用户已存在. </span>
					</div>";
			break;
		case 4:
			$strMes="<div class=\"alert alert-danger\">
						<button class=\"close\" data-close=\"alert\"></button>
						<span>
						注册信息写入失败，请稍后重试. </span>
					</div>";
			break;
		case 5:
			$strMes="<div class=\"alert alert-success\">
						<button class=\"close\" data-close=\"alert\"></button>
						<span>
						注册成功，请联系管理员激活该帐号. </span>
					</div>";
			break;
		case 6:
			$strMes="<div class=\"alert alert-info\">
						<button class=\"close\" data-close=\"alert\"></button>
						<span>
						帐号未激活，请联系管理员激该帐号. </span>
					</div>";
			break;
		case 7:
			$strMes="<div class=\"alert alert-danger\">
						<button class=\"close\" data-close=\"alert\"></button>
						<span>
						用户名或邮件地址错误，请重新输入. </span>
					</div>";
			break;
		case 8:
			$strMes="<div class=\"alert alert-success\">
						<button class=\"close\" data-close=\"alert\"></button>
						<span>
						密码重置成功，请重新登录. </span>
					</div>";
			break;
		default:
			$strMes="";
			break;
		}
		return $strMes;
	 }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */