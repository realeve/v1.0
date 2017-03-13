<?php
class dashboard extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('session');
        $this->load->helper(array(
            'url',
        ));
    }

    public function index()
    {

        if ($this->session->userdata('userrole') > 0) {
            if ($this->session->userdata('logged_in') == true) {
                $logindata = $this->session->userdata;
                $this->load->view('templates/header/header_search_feedback', $logindata);
                $this->load->view('templates/header/topmenu');
                $this->load->view('templates/sidebar');
                $this->load->view('dashboard', $logindata);
                $this->load->view('templates/footer/footer_dashboard');
            }
        } elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {
            $this->load->view('lockscreen-min');
        } else {
            $this->load->view('login');
        }
    }
};
