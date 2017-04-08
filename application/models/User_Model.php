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
    }

    /**
     * 获取用户信息
     * @param    data(必传)[array]: 用户ID|邮箱|手机(密码可选)
     * @return   user_info[array]: 用户信息数组
     */
    public function get_user($data = array())
    {
        $user_info = $this->db
                          ->from('user')
                          ->where($data)
                          ->get()
                          ->result_array();
        return $user_info;
    }

    /**
     * 添加用户信息
     * @param    data(必传)[array]: 用户信息(邮箱|手机&密码&姓名)
     * @return   status[string]: 状态(未成功为0, 成功为1)
     */
    public function add_user($data = array())
    {
        $data['reg_time'] = time();
        $data['avatar'] = $this->config->item('base_url').'/FE/img/user.png';
        $status = $this->db
                       ->insert('user', $data);

        $id = $this->db->insert_id();
        return array(
            'status' => $status,
            'id' => $id
        );
    }

    /**
     * 修改用户信息
     * @param    data(必传)[array]: 要修改的用户信息(id[必须]|邮箱|手机|密码|姓名|头像)
     * @return   status[string]: 修改状态(未成功为0, 成功为1)
     */
    public function modify($data = array())
    {
        $status = $this->db
                       ->where('id', $data['id'])
                       ->update('user', $data);
        return $status;
    }




}
