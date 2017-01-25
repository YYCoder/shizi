<?php
/**
 * 首页模块
 * @author whyCoder
 * @date   2017-01-22
 */
class Index_Controller extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('User_Model');
        $this->load->library('session');
        $this->load->library('ServiceClass');
    }

    public function index()
    {
        if ($this->is_login())
        {
            $data = $_SESSION['user'];
            $this->load->view('home', $data);
        }
        else
        {
            $this->load->view('login');
        }
        // 及时关闭session, 防止并发请求对session的影响
        session_write_close();
    }

    /**
     * 用户登录方法
     */
    public function do_login()
    {
        $user_info;// 返回用户信息
        $user;// 用于查询用户信息
        if (!empty($_POST['user']) && !empty($_POST['pw']))
        {
            $user = array(
                'password' => md5($_POST['pw'])
            );
            if (filter_var($_POST['user'], FILTER_VALIDATE_EMAIL))
            {
                $user['email'] = $_POST['user'];
            }
            else if (preg_match('/^1[34578]{1}\d{9}$/', $_POST['user']))
            {
                $user['mobile'] = $_POST['user'];
            }
            else
            {
                $this->serviceclass->return_error(array(
                    'msg' => '请输入正确的邮箱或手机号'
                ));
            }
            $user_info = $this->User_Model->get_user($user);
            if (empty($user_info))
            {
                $this->serviceclass->return_error(array(
                    'msg' => '请输入正确的邮箱或手机号'
                ));
            }
            else
            {
var_dump($user_info);die;
                $this->serviceclass->return_data($user_info);
            }
        }
        else
        {
            $this->serviceclass->return_error(array(
                'msg' => '请输入邮箱或手机号'
            ));
        }
    }

    /**
     * 判断登录方法
     */
    public function is_login()
    {
        if (!empty($_SESSION['user']))
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
     * @param      email(必传)[string]: 用户邮箱
     * @param      pw(必传)[string]: 用户密码
     * @param      name(必传)[string]: 用户姓名
     * @param      mobile(非必传)[string]: 用户手机号
     */

}









