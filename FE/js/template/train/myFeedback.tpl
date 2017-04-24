<div class="my-feedback-container">
	<h1 class="title">我的反馈</h1>
	<hr>
	<div class="info-list-wrap">
		<ul class="info-list-ul">
			<li class="title-list">
				<span class="title">培训名称</span>
				<span class="type">培训类型</span>
				<span class="desc">反馈描述</span>
				<span class="end-time" @click.stop="sort('end_time')">
					培训结束时间<i class="border-pointer" :class="{ pDesc: timeDesc }" />
				</span>
				<span class="price">培训费用</span>
				<span class="place">培训地点</span>
				<span class="state">审核状态</span>
				<span class="control">操作</span>
			</li>
			<li class="info-list" v-for="item in list"
														:key="item.id">
				<span class="title single-line" :title="item.title">{{item.title}}</span>
				<span class="type single-line">{{item.type}}</span>
				<span class="desc single-line" :title="item.desc">{{item.desc}}</span>
				<span class="end-time">{{item.end_time}}</span>
				<span class="price">{{item.price}}k</span>
				<span class="place single-line" :title="item.place">{{item.place}}</span>
				<span class="state single-line">{{item.state}}</span>
				<span class="control">
					<a href="javascript:;" @click.stop="cancel(item.id)">撤 销</a>
				</span>
			</li>

		</ul>
	</div>

	<div class="controls bottom-controls">
		<div class="right-control">
			<pager :pageNumber="pageNumber"
						 :curPage="curPage"
						 @page-change="pageChange"
			></pager>
		</div>
	</div>
</div>
