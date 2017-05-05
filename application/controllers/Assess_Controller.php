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
        $this->load->Model('Assess_Model');
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
     * 添加考核数据
     * @param  array   $POST   [考核数据]
     * @return [status]        [1成功, 0失败]
     */
    public function insert_assess()
    {
        if (self::get_teacher_assess($_POST['tid'])) {
            parent::return_error('已存在该教师的考核成绩');
        }
        $data = array();
        // 院系考核及学生考核平均成绩
        $ca = floor(($_POST['college']['science'] + $_POST['college']['teach'] + $_POST['college']['public']) / 3);
        $sa = floor(($_POST['student']['course_quality'] + $_POST['student']['course_discipline'] + $_POST['student']['appearance']) / 3);
        // 计算平均分数
        function score($n) {
            $score = 0;
            if ($n < 60) {
                $score = 0;
            }
            elseif ($n >= 60 && $n < 70) {
                $score = 1;
            }
            elseif ($n >= 70 && $n < 90) {
                $score = 2;
            }
            else {
                $score = 3;
            }
            return $score;
        }
        $ca = score($ca);
        $sa = score($sa);
        // 用于存assess表的数据
        $data['assess'] = array(
            'tid' => $_POST['tid'],
            'college_assessment' => $ca,
            'student_assessment' => $sa,
            'average' => floor(($ca + $sa) / 2),
            'timestamp' => time(),
            'mid' => $_SESSION['user']['id']
        );
        // 用于存assess_college表的数据
        $data['assess_college'] = array(
            'tid' => $_POST['tid'],
            'science' => $_POST['college']['science'],
            'teach' => $_POST['college']['teach'],
            'public' => $_POST['college']['public']
        );
        // 用于存assess_student表的数据
        $data['assess_student'] = array(
            'tid' => $_POST['tid'],
            'course_quality' => $_POST['student']['course_quality'],
            'course_discipline' => $_POST['student']['course_discipline'],
            'appearance' => $_POST['student']['appearance']
        );
        $res = $this->Assess_Model->insert($data);
        if ($res == 1) {
            parent::return_data('操作成功');
        }
        else {
            parent::return_error('操作失败');
        }
    }


    /**
     * 获取指定教师的考核成绩
     * @return [array||boolean]
     */
    private function get_teacher_assess($tid = '')
    {
        // 若没传tid则默认为获取用户自身的tid
        if (!$tid) {
            $tid = $this->Info_Model->get_info_by_uid($_SESSION['user']['id'])['id'];
        }
        $res = $this->Assess_Model->get_teacher_assess($tid);
        // var_dump($res);die;
        if (!empty($res)) {
            return $res[0];
        }
        else {
            return FALSE;
        }
    }


    /**
     * 获取图标要显示的数据
     * @return [array] [几种类型的人数]
     */
    public function get_data()
    {
        $res = $this->Assess_Model->get_data();
        $data = array(
            '不及格' => 0,
            '及格' => 0,
            '良好' => 0,
            '优秀' => 0
        );
        foreach ($res as $k => $v) {
            if ($v['average'] == 0) {
                $data['不及格']++;
            }
            else if ($v['average'] == 1) {
                $data['及格']++;
            }
            else if ($v['average'] == 2) {
                $data['良好']++;
            }
            else if ($v['average'] == 3) {
                $data['优秀']++;
            }
        }
        parent::return_data($data);
    }

    /**
     * 处理评价数据为字符串
     * @param  [array] $data [要处理的数据]
     * @return [array]       [处理后的数据]
     */
    private function handle_data($data)
    {
        foreach ($data as $k => $v) {
            if (($k == 'student_assessment' && $v == 0) || ($k == 'college_assessment' && $v == 0) || ($k == 'average' && $v == 0)) {
                $data[$k] = '不及格';
            }
            else if (($k == 'student_assessment' && $v == 1) || ($k == 'college_assessment' && $v == 1) || ($k == 'average' && $v == 1)) {
                $data[$k] = '及格';
            }
            else if (($k == 'student_assessment' && $v == 2) || ($k == 'college_assessment' && $v == 2) || ($k == 'average' && $v == 2)) {
                $data[$k] = '良好';
            }
            else if (($k == 'student_assessment' && $v == 3) || ($k == 'college_assessment' && $v == 3) || ($k == 'average' && $v == 3)) {
                $data[$k] = '优秀';
            }
        }
        return $data;
    }


    /**
     * 获取用户自己的成绩及其他数据
     * @return [array] [数据]
     */
    public function get_own_data()
    {
        $res = self::get_teacher_assess();
        if ($res) {
            $res['time'] = date('Y-m-d H:i', $res['timestamp']);
            $res = self::handle_data($res);
            parent::return_data($res);
        }
        else {
            parent::return_error('未获取到数据');
        }
    }


    /**
     * 下载execl表格
     * @return [array] => url[string] [生成的excel文档的临时文件路径,用于返回给前端下载]
     */
    public function download()
    {
        $data = array();
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

        // 设置项目名的背景色
        $excel->getActiveSheet()->getStyle('A1')
                                ->getFill()
                                ->getStartColor()->setARGB('AA808080');
        $excel->getActiveSheet()->getStyle('B1')
                                ->getFill()
                                ->getStartColor()->setARGB('AA808080');
        // 保存为临时文件
        $objWriter = Iofactory::createWriter($excel, 'Excel2007');
        $objWriter->save('tmp_file/'.$filename);

        $this->return_data(array(
            'url' => $this->config->item('base_url').'/tmp_file/'.$filename
        ));
    }



}
