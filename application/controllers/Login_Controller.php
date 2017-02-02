<?php
/**
 * 登录页控制器
 * @author whyCoder
 * @date   2017-01-22
 */
class Login_Controller extends My_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('User_Model');
    }

    public function index()
    {
        $data = array(
            'base_url' => $this->config->item('base_url')
        );
        if ($this->is_login())
        {
            $this->load->view('home', $data);
        }
        else
        {
            $this->load->view('login.html', $data);
        }
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
            $user = array();
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
                $this->return_error('请输入正确的邮箱或手机号');
            }
            $user_info = $this->User_Model->get_user($user);
            if (empty($user_info))
            {
                $this->return_error('没有找到该用户');
            }
            else
            {
                $user['password'] = md5($_POST['pw']);
                $user_info = $this->User_Model->get_user($user);
                if (empty($user_info))
                {
                    $this->return_error('密码不正确');
                }
                else
                {
                    $_SESSION['user'] = $user_info[0];
                    $this->return_data('登陆成功');
                }
            }
        }
        else
        {
            $this->return_error('请输入邮箱或手机号及密码');
        }
    }


    /**
     * 注册方法
     */
    public function register()
    {
        $user;
        $data = array();
        $flag = !empty($_POST['mobile']) &&
                !empty($_POST['name'])   && 
                !empty($_POST['pw'])     &&
                !empty($_POST['confirmPw']);
        if ($flag)
        {
            // 验证手机号
            !preg_match('/^1[34578]{1}\d{9}$/', $_POST['mobile']) &&
            $this->return_error('请输入正确的手机号');

            // 验证姓名长度
            (strlen($_POST['name']) > 15) &&
            $this->return_error('姓名太长啦');

            // 验证密码
            ($_POST['pw'] !== $_POST['confirmPw']) &&
            $this->return_error('两次密码输入不一致');

            // 验证手机是否重复注册           
            $user = $this->User_Model->get_user(array('mobile' => $_POST['mobile']));
            !empty($user) &&
            $this->return_error('该手机号已被注册');

            // 验证昵称是否重复注册           
            $user = $this->User_Model->get_user(array('name' => $_POST['name']));
            !empty($user) &&
            $this->return_error('该昵称已被注册');

            // 验证邮箱
            if (!empty($_POST['email']))
            {
                if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
                {
                    $this->return_error('请输入正确的邮箱');
                }
                else
                {
                    $data['email'] = $_POST['email'];
                }
            }
            $data['mobile'] = $_POST['mobile'];
            $data['name'] = $_POST['name'];
            $data['password'] = md5($_POST['pw']);

            // 插入用户数据
            $res = $this->User_Model->add_user($data);
            if ($res['status'] != 0)
            {
                // 存储session
                $user_info = $this->User_Model->get_user($res['id']);
                $_SESSION['user'] = $user_info;
                $this->return_data(array(
                    'msg' => '插入数据成功',
                    'id' => $res['id']
                ));
            }
            else
            {
                $this->return_error('插入数据失败');
            }
        }
        else
        {
            $this->return_error('信息输入不完整');
        }
    }

    /**
     * 修改用户头像
     */
    public function change_avatar()
    {
        if (!empty($_FILES['avatar']) && !empty($_POST['id']))
        {
            $res = $this->uploadImg();
            $param = array(
                'id' => $_POST['id'],
                'avatar' => $res['full_path']
            );
            // 修改数据库
            $status = $this->User_Model->modify($param);
            if ($status == 1)
            {
                $this->return_data();
            }
            else
            {
                $this->return_error('修改头像失败');
            }
        }
    }



}









