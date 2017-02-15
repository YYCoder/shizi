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
        $this->load->model('User_Model');
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
     * 修改用户头像
     */
    public function upload_avatar()
    {
        if (!empty($_FILES['avatar']))
        {
            $res = $this->uploadImg();
            $param = array(
                'avatar' => str_replace('/Users/bjhl/myServer/shizi', $this->config->item('base_url'), $res['full_path'])
            );
            if (!empty($res))
            {
                $this->return_data(array(
                    'avatar' => $param['avatar']
                ));
            }
            else
            {
                $this->return_error('上传头像失败');
            }
        }
    }



}








