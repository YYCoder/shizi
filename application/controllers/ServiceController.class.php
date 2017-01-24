<?php
namespace Common\Common;
use Think\Controller;
use Com\Wechat;
use Com\WechatAuth;
/**
 * 数据接口基础类.
 *
 * @version 1.0
 * @author Lovitax
 */
class ServiceController extends Controller{
  /**
   * __construct description
   */
  // function __construct(){}

  /**
   * 返回json
   * @param  [array]  $data        [description]
   * @param  integer $json_option [description]
   * @return [type]               [description]
   */
  protected function return_json($data,$json_option=JSON_UNESCAPED_UNICODE){
    header('Content-Type:application/json; charset=utf-8');
    exit(json_encode($data,$json_option));
  }

  /**
   * [返回数据]
   * @param  [array]  $data        [description]
   * @param  integer $json_option [description]
   * @return [type]               [description]
   */
  protected function return_data($data,$json_option=JSON_UNESCAPED_UNICODE){
    $data['code'] = 0;
    if($data['msg'] == '')  $data['msg'] = '操作成功';

    $this->return_json($data,$json_option);
  }

  /**
   * [返回错误信息]
   * @param  [array]  $data        [description]
   * @param  integer $json_option [description]
   * @return [type]               [description]
   */
  protected function return_error($data,$json_option=JSON_UNESCAPED_UNICODE){
    $data['code'] = 1;
    if($data['msg'] == '')  $data['msg'] = '操作失败';

    $this->return_json($data,$json_option);
  }

  /**
   * 获取当前用户信息
   */    
  protected function user($key = '*'){
    $user = session('user');
    if(is_null($user)) $this->gologin();

    $is_infocmp = $user['info_cmp'];

    // if($is_infocmp == 0){
    //   $this->return_json(array('code' => -3));
    // }

    if (isset($user[$key])) {
      return $user[$key];
    } elseif ($key == '*') {
      return $user;
    } else {
      return false;
    }
    
  }

  /**
   * 
   * @return [type] [description]
   */
  public function gologin(){
    $agent_type = $this->agentType();
    if($agent_type == 1){
      // 微信
      // echo "微信网页授权";
      // $rc_url = "http://www.lovitax.com/html#user/login";
      // header("location: " . $rc_url);exit;
      $this->return_json(array('code' => -2));
    }else{
      // 不是微信
      $this->return_json(array('code' => -1));
    }
  }
  
  /**
   * 获取当前客户端类型
   * @return int 1，微信、0，不是微信
   */
  protected function agentType(){
    $agent = $_SERVER['HTTP_USER_AGENT'];
    $wechat = 'MicroMessenger';
    $a = strstr($agent, $wechat);
    if($a){
      // echo "微信";
      return 1;
    }else{
      // echo "不是微信";
      return 0;
    };
  }

  /**
   * 上传图片方法
   * @return [type] [description]
   */
  protected function uploadImg($savePath = './'){
    $upload = new \Think\Upload();// 实例化上传类
    $upload->maxSize   =     3145728 ;// 设置附件上传大小
    $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
    $upload->savePath  =     $savePath; // 设置附件上传目录
    $upload->autoSub   =     true;
    $upload->subName   =     $this->user('id');

    // 上传文件     
    $info   =   $upload->upload();
    if(!$info) {
      return array(
          'status' => false,
          'info' => $upload->getError(),
        );
    }else{
      return array(
          'status' => true,
          'info' => $info,
        );
    }
  }

  /**
   * [thumb description]
   * @return [type] [description]
   */
  protected function thumb($path, $name){
    $image = new \Think\Image();
    $image->open('.'.$path.$name);
    $thumb_path = $path.$name.'.thumb.png';
    $image->thumb(100, 100, $image::IMAGE_THUMB_CENTER)->save('.'.$thumb_path);
    return $thumb_path;
  }

    /**
   * 通过serverid 数组获取微信端临时素材图片
   * @param  arr $arr_servids [description]
   * @param  str $path        [description]
   * @param  bool $make_thumb  是否生成缩略图
   * @return arr              返回本地图片路径，或者加上缩略图路径
   */
  public function getWxImg($arr_servids, $path, $make_thumb = true){
    $wx_auth = new WechatAuth();

    foreach ($arr_servids as $key => $servid) {
      $mediaUrl = $wx_auth->mediaGet($servid);//获取下载地址
      $imageData = $this->curl_file($mediaUrl);

      $saveUrl = $_SERVER['DOCUMENT_ROOT'].$path;
      $img_name = $servid . '.jpg';

      if(!is_readable($saveUrl)) {
        mkdir($saveUrl,0700,true);
      }

      $img_path = $saveUrl.$img_name;

      $b_file = $this->saveFile($img_path, $imageData);
      
      if($b_file){
        $arr_img[] = $path . $img_name;
        if($make_thumb){
          $arr_thumb[] = $this->thumb($path, $img_name);          
        }
      }
    }

    if($make_thumb){
      $return['arr_img'] = $arr_img;
      $return['arr_thumb'] = $arr_thumb;
      return $return;
    }else{
      return $arr_img;
    }
  }

  /**
   * 获取文件数据
   * @param  [type] $url [description]
   * @return [type]      [description]
   */
  public function curl_file($url){
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_NOBODY, 0);//只取body头  
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//curl_exec执行成功后返回执行的结果；不设置的话，curl_exec执行成功则返回true  
    $output = curl_exec($ch);  
    curl_close($ch);  
    return $output;  
  }

  /**
   * 保存文件到本地
   * @param  [type] $filename    [description]
   * @param  [type] $filecontent [description]
   * @return [type]              [description]
   */
  public function saveFile($filename, $filecontent){
    $local_file = fopen($filename, 'a');
    if (false !== $local_file){//不恒等于（恒等于=== 就是false只能等于false，而不等于0）  
      if (false !== fwrite($local_file, $filecontent)) {
        fclose($local_file);
        return true;
      }
      return false;
    }
    return false;
  } 

}
