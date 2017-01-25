<?php
/**
 * 用户模型
 * @author    whyCoder
 * @date      2017-01-24
 */
class User_Model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    /**
     * 获取用户信息
     * @param    data(必传)[array]: 用户邮箱或手机及密码
     * @return   user_info[array]: 用户信息数组
     */
    public function get_user($data)
    {

        $user_info = $this->db
                          ->from('user')
                          ->where($data)
                          ->get()
                          ->result_array();
        return $user_info;
    }

    


}
