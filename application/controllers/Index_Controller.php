<?php
/**
 * 首页控制器
 * @author whyCoder
 * @date   2017-02-01
 */
class Index_Controller extends My_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Info_Model');
        $this->load->model('Mult_Model');
        $this->load->library('PHPExcel/Iofactory');
        $this->load->library('Phpexcel');
    }

    public function index()
    {
        $data = array(
            'base_url' => $this->config->item('base_url')
        );
        if ($this->is_login())
        {
            $this->load->view('home.html', $data);
        }
        else
        {
            $this->load->view('login.html', $data);
        }
    }

    /**
     * 判断用户的档案(教师)是否完整
     * @return [String] [0档案不全, 1档案完整]
     */
    public function check_info()
    {
        $uid = $_SESSION['user']['id'];
        $info = $this->Info_Model->get_info_by_uid($uid);
        $res = 0;
        $check_item = array(
            'mid'           =>  $info['mid'],
            'entry_time'    =>  $info['entry_time'],
            'title'         =>  $info['title'],
            'graduation'    =>  $info['graduation'],
            'id_code'       =>  $info['id_code']
        );
        if (!empty($info)) {
            if (!$this->has_empty($check_item)['status']) {
                $res = 1;
            }
            $this->return_data(array(
                'status' => $res
            ));
        }
        else {
            $this->return_error('获取用户的档案失败');
        }
    }


    /**
     * 处理数据
     * @param  [array] $data [要处理的数据]
     * @return [array]       [处理后的数据]
     */
    private function handle_data($data)
    {
        if (!empty($data)) {
            $res = $data;
            // entry_time,birthday字段,改成2017-04-10格式的时间字符串
            $res['entry_time'] = date('Y-m-d', $res['entry_time']);
            $res['birthday'] = !empty($res['birthday']) ? date('Y-m-d', $res['birthday']) : '未知';
            // sex字段改成'男','女'或'未知''
            $res['sex'] = $res['sex'] == 0 ? '未知' :
                          $res['sex'] == 1 ? '男' : '女';
            // address,direction,postcode为空改成'未知'
            $res['address'] = empty($res['address']) ? '未知' : $res['address'];
            $res['direction'] = empty($res['direction']) ? '未知' : $res['direction'];
            $res['postcode'] = empty($res['postcode']) ? '未知' : $res['postcode'];
            // 处理工作时间字段
            $res['exp_1_time'] = !empty($res['exp_1_time']) ? $res['exp_1_time'].'年' :
                                                  $res['exp_1_college'] ? '不到1年' : '';
            $res['exp_2_time'] = !empty($res['exp_2_time']) ? $res['exp_2_time'].'年' :
                                                  $res['exp_2_college'] ? '不到1年' : '';
            $res['exp_3_time'] = !empty($res['exp_3_time']) ? $res['exp_3_time'].'年' :
                                                  $res['exp_3_college'] ? '不到1年' : '';
        }
        return $res;
    }


    /**
     * 获取教师信息详情(不传id则默认显示该用户的信息)
     * @return [array] [档案详情数组]
     */
    public function info_detail()
    {
        $res;
        if ($_GET['id']) {
            $res = $this->Info_Model->get_info($_GET['id']);
        }
        else {
            $res = $this->Info_Model->get_info_by_uid($_SESSION['user']['id']);
        }
        // 懒得再改获取用户信息方法的联表了,干脆再查一次major表把major名并进去
        $major = $this->Mult_Model->get_major($res['mid']);
        $res['major'] = $major[0]['name'];

        if (!empty($res)) {
            $res = $this->handle_data($res);
            $this->return_data($res);
        }
        else {
            $this->return_error('查询档案失败');
        }
    }


    /**
     * 下载execl表格
     * @return [array] => url[string] [生成的excel文档的临时文件路径,用于返回给前端下载]
     */
    public function download()
    {
        $data = $_POST['data'];
        //创建PHPExcel实例
        $excel = new PHPExcel();
        $filename = 'MarkeyExcelOn'.time().'.xlsx';
        $excel->getProperties()->setCreator($this->config->item('base_url'))
                               ->setLastModifiedBy('Markey')
                               ->setTitle('Office 2007 XLSX Document')
                               ->setSubject('Office 2007 XLSX Document')
                               ->setDescription('通过php生成的excel文档')
                               ->setKeywords('office 2007 openxml php')
                               ->setCategory('Result file');
        // 设置当前的excel文档
        $excel->setActiveSheetIndex(0);
        // 设置一些默认样式
        $excel->getDefaultStyle()->getFont()->setName(iconv('gbk', 'utf-8', '宋体'))
                                            ->setSize(15);
        $excel->getDefaultStyle()->getAlignment()
                                 ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        // 设置excel
        $excel->getActiveSheet()->setTitle('教师档案表')
                              ->setCellValue('A1', '姓名')
                              ->setCellValue('B1', '性别')
                              ->setCellValue('C1', '出生日期')
                              ->setCellValue('D1', '手机号')
                              ->setCellValue('E1', '婚否')
                              ->setCellValue('F1', '身份证')
                              ->setCellValue('G1', '毕业院校')
                              ->mergeCells('H1:I1')
                              ->setCellValue('H1', '家庭住址')
                              ->mergeCells('J1:K1')
                              ->setCellValue('J1', '专业')
                              ->setCellValue('L1', '入职时间')
                              ->setCellValue('M1', '职称')
                              ->mergeCells('N1:O1')
                              ->setCellValue('N1', '爱好')
                              ->setCellValue('A2', $data['name'])
                              ->setCellValue('B2', $data['sex'])
                              ->setCellValue('C2', $data['birthday'])
                              ->setCellValue('D2', $data['mobile'])
                              ->setCellValue('E2', $data['marriage'] == '2' ? '是' : $data['marriage'] == '1' ? '否' : '未知')
                              ->setCellValue('F2', $data['id_code'])
                              ->setCellValue('G2', $data['graduation'])
                              ->setCellValue('I2', $data['address'])
                              ->setCellValue('K2', $data['major'])
                              ->setCellValue('L2', $data['entry_time'])
                              ->setCellValue('M2', $data['title'])
                              ->setCellValue('O2', '好多好多好多爱好');
        // 设置项目名的背景色
        $excel->getActiveSheet()->getStyle('A1')
                                ->getFill()
                                ->getStartColor()->setARGB('AA808080');
        $excel->getActiveSheet()->getStyle('B1')
                                ->getFill()
                                ->getStartColor()->setARGB('AA808080');
        // 保存为临时文件
        $objWriter = Iofactory::createWriter($excel, 'Excel2007');
        $objWriter->save('tmp_file/'.$filename);

        $this->return_data(array(
            'url' => $this->config->item('base_url').'/tmp_file/'.$filename
        ));
    }







}
