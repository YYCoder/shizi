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





}
