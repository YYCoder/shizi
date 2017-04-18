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
     * 验证并处理档案数据, 并返回处理后的数据(内部验证不通过直接退出并报错)
     * @param  [Array] $data [处理前的数据]
     * @return [Array]       [处理后的数据]
     */
    private function handle_info($data)
    {
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
        if ($not_empty_res['status']) {
            $error_msg;
            // 懒得验证别的乱七八糟的了, 干脆就验证非空, 前端大部分都验证过了
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

        return $data;
    }

    /**
     * 添加老师
     */
    public function add_teacher()
    {
        $data = $this->handle_info($_POST);
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

    /**
     * 修改老师档案
     * @return [Array] => status[true或false]
     */
    public function mod_teacher()
    {
        $data = $this->handle_info($_POST);
        $res = $this->Info_Model->mod_info($data);
        if ($res == 1) {
            $this->return_data(array(
                'status' => $res
            ));
        }
        else {
            $this->return_error('修改老师档案失败');
        }
    }

    /**
     * 获取用户的档案信息
     * @return [Array] [该用户的档案信息]
     */
    public function get_info()
    {
        $uid = $_SESSION['user']['id'];
        $res = $this->Info_Model->get_info($uid);
        // 处理值为时间戳的字段
        $res['entry_time'] = !empty($res['entry_time']) ? date('Y-m-d', $res['entry_time']) : '';
        $res['birthday'] = !empty($res['birthday']) ? date('Y-m-d', $res['birthday']) : '';
        if (!empty($res)) {
            $this->return_data(array(
                'data' => $res
            ));
        }
        else {
            $this->return_error('获取用户档案失败');
        }
    }

    /**
     * 删除指定id的项
     * @param  $_GET => id[String]  [要删除项的id]
     */
    public function delete_info()
    {
        $id = $_POST['id'];
        if (!empty($id)) {
            $res = $this->Info_Model->delete_info($id);
            if ($res == 1) {
                $this->return_data('删除成功');
            }
            else {
                $this->return_error('删除失败');
            }
        }
        else {
            $this->return_error('请选择要删除的项');
        }
    }

    /**
     * 删除多项记录
     * @param $_POST  =>  ids[Array] [要删除的记录id数组]
     */
    public function delete_mult_info()
    {
        $ids = $_POST['ids'];
        $res = $this->Info_Model->delete_mult_info($ids);
        if ($res == 1) {
            $this->return_data('删除成功');
        }
        else {
            $this->return_error('删除失败');
        }
    }


    /**
     * 获取全部档案, 或按条件搜索档案
     * @param  [array] $_GET  => sortType[String](ASC按升序排列, DESC按降序排列)
     *                        => sortItem[String](code按编号排列, age按年龄排列, entry按入职时间排列)
     *                        => where[String](模糊匹配姓名,编号,专业,手机)
     *                        => page[String](要前往的页数)
     *                        => limit[String](每页显示多少个,默认为10)
     *
     * @return [Array] => data [获取到的全部档案数据,二维数组]
     *                 => page     => page_count(数据可显示的页面数)
     *                             => current_page(当前所在页面数)
     */
    public function get_all_info()
    {
        $param = array(
            'type' => !empty($_GET['sortType']) ? $_GET['sortType'] : 'ASC',
            'page' => $_GET['page'],
            'where'=> $_GET['where']
        );
        $res = array();

        // 处理item字段为跟数据库中字段名一致,在模型中可以直接使用
        if (empty($_GET['sortItem']) || $_GET['sortItem'] == 'code') {
            $param['item'] = 'id';
        }
        elseif ($_GET['sortItem'] == 'age') {
            $param['item'] = 'birthday';
        }
        elseif ($_GET['sortItem'] == 'entry') {
            $param['item'] = 'entry_time';
        }
        // 处理limit相关字段
        $param['limit'] = array(
            'number'  =>  (int)($_GET['page'] - 1) * (int)$_GET['limit'],
            'count'   =>  (int)$_GET['limit']
        );

        // var_dump($param);
        $res_temp = $this->Info_Model->get_all($param);
        $res['data'] = $res_temp['data'];
        $page_count = ceil($res_temp['count']/$param['limit']['count']);
        $res['page'] = array(
            'page_count'    =>  $page_count,
            'current_page'  =>  $param['page']
        );
        if (!empty($res['data']) && $page_count > 0) {
            foreach ($res['data'] as $k => $v) {
                // birthday字段改成年龄
                if (!empty($v['birthday'])) {
                    $age = floor((time() - (int)$v['birthday']) / (60*60*24*365));
                    $res['data'][$k]['age'] = $age;
                }
                else {
                    $res['data'][$k]['age'] = '未知';
                }
                // entry_time字段,改成2017-04-10格式的时间字符串
                $res['data'][$k]['entry_time'] = date('Y-m-d', $v['entry_time']);
                // sex字段改成'男','女'或'未知''
                $res['data'][$k]['sex'] = $v['sex'] == 0 ? '未知' :
                                          $v['sex'] == 1 ? '男' : '女';
                // address为空改成'未知'
                $res['data'][$k]['address'] = empty($v['address']) ? '未知' : $v['address'];
            }
            $this->return_data($res);
        }
        else {
            $this->return_error('未查询到相关数据');
        }
    }


    /**
     * 获取所有数据可显示的页数
     * @param  $_GET   =>  limit[Number]  每页显示的记录个数(默认为10)
     * @return [Number]    能显示的页数
     */
    public function get_page_count()
    {
        $limit_number = (int)$_GET['limit'] || 10;
        $count = $this->Info_Model->get_page_count($limit_number);
        $this->return_data($count);
    }


}








