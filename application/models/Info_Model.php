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

	/**
	 * 获取老师档案
	 * @param   string   $id||$uid   [教师id||用户id]
	 * @return  [Array]  [档案信息]
	 */
	public function get_info($id)
	{
		$res = $this->db
								->from('teacher')
								->where('id = '.$id.' OR uid = '.$id)
								->get()
								->row();
		return $res;
	}

	/**
	 * 修改老师档案
	 * @param  [String]    $data  	[档案信息, 必须包括档案id]
   * @return [Boolean] 	 修改状态
	 */
	public function mod_info($data)
	{
		$res = $this->db
								->where('id', $data['id'])
								->update('teacher', $data);
		return $res;
	}














}
