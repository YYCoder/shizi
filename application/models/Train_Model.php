<?php
/**
 * 培训管理模型
 * @author   Markey
 * @date     2017-04-23
 */
class Train_Model extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * 添加培训申请
	 * @param  [array] $data [要添加的数据]
	 * @return [array] => status [1成功, 0失败]
	 *                 => id [添加的数据的id]
	 */
	public function insert_apply($data)
	{
		$res = array();
		$res['status'] = $this->db->insert('train_apply', $data);
		$res['id'] = $this->db->insert_id();
		return $res;
	}



}
