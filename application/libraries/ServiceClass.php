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
     * @param  [array]||[string](若为string, 则默认为'msg'字段)
     */
    public function return_data($inp)
    {
        $data = array(
            'code' => 0,
            'msg'  => '操作成功',
            'data' => array()
        );
        if (is_string($inp) && !empty($inp))
        {
            $data['msg'] = $inp;
        }
        else if (is_array($inp))
        {
            !empty($inp['msg']) && ($data['msg'] = $inp['msg']);
            $data['data'] = $inp;
        }
        
        $this->return_json($data);
    }

    /**
     * 返回错误信息
     * @param  [string]
     */
    public function return_error($inp){
        $data = array(
            'code' => 1,
            'msg'  => '操作失败'
        );
        if (!empty($inp))
        {
            $data['msg'] = $inp;
        }
        
        $this->return_json($data);
    }

}






