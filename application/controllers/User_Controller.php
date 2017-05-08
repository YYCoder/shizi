<?php
/**
 * 用户管理控制器
 * @author Markey
 * @date   2017-05-08
 */
class User_Controller extends My_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->Model('User_Model');
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



}
