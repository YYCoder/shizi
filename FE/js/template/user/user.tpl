<div class="user-container">
	<div class="list-head">
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
	</div>
	<div class="user-list-wrap">
		<ul class="user-list-ul">
			<li class="title-list">
				<span class="avatar">用户头像</span>
				<span class="id" @click.stop="sort('id')">
					用户id<i class="border-pointer" :class="{ pDesc: idDesc }" />
				</span>
				<span class="name">用户名</span>
				<span class="type">用户类型</span>
				<span class="mobile">手机号</span>
				<span class="email">邮箱</span>
				<span class="reg-time" @click.stop="sort('reg_time')">
					注册时间<i class="border-pointer" :class="{ pDesc: rDesc }" />
				</span>
				<span class="rights single-line" title="档案管理权限">档案管理权限</span>
				<span class="rights single-line" title="课程管理权限">课程管理权限</span>
				<span class="rights single-line" title="工作量管理权限">工作量管理权限</span>
				<span class="rights single-line" title="培训管理权限">培训管理权限</span>
				<span class="rights single-line" title="考核管理权限">考核管理权限</span>
				<span class="rights single-line" title="留言板管理权限">留言板管理权限</span>
				<span class="control">操作</span>
			</li>

			<li class="user-list" v-for="item in list"
														:key="item.id">
				<span class="avatar">
					<div class="img-wrap" @click.stop="checkImg(item)">
						<img :data-src="item.avatar" alt="用户头像" class="avatar-img" title="点击查看大图">
					</div>
				</span>
				<span class="id single-line">{{item.id}}</span>
				<span class="name single-line">{{item.name}}</span>
				<span class="type single-line">{{item.type}}</span>
				<span class="mobile single-line">{{item.mobile}}</span>
				<span class="email single-line" :title="item.email">{{item.email}}</span>
				<span class="reg-time">{{item.reg_time}}</span>
				<span class="rights">{{item.info}}</span>
				<span class="rights">{{item.course}}</span>
				<span class="rights">{{item.work}}</span>
				<span class="rights">{{item.train}}</span>
				<span class="rights">{{item.assessment}}</span>
				<span class="rights">{{item.comment}}</span>
				<span class="control">
					<a href="javascript:;" v-if="item.is_gag == 0" @click="mod({type: 'gag', id: item.id, value: 1})">禁言</a>
					<a href="javascript:;" v-else @click="mod({type: 'gag', id: item.id, value: 0})">解除禁言</a>
					<a href="javascript:;" @click="mod({type: 'rights', id: item.id, userType: item.type, info: item.info, course: item.course, work: item.work, train: item.train, assessment: item.assessment, comment: item.comment})">修改权限</a>
				</span>
			</li>

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

	<div class="rights-container">
		<h1 class="title">请选择需要修改的权限</h1>
		<div class="rights">
			<label>
				<input type="checkbox" v-model="rights.info">档案管理权限
			</label>
			<label>
				<input type="checkbox" v-model="rights.course">课程管理权限
			</label>
			<label>
				<input type="checkbox" v-model="rights.work">工作量管理权限
			</label>
			<label>
				<input type="checkbox" v-model="rights.train">培训管理权限
			</label>
			<label>
				<input type="checkbox" v-model="rights.assessment">考核管理权限
			</label>
			<label>
				<input type="checkbox" v-model="rights.comment">留言板管理权限
			</label>
		</div>
		<button class="submit btn" @click="submit">提 交</button>
	</div>

</div>
