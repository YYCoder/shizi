<?php
/**
 * 用户管理控制器
 * @author Markey
 * @date   2017-05-08
 */
class User_Controller extends My_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->Model('User_Model');
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
   * 获取全部用户, 或按条件搜索用户
   * @param  [array] $_GET  => sortType[String](ASC按升序排列, DESC按降序排列)
   *                        => sortItem[String](id按用户id排列(默认), reg_time按注册时间排列)
   *                        => where[String](模糊匹配用户名,id,手机号,用户类型)
   *                        => page[String](要前往的页数)
   *                        => limit[String](每页显示多少个,默认为10)
   *
   * @return [Array] => data [获取到的全部档案数据,二维数组]
   *                 => page     => page_count(数据可显示的页面数)
   *                             => current_page(当前所在页面数)
   */
  public function get_all_user()
  {
      $param = array(
          'type' => !empty($_GET['sortType']) ? $_GET['sortType'] : 'ASC',
          'page' => $_GET['page'],
          'where'=> $_GET['where'],
          'userType' => $_GET['userType']
      );
      $res = array();

      $param['item'] = $_GET['sortItem'];
      // 处理limit相关字段
      $param['limit'] = array(
          'number'  =>  (int)($_GET['page'] - 1) * (int)$_GET['limit'],
          'count'   =>  (int)$_GET['limit']
      );

      // var_dump($param);
      $res_temp = $this->User_Model->get_all($param);
      $res['data'] = $res_temp['data'];
      $page_count = ceil($res_temp['count']/$param['limit']['count']);
      $res['page'] = array(
          'page_count'    =>  $page_count,
          'current_page'  =>  $param['page']
      );
      if (!empty($res['data']) && $page_count > 0) {
          foreach ($res['data'] as $k => $v) {
              $res['data'][$k]['reg_time'] = date('Y-m-d H:i', $v['reg_time']);
              // email为空改成'未知'
              $res['data'][$k]['email'] = empty($v['email']) ? '未知' : $v['email'];
              $res['data'][$k]['type'] = $v['type'] == 2 ? '超级管理员'
              																					 : ($v['type'] == 1 ? '管理员' : '教师');
              $res['data'][$k]['info'] = $v['info'] == 1 ? '是' : '否';
              $res['data'][$k]['course'] = $v['course'] == 1 ? '是' : '否';
              $res['data'][$k]['work'] = $v['work'] == 1 ? '是' : '否';
              $res['data'][$k]['train'] = $v['train'] == 1 ? '是' : '否';
              $res['data'][$k]['assessment'] = $v['assessment'] == 1 ? '是' : '否';
              $res['data'][$k]['comment'] = $v['comment'] == 1 ? '是' : '否';
          }
          $this->return_data($res);
      }
      else {
          $this->return_error('未查询到相关数据');
      }
  }


  /**
   * 修改用户数据
   * @param  $_POST   =>	 id[string][用户id]
   *                  =>   type[0或1或2]
   *                  =>   info[0或1]
	 *                  => 	 course[0或1]
	 *                  => 	 work[0或1]
	 *                  => 	 train[0或1]
	 *                  => 	 assessment[0或1]
	 *                  => 	 comment[0或1]
	 *                  =>	 is_gag[string][0或1]
   * @return [string] [1成功, 0失败]
   */
  public function mod_user()
  {
  	$data = $_POST;
  	foreach ($data as $k => $v) {
  		if ($k != 'type' && $k != 'id' && $k != 'is_gag') {
  			$data[$k] = ($v === 'true' ? 1 : 0);
  		}
  	}
  	$res = $this->User_Model->modify($data);
  	if ($res == 1) {
  		parent::return_data('修改用户数据成功');
  	}
  	else {
  		parent::return_error('修改用户数据失败');
  	}
  }


  /**
   * 获取被禁言的用户
   * @return [array]
   */
  public function get_gaged_users()
  {
  	$data = $this->User_Model->get_gaged_users();
		parent::return_data($data);
  }

}
