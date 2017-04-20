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
     * 添加排课数据
     * @return [id] [排课id]
     */
    public function insert_data()
    {
        $data = $_POST['data'];
        // 节约时间, 懒得验证了
        $data['start'] = (int)floor((strtotime($data['start']) - strtotime('2017-03-09')) / (60*60*24*7)) + 1;
        $data['end'] = (int)floor((strtotime($data['end']) - strtotime('2017-03-09')) / (60*60*24*7)) + 1;
        $data['tid'] = $data['teacher'];
        $data['cid'] = $data['course'];
        unset($data['teacher']);
        unset($data['course']);
        $res = $this->Course_Model->add($data);
        if ($res['status'] == '1') {
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
     * @return [type] [description]
     */
    public function get_class()
    {
        # code...
    }







}
