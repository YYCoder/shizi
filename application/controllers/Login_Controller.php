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


}
