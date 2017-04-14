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
        $this->load->model('Mult_Model');
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
     * 判断用户的档案(教师)是否完整
     * @return [String] [0档案不全, 1档案完整]
     */
    public function check_info()
    {
        $uid = $_SESSION['user']['id'];
        $info = $this->Info_Model->get_info_by_uid($uid);
        $res = 0;
        $check_item = array(
            'mid'           =>  $info['mid'],
            'entry_time'    =>  $info['entry_time'],
            'title'         =>  $info['title'],
            'graduation'    =>  $info['graduation'],
            'id_code'       =>  $info['id_code']
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


    /**
     * 获取教师信息详情(不传id则默认显示该用户的信息)
     * @return [array] [档案详情数组]
     */
    public function info_detail()
    {
        $res;
        if ($_GET['id']) {
            $res = $this->Info_Model->get_info($_GET['id']);
        }
        else {
            $res = $this->Info_Model->get_info_by_uid($_SESSION['user']['id']);
        }
        // 懒得再改获取用户信息方法的联表了,干脆再查一次major表把major名并进去
        $major = $this->Mult_Model->get_major($res['mid']);
        $res['major'] = $major[0]['name'];

        if (!empty($res)) {
            // entry_time,birthday字段,改成2017-04-10格式的时间字符串
            $res['entry_time'] = date('Y-m-d', $res['entry_time']);
            $res['birthday'] = !empty($res['birthday']) ? date('Y-m-d', $res['birthday']) : '未知';
            // sex字段改成'男','女'或'未知''
            $res['sex'] = $res['sex'] == 0 ? '未知' :
                          $res['sex'] == 1 ? '男' : '女';
            // address为空改成'未知'
            $res['address'] = empty($res['address']) ? '未知' : $res['address'];
            $res['direction'] = empty($res['direction']) ? '未知' : $res['direction'];
            $res['postcode'] = empty($res['postcode']) ? '未知' : $res['postcode'];
            $res['exp_1_time'] = !empty($res['exp_1_time']) ? $res['exp_1_time'].'年' :
                                                  $res['exp_1_college'] ? '不到1年' : '';
            $res['exp_2_time'] = !empty($res['exp_2_time']) ? $res['exp_2_time'].'年' :
                                                  $res['exp_2_college'] ? '不到1年' : '';
            $res['exp_3_time'] = !empty($res['exp_3_time']) ? $res['exp_3_time'].'年' :
                                                  $res['exp_3_college'] ? '不到1年' : '';
            $this->return_data($res);
        }
        else {
            $this->return_error('查询档案失败');
        }
    }



}
