<div class="exam-apply-container">
	<h1 class="title">审核申请</h1>
	<hr>
	<div class="controls">
		<div class="left-control">
			<input type="text" class="search-inp" placeholder="可搜索教师姓名"
						 v-model="getParam.where.name">
			<button class="search btn" @click="getData">搜 索</button>
		</div>
		<div class="right-control">
			<span class="tips">您还可以选择筛选审核状态</span>
			<drop :dropName="drop.name"
						:items="drop.items"
						@drop-click="dropClick"></drop>
		</div>
	</div>
	<div class="info-list-wrap">
		<ul class="info-list-ul">
			<li class="title-list">
				<span class="checkbox"></span>
				<span class="teacher">申请教师</span>
				<span class="title">培训名称</span>
				<span class="type">培训类型</span>
				<span class="desc">培训描述</span>
				<span class="begin-time" @click.stop="sort('begin_time')">
					申请时间<i class="border-pointer" :class="{ pDesc: timeDesc }" />
				</span>
				<span class="price" @click.stop="sort('price')">
					培训费用<i class="border-pointer" :class="{ pDesc: priceDesc }" />
				</span>
				<span class="place">培训地点</span>
				<span class="state">审核状态</span>
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
			</li>


		</ul>
	</div>

	<div class="controls bottom-controls">
		<div class="left-control">
			<button class="btn check-all" @click="checkAll">全选</button>
			<button class="btn delete-all" @click="agreeAll">批量通过</button>
			<button class="btn delete-all" @click="denyAll">批量驳回</button>
		</div>
		<div class="right-control">
			<pager :pageNumber="pageNumber"
						 :curPage="curPage"
						 @page-change="pageChange"
			></pager>
		</div>
	</div>
</div>
