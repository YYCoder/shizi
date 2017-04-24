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

	/**
	 * 获取指定教师的所有申请
	 * @param  [array] $_GET  => type[String](ASC按升序排列, DESC按降序排列)
	 *                        => item[String](按申请时间begin_time排序)
	 *                        => page[String](要前往的页数)
	 *                        => limit[String](每页显示多少个,默认为15)
	 *                        => where[String](匹配指定老师id即tid)
	 * @return [array] => data [所有申请, 二维数组]
	 *                 =>	count [满足条件的数据行数]
	 */
	public function get_my_apply($param = array())
	{
		$res = array();
		// var_dump($param);die;
		// 先清空缓存
		$this->db->flush_cache();
		$res['data'] = $this->db->start_cache()
													 ->select('id, type, title, desc, place, price, state, begin_time')
													 ->from('train_apply')
													 ->where('tid', $param['where'])
													 ->stop_cache()
													 ->order_by('begin_time', $param['type'])
													 ->limit($param['limit']['count'], $param['limit']['number'])
													 ->get()
													 ->result_array();
		$res['count'] = $this->db->get()
												 		 ->num_rows();
		return $res;
	}

	/**
	 * 获取指定教师的所有反馈
	 * @param  [array] $_GET  => type[String](ASC按升序排列, DESC按降序排列)
	 *                        => item[String](按申请时间end_time排序)
	 *                        => page[String](要前往的页数)
	 *                        => limit[String](每页显示多少个,默认为15)
	 *                        => where[String](匹配指定培训的id,即train_id)
	 * @return [array] => data [所有申请, 二维数组]
	 *                 =>	count [满足条件的数据行数]
	 */
	public function get_my_feedback($param = array())
	{
		$res = array();
		// var_dump($param);die;
		// 先清空缓存
		$this->db->flush_cache();
		$res['data'] = $this->db->start_cache()
													 ->select('train_feedback.id AS id, train_id, title, train_feedback.desc AS desc, place, price, train_feedback.state AS state, end_time, certificate, invoice, type')
													 ->from('train_feedback')
													 ->join('train_apply', 'train_id = train_apply.id')
													 ->where_in('train_id', $param['where'])
													 ->stop_cache()
													 ->order_by('end_time', $param['type'])
													 ->limit($param['limit']['count'], $param['limit']['number'])
													 ->get()
													 ->result_array();
		$res['count'] = $this->db->get()
												 		 ->num_rows();
		return $res;
	}

	/**
	 * 更新指定id的申请数据
	 * @param  [array] $data  [必须包括id]
	 * @return [string]       [受影响行数]
	 */
	public function update_item($data)
	{
		$res = $this->db->where('id', $data['id'])
										->update('train_apply', $data);
		return $res;
	}

	/**
	 * 更新指定id的申请数据
	 * @param  [array] $data  [必须包括id]
	 * @return [string]       [受影响行数]
	 */
	public function update_feedback_item($data)
	{
		$res = $this->db->where('id', $data['id'])
										->update('train_feedback', $data);
		return $res;
	}

	/**
	 * 获取指定tid的所有已通过的申请
	 * @param  [string] $tid(必须)
	 * @return [array]   [二维数组]
	 */
	public function get_my_passed_apply($tid)
	{
		$res = $this->db->where('state', 1)
										->where('tid', $tid)
										->from('train_apply')
										->get()
										->result_array();
		return $res;
	}


	/**
	 * 添加反馈信息
	 * @param  [array] $data [数据]
	 * @return [array] => 'id'[id]
	 *                 => 'status'[0失败, 1成功, 2已存在该培训的反馈]
	 */
	public function insert($data)
	{
		$res = array();
		// 先查询是否已经存在该train_id的反馈
		$train_id = $this->db->from('train_feedback')
												 ->where('train_id', $data['train_id'])
												 ->get()
												 ->result_array();
		if (!empty($train_id)) {
			$res['status'] = 2;
		}
		else {
			$res['status'] = $this->db->insert('train_feedback', $data);
			$res['id'] = $this->db->insert_id();
		}
		return $res;
	}







}
