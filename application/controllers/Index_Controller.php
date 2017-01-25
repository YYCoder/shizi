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
        $service = $this->serviceclass;
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
                $service->return_error('请输入正确的邮箱或手机号');
            }
            $user_info = $this->User_Model->get_user($user);
            if (empty($user_info))
            {
                $service->return_error('请输入正确的邮箱或手机号');
            }
            else
            {
var_dump($user_info);die;
                $service->return_data($user_info);
            }
        }
        else
        {
            $service->return_error('请输入邮箱或手机号');
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
     */
    public function register()
    {
        $service = $this->serviceclass;
        $data = array();
        $flag = !empty($_POST['mobile']) &&
                !empty($_POST['name'])   && 
                !empty($_POST['pw'])     &&
                !empty($_POST['confirm-pw']);
        if ($flag)
        {
            // 验证手机号
            !preg_match('/^1[34578]{1}\d{9}$/', $_POST['mobile']) &&
            $service->return_error('请输入正确的手机号');
            // 验证姓名长度
            (strlen($_POST['name']) > 15) &&
            $service->return_error('姓名太长啦');
            // 验证密码
            ($_POST['pw'] !== $_POST['confirm-pw']) &&
            $service->return_error('两次密码输入不一致');

            $data = array(
                'mobile'     => $_POST['mobile'],
                'name'       => $_POST['name'],
                'password'   => md5($_POST['pw'])
            );
            // 验证邮箱
            if (!empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
            {
                $service->return_error('请输入正确的邮箱');
            }
            else
            {
                $data['email'] = $_POST['email'];
            }            

            // 插入用户数据
            $status = $this->User_Model->add_user($data);
            if ($status != 0)
            {
                $service->return_data('插入数据成功');
            }
            else
            {
                $service->return_error('插入数据失败');
            }
        }
        else
        {
            $service->return_error('信息输入不完整');
        }
    }
}









