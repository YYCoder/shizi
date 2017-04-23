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
	 * @return [array] => data [所有申请, 二维数组]
	 *                 => page  => page_count(数据可显示的页面数)
     *                        => current_page(当前所在页面数)
	 */
	public function get_my_apply()
	{

	}





}
