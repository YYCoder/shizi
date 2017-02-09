<?php
/**
 * 档案管理控制器
 * @author whyCoder
 * @date   2017-02-09
 */
class Info_Controller extends My_Controller
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








