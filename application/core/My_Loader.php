<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * 基础加载类
 * @author whyCoder
 * @date   2017-02-01
 */
class My_Loader extends CI_Loader
{
    
    public function __construct()
    {
        parent::__construct();
        // 修改默认的模板路径到根目录的FE目录下
        $this->_ci_view_paths = array(FCPATH.'/FE/' => TRUE);
    }
}