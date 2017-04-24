<div class="left-nav">
    <ul>
        <!-- 教师列表模块 -->
        <li class="left-item" v-if="p == 0">
            <router-link to="/home/list" class="left-btn">教师列表</router-link>
        </li>
        <li class="left-item" v-if="p == 0">
            <router-link to="/home/detail" class="left-btn">教师详情</router-link>
        </li>
        <!-- 档案管理模块 -->
        <li class="left-item" v-if="p == 1">
            <router-link to="/info/update" class="left-btn">完善信息</router-link>
        </li>
        <li class="left-item" v-if="p == 1 && isManager">
            <router-link to="/info/insert" class="left-btn">档案录入</router-link>
        </li>
        <li class="left-item" v-if="p == 1 && isManager">
            <router-link to="/info/infoList" class="left-btn">全部档案</router-link>
        </li>
        <!-- 课程管理模块 -->
        <li class="left-item" v-if="p == 2 && !isManager">
            <router-link to="/course/class" class="left-btn">我的课表</router-link>
        </li>
        <li class="left-item" v-if="p == 2 && !isManager">
            <router-link to="/course/demand" class="left-btn">申请调课</router-link>
        </li>
        <li class="left-item" v-if="p == 2 && isManager">
            <router-link to="/course/allClass" class="left-btn">全部排课</router-link>
        </li>
        <li class="left-item" v-if="p == 2 && isManager">
            <router-link to="/course/insert" class="left-btn">录入排课</router-link>
        </li>
        <li class="left-item" v-if="p == 2 && isManager">
            <router-link to="/course/examine" class="left-btn">审核申请</router-link>
        </li>
        <!-- 工作量管理模块 -->
        <!-- 培训管理模块 -->
        <li class="left-item" v-if="p == 4 && !isManager">
            <router-link to="/train/demand" class="left-btn">培训申请</router-link>
        </li>
        <li class="left-item" v-if="p == 4 && !isManager">
            <router-link to="/train/apply" class="left-btn">我的申请</router-link>
        </li>
        <li class="left-item" v-if="p == 4 && !isManager">
            <router-link to="/train/feedback" class="left-btn">培训反馈</router-link>
        </li>
        <li class="left-item" v-if="p == 4 && !isManager">
            <router-link to="/train/myfeedback" class="left-btn">我的反馈</router-link>
        </li>
    </ul>

</div>
