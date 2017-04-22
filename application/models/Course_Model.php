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
		if (count($data) > 1 && isset($data['0'])) {
			$res = $this->db->insert_batch('course-teacher', $data);
			$id = $this->db->insert_id();
		}
		else {
			$res = $this->db->insert('course-teacher', $data);
			$id = $this->db->insert_id();
		}
		return array(
			'id'     => $id,
			'status' => $res
		);
	}

	/**
	 * 获取满足条件的课程数据
	 * @param $arg[array] => tid[老师id](可选)
	 *                    => start[开始周数](可选)
	 */
	public function get_course($arg = array())
	{
		$this->db->select('course-teacher.id AS id, tid, cid, start, end, class, time, week, room, course.name AS course_name')
						 ->from('course-teacher')
						 ->join('course', 'course.id = course-teacher.cid')
						 ->join('teacher', 'teacher.id = course-teacher.tid');
		if (!empty($arg['tid'])) {
			$this->db->where(array('tid' => $arg['tid']));
		}
		if (!empty($arg['start'])) {
			$this->db->where('start >= '.$arg['start']);
		}

		$res = $this->db->get()
										->result_array();
		return $res;
	}

	/**
	 * 获取所有满足条件的排课, 并排序
	 * @param  [array] $param => type[String](ASC按升序排列, DESC按降序排列)
	 *                        => item[String](tid按教师编号排列, 按start或end排列)
	 *                        => where[String](模糊教师姓名,编号,课程名,授课班级名,教师名)
	 *                        => limit[Array] => number[Number](要从第几条数据开始返回)
	 *                         								=> count[Number](每页显示多少个)
	 * @return [array]  =>  data     [所有查询到的数据]
	 *                  =>	count    [满足条件的数据行数]
	 */
	public function get_all_class($param)
	{
		$res = array();
		// 先清空缓存的SQL
		$this->db->flush_cache();

		if (!empty($param)) {
			$this->db->start_cache()
							 ->from('course-teacher')
 							 ->join('teacher', 'course-teacher.tid = teacher.id')
 							 ->join('course', 'course-teacher.cid = course.id')
 							 ->select('course-teacher.id AS id, tid, teacher.name AS teacher, course.name AS course, start, end, class, time, week, room');

			if (!empty($param['where'])) {
				$this->db->where('tid', $param['where'])
								 ->or_like('course.name', $param['where'])
								 ->or_like('teacher.name', $param['where'])
								 ->or_like('class', $param['where'])
								 ->or_like('room', $param['where']);
			}
			$res['data'] = $this->db->stop_cache()
															->order_by('course-teacher.'.$param['item'], $param['type'])
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
	 * 删除多项记录
	 * @param  [Array] $ids [要删除的记录id数组]
	 * @return [String]     [1删除成功,0失败]
	 */
	public function delete_mult_class($ids)
	{
		$ids_str = '';
		foreach ($ids as $k => $v) {
			$ids_str .= $v.',';
		}
		$ids_str = rtrim($ids_str, ',');
		$res = $this->db->where("id IN (".$ids_str.")")
										->delete('course-teacher');
		return $res;
	}

	/**
	 * 删除指定id的档案
	 * @param  [String] $id [档案id]
   * @return [String] [1表示删除成功,0删除失败]
	 */
	public function delete_class($id)
	{
		$res = $this->db->where('id', $id)
										->delete('course-teacher');
		return $res;
	}

	/**
	 * 更新指定id的数据
	 * @param  [array] $data  [必须包括id]
	 * @return [string]       [受影响行数]
	 */
	public function update($data)
	{
		$res = $this->db
								->where('id', $data['id'])
								->update('course-teacher', $data);
		return $res;
	}

	/**
	 * 批量更新数据
	 * @param  [array] $data  [数据数组]
	 * @return [string]       [受影响行数]
	 */
	public function update_items($data)
	{
		$res = $this->db
								->update_batch('course-teacher', $data, 'id');
		return $res;
	}


	/**
	 * 获取指定用户id的老师的所有排课
	 * @param  [String] $uid [用户id]
	 * @return [array]       [该老师的所有排课]
	 */
	public function get_own_class($uid)
	{
		$data = $this->db->select('course-teacher.id AS id, time, week, room, course.name AS course, is_demand')
										 ->from('course-teacher')
										 ->join('course', 'course.id = course-teacher.cid')
										 ->join('teacher', 'teacher.id = course-teacher.tid')
										 ->where('teacher.uid', $uid)
										 ->get()
										 ->result_array();
	  return $data;
	}


	/**
	 * 获取所有满足条件的申请, 并排序
	 * @param  [array] $param => type[String](ASC按升序排列, DESC按降序排列)
	 *                        => item[String](按申请时间排序demand_time, 按time, new_time或week, new_week排列)
	 *                        => where[String](模糊教师姓名,编号)
	 *                        => limit[Array] => number[Number](要从第几条数据开始返回)
	 *                         								=> count[Number](每页显示多少个)
	 * @return [array]  =>  data     [所有查询到的数据]
	 *                  =>	count    [满足条件的数据行数]
	 */
	public function get_all_demand($param)
	{
		$res = array();
		// 先清空缓存的SQL
		$this->db->flush_cache();

		if (!empty($param)) {
			$this->db->start_cache()
							 ->from('course-teacher')
 							 ->join('teacher', 'course-teacher.tid = teacher.id')
 							 ->join('course', 'course-teacher.cid = course.id')
 							 ->select('course-teacher.id AS id, demand_time, teacher.name AS teacher, course.name AS course, class, new_time, new_week, new_room, time, week, room')
 							 ->where('is_demand', 1);
			if (!empty($param['where'])) {
				$this->db->group_start()
								 ->where('tid', $param['where'])
								 ->or_like('teacher.name', $param['where'])
								 ->group_end();
			}
			$res['data'] = $this->db->stop_cache()
															->order_by('course-teacher.'.$param['item'], $param['type'])
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



}
