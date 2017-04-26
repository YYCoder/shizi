<?php
/**
 * 考核管理控制器
 * @author Markey
 * @date   2017-04-26
 */
class Assess_Controller extends My_Controller
{

	public function __construct()
	{
		parent::__construct();
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
