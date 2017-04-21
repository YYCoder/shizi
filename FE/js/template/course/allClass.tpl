<div class="all-class-container">
	<h1 class="title">全部排课</h1>
	<hr>
	<div class="controls">
		<div class="left-control">
			<input type="text" class="search-inp"
						 v-model="getParam.where">
			<button class="search btn" @click="getData">搜 索</button>
			<span class="tips">可搜索教师姓名,教师编号,课程名,授课班级名,教室编号</span>
		</div>
	</div>
	<div class="info-list-wrap">
		<ul class="info-list-ul">
			<li class="title-list">
				<span class="checkbox"></span>
				<span class="teacher">教师姓名</span>
				<span class="tid" @click.stop="sort('tid')">
					教师编号<i class="border-pointer" :class="{ desc: tidDesc }" />
				</span>
				<span class="start" @click.stop="sort('start')">
					开课时间<i class="border-pointer" :class="{ desc: startDesc }" />
				</span>
				<span class="end" @click.stop="sort('end')">
					结课时间<i class="border-pointer" :class="{ desc: endDesc }" />
				</span>
				<span class="class">授课班级</span>
				<span class="course">课程名称</span>
				<span class="time">上课时间</span>
				<span class="room">上课教室</span>
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
				<span class="tid single-line">{{item.tid}}</span>
				<span class="start single-line">第{{item.start}}周</span>
				<span class="end single-line">第{{item.end}}周</span>
				<span class="class single-line">{{item.class}}</span>
				<span class="course single-line">{{item.course}}</span>
				<span class="time single-line">{{item.time}}</span>
				<span class="room single-line">{{item.room}}</span>
				<span class="control">
					<a href="javascript:;" @click="deleteItem(item.id)">删除</a>
					<a href="javascript:;" @click="updateItem(item.id)">修改</a>
				</span>
			</li>

		</ul>
	</div>

	<div class="controls bottom-controls">
		<div class="left-control">
			<button class="btn check-all" @click="checkAll">全选</button>
			<button class="btn delete-all" @click="deleteAll">批量删除</button>
		</div>
		<div class="right-control">
			<pager :pageNumber="pageNumber"
						 :curPage="curPage"
						 @page-change="pageChange"
			></pager>
		</div>
	</div>
</div>
