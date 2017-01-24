<?php
/**
 * 用户登录模块
 * @author 	YYCoder
 * @date   	2017-01-22
 */
class Login_Controller extends CI_Controller {
	/**
	 * 用户登录方法
	 * @param  	id(必传): 用户id
	 * @param	password(必传): 密码
	 */
	public function do_login($id = '', $pw = '')
	{
		
	}

	/**
	 * 判断登录方法
	 * @param  	id(必传): 用户id
	 */
	public function is_login($id = '')
	{
		if (isset($_SESSION[$id]))
		{
			return TRUE;
		}
		else
		{
			return FALSE;
		}
	}

	/**
	 * 注册方法
	 * @param  	id(必传): 用户id
	 * @param  	pw(必传): 用户密码
	 * @param  	name(必传): 用户姓名
	 * @param  	mobile(非必传): 用户手机号
	 */


}
