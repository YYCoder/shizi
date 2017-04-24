<div class="main-container">
    <!-- 首页 -->
    <router-view name="teacherList"></router-view>
    <router-view name="teacherDetail"></router-view>
    <!-- 档案管理模块 -->
    <router-view name="insert"></router-view>
    <router-view name="update"></router-view>
    <router-view name="infoList"></router-view>
    <!-- 课程管理 -->
	<router-view name="class"></router-view>
    <router-view name="insertClass"></router-view>
    <router-view name="allClass"></router-view>
    <router-view name="courseDemand"></router-view>
	<router-view name="courseExamine"></router-view>
    <!-- 工作量管理 -->
    <!-- 培训管理 -->
    <router-view name="trainDemand"></router-view>
    <router-view name="trainApply"></router-view>
    <router-view name="trainFeedback"></router-view>
    <router-view name="trainMyFeedback"></router-view>

</div>
