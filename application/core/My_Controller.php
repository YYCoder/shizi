<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 基础数据接口类
 * @author whyCoder
 * @date   2017-01-24
 */
class My_Controller extends CI_Controller
{
    
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('string');
    }

    /**
     * 返回json
     * @param  [array]  $data       
     */
    public function return_json($data)
    {
        header('Content-Type:application/json; charset=utf-8');
        exit(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    /**
     * 返回数据
     * @param  [array]||[string](若为string, 则默认为'msg'字段)
     */
    public function return_data($inp = '')
    {
        $data = array(
            'code' => 0,
            'msg'  => '操作成功',
            'data' => array()
        );
        if (is_string($inp) && !empty($inp))
        {
            $data['msg'] = $inp;
        }
        else if (is_array($inp))
        {
            // !empty($inp['msg']) && ($data['msg'] = $inp['msg']);
            $data['data'] = $inp;
        }
        
        $this->return_json($data);
    }

    /**
     * 返回错误信息
     * @param  [array]||[string](若为string, 则默认为'msg'字段)
     */
    public function return_error($inp = '')
    {
        $data = array(
            'code' => 1,
            'msg'  => '操作失败',
            'data' => array()
        );
        if (is_string($inp) && !empty($inp))
        {
            $data['msg'] = $inp;
        }
        else if (is_array($inp))
        {
            $data['data'] = $inp;
        }
        
        $this->return_json($data);
    }

    /**
     * 上传头像
     * @param  
     */
    public function uploadImg()
    {
        $config = array(
            'upload_path' => './uploads/img/',
            'allowed_types' => 'gif|png',
            'max_size' => '2048',
            'max_width' => '1200',
            'max_height' => '1200',
            'file_name' => random_string('alnum', 16)
        );
        $this->load->library('upload', $config);
        if ($this->upload->do_upload('avatar'))
        {
            $data = $this->upload->data();
            return $data;
        }
        else
        {
            $error = array('upload_error' => $this->upload->display_errors());
            $this->return_error($error);
        }
    }


    /**
     * 判断登录方法
     */
    public function is_login()
    {
        if (!empty($_SESSION['user']))
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }




}






