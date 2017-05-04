<?php
/**
* 考核管理模型
* @author Markey
* @date   2017-05-04
*/
class Assess_Model extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}


	/**
	 * 插入数据
	 * @param  [array] $data  [要插入的数据, 二维数组]
	 * @return [array] [状态, 1成功, 0失败]
	 */
	public function insert($data = array())
	{
		// 每个表的插入状态, 三个状态都为1才算成功
		$res = array(
			'assess' => 0,
			'assess_college' => 0,
			'assess_student' => 0
		);
		$res['assess'] = $this->db->insert('assess', $data['assess']);
		$res['assess_college'] = $this->db->insert('assess_college', $data['assess_college']);
		$res['assess_student'] = $this->db->insert('assess_student', $data['assess_student']);
		if ($res['assess'] == 1 && $res['assess_college'] == 1 && $res['assess_student'] == 1) {
			return 1;
		}
		else {
			return 0;
		}
	}


	/**
	 * 获取指定教师的考核总成绩
	 * @param  [string] $tid [教师id]
	 * @return [array]
	 */
	public function get_teacher_assess($tid)
	{
		$data = $this->db->from('assess')
										 ->where('tid', $tid)
										 ->get()
										 ->result_array();
		return $data;
	}



}
