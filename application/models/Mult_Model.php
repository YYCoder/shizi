<?php
/**
 * 综合模型
 * @author    whyCoder
 * @date      2017-02-15
 */
class Mult_Model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取专业信息
     * @param    id(非必传)[string]: 专业id
     * @return   majors[array]: 专业信息数组
     */
    public function get_major($id = '')
    {
        $search = array();
        if (!empty($id))
        {
            $search['id'] = $id;
        }
        $majors = $this->db
                       ->from('major')
                       ->where($search)
                       ->get()
                       ->result_array();
        return $majors;
    }

    /**
     * 获取老师信息
     * @param    id(非必传)[string]: 老师id
     * @return   teachers[array]: 老师信息数组
     */
    public function get_teacher($id = '')
    {
        $search = array();
        if (!empty($id))
        {
            $search['id'] = $id;
        }
        $teachers = $this->db
                         ->from('teacher')
                         ->where($search)
                         ->get()
                         ->result_array();
        return $teachers;
    }

    /**
     * 获取课程信息
     * @param    id(非必传)[string]: 课程id
     * @return   courses[array]: 课程信息数组
     */
    public function get_course($id = '')
    {
        $search = array();
        if (!empty($id))
        {
            $search['id'] = $id;
        }
        $courses = $this->db
                         ->from('course')
                         ->where($search)
                         ->get()
                         ->result_array();
        return $courses;
    }




}
