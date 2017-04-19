<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'Login_Controller';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

// 自定义路由
$route['login'] = 'Login_Controller/do_login';
$route['add_teacher'] = 'Login_Controller/insert_teacher';
$route['register'] = 'Login_Controller/register';
$route['change_avatar'] = 'Login_Controller/change_avatar';
// 首页
$route['home'] = 'Index_Controller/index';
$route['home/list'] = 'Index_Controller/index';
$route['home/detail'] = 'Index_Controller/index';
$route['home/detail/:num'] = 'Index_Controller/index';
$route['check_info'] = 'Index_Controller/check_info';
$route['info_detail'] = 'Index_Controller/info_detail';
$route['download_info'] = 'Index_Controller/download';
// 档案管理
$route['info'] = 'Info_Controller/index';
$route['info/insert'] = 'Info_Controller/index';
$route['info/update'] = 'Info_Controller/index';
$route['info/infoList'] = 'Info_Controller/index';
$route['info/get_info'] = 'Info_Controller/get_info';
$route['info/get_all_info'] = 'Info_Controller/get_all_info';
$route['info/add_teacher'] = 'Info_Controller/add_teacher';
$route['info/mod_teacher'] = 'Info_Controller/mod_teacher';
$route['info/delete_info'] = 'Info_Controller/delete_info';
$route['info/delete_mult'] = 'Info_Controller/delete_mult_info';
$route['upload_avatar'] = 'Info_Controller/upload_avatar';
$route['get_majors'] = 'Info_Controller/get_majors';
// 课程管理
$route['course'] = 'Course_Controller/index';
$route['course/class'] = 'Course_Controller/index';
$route['course/insert'] = 'Course_Controller/index';



