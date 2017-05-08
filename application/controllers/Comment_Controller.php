<?php
/**
 * 留言板控制器
 * @author Markey
 * @date   2017-05-05
 */
class Comment_Controller extends My_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->Model('Comment_Model');
	}


 	public function index()
  {
      $data = array(
          'base_url' => $this->config->item('base_url')
      );
      if ($this->is_login())
      {
          $this->load->view('home.html', $data);
      }
      else
      {
          $this->load->view('login.html', $data);
      }
  }


  /**
   * 获取全部留言
   * @param  [array] $_GET  => page[String](要前往的页数)
   *                        => limit[String](每页显示多少个,默认为10)
   *
   * @return [Array] => data [获取到的全部留言数据,二维数组]
   *                 => page     => page_count(数据可显示的页面数)
   *                             => current_page(当前所在页面数)
   */
  public function get_comments()
  {
    $res = array();
    $param = array(
    	'page' => $_GET['page']
  	);
  	// 处理limit相关字段
    $param['limit'] = array(
        'number'  =>  (int)($_GET['page'] - 1) * (int)$_GET['limit'],
        'count'   =>  (int)$_GET['limit']
    );

    $res_temp = $this->Comment_Model->get_comments($param);
    $page_count = ceil($res_temp['count']/$param['limit']['count']);
    $res['page'] = array(
        'page_count'    =>  $page_count,
        'current_page'  =>  $param['page']
    );
		if (!empty($res_temp['data']) && $page_count > 0) {
				// 由于留言板需要对所有数据进行排序, 为了让回复的留言都在它回复的留言下面, 并且分页也是在正确的位置, 因此不能用limit语句进行分页, 只能取到所有数据后进行排序再分页
		    $res['data'] = array();
        foreach ($res_temp['data'] as $k => $v) {
        	$v['time'] = date('Y-m-d H:i', $v['timestamp']);
        	// 将所有回复的留言都排到他们回复的留言后面, 并按时间排序(默认)
        	if ($v['refer_id'] == 0) {
        		// 该数组用于保存所有refer_id为当前数组id的留言
        		$reply_arr = array();
        		// 先把当前留言放到最前
        		array_push($reply_arr, $v);
        		foreach ($res_temp['data'] as $key => $value) {
        			if ($value['refer_id'] == $v['id']) {
        				$value['time'] = date('Y-m-d H:i', $value['timestamp']);
        				array_push($reply_arr, $value);
        			}
        		}
        		// 再对所有回复进行排序, 将最早的排到最前
        		uasort($reply_arr, function ($a, $b){
        			return $a['timestamp'] - $b['timestamp'];
        		});
        		// 将排序好的留言合并到结果数组中
        		$res['data'] = array_merge($res['data'], $reply_arr);
        	}
        }
    		// array_slice不会修改原数组
    		$res['data'] = array_splice($res['data'], ($res['page']['current_page']-1)*$_GET['limit'], $_GET['limit']);
    		// echo ($res['page']['current_page']-1)*$_GET['limit'];die;
    		// var_dump($res['data']);die;
        $this->return_data($res);
    }
    else {
        $this->return_error('未获取到留言数据');
    }
  }


  /**
   * 添加留言
   */
  public function add_comment()
  {
  	$data = $_POST;
  	$data['timestamp'] = time();
  	$data['uid'] = $_SESSION['user']['id'];
  	$res = $this->Comment_Model->add_comment($data);
  	if ($res == 1) {
  		parent::return_data('留言成功');
  	}
  	else {
  		parent::return_error('留言失败');
  	}
  }


	/**
   * 删除留言, 同时删除回复该留言的留言
   */
  public function del_comment()
  {
  	$id = $_POST['id'];
  	$res = $this->Comment_Model->del_comment($id);
  	// echo $res;die;
  	if ($res > 0) {
  		parent::return_data('删除留言成功');
  	}
  	else {
  		parent::return_error('删除留言失败');
  	}
  }



}
