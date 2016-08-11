<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class PaperPara extends CI_Controller {

	public function __construct()
	{
	  	parent::__construct();
		$this->load->helper ( array (
			'form',
			'url'
		) );
		$this->load->library('session');
	}

	//物理指标
	public function index()
	{
		//$this->output->set_output(json_encode($this->session->userdata));//调试
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_paperpara', $logindata);
				$this->load->view('templates/header/topmenu');
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
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_paperpara', $logindata);
				$this->load->view('templates/header/topmenu');
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
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_paperpara', $logindata);
				$this->load->view('templates/header/topmenu');
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

	//机检验证
	public function validate()
	{
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_paperpara', $logindata);
				$this->load->view('templates/header/topmenu');
				$this->load->view('templates/sidebar');
				$this->load->view('PaperPara_validate',$logindata);
				$this->load->view('templates/footer/footer_paper_validate');
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

	//大张废录入
	public function fakepiece()
	{
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_paperpara', $logindata);
				$this->load->view('templates/header/topmenu');
				$this->load->view('templates/sidebar');
				$this->load->view('print_fakepiece',$logindata);
				$this->load->view('templates/footer/footer_print_fakepiece');
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

	//钞纸误废
	public function falsewaste()
	{
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_paperpara', $logindata);
				$this->load->view('templates/header/topmenu');
				$this->load->view('templates/sidebar');
				$this->load->view('paper_falsewaste',$logindata);
				$this->load->view('templates/footer/footer_paper_falsewaste');
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

	//批量报废
	public function batchwaste()
	{
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_paperpara', $logindata);
				$this->load->view('templates/header/topmenu');
				$this->load->view('templates/sidebar');
				$this->load->view('paper_batchwaste',$logindata);
				$this->load->view('templates/footer/footer_paper_batchwaste');
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

	//考核记录
	public function penalty()
	{
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_paperpara', $logindata);
				$this->load->view('templates/header/topmenu');
				$this->load->view('templates/sidebar');
				$this->load->view('paper_penalty',$logindata);
				$this->load->view('templates/footer/footer_paper_penalty');
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
	
	//非常规指标
	public function abnormal()
	{
		if ($this->session->userdata('userrole')>0)
		{
			if($this->session->userdata('logged_in')==true)
			{
				$logindata = $this->session->userdata;
				$this->load->view('templates/header/header_paperpara', $logindata);
				$this->load->view('templates/header/topmenu');
				$this->load->view('templates/sidebar');
				$this->load->view('paper_abnormal',$logindata);
				$this->load->view('templates/footer/footer_paper_abnormal');
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
}

