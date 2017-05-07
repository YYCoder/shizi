<?php
/**
* 留言板模型
* @author Markey
* @date   2017-05-07
*/
class Comment_Model extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * 添加留言
	 */
	public function add_comment($data)
	{
		$res = $this->db->insert('message', $data);
		return $res;
	}


	/**
	 * 删除指定id留言
	 */
	public function del_comment($id)
	{
		$res = $this->db->where('id', $id)
										->delete('message');
		return $res;
	}


	/**
   * 获取全部留言
   * @return [Array] => data [获取到的全部留言数据,二维数组]
   *                 => page     => page_count(数据可显示的页面数)
   *                             => current_page(当前所在页面数)
   */
	public function get_comments()
	{
		// var_dump($param);
		$res = array();
		// 先清空缓存的SQL
		$this->db->flush_cache();

		$this->db->start_cache()
						 ->from('message')
							 ->join('user', 'message.uid = user.id')
							 ->select('message.id AS id, user.name, user.avatar AS avatar, message.uid, content, timestamp, refer_id, quota_id');

		$res['data'] = $this->db->stop_cache()
														->order_by('message.timestamp', 'DESC')
														// ->get_compiled_select();
														->get()
														->result_array();
		// 利用CI的查询构造器缓存,获取满足条件的数据行数
		$res['count'] = $this->db->get()
														 ->num_rows();
		return $res;
	}



}
