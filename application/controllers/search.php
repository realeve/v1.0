<?php
class search extends CI_Controller
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
        //开启缓存
        //$this->output->cache(60*24);
        if ($this->session->userdata('userrole') > 0) {
            if ($this->session->userdata('logged_in') == true) {
                $logindata = $this->session->userdata;
                $this->load->view('templates/header/header_search', $logindata);
                $this->load->view('templates/header/topmenu');
                $this->load->view('templates/sidebar');
                $this->load->view('search', $logindata);
                $this->load->view('templates/footer/footer_search');
            }
        } elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {
            $this->load->view('lockscreen-min');
        } else {
            $this->load->view('login');
        }
    }

    public function paper()
    {
        //开启缓存
        //$this->output->cache(60*24);
        if ($this->session->userdata('userrole') > 0) {
            if ($this->session->userdata('logged_in') == true) {
                $logindata = $this->session->userdata;
                $this->load->view('templates/header/header_search', $logindata);
                $this->load->view('templates/header/topmenu');
                $this->load->view('templates/sidebar');
                $this->load->view('search_paper', $logindata);
                $this->load->view('templates/footer/footer_search_paper');
            }
        } elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {
            $this->load->view('lockscreen-min');
        } else {
            $this->load->view('login');
        }
    }

    public function feedback()
    {
        //开启缓存
        //$this->output->cache(60*24);
        if ($this->session->userdata('userrole') > 0) {
            if ($this->session->userdata('logged_in') == true) {
                $logindata = $this->session->userdata;
                $this->load->view('templates/header/header_search_feedback', $logindata);
                $this->load->view('templates/header/topmenu');
                $this->load->view('templates/sidebar');
                $this->load->view('search_feedback', $logindata);
                $this->load->view('templates/footer/footer_search_feedback');
            }
        } elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {
            $this->load->view('lockscreen-min');
        } else {
            $this->load->view('login');
        }
    }

    public function image()
    {
        //开启缓存
        //$this->output->cache(60*24);
        if ($this->session->userdata('userrole') > 0) {
            if ($this->session->userdata('logged_in') == true) {
                $logindata = $this->session->userdata;
                $this->load->view('templates/header/header_search_feedback', $logindata);
                $this->load->view('templates/header/topmenu');
                $this->load->view('templates/sidebar');
                $this->load->view('search_image', $logindata);
                $this->load->view('templates/footer/footer_search_image');
            }
        } elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {
            $this->load->view('lockscreen-min');
        } else {
            $this->load->view('login');
        }
    }
};
