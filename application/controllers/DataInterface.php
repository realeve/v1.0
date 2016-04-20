<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class DataInterface extends CI_Controller {
	const PRE_STR 	= 'QCCenter';//字符前缀
	public function __construct()
	{
	  	parent::__construct();
		$this->load->helper ( array (
			'form',
			'url' 
		) );
		$this->load->library('session');
		$this->load->model('DataInterfaceModel');
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
				$logindata = $this->session->userdata;
				$logindata['CreateID'] = $this->GetNewApiID();
				$logindata['token'] = sha1(self::PRE_STR.$this->DataInterfaceModel->TransToGBK($logindata['username']));
				$this->load->view('templates/header/header_DataInterface', $logindata);
				$this->load->view('templates/header/topmenu');
				$this->load->view('templates/sidebar');
				$this->load->view('DataInterface',$logindata);
				$this->load->view('templates/footer/footer_DataInterface');				
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

	//新建接口的ID编号
	public function GetNewApiID()
	{
		return $this->DataInterfaceModel->GetNewApiID($this->session->userdata('username'));
	}

	//保存接口
	public function SaveAPI()
	{
		$APIData = $this->input->post(NULL);
		//转换Params
		$string1 = "";
		foreach ($APIData['params'] as $str) $string1 .= $str . ",";
		$APIData['params'] = rtrim($string1, ",");
		$APIData['AuthorName'] = $this->session->userdata('username');
		$ReturnData = $this->DataInterfaceModel->SaveAPI($APIData);
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
	public function Api()//读取接口数据
	{
		$APIData = $this->input->get(NULL);
		$Data = $this->DataInterfaceModel->Api($APIData);

		//增加跨域请求权限_2015_12_31
		if (isset($APIData['callback'])) {
			$Data = $APIData['callback'] . "(" . $Data . ")";
		}
		//输出数据
	 	$this->output->set_output($Data);
	}

	public function insert()
	{
		$data = $this->input->post(NULL);
		if (!isset($data['tbl'])) {
        	$data['message'] = '请指定插入的表单名称';
            $data['type'] = 0;        
        	$this->output->set_output(json_encode($data));  
        	return;
        };
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
        $this->output->set_output(json_encode($returnData));
	}

	/**删、改操作保留字段：
		"utf2gbk": ["ApiName","strSQL","Params"],//字段以数组形式保存
        "id": ID,//对ID操作
        "tbl":30 //表单名
    */
	public function delete()//读取接口数据
	{
		$data = $this->input->post(NULL);
		if (!isset($data['tbl'])) {
        	$data['message'] = '请指定插入的表单名称';
            $data['type'] = 0;        
        	$this->output->set_output(json_encode($data));  
        	return;
        };
		if ($this->DataInterfaceModel->delete($data)) {
            $returnData['message'] = '删除数据成功';
            $returnData['type'] = 1;
        } else {
            $returnData['message'] = '删除数据失败';
            $returnData['type'] = 0;
        };
        $this->output->set_output(json_encode($returnData));
	}

	public function update()//读取接口数据
	{
		$data = $this->input->post(NULL);
		/*if (!isset($data['utf2gbk'])) {
        	$data['utf2gbk']=[];
        };*/
		if (!isset($data['tbl'])) {
        	$data['message'] = '请指定插入的表单名称';
            $data['type'] = 0;        
        	$this->output->set_output(json_encode($data));  
        	return;
        };
		if ($this->DataInterfaceModel->update($data)) {
            $returnData['message'] = '更新数据成功';
            $returnData['type'] = 1;
        } else {
            $returnData['message'] = '更新数据失败';
            $returnData['type'] = 0;
        };
        $this->output->set_output(json_encode($returnData));
	}
	
	public function convert2Base64()//读取接口数据
	{
		$this->DataInterfaceModel->convert2Base64();
	}
}

