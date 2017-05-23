<div class="left-nav">
    <ul>
        <!-- 教师列表模块 -->
        <li class="left-item" v-if="page == 0">
            <router-link to="/home/list" class="left-btn">教师列表</router-link>
        </li>
        <li class="left-item" v-if="page == 0">
            <router-link to="/home/detail" class="left-btn">教师详情</router-link>
        </li>
        <!-- 档案管理模块 -->
        <li class="left-item" v-if="page == 1">
            <router-link to="/info/update" class="left-btn">完善信息</router-link>
        </li>
        <li class="left-item" v-if="page == 1 && rights.info == 1">
            <router-link to="/info/insert" class="left-btn">档案录入</router-link>
        </li>
        <li class="left-item" v-if="page == 1 && rights.info == 1">
            <router-link to="/info/infoList" class="left-btn">全部档案</router-link>
        </li>
        <!-- 课程管理模块 -->
        <li class="left-item" v-if="page == 2 && rights.course == 0">
            <router-link to="/course/class" class="left-btn">我的课表</router-link>
        </li>
        <li class="left-item" v-if="page == 2 && rights.course == 0">
            <router-link to="/course/demand" class="left-btn">申请调课</router-link>
        </li>
        <li class="left-item" v-if="page == 2 && rights.course == 1">
            <router-link to="/course/allClass" class="left-btn">全部排课</router-link>
        </li>
        <li class="left-item" v-if="page == 2 && rights.course == 1">
            <router-link to="/course/insert" class="left-btn">录入排课</router-link>
        </li>
        <li class="left-item" v-if="page == 2 && rights.course == 1">
            <router-link to="/course/examine" class="left-btn">审核申请</router-link>
        </li>
        <!-- 工作量管理模块 -->
        <!-- 培训管理模块 -->
        <li class="left-item" v-if="page == 4 && rights.train == 0">
            <router-link to="/train/demand" class="left-btn">培训申请</router-link>
        </li>
        <li class="left-item" v-if="page == 4 && rights.train == 0">
            <router-link to="/train/apply" class="left-btn">我的申请</router-link>
        </li>
        <li class="left-item" v-if="page == 4 && rights.train == 0">
            <router-link to="/train/feedback" class="left-btn">培训反馈</router-link>
        </li>
        <li class="left-item" v-if="page == 4 && rights.train == 0">
            <router-link to="/train/myfeedback" class="left-btn">我的反馈</router-link>
        </li>
        <li class="left-item" v-if="page == 4 && rights.train == 1">
            <router-link to="/train/examineApply" class="left-btn">审核申请</router-link>
        </li>
        <li class="left-item" v-if="page == 4 && rights.train == 1">
            <router-link to="/train/examineFeedback" class="left-btn">审核反馈</router-link>
        </li>
        <!-- 考核管理模块 -->
        <li class="left-item" v-if="page == 5 && rights.assessment == 0">
            <router-link to="/assessment/check" class="left-btn">查看成绩</router-link>
        </li>
        <li class="left-item" v-if="page == 5 && rights.assessment == 1">
            <router-link to="/assessment/insert" class="left-btn">录入考核</router-link>
        </li>
        <li class="left-item" v-if="page == 5 && rights.assessment == 1">
            <router-link to="/assessment/count" class="left-btn">考核统计</router-link>
        </li>
        <!-- 用户管理模块 -->
        <li class="left-item" v-if="page == 7">
            <router-link to="/user/index" class="left-btn">用户管理</router-link>
        </li>
    </ul>

</div>
