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
        <!-- <li class="left-item" v-if="p == 1 && isManager">
            <router-link to="/info/info1" class="left-btn">档案查看</router-link>
        </li>
        <li class="left-item" v-if="p == 1 && isManager">
            <router-link to="/info/info3" class="left-btn">档案删除</router-link>
        </li> -->
    </ul>

</div>
