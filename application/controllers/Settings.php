<?php if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class settings extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array(
            'form',
            'url',
        ));
        $this->load->library('session');
    }

    //概览
    public function index()
    {
        //开启缓存
        //$this->output->cache(60*24);
        //$this->output->set_output(json_encode($this->session->userdata));//调试
        if ($this->session->userdata('userrole') > 0) {
            if ($this->session->userdata('logged_in') == true) {
                $logindata = $this->session->userdata;
                $this->load->view('templates/header/header_settings', $logindata);
                $this->load->view('templates/header/topmenu');
                $this->load->view('templates/sidebar');
                $this->load->view('settings', $logindata);
                $this->load->view('templates/footer/footer_settings');
            }
        } elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {
            $this->load->view('lockscreen-min');
        } else {
            $this->load->view('login');
        }

    }

    //帐户设置
    public function account()
    {
        //开启缓存
        //$this->output->cache(60*24);
        //$this->output->set_output(json_encode($this->session->userdata));//调试
        if ($this->session->userdata('userrole') > 0) {
            if ($this->session->userdata('logged_in') == true) {
                $logindata = $this->session->userdata;
                $this->load->view('templates/header/header_settings_account', $logindata);
                $this->load->view('templates/header/topmenu');
                $this->load->view('templates/sidebar');
                $this->load->view('settings_account', $logindata);
                $this->load->view('templates/footer/footer_settings_account');
            }
        } elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {
            $this->load->view('lockscreen-min');
        } else {
            $this->load->view('login');
        }

    }

    //帐户设置
    public function accountActive()
    {
        //开启缓存
        //$this->output->cache(60*24);
        //$this->output->set_output(json_encode($this->session->userdata));//调试
        if ($this->session->userdata('userrole') > 0) {
            if ($this->session->userdata('logged_in') == true) {
                $logindata = $this->session->userdata;
                $this->load->view('templates/header/header_settings_accountActive', $logindata);
                $this->load->view('templates/header/topmenu');
                $this->load->view('templates/sidebar');
                $this->load->view('settings_accountActive', $logindata);
                $this->load->view('templates/footer/footer_settings_accountActive');
            }
        } elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {
            $this->load->view('lockscreen-min');
        } else {
            $this->load->view('login');
        }

    }
    //下拉选项卡管理
    public function select()
    {
        //开启缓存
        //$this->output->cache(60*24);
        //$this->output->set_output(json_encode($this->session->userdata));//调试
        if ($this->session->userdata('userrole') > 0) {
            if ($this->session->userdata('logged_in') == true) {
                $logindata = $this->session->userdata;
                $this->load->view('templates/header/header_settings_select', $logindata);
                $this->load->view('templates/header/topmenu');
                $this->load->view('templates/sidebar');
                $this->load->view('settings_select', $logindata);
                $this->load->view('templates/footer/footer_settings_select');
            }
        } elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {
            $this->load->view('lockscreen-min');
        } else {
            $this->load->view('login');
        }

    }

    //个性化菜单
    public function menu()
    {
        //开启缓存
        //$this->output->cache(60*24);
        //$this->output->set_output(json_encode($this->session->userdata));//调试
        if ($this->session->userdata('userrole') > 0) {
            if ($this->session->userdata('logged_in') == true) {
                $logindata = $this->session->userdata;
                $this->load->view('templates/header/header_settings_menu', $logindata);
                $this->load->view('templates/header/topmenu');
                $this->load->view('templates/sidebar');
                $this->load->view('settings_menu', $logindata);
                $this->load->view('templates/footer/footer_settings_menu');
            }
        } elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {
            $this->load->view('lockscreen-min');
        } else {
            $this->load->view('login');
        }

    }

    public function updatePsw()
    {
        $postData             = $this->input->GET(null);
        $LOGINDB              = $this->load->database('sqlsvr', true);
        $tblName              = 'tblUser';
        $where                = '[id] = ' . $postData['id'] . " and UserPassword = '" . $postData['UserPassword'] . "'";
        $data['UserPassword'] = $postData['newPsw'];
        $returnData           = $LOGINDB->update($tblName, $data, $where);
        if ($returnData > 0) {
            echo '{"type":' . $returnData . ',"message":"密码更新成功"}';
        } else {
            echo '{"type":0,"message":"密码更新失败，请联系管理员或稍后重试"}';
        }
    }
}
