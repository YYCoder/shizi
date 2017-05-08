<div class="user-container">
	<h1 class="title">用户管理</h1>
	<hr>
	<div class="controls">
		<div class="left-control">
			<input type="text" class="search-inp" placeholder="可搜索用户名,id,手机号"
						 v-model="getParam.where">
			<button class="search btn" @click="getData">搜 索</button>
		</div>
		<div class="right-control">
			<span class="tips">您还可以选择筛选用户类型</span>
			<drop :dropName="drop.name"
						:items="drop.items"
						@drop-click="dropClick"></drop>
		</div>
	</div>
	<div class="user-list-wrap">
		<ul class="user-list-ul">
			<li class="title-list">
				<span class="avatar">用户头像</span>
				<span class="id">用户id</span>
				<span class="name">用户名</span>
				<span class="type">用户类型</span>
				<span class="mobile">手机号</span>
				<span class="email">邮箱</span>
				<span class="reg-time" @click.stop="sort('reg_time')">
					注册时间<i class="border-pointer" :class="{ rDesc: regDesc }" />
				</span>
				<span class="rights">档案管理权限</span>
				<span class="rights">课程管理权限</span>
				<span class="rights">工作量管理权限</span>
				<span class="rights">培训管理权限</span>
				<span class="rights">考核管理权限</span>
				<span class="rights">留言板管理权限</span>
				<span class="gag">是否禁言</span>
				<span class="control">操作</span>
			</li>

			<li class="user-list">
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/R5lqGQdcWIm306As.gif" class="avatar">
				</span>
				<span class="id">123</span>
				<span class="name">袁野</span>
				<span class="type">超级管理员</span>
				<span class="mobile">15811153743</span>
				<span class="email">931345066@qq.com</span>
				<span class="reg-time">
					2017-09-10
				</span>
				<span class="rights">是</span>
				<span class="rights">是</span>
				<span class="rights">否</span>
				<span class="rights">否</span>
				<span class="rights">是</span>
				<span class="rights">否</span>
				<span class="gag">否</span>
				<span class="control">
					<a href="javascript:;">禁言</a>
					<a href="javascript:;">修改权限</a>
				</span>
			</li>
			<!-- <li class="user-list" v-for="item in list"
														:class="{ checked: item.checked }"
														:key="item.id"
														@click="item.checked = !item.checked">
				<span class="checkbox">
					<input type="checkbox" v-model="item.checked"
																 @click.stop="">
				</span>
				<span class="teacher single-line">{{item.teacher}}</span>
				<span class="title single-line" :title="item.title">{{item.title}}</span>
				<span class="type single-line" :title="item.type">{{item.type}}</span>
				<span class="desc single-line" :title="item.desc">{{item.desc}}</span>
				<span class="begin-time">{{item.begin_time}}</span>
				<span class="price">{{item.price}}k</span>
				<span class="place single-line" :title="item.place">{{item.place}}</span>
				<span class="state single-line">{{item.state}}</span>
				<span class="control">
					<a href="javascript:;" @click.stop="denyItem(item.id)">驳回</a>
					<a href="javascript:;" @click.stop="agreeItem(item.id)">通过</a>
				</span>
			</li> -->

		</ul>
	</div>

	<div class="controls bottom-controls">
		<div class="right-control">
			<pager :pageNumber="page.pageNumber"
						 :curPage="page.curPage"
						 @page-change="pageChange"
			></pager>
		</div>
	</div>
</div>
