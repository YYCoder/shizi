<div class="info-list-container">
	<slot name="title">
		<h1 class="title">全部档案</h1>
	</slot>
	<hr>
	<div class="controls">
		<div class="right-control">
			<input type="text" placeholder="可搜索姓名,编号,专业,手机" class="search-inp"
						 v-model="getParam.where">
			<button class="search btn" @click="getData">搜 索</button>
		</div>
		<div class="left-control">
			<div class="drop btn">
				<span class="selected"
							@click.self="itemShow = !itemShow"
				>字段名</span>
				<span class="border-pointer"
						  :class="{ rotated: itemShow }"
						  @click.self="itemShow = !itemShow"
			  ></span>
				<transition name="item">
					<div class="selection item" v-show="itemShow">
						<div class="option" @click="changeSortItem('code')">编号</div>
						<div class="option" @click="changeSortItem('age')">年龄</div>
						<div class="option" @click="changeSortItem('entry')">入职时间</div>
					</div>
				</transition>
			</div>
			<div class="drop btn">
				<span class="selected"
							@click.self="typeShow = !typeShow"
				>方式</span>
				<span class="border-pointer"
							:class="{ rotated: typeShow }"
						  @click.self="typeShow = !typeShow"
				></span>
				<transition name="item">
					<div class="selection type" v-show="typeShow">
						<div class="option" @click="changeSortType('ASC')">升序</div>
						<div class="option" @click="changeSortType('DESC')">降序</div>
					</div>
				</transition>
			</div>
			<span class="tips">您可以选择数据的排序方式, 默认是按编号的升序排列</span>
		</div>
	</div>
	<div class="info-list-wrap">
		<ul class="info-list-ul">
			<li class="title-list">
				<span class="checkbox"></span>
				<span class="avatar">头像</span>
				<span class="name">姓名</span>
				<span class="sex">性别</span>
				<span class="code">编号</span>
				<span class="mobile">手机号</span>
				<span class="major">专业</span>
				<span class="age">年龄</span>
				<span class="title">职称</span>
				<span class="entry">入职时间</span>
				<span class="id-code">身份证</span>
				<span class="address">住址</span>
				<span class="control">操作</span>
			</li>

			<li class="info-list" v-for="item in list"
														:class="{ checked: item.checked }"
														:key="item.id"
														@click="item.checked = !item.checked">
				<span class="checkbox">
					<input type="checkbox" v-model="item.checked"
																 @click.stop="">
				</span>
				<span class="avatar">
					<div class="img-wrap" @click.stop="checkImg(item)">
						<img :data-src="item.avatar" alt="用户头像" class="avatar-img" title="点击查看大图">
					</div>
				</span>
				<span class="name single-line">{{item.name}}</span>
				<span class="sex">{{item.sex}}</span>
				<span class="code single-line">{{item.id}}</span>
				<span class="mobile single-line">{{item.mobile}}</span>
				<span class="major single-line">{{item.major}}</span>
				<span class="age">{{item.age}}</span>
				<span class="title single-line">{{item.title}}</span>
				<span class="entry">{{item.entry_time}}</span>
				<span class="id-code single-line">{{item.id_code}}</span>
				<span class="address single-line">{{item.address}}</span>
				<span class="control" v-if="!isHome">
					<a href="javascript:;" @click="deleteItem(item.id)">删除</a>
				</span>
				<span class="control" v-if="isHome">
					<a href="javascript:;" @click="toDetail(item.id)">查看详情</a>
				</span>
			</li>

		</ul>
	</div>
	<div class="controls bottom-controls">
		<div class="left-control">
			<button class="btn check-all" v-if="!isHome"
																		@click="checkAll">全选</button>
			<button class="btn delete-all" v-if="!isHome"
																		 @click="deleteAll">批量删除</button>
		</div>
		<div class="right-control">
			<pager :pageNumber="pageNumber"
						 :curPage="curPage"
						 @page-change="pageChange"
			></pager>
		</div>
	</div>



</div>
