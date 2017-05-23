<div class="exam-feedback-container">
	<div class="list-head">
		<h1 class="title">审核反馈</h1>
		<hr>
		<div class="controls">
			<div class="left-control">
				<input type="text" class="search-inp" placeholder="可搜索教师姓名,培训名称"
							 v-model="getParam.where.like">
				<button class="search btn" @click="getData">搜 索</button>
			</div>
			<div class="right-control">
				<span class="tips">您可以选择筛选审核状态, 培训类型</span>
				<drop :dropName="drop.stateName"
							:items="drop.stateItems"
							@drop-click="stateClick"></drop>
				<drop :dropName="drop.typeName"
							:items="drop.typeItems"
							@drop-click="typeClick"></drop>
			</div>
		</div>
	</div>
	<div class="info-list-wrap">
		<ul class="info-list-ul">
			<li class="title-list">
				<span class="checkbox"></span>
				<span class="teacher">申请教师</span>
				<span class="title">培训名称</span>
				<span class="type">培训类型</span>
				<span class="desc">反馈描述</span>
				<span class="end-time" @click.stop="sort('end_time')">
					培训结束时间<i class="border-pointer" :class="{ pDesc: timeDesc }" />
				</span>
				<span class="price" @click.stop="sort('price')">
					培训费用<i class="border-pointer" :class="{ pDesc: priceDesc }" />
				</span>
				<span class="cert single-line" title="结业/毕业证书">结业/毕业证书</span>
				<span class="invoice">发票证明</span>
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
				<span class="end-time">{{item.end_time}}</span>
				<span class="price">{{item.price}}k</span>
				<span class="cert single-line">
					<div class="img-wrap" data-image-wrap="center">
						<img :data-src="item.certificate" alt="毕业/结业证书" title="点击查看大图" class="small-img" @click="checkImg(item.certificate, 1, item.teacher)">
					</div>
				</span>
				<span class="invoice single-line">
					<div class="img-wrap" data-image-wrap="center">
						<img :data-src="item.invoice" alt="发票证明" title="点击查看大图" class="small-img"
						 @click="checkImg(item.invoice, 2, item.teacher)">
					</div>
				</span>
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
