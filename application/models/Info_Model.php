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
								->row_array();
		return $res;
	}

	/**
	 * 通过uid获取对应的档案
	 * @param  [string] $uid [用户id]
	 * @return [array]       [档案信息]
	 */
	public function get_info_by_uid($uid)
	{
		$res = $this->db
								->from('teacher')
								->where('uid = '.$uid)
								->get()
								->row_array();
		return $res;
	}

	/**
	 * 查询所有符合条件的数据, 并排序
	 * @param  [array] $param => type[String](ASC按升序排列, DESC按降序排列)
	 *                        => item[String](id按编号排列, birthday按出生年月排列, entry_time按入职时间排列)
	 *                        => where[String](模糊匹配姓名,编号,专业,手机)
	 *                        => limit[Array] => number[Number](要从第几条数据开始返回)
	 *                         								=> count[Number](每页显示多少个)
	 * @return [array]  =>  data     [所有查询到的数据]
	 *                  =>	count    [满足条件的数据行数]
	 */
	public function get_all($param)
	{
		// var_dump($param);
		$res = array();
		// 先清空缓存的SQL
		$this->db->flush_cache();

		if (!empty($param)) {
			$this->db->start_cache()
							 ->from('teacher')
 							 ->join('major', 'teacher.mid = major.id')
 							 ->select('teacher.id, teacher.name, uid, avatar, birthday, sex, mid, entry_time, mobile, address, title, id_code, major.name AS major');

			if (!empty($param['where'])) {
				$this->db->where('teacher.id', $param['where'])
								 ->or_where('teacher.mobile', $param['where'])
								 ->or_like('teacher.name', $param['where'])
								 ->or_like('major.name', $param['where']);
			}
			$res['data'] = $this->db->stop_cache()
															->order_by('teacher.'.$param['item'], $param['type'])
															// 参数顺序跟sql中的LIMIT子句的参数顺序相反...
															->limit($param['limit']['count'], $param['limit']['number'])
															// ->get_compiled_select();
															->get()
															->result_array();
			// 利用CI的查询构造器缓存,获取满足条件的数据行数
			$res['count'] = $this->db->get()
															 ->num_rows();
		}
		return $res;
	}


	/**
	 * 获取所有数据可显示的页数
	 * @param  $limit[Number]  每页显示的记录个数(默认为10)
	 * @return [Number] 			 能显示的页数
	 */
	public function get_page_count($limit = 10)
	{
		$count = $this->db->count_all('teacher');
		$count = ceil($count/$limit);
		return $count;
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

	/**
	 * 删除指定id的档案
	 * @param  [String] $id [档案id]
   * @return [String] [1表示删除成功,0删除失败]
	 */
	public function delete_info($id)
	{
		$res = $this->db->where('id', $id)
										->delete('teacher');
		return $res;
	}

	/**
	 * 删除多项记录
	 * @param  [Array] $ids [要删除的记录id数组]
	 * @return [String]     [1删除成功,0失败]
	 */
	public function delete_mult_info($ids)
	{
		$ids_str = '';
		foreach ($ids as $k => $v) {
			$ids_str .= $v.',';
		}
		$ids_str = rtrim($ids_str, ',');
		$res = $this->db->where("id IN (".$ids_str.")")
										->delete('teacher');
		return $res;
	}


	/**
	 * 获取指定条件的所有教师信息
	 * @param  [array] $param [指定条件]
	 * @return [array]        [教师数组]
	 */
	public function get_teachers($param)
	{
		$res = array();
		$res = $this->db->select('avatar, teacher.id AS id, teacher.name AS name, major.name AS major, birthday, self_descp AS self')
										->where($param['item'], $param['value'])
										->from('teacher')
										->join('major', 'teacher.mid = major.id')
										->get()
										->result_array();
		return $res;
	}








}
