<?php
/**
 * 首页模块
 * @author YYCoder
 * @date   2017-01-22
 */
class Index_Controller extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->load->library('session');
		$this->load->model('Test_Model');
		// $this->login = new LoginController();
	}

	public function index()
	{
		if ( ! file_exists(APPPATH.'views/index/index.php'))
		{
			show_404();
		}

		$name = '袁野';
		$data['name'] = $name;
		$this->load->view('index/index', $data);
		// 及时关闭session, 防止并发请求对session的影响
		session_write_close();
	}
}

