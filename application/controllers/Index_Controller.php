<?php
/**
 * 首页控制器
 * @author whyCoder
 * @date   2017-02-01
 */
class Index_Controller extends My_Controller
{

    public function __construct()
    {
        parent::__construct();
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
     * 获取用户的档案(教师)信息
     * @return [String] [0档案不全, 1档案完整]
     */
    public function check_info()
    {
        $uid = $_SESSION['user']['id'];
        $info = $this->Info_Model->get_info($uid);
        $res = 0;
        $check_item = array(
            'mid'           =>  $info->mid,
            'entry_time'    =>  $info->entry_time,
            'title'         =>  $info->title,
            'graduation'    =>  $info->graduation,
            'id_code'       =>  $info->id_code
        );
        if (!empty($info)) {
            if (!$this->has_empty($check_item)['status']) {
                $res = 1;
            }
            $this->return_data(array(
                'status' => $res
            ));
        }
        else {
            $this->return_error('获取用户的档案失败');
        }
    }



}
