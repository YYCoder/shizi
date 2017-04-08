<?php

/**
* 教师档案模型
* @author [Markey]
* @date   2017-04-08
*/
class Info_Model extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * 添加老师档案
	 * @param    data[Array] 	[要添加的数据]
	 * @return   [Array] => status[状态, 成功为1, 失败为0]
	 *                   => id[添加进去的数据的id]
	 */
	public function add($data = array())
	{
		$res = $this->db->insert('teacher', $data);
		$id = $this->db->insert_id();
		return array(
			'status' => 	$res,
			'id' 		 => 	$id
		);
	}

















}
