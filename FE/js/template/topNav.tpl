<header>
    <h1 class="top-title">师资信息管理系统</h1>
    <div class="nav">
        <div class="item" 
            @click="changeP(0)" 
            :class="{active: active == 0}"
        >
            <a href="javascript:;" class="home">首页</a>
        </div>
        <div class="item" 
            @click="changeP(1)" 
            :class="{active: active == 1}"
        >
            <a href="javascript:;" class="info">档案管理</a>
        </div>
        <div class="item" 
            @click="changeP(2)" 
            :class="{active: active == 2}"
        >
            <a href="javascript:;" class="course">课程管理</a>
        </div>
        <div class="item" 
            @click="changeP(3)" 
            :class="{active: active == 3}"
        >
            <a href="javascript:;" class="work">工作量管理</a>
        </div>
        <div class="item" 
            @click="changeP(4)" 
            :class="{active: active == 4}"
        >
            <a href="javascript:;" class="train">培训管理</a>
        </div>
        <div class="item" 
            @click="changeP(5)" 
            :class="{active: active == 5}"
        >
            <a href="javascript:;" class="assessment">考核管理</a>
        </div>
        <div class="item"
            v-if="userType == 2"
            @click="changeP(7)" 
            :class="{active: active == 7}"
        >
            <a href="javascript:;" class="user">用户管理</a>
        </div>
        <div class="item" 
            @click="changeP(6)" 
            :class="{active: active == 6}"
        >
            <a href="javascript:;" class="comment">留言板</a>
        </div>
    </div>
    <div class="user-info">
        <img class="top-avatar" :src="userAvatar" alt="头像">
        <div class="info">
            <p class="greeting">
            欢迎你, <span class="user-name">{{userName}}</span>
            </p>
            <p class="identity">
                <span class="type" v-text="userType == 0 ? '教师' : user.type == 1 ? '管理员' : '超级管理员'">
                </span>
                <span class="arrow"></span>
            </p>
        </div>
    </div>
</header>