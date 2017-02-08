<header>
    <h1 class="top-title">师资信息管理系统</h1>
    <div class="nav">
        <router-link class="item" 
            tag="div"
            to="/home"
        >
            <a class="home">首页</a>
        </router-link>
        <router-link class="item" 
            tag="div"
            to="/info"
        >
            <a class="info">档案管理</a>
        </router-link>
        <router-link class="item" 
            tag="div"
            to="/course"
        >
            <a class="course">课程管理</a>
        </router-link>
        <router-link class="item" 
            tag="div"
            to="/work"
        >
            <a class="work">工作量管理</a>
        </router-link>
        <router-link class="item" 
            tag="div"
            to="/train"
        >
            <a class="train">培训管理</a>
        </router-link>
        <router-link class="item" 
            tag="div"
            to="/assessment"
        >
            <a class="assessment">考核管理</a>
        </router-link>
        <router-link class="item"
            v-if="userType == 2"
            tag="div"
            to="/user"
        >
            <a class="user">用户管理</a>
        </router-link>
        <router-link class="item" 
            tag="div"
            to="/comment"
        >
            <a class="comment">留言板</a>
        </router-link>
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