<?php
/**
 * 首页模块
 * @author YYCoder
 * @date   2017-01-22
 */
class IndexController extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->load->library('session');
		// $this->login = new LoginController();
	}

	public function index()
	{
		if ( ! file_exists(APPPATH.'views/index/index.php'))
		{
			show_404();
		}

		if ( ! isset($_SESSION['id']))
		{
			// $this->login->do_login();
		}

		$this->load->view('index/index');
		// 及时关闭session, 防止并发请求对session的影响
		session_write_close();
	}
}

