<?php

/**
* 教师档案模型
* @author Markey
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
	 * 获取老师用户档案(单一用户获取)
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
	 * 查询所有符合条件的数据, 并排序
	 * @param  [object] $param => type[String](asc按升序排列, desc按降序排列)
	 *                         => item[String](code按编号排列, age按年龄排列, entry按入职时间排列)
	 *                         => where[String](模糊匹配姓名,出生年月(时间戳),编号,专业,手机)
	 * @return [array]         [所有查询到的数据]
	 */
	public function get_all($param)
	{
		$res = array();
		if (!empty($param)) {
			$this->db->from('teacher')
 							 ->join('major', 'teacher.mid = major.id');

			if (!empty($param->where)) {
				$this->db->where('teacher.id', $param->where)
								 ->or_where('teacher.mobile', $param->where)
								 ->or_where('teacher.birthday', $param->where)
								 ->like('teahcer.name', $param->where)
								 ->or_like('major.name', $param->where);
			}
		}
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
