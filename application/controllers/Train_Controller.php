<?php
/**
 * 培训管理控制器
 * @author Markey
 * @date   2017-04-23
 */
class Train_Controller extends My_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Train_Model');
		$this->load->model('Info_Model');
	}

	public function index()
	{
		$data = array(
        'base_url' => $this->config->item('base_url')
    );
    if ($this->is_login())
    {
        $this->load->view('home.html', $data);
    }
    else
    {
        $this->load->view('login.html', $data);
    }
	}


	/**
	 * 添加申请
	 * @return [array] => status [1成功, 0失败]
	 *                 => id [添加的数据的id]
	 */
	public function insert_apply()
	{
		$data = $_POST;
		if (!$this->is_login()) {
        $this->load->view('login.html', $data);
        die;
    }
		$data['tid'] = $this->Info_Model->get_info_by_uid($_SESSION['user']['id'])['id'];
		$data['timestamp'] = time();
		$data['begin_time'] = time();
		$res = $this->Train_Model->insert_apply($data);
		if ($res['status'] == 1) {
			parent::return_data($res);
		}
		else {
			parent::return_error('添加培训申请失败');
		}
	}


	/**
	 * 获取该用户的所有申请
	 * @param  [array] $_GET  => type[String](ASC按升序排列, DESC按降序排列)
	 *                        => item[String](按申请时间begin_time排序)
	 *                        => page[String](要前往的页数)
	 *                        => limit[String](每页显示多少个,默认为15)
	 * @return [array] => data [所有申请, 二维数组]
	 *                 => page  => page_count(数据可显示的页面数)
   *                          => current_page(当前所在页面数)
	 */
	public function get_my_apply()
	{
		// 先检查是否已登录
		if (!$this->is_login()) {
        $this->load->view('login.html', $data);
        die;
    }

		$param = array(
        'page' => $_GET['page'],
        'item' => $_GET['item'],
        'type' => $_GET['type']
    );
    $res = array();
    $res_temp = array();
    // 处理limit相关字段
    $param['limit'] = array(
        'number'  =>  (int)($_GET['page'] - 1) * (int)$_GET['limit'],
        'count'   =>  (int)$_GET['limit']
    );
    // 获取该用户的tid
		$tid = $this->Info_Model->get_info_by_uid($_SESSION['user']['id'])['id'];
		$param['where'] = $tid;
		$res_temp = $this->Train_Model->get_my_apply($param);

    $res['data'] = $res_temp['data'];
    $page_count = ceil($res_temp['count']/$param['limit']['count']);
    $res['page'] = array(
        'page_count'    =>  $page_count,
        'current_page'  =>  $param['page']
    );
		if (!empty($res['data'])) {
			// 处理数据
			$state_arr = array(
				'0' => '未审核',
				'1' => '审核通过',
				'2' => '审核未通过',
				'3' => '用户撤销',
				'4' => '超过有效时长'
			);
			$type_arr = array(
				'0' => '岗前培训',
				'1' => '教育技术培训',
				'2' => '教师发展技术研修',
				'3' => '青年教师教学能力培训',
				'4' => '外语培训',
				'5' => '科研能力与师德培训',
				'6' => '管理干部培训'
			);
			foreach ($res['data'] as $k => $v) {
				$res['data'][$k]['begin_time'] = date('Y-m-d H:i', $v['begin_time']);
				$res['data'][$k]['state'] = $state_arr[$res['data'][$k]['state']];
				$res['data'][$k]['type'] = $type_arr[$res['data'][$k]['type']];
			}
			parent::return_data($res);
		}
		else {
			parent::return_error('未获取到数据');
		}
	}


	/**
	 * 更新指定id申请数据
	 * @param  $_GET => id(必须)
	 *               => 其余字段可选
	 * @return [string] [1成功, 0失败]
	 */
	public function update_item()
	{
		$data = $_POST;
		if (empty($data['id'])) {
			parent::return_error('请指定要修改的数据');
		}
		$data['timestamp'] = time();
		$res = $this->Train_Model->update_item($data);
		if ($res == 1) {
			parent::return_data('更新数据成功');
		}
		else {
			parent::return_error('更新数据失败');
		}
	}


	/**
	 * 更新指定id反馈数据
	 * @param  $_GET => id(必须)
	 *               => 其余字段可选
	 * @return [string] [1成功, 0失败]
	 */
	public function update_feedback_item()
	{
		$data = $_POST;
		if (empty($data['id'])) {
			parent::return_error('请指定要修改的数据');
		}
		$data['timestamp'] = time();
		$res = $this->Train_Model->update_feedback_item($data);
		if ($res == 1) {
			parent::return_data('更新数据成功');
		}
		else {
			parent::return_error('更新数据失败');
		}
	}


	/**
	 * 获取该用户所有已审核通过的培训申请
	 * @return [array] [二维数组, 所有已通过的申请]
	 */
	public function get_my_passed_apply()
	{
		// 先检查是否登录
		if (!$this->is_login()) {
        $this->load->view('login.html', $data);
        die;
    }
    // 获取用户的tid
		$tid = $this->Info_Model->get_info_by_uid($_SESSION['user']['id'])['id'];
		$res = $this->Train_Model->get_my_passed_apply($tid);

		if (!empty($res)) {
			parent::return_data($res);
		}
		else {
			parent::return_error('未获取到数据');
		}
	}


	/**
	 * 上传结业证书||发票
	 * @param  $_POST  =>  type(必须) [0为证书, 1为发票]
	 * @return [string] [文件地址]
	 */
	public function upload_file()
	{
		$type = $_POST['type'];
		$name = $_FILES['file']['name'];
 		$config = array(
        'max_size' => '4048',
        'file_name' => random_string('alnum', 16),
        'allowed_types' => 'jpeg|jpg|png'
    );
 		// 用于返回文件的地址
    $url = $this->config->item('base_url').'/uploads/file/';
 		if ($type == 0) {
        $config['upload_path'] = './uploads/file/cert';
        $url .= 'cert/';
 		}
 		else {
        $config['upload_path'] = './uploads/file/invoice';
        $url .= 'invoice/';
 		}
    // 先加载上传类, 并将配置参数传入
    $this->load->library('upload', $config);
    // do_upload参数为上传文件的字段名,成功返回true,反之失败
    if ($this->upload->do_upload('file'))
    {
      	// 上传成功返回文件信息
        $data = $this->upload->data();
        $url .= $data['file_name'];
        parent::return_data(array(
        	'url'  =>  $url,
        	'type' =>  $type,
        	'name' =>  $name
      	));
    }
    else
    {
      // 上传失败返回错误信息
        $error = array('upload_error' => $this->upload->display_errors());
        parent::return_error($error);
    }
	}


	/**
	 * 添加反馈信息
	 * @return [id](string) [排课id]
	 */
	public function insert_feedback()
	{
		$data = $_POST;
		$data['end_time'] = strtotime($data['end_time']);
		$data['timestamp'] = time();
		$res = $this->Train_Model->insert($data);

		if ($res['status'] == 1) {
			parent::return_data(array(
				'id' => $res['id']
			));
		}
		else if ($res['status'] == 2) {
			parent::return_error('您已经反馈过该培训了');
		}
		else {
			parent::return_error('添加反馈信息失败');
		}
	}


	/**
	 * 获取该用户的所有反馈
	 * @param  [array] $_GET  => type[String](ASC按升序排列, DESC按降序排列)
	 *                        => item[String](按申请时间end_time排序)
	 *                        => page[String](要前往的页数)
	 *                        => limit[String](每页显示多少个,默认为15)
	 * @return [array] => data [所有申请, 二维数组]
	 *                 => page  => page_count(数据可显示的页面数)
   *                          => current_page(当前所在页面数)
	 */
	public function get_my_feedback()
	{
		// 先检查是否已登录
		if (!$this->is_login()) {
        $this->load->view('login.html', $data);
        die;
    }

		$param = array(
        'page' => $_GET['page'],
        'item' => $_GET['item'],
        'type' => $_GET['type']
    );
    $res = array();
    $res_temp = array();
    // 处理limit相关字段
    $param['limit'] = array(
        'number'  =>  (int)($_GET['page'] - 1) * (int)$_GET['limit'],
        'count'   =>  (int)$_GET['limit']
    );
    // 获取该用户的所有train_id
		$tid = $this->Info_Model->get_info_by_uid($_SESSION['user']['id'])['id'];
    $train_ids = array();
		$trains = $this->Train_Model->get_my_apply(array(
				'page' => $_GET['page'],
        'item' => 'begin_time',
        'type' =>	'ASC',
        'where'=> $tid,
        'limit'=> array(
					'number'  =>  (int)($_GET['page'] - 1) * (int)$_GET['limit'],
	        'count'   =>  (int)$_GET['limit']
      	)
		));
		foreach ($trains['data'] as $k => $v) {
			$train_ids[$k] = $v['id'];
		}
		$param['where'] = $train_ids;
		// var_dump($param);die;
		$res_temp = $this->Train_Model->get_my_feedback($param);

    $res['data'] = $res_temp['data'];
    $page_count = ceil($res_temp['count']/$param['limit']['count']);
    $res['page'] = array(
        'page_count'    =>  $page_count,
        'current_page'  =>  $param['page']
    );
		if (!empty($res['data'])) {
			// 处理数据
			$state_arr = array(
				'0' => '未审核',
				'1' => '审核通过',
				'2' => '审核未通过',
				'3' => '用户撤销',
				'4' => '超过有效时长'
			);
			$type_arr = array(
				'0' => '岗前培训',
				'1' => '教育技术培训',
				'2' => '教师发展技术研修',
				'3' => '青年教师教学能力培训',
				'4' => '外语培训',
				'5' => '科研能力与师德培训',
				'6' => '管理干部培训'
			);
			foreach ($res['data'] as $k => $v) {
				$res['data'][$k]['end_time'] = date('Y-m-d H:i', $v['end_time']);
				$res['data'][$k]['state'] = $state_arr[$res['data'][$k]['state']];
				$res['data'][$k]['type'] = $type_arr[$res['data'][$k]['type']];
			}
			parent::return_data($res);
		}
		else {
			parent::return_error('未获取到数据');
		}
	}




}
