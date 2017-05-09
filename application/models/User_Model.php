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
     * @param    data(必传)[array]: 要修改的用户信息(id[必须]|邮箱|手机|密码|姓名|头像...)
     * @return   status[string]: 修改状态(未成功为0, 成功为1)
     */
    public function modify($data = array())
    {
        $status = $this->db
                       ->where('id', $data['id'])
                       ->update('user', $data);
        return $status;
    }


    /**
     * 查询所有符合条件的数据, 并排序
     * @param  [array] $param => type[String](ASC按升序排列, DESC按降序排列)
     *                        => item[String](id按用户id排列, reg_time按注册时间排列)
     *                        => where[String](模糊匹配用户名,id,手机号,用户类型)
     *                        => limit[Array] => number[Number](要从第几条数据开始返回)
     *                                                      => count[Number](每页显示多少个)
     * @return [array]  =>  data     [所有查询到的数据]
     *                  =>  count    [满足条件的数据行数]
     */
    public function get_all($param)
    {
        // var_dump($param);
        $res = array();
        // 先清空缓存的SQL
        $this->db->flush_cache();

        if (!empty($param)) {
            $this->db->start_cache()
                     ->from('user');
            if (!empty($param['where'])) {
                $this->db->where('id', $param['where'])
                         ->or_where('mobile', $param['where'])
                         ->or_like('name', $param['where']);
            }
            if (!empty($param['userType']) || $param['userType'] === '0') {
                $this->db->where('type', $param['userType']);
            }
            $res['data'] = $this->db->stop_cache()
                                    ->order_by($param['item'], $param['type'])
                                    // 参数顺序跟sql中的LIMIT子句的参数顺序相反...
                                    ->limit($param['limit']['count'], $param['limit']['number'])
                                    // ->get_compiled_select();
                                    ->get()
                                    ->result_array();
            // 利用CI的查询构造器缓存,获取满足条件的数据行数
            $res['count'] = $this->db->get()
                                     ->num_rows();
        }
        return $res;
    }


    /**
     * 获取被禁言的用户
     * @return [array] [用户数据]
     */
    public function get_gaged_users()
    {
        $data = $this->db->where('is_gag', '1')
                         ->from('user')
                         ->select('id, name')
                         ->get()
                         ->result_array();
        return $data;
    }

}
