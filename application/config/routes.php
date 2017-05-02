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
$route['get_teachers'] = 'Info_Controller/get_teachers';
// 课程管理
$route['course'] = 'Course_Controller/index';
$route['course/class'] = 'Course_Controller/index';
$route['course/insert'] = 'Course_Controller/index';
$route['course/allClass'] = 'Course_Controller/index';
$route['course/demand'] = 'Course_Controller/index';
$route['course/examine'] = 'Course_Controller/index';
$route['course/get_teachers'] = 'Course_Controller/get_teachers';
$route['course/get_courses'] = 'Course_Controller/get_courses';
$route['course/insert_data'] = 'Course_Controller/insert_data';
$route['course/get_class'] = 'Course_Controller/get_class';
$route['download_course'] = 'Course_Controller/download';
$route['course/get_all_class'] = 'Course_Controller/get_all_class';
$route['course/delete_mult'] = 'Course_Controller/delete_mult_class';
$route['course/delete_class'] = 'Course_Controller/delete_class';
$route['course/update'] = 'Course_Controller/update_item';
$route['course/demand_course'] = 'Course_Controller/update_item';
$route['course/agree_items'] = 'Course_Controller/update_items';
$route['course/deny_items'] = 'Course_Controller/update_items';
$route['course/get_own_class'] = 'Course_Controller/get_own_class';
$route['course/get_all_demand'] = 'Course_Controller/get_all_demand';
// 工作量管理
// 培训模块
$route['train'] = 'Train_Controller/index';
$route['train/demand'] = 'Train_Controller/index';
$route['train/apply'] = 'Train_Controller/index';
$route['train/feedback'] = 'Train_Controller/index';
$route['train/myfeedback'] = 'Train_Controller/index';
$route['train/examineApply'] = 'Train_Controller/index';
$route['train/examineFeedback'] = 'Train_Controller/index';
$route['train/insert_apply'] = 'Train_Controller/insert_apply';
$route['train/get_my_apply'] = 'Train_Controller/get_my_apply';
$route['train/get_all_demand'] = 'Train_Controller/get_all_demand';
$route['train/get_my_feedback'] = 'Train_Controller/get_my_feedback';
$route['train/get_all_feedback'] = 'Train_Controller/get_all_feedback';
$route['train/update_item'] = 'Train_Controller/update_item';
$route['train/update_items'] = 'Train_Controller/update_items';
$route['train/update_feedback_item'] = 'Train_Controller/update_feedback_item';
$route['train/update_feedback_items'] = 'Train_Controller/update_feedback_items';
$route['train/get_passed_apply'] = 'Train_Controller/get_my_passed_apply';
$route['train/upload_file'] = 'Train_Controller/upload_file';
$route['train/insert_feedback'] = 'Train_Controller/insert_feedback';
// 考核模块
$route['assessment'] = 'Assess_Controller/index';
$route['assessment/check'] = 'Assess_Controller/index';
$route['assessment/insert'] = 'Assess_Controller/index';


