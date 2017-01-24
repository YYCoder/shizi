<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 基础数据接口类
 * @author whyCoder
 * @date   2017-01-24
 */
class ServiceClass
{
    
    public function __construct()
    {

    }

    /**
     * 返回json
     * @param  [array]  $data       
     */
    public function return_json($data)
    {
        header('Content-Type:application/json; charset=utf-8');
        exit(json_encode($data, JSON_UNESCAPED_UNICODE));
    }

    /**
     * 返回数据
     * @param  [array]  $data
     */
    public function return_data($data)
    {
        $data['code'] = 0;
        if ($data['msg'] == '')
        {
            $data['msg'] = '操作成功';
        }
        $this->return_json($data);
    }

    /**
     * 返回错误信息
     * @param  [array]  $data
     */
    public function return_error($data){
        $data['code'] = 1;
        if ($data['msg'] == '')
        {
            $data['msg'] = '操作失败';
        }
        $this->return_json($data);
    }

}






