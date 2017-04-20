<?php
/**
 * 课程管理模型
 * @author   Markey
 * @date     2017-04-20
 */
class Course_Model extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * 添加排课
	 * @param  $data(必传)
	 * @return [Array] => status[状态, 成功为1, 失败为0]
	 *                 => id[添加进去的数据的id]
	 */
	public function add($data)
	{
		$res = $this->db->insert('course-teacher', $data);
		$id = $this->db->insert_id();

		return array(
			'id'     => $id,
			'status' => $res
		);
	}














}
