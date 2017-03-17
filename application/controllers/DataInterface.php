<?php if (!defined('BASEPATH')) {

    exit('No direct script access allowed');

}


class DataInterface extends CI_Controller
{

    const PRE_STR = 'QCCenter';
    //字符前缀
    public function __construct()
    {

        parent::__construct();

    }


    public function index()
    {

        $this->load->library('session');

        $this->load->helper(array(
        'url',
        ));

        $this->load->model('DataInterfaceModel');

        //开启缓存
        //$this->output->cache(60*24);


        //$this->output->set_output(json_encode($this->session->userdata));
        //调试
        if ($this->session->userdata('userrole') > 0) {

            //$this->output->set_output($logindata);
            //调试
            //$this->session->sess_destroy();
            //注销
            if ($this->session->userdata('logged_in') == true) {

                $logindata             = $this->session->userdata;

                $logindata['CreateID'] = $this->GetNewApiID();

                $logindata['token']    = sha1(self::PRE_STR . $this->DataInterfaceModel->TransToGBK($logindata['username']));

                $this->load->view('templates/header/header_DataInterface', $logindata);

                $this->load->view('templates/header/topmenu');

                $this->load->view('templates/sidebar');

                $this->load->view('DataInterface', $logindata);

                $this->load->view('templates/footer/footer_DataInterface');

            }

        }
        elseif ($this->session->userdata('userrole') == -1 && $this->session->userdata('logged_in') == true && $this->session->userdata('username') != '') {

            $this->load->view('lockscreen-min');

        }
        else {

            $this->load->view('login');

        }


    }


    //新建接口的ID编号
    public function GetNewApiID()
    {

        $this->load->library('session');

        $this->load->model('DataInterfaceModel');

        return $this->DataInterfaceModel->GetNewApiID($this->session->userdata('username'));

    }


    //保存接口
    public function SaveAPI()
    {

        $this->load->library('session');

        $this->load->model('DataInterfaceModel');

        $APIData = $this->input->post(null);

        //转换Params
        $string1 = "";

        foreach ($APIData['params'] as $str) {

            $string1 .= $str . ",";

        }


        $APIData['params']     = rtrim($string1, ",");

        $APIData['AuthorName'] = $this->session->userdata('username');

        $ReturnData            = $this->DataInterfaceModel->SaveAPI($APIData);

        $this->output->set_output(json_encode($ReturnData));

    }



    /*Api信息读取
    Author:所有者
    ApiID:接口编号
    M:
    0.默认所有数据;
    1.输出列名;
    2.预览模式;
    3.DataTables数据格式；
    'edit'.API编辑模式；
    */

    public function Api() //读取接口数据

    {

        $APIData = $this->input->get(null);


        $t1 = microtime(true);


        //默认参数
        if (!isset($APIData['Token'])) {

            $APIData['Token'] = '79d84495ca776ccb523114a2120e273ca80b315b';

        }

        if (!isset($APIData['M'])) {

            $APIData['M'] = 3;

        }


        //数据缓存处理(根据查询参数做K-V缓存);

        if (isset($APIData['cache']) && $APIData['cache'] > 0) {


            //数据缓存
            $this->load->driver('cache',
            array('adapter' => 'apc', 'backup' => 'file') //,'key_prefix' => 'api_'
            );


            $keyName = 'api_data';

            foreach ($APIData as $key => $value) {

                $keyName .= "_" . $key . "_" . $value;

            }


            $keyName = strtolower($keyName);


            //echo '开始读取缓存...<br>';

            //if ( ! $Data = $this->cache->get($keyName)){

            if (!$Data = $this->cache->get($keyName)) {

                $minutes = $APIData['cache'];

                unset($APIData['cache']);


                $this->load->model('DataInterfaceModel');


                //缓存未命中，读取原始数据
                $Data = $this->DataInterfaceModel->Api($APIData);

                //echo '未取得缓存...<br>';

                //缓存数据
                // Save into the cache for n minutes
                $this->cache->save($keyName, $Data, $minutes * 60);

            }
            else {

                //echo '当前数据来于缓存...<br>';

                $minutes = $APIData['cache'];

                unset($APIData['cache']);


                $Data = str_replace('{"rows"', '{"cache":' . $minutes . ',"rows"', $Data);

                }

            }
            else {

                //无需缓存
                //echo '实时读取';

                $this->load->model('DataInterfaceModel');

                $Data = $this->DataInterfaceModel->Api($APIData);

            }


            //增加跨域请求权限_2015_12_31
            if (isset($APIData['callback'])) {
                $Data = $APIData['callback'] . "(" . $Data . ")";
            }

            $t2   = microtime(true);
            $Data = str_replace('"rows"', '"timing":"' . round(($t2 - $t1) * 1000, 3) . 'ms","rows"', $Data);
            if (isset($APIData['callback'])) {
                $this->output->set_output($Data);
                return;
            }

            //输出数据 CROS
            $this->output->set_header('Access-Control-Allow-Origin:http://localhost:8080')
            ->set_header('Access-Control-Allow-Methods:GET,POST,PUT')
            ->set_header('Access-Control-Allow-Headers: x-requested-with,content-type')
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($Data));
            //$this->output->set_output($Data);

        }


        public function insert()
        {
            $this->load->model('DataInterfaceModel');
            $data = $this->input->post(null);

            if (!isset($data['tbl']) && !isset($data['tblname'])) {
                $data = $this->input->get(null);
            }

            if (!isset($data['tbl'])) {
                $data['tbl'] = 99;

	            if (!isset($data['tblname'])) {

	                $data['message'] = '请指定表单名称';

	                $data['type']    = 0;

	                $this->output->set_output(json_encode($data));
	                return;
	            }
            }

            $insertID = $this->DataInterfaceModel->insert($data);
            $returnData['id'] = $insertID;

            if ($insertID) {
                #插入数据成功
                $returnData['message'] = '添加数据成功';
                $returnData['type'] = 1;
            } else {
                #插入数据失败
                $returnData['message'] = '添加数据失败';
                $returnData['type'] = 0;
            };

            $returnData['data'] = $data;
            if (isset($data['callback'])) {

                $returnData = $data['callback'] . "(" . json_encode($returnData) . ")";

                $this->output->set_header('Access-Control-Allow-Origin:http://localhost:8080')
                ->set_header('Access-Control-Allow-Methods:GET,POST,PUT')
                ->set_header('Access-Control-Allow-Headers: x-requested-with,content-type')
                ->set_output($returnData);
                return;
            }
            $this->output->set_header('Access-Control-Allow-Origin:http://localhost:8080')
            ->set_header('Access-Control-Allow-Methods:GET,POST,PUT')
            ->set_header('Access-Control-Allow-Headers: x-requested-with,content-type')
            ->set_output(json_encode($returnData));
        }



        /**删、改操作保留字段：
        "utf2gbk": ["ApiName","strSQL","Params"],//字段以数组形式保存
        "id": ID,//对ID操作
        "tbl":30 //表单名
        */

        public function delete() //读取接口数据

        {

            $this->load->model('DataInterfaceModel');

            $data = $this->input->post(null);

             if (!isset($data['tbl'])) {
                $data['tbl'] = 99;

	            if (!isset($data['tblname'])) {

	                $data['message'] = '请指定表单名称';

	                $data['type']    = 0;

	                $this->output->set_output(json_encode($data));
	                return;
	            }
            }

            if ($this->DataInterfaceModel->delete($data)) {

                $returnData['message'] = '删除数据成功';

                $returnData['type']    = 1;
            }
            else {

                $returnData['message'] = '删除数据失败';

                $returnData['type']    = 0;
            };

            if (isset($data['callback'])) {

                $returnData = $data['callback'] . "(" . json_encode($returnData) . ")";

                $this->output->set_header('Access-Control-Allow-Origin:http://localhost:8080')
                ->set_header('Access-Control-Allow-Methods:GET,POST,PUT')
                ->set_header('Access-Control-Allow-Headers: x-requested-with,content-type')
                ->set_content_type('application/json', 'utf-8')
                ->set_output($returnData);

                return;

            }

            $this->output->set_header('Access-Control-Allow-Origin:http://localhost:8080')
            ->set_header('Access-Control-Allow-Methods:GET,POST,PUT')
            ->set_header('Access-Control-Allow-Headers: x-requested-with,content-type')
            //->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($returnData));

        }


        public function update() //读取接口数据

        {

            $this->load->model('DataInterfaceModel');

            $data = $this->input->post(null);

            if (!isset($data['tbl']) && !isset($data['tblname'])) {
                $data = $this->input->get(null);
            }

            if (!isset($data['tbl'])) {
                $data['tbl'] = 99;

	            if (!isset($data['tblname'])) {

	                $data['message'] = '请指定表单名称';

	                $data['type']    = 0;

	                $this->output->set_output(json_encode($data));
	                return;
	            }
            }


            if ($this->DataInterfaceModel->update($data)) {

                $returnData['message'] = '更新数据成功';

                $returnData['type']    = 1;

            }
            else {

                $returnData['message'] = '更新数据失败';

                $returnData['type']    = 0;

            }
            ;


            if (isset($data['callback'])) {

                $returnData = $data['callback'] . "(" . json_encode($returnData) . ")";

                $this->output->set_header('Access-Control-Allow-Origin:http://localhost:8080')
                ->set_header('Access-Control-Allow-Methods:GET,POST,PUT')
                ->set_header('Access-Control-Allow-Headers: x-requested-with,content-type')
                //->set_content_type('application/json', 'utf-8')
                ->set_output($returnData);

                return;

            }

            $this->output->set_header('Access-Control-Allow-Origin:http://localhost:8080')
            ->set_header('Access-Control-Allow-Methods:GET,POST,PUT')
            ->set_header('Access-Control-Allow-Headers: x-requested-with,content-type')
            //->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($returnData));

        }


        public function convert2Base64() //读取接口数据

        {

            $this->load->model('DataInterfaceModel');

            $this->DataInterfaceModel->convert2Base64();

        }


        public function md5()
        {

            $sourseStr = $this->input->get(null);

            $targetStr = '';

            foreach ($sourseStr as $key => $str) {

                $targetStr .= ',"' . $key . '":"' . md5($str) . '"';

            }

            echo '{' . substr($targetStr, 1, strlen($targetStr) - 1) . '}';

        }


        public function sha1()
        {

            $sourseStr = $this->input->get(null);

            $targetStr = '';

            foreach ($sourseStr as $key => $str) {

                $targetStr .= ',"' . $key . '":"' . sha1($str) . '"';

            }

            echo '{' . substr($targetStr, 1, strlen($targetStr) - 1) . '}';

        }


        public function base64()
        {


            /*转换图片为base64编码*/

            $src                  = $this->input->get('src');

            $image_info           = getimagesize($src);

            $base64_image_content = "data:{$image_info['mime']};base64," . chunk_split(base64_encode(file_get_contents($src)));

            //echo '{"data":"'.rtrim($base64_image_content).'"}';

            echo rtrim($base64_image_content);

        }


        public function clearCache()
        {

            $memcache = new Memcache;

            $memcache->connect('127.0.0.1', 11211);

            //清空缓存
            $memcache->flush();

        }


        public function deleteCache()
        {

            $key      = $this->input->get('key');

            $memcache = new Memcache;

            $memcache->connect('127.0.0.1', 11211);

            $keyList = $memcache->delete($key);

            $keyList = $memcache->get('keyList');

            if ($keyList != '') {

                $keyList = json_decode($keyList[0]);

                unset($keyList->$key);

            }

            $memcache->set('keyList', strtolower(json_encode($keyList)));

        }

        public function listCache()
        {

            $memcache = new Memcache;

            $memcache->connect('127.0.0.1', 11211);


            $keyList = $memcache->get('keyList');

            if ($keyList != '') {

                $keyList = json_decode($keyList[0]);

                foreach ($keyList as $key => $item) {

                    echo $key . '<br>';

                }

            }

        }

    }