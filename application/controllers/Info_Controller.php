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
     * 修改用户头像
     */
    public function upload_avatar()
    {
        if (!empty($_FILES['avatar']))
        {
            $res = $this->uploadImg();
            $param = array(
                'avatar' => str_replace('G:/study/shizi', $this->config->item('base_url'), $res['full_path'])
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

    /**
     * 获取全部专业信息
     */
    public function get_majors()
    {
        $res = $this->Mult_Model->get_major();
        if (!empty($res))
        {
            $this->return_data(array(
                'majors' => $res
            ));
        }
        else
        {
            $this->return_error('获取专业失败');
        }
    }

    /**
     * 添加老师
     */
    public function add_teacher()
    {
        $data = $_POST;
        // 非空字段验证
        $not_empty_items = array(
            'name'      =>        $data['name'],
            'avatar'    =>        $data['avatar'],
            'sex'       =>        $data['sex'],
            'major'     =>        $data['major'],
            'title'     =>        $data['title'],
            'graduation'=>        $data['graduation'],
            'mobile'    =>        $data['mobile'],
            'salary'    =>        $data['salary'],
            'idCode'    =>        $data['idCode'],
            'entry'     =>        $data['entry']
        );
        $not_empty_res = $this->has_empty($not_empty_items);
        if (!$not_empty_res['status']) {
            $error_msg;
            switch ($not_empty_items['name']) {
                case 'name': $error_msg = '姓名不能为空';
                      break;
                case 'avatar': $error_msg = '请上传头像';
                      break;
                case 'sex': $error_msg = '性别不能为空';
                      break;
                case 'major': $error_msg = '专业不能为空';
                      break;
                case 'title': $error_msg = '职称不能为空';
                      break;
                case 'graduation': $error_msg = '毕业院校不能为空';
                      break;
                case 'mobile': $error_msg = '手机号不能为空';
                      break;
                case 'salary': $error_msg = '薪资不能为空';
                      break;
                case 'idCode': $error_msg = '身份证号不能为空';
                      break;
                case 'entry': $error_msg = '入职时间不能为空';
                      break;
            }
            $this->return_error($error_msg);
        }
        // 修改一些字段名与数据库中一致
        $data['entry_time'] = strtotime($data['entry']);
        unset($data['entry']);
        $data['birthday'] = strtotime($data['birthday']);
        $data['mid'] = $data['major'];
        unset($data['major']);
        $data['self_descp'] = $data['self'];
        unset($data['self']);
        $data['id_code'] = $data['idCode'];
        unset($data['idCode']);
        $data['teach_year'] = $data['teachYear'];
        unset($data['teachYear']);
        $data['exp_1_college'] = isset($data['expCollege1']) ? $data['expCollege1']
                                                             : '';
        $data['exp_1_time'] = isset($data['expTime1']) ? $data['expTime1']
                                                       : '';
        $data['exp_1_descp'] = isset($data['expDescp1']) ? $data['expDescp1']
                                                         : '';
        $data['exp_2_college'] = isset($data['expCollege2']) ? $data['expCollege2']
                                                             : '';
        $data['exp_2_time'] = isset($data['expTime2']) ? $data['expTime2']
                                                       : '';
        $data['exp_2_descp'] = isset($data['expDescp2']) ? $data['expDescp2']
                                                         : '';
        $data['exp_3_college'] = isset($data['expCollege3']) ? $data['expCollege3']
                                                             : '';
        $data['exp_3_time'] = isset($data['expTime3']) ? $data['expTime3']
                                                       : '';
        $data['exp_3_descp'] = isset($data['expDescp3']) ? $data['expDescp3']
                                                         : '';
        unset($data['expCollege1']);
        unset($data['expCollege2']);
        unset($data['expCollege3']);
        unset($data['expTime1']);
        unset($data['expTime2']);
        unset($data['expTime3']);
        unset($data['expDescp1']);
        unset($data['expDescp2']);
        unset($data['expDescp3']);
        $res = $this->Info_Model->add($data);
        // var_dump($data);
        if ($res['status'] == 1) {
            $this->return_data(array(
                'id' => $res['id'],
            ));
        }
        else {
            $this->return_error('添加老师档案失败');
        }
    }

}








