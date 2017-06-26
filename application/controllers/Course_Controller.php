<?php
/**
 * 课程管理控制器
 * @author Markey
 * @date   2017-04-19
 */
class Course_Controller extends My_Controller
{

	public function __construct()
	{
		parent::__construct();
        $this->load->Model('Mult_Model');
        $this->load->Model('Course_Model');
        $this->load->Model('Info_Model');
        $this->load->library('PHPExcel/Iofactory');
        $this->load->library('Phpexcel');
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
     * 获取所有老师
     * @return [array] [老师信息数组]
     */
    public function get_teachers()
    {
        $res = $this->Mult_Model->get_teacher();
        if (!empty($res)) {
            $this->return_data($res);
        }
        else {
            $this->return_error('获取老师信息失败');
        }
    }

    /**
     * 获取所有课程
     * @return [array] [课程信息数组]
     */
    public function get_courses()
    {
        $res = $this->Mult_Model->get_course();
        if (!empty($res)) {
            $this->return_data($res);
        }
        else {
            $this->return_error('获取课程信息失败');
        }
    }

    /**
     * 处理要添加的字段
     * @param  [type] $data [description]
     * @return [type]       [description]
     */
    private function handle_data($data)
    {
        // 节约时间, 懒得验证了
        $data['start'] = (int)floor((strtotime($data['start']) - strtotime('2017-03-09')) / (60*60*24*7)) + 1;
        $data['end'] = (int)floor((strtotime($data['end']) - strtotime('2017-03-09')) / (60*60*24*7)) + 1;
        $data['tid'] = $data['teacher'];
        $data['cid'] = $data['course'];
        unset($data['teacher']);
        unset($data['course']);
        return $data;
    }


    /**
     * 添加排课数据
     * @return [id] [排课id]
     */
    public function insert_data()
    {
        $data = $_POST['data'];
        if (count($data) > 1 && isset($data['0'])) {
            foreach ($data as $k => $v) {
                $data[$k] = $this->handle_data($v);
            }
        }
        else {
            $data = $this->handle_data($data);
        }

        $res = $this->Course_Model->add($data);
        if ((int)$res['status'] >= 1) {
            $this->return_data(array(
                'id' => $res['id']
            ));
        }
        else {
            $this->return_error('添加排课数据失败');
        }
    }

    /**
     * 我的课表获取课程
     * @return [array] [获取的课程数组]
     */
    public function get_class()
    {
        $tid = $this->Info_Model->get_info_by_uid($_SESSION['user']['id'])['id'];
        $param = array(
            'tid' => $tid,
            'start' => !empty($_GET['start']) ? $_GET['start'] : ''
        );
        $data = $this->Course_Model->get_course($param);
        $this->return_data($data);
    }


    /**
     * 下载课程表
     * @return [type] [description]
     */
    public function download()
    {
        //创建PHPExcel实例
        $excel = new PHPExcel();
        $filename = 'MarkeyExcelOn'.time().'.xlsx';
        $excel->getProperties()->setCreator($this->config->item('base_url'))
                               ->setLastModifiedBy('Markey')
                               ->setTitle('Office 2007 XLSX Document')
                               ->setSubject('Office 2007 XLSX Document')
                               ->setDescription('通过php生成的excel文档')
                               ->setKeywords('office 2007 openxml php')
                               ->setCategory('Result file');
        // 设置当前的excel文档
        $excel->setActiveSheetIndex(0);
        // 设置一些默认样式
        $excel->getDefaultStyle()->getFont()->setName(iconv('gbk', 'utf-8', '宋体'))
                                            ->setSize(15);
        $excel->getDefaultStyle()->getAlignment()
                                 ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        // 设置excel
        $excel->getActiveSheet()->setTitle('教师档案表')
                              ->setCellValue('A1', '姓名')
                              ->setCellValue('B1', '性别')
                              ->setCellValue('C1', '出生日期')
                              ->setCellValue('D1', '手机号')
                              ->setCellValue('E1', '婚否')
                              ->setCellValue('F1', '身份证')
                              ->setCellValue('G1', '毕业院校')
                              ->mergeCells('H1:I1')
                              ->setCellValue('H1', '家庭住址')
                              ->mergeCells('J1:K1')
                              ->setCellValue('J1', '专业')
                              ->setCellValue('L1', '入职时间')
                              ->setCellValue('M1', '职称')
                              ->mergeCells('N1:O1')
                              ->setCellValue('N1', '爱好');

        // 保存为临时文件
        $objWriter = Iofactory::createWriter($excel, 'Excel2007');
        $objWriter->save('tmp_file/'.$filename);

        $this->return_data(array(
            'url' => $this->config->item('base_url').'/tmp_file/'.$filename
        ));
    }


    /**
     * 获取全部档案, 或按条件搜索档案
     * @param  [array] $_GET  => type[String](ASC按升序排列, DESC按降序排列)
     *                        => item[String](tid按教师编号排列, 按start或end排列)
     *                        => where[String](模糊匹配姓名,编号,专业,手机)
     *                        => page[String](要前往的页数)
     *                        => limit[String](每页显示多少个,默认为15)
     *
     * @return [Array] => data [获取到的全部档案数据,二维数组]
     *                 => page     => page_count(数据可显示的页面数)
     *                             => current_page(当前所在页面数)
     */
    public function get_all_class()
    {
        $param = array(
            'page' => $_GET['page'],
            'where'=> $_GET['where'],
            'item' => $_GET['item'],
            'type' => $_GET['type']
        );
        $res = array();
        // 处理limit相关字段
        $param['limit'] = array(
            'number'  =>  (int)($_GET['page'] - 1) * (int)$_GET['limit'],
            'count'   =>  (int)$_GET['limit']
        );

        // var_dump($param);die;
        $res_temp = $this->Course_Model->get_all_class($param);
        $res['data'] = $res_temp['data'];
        $page_count = ceil($res_temp['count']/$param['limit']['count']);
        $res['page'] = array(
            'page_count'    =>  $page_count,
            'current_page'  =>  $param['page']
        );
        if (!empty($res['data']) && $page_count > 0) {
            $time_arr = array(
                '1' => '第一二节',
                '2' => '第三四节',
                '3' => '第五六节',
                '4' => '第七八节',
                '5' => '第九十节'
            );
            $week_arr = array(
                '1' => '周一',
                '2' => '周二',
                '3' => '周三',
                '4' => '周四',
                '5' => '周五',
                '6' => '周六',
                '7' => '周日',
            );
            foreach ($res['data'] as $k => $v) {
                $time = ''.$time_arr[$v['time']].' '.$week_arr[$v['week']];
                $res['data'][$k]['time'] = $time;
                unset($res['data'][$k]['week']);
            }
            $this->return_data($res);
        }
        else {
            $this->return_error('未查询到相关数据');
        }
    }


    /**
     * 多项删除
     * @param $_POST  =>  ids[Array] [要删除的记录id数组]
     */
    public function delete_mult_class()
    {
        $ids = $_POST['ids'];
        $res = $this->Course_Model->delete_mult_class($ids);
        if ($res == 1) {
            $this->return_data('删除成功');
        }
        else {
            $this->return_error('删除失败');
        }
    }

    /**
     * 删除指定id的项
     * @param  $_GET => id[String]  [要删除项的id]
     */
    public function delete_class()
    {
        $id = $_POST['id'];
        if (!empty($id)) {
            $res = $this->Course_Model->delete_class($id);
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
     * 修改指定id的项
     * @param $_GET => id[String](必选)   [要修改的项的id]
     *              => class[String](可选)
     *              => time[String](可选)
     *              => week[String](可选)
     *              => room[String](可选)
     *              => new_time[String](可选)
     *              => new_week[String](可选)
     *              => new_room[String](可选)
     *              => is_demand[String](可选)
     *              => uid[String](可选)
     */
    public function update_item()
    {
        $data = $_POST;
        $data['uid'] = (!empty($_POST['uid']) || $_POST['uid'] == 0) ? $_POST['uid'] : $_SESSION['user']['id'];
        if (!empty($data) && !empty($data['id'])) {
            $res = $this->Course_Model->update($data);
        }
        if ($res == '1') {
            $this->return_data();
        }
        else {
            $this->return_error('修改排课失败');
        }
    }

    /**
     * 修改指定所有的项,每项包含参数如下
     * @param $_GET[array]  => id[String](必选)   [要修改的项的id]
     *                      => class[String](可选)
     *                      => time[String](可选)
     *                      => week[String](可选)
     *                      => room[String](可选)
     *                      => new_time[String](可选)
     *                      => new_week[String](可选)
     *                      => new_room[String](可选)
     *                      => is_demand[String](可选)
     *                      => uid[String](可选)
     *                      => demand_time[String](可选)
     */
    public function update_items()
    {
        $data = $_POST['data'];
        $uid = (!empty($data['0']['uid']) || $data['0']['uid'] == 0) ? $data['0']['uid'] : $_SESSION['user']['id'];
        // 批量处理数据
        foreach ($data as $k => $v) {
            $data[$k]['uid'] = $uid;
        }
        if (!empty($data)) {
            $res = $this->Course_Model->update_items($data);
        }
        if ($res > 0) {
            $this->return_data();
        }
        else {
            $this->return_error('修改排课失败');
        }
    }


    /**
     * 获取当前老师的所有排课
     * @return [array] [获取的排课数组]
     */
    public function get_own_class()
    {
        $uid = $_SESSION['user']['id'];
        $res = $this->Course_Model->get_own_class($uid);
        if (count($res) > 0) {
            $this->return_data($res);
        }
        else {
            $this->return_error('未获取到老师的排课');
        }
    }


    /**
     * 获取所有满足条件的申请数据, 并排序
     * @param  [array] $_GET  => type[String](ASC按升序排列, DESC按降序排列)
     *                        => item[String](按申请时间排序demand_time, 按time, new_time或week, new_week排列)
     *                        => where[String](模糊匹配教师姓名,编号)
     *                        => page[String](要前往的页数)
     *                        => limit[String](每页显示多少个,默认为15)
     *
     * @return [Array] => data [获取到的全部档案数据,二维数组]
     *                 => page     => page_count(数据可显示的页面数)
     *                             => current_page(当前所在页面数)
     */
    public function get_all_demand()
    {
        $param = array(
            'page' => $_GET['page'],
            'where'=> $_GET['where'],
            'item' => $_GET['item'],
            'type' => $_GET['type']
        );
        $res = array();
        // 处理limit相关字段
        $param['limit'] = array(
            'number'  =>  (int)($_GET['page'] - 1) * (int)$_GET['limit'],
            'count'   =>  (int)$_GET['limit']
        );

        // var_dump($param);die;
        $res_temp = $this->Course_Model->get_all_demand($param);
        $res['data'] = $res_temp['data'];
        $page_count = ceil($res_temp['count']/$param['limit']['count']);
        $res['page'] = array(
            'page_count'    =>  $page_count,
            'current_page'  =>  $param['page']
        );
        if (!empty($res['data']) && $page_count > 0) {
            $time_arr = array(
                '1' => '第一二节',
                '2' => '第三四节',
                '3' => '第五六节',
                '4' => '第七八节',
                '5' => '第九十节'
            );
            $week_arr = array(
                '1' => '周一',
                '2' => '周二',
                '3' => '周三',
                '4' => '周四',
                '5' => '周五',
                '6' => '周六',
                '7' => '周日',
            );
            foreach ($res['data'] as $k => $v) {
                $res['data'][$k]['demand_time'] = date('Y-m-d  H:i', $res['data'][$k]['demand_time']);
                $res['data'][$k]['time'] = $time_arr[(string)$res['data'][$k]['time']];
                $res['data'][$k]['new_time'] = $time_arr[(string)$res['data'][$k]['new_time']];
                $res['data'][$k]['week'] = $week_arr[(string)$res['data'][$k]['week']];
                $res['data'][$k]['new_week'] = $week_arr[(string)$res['data'][$k]['new_week']];
            }
            $this->return_data($res);
        }
        else {
            $this->return_error('未查询到相关数据');
        }
    }




}
