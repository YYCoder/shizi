<div class="examine-container">
	<div class="list-head">
		<h1 class="title">审核申请</h1>
		<hr>
		<div class="controls">
			<div class="left-control">
				<input type="text" class="search-inp" placeholder="可搜索教师姓名, 教师编号"
							 v-model="getParam.where">
				<button class="search btn" @click="getData">搜 索</button>
			</div>
		</div>
	</div>
	<div class="info-list-wrap">
		<ul class="info-list-ul">
			<li class="title-list">
				<span class="checkbox"></span>
				<span class="teacher">申请教师姓名</span>
				<span class="class">授课班级</span>
				<span class="course">课程名称</span>
				<span class="demand-time" @click.stop="sort('demand_time')">
					申请时间<i class="border-pointer" :class="{ desc: demandDesc }" />
				</span>
				<span class="time" @click.stop="sort('time')">
					原上课时间<i class="border-pointer" :class="{ desc: timeDesc }" />
				</span>
				<span class="time" @click.stop="sort('new_time')">
					新上课时间<i class="border-pointer" :class="{ desc: newTimeDesc }" />
				</span>
				<span class="week" @click.stop="sort('week')">
					原上课日期<i class="border-pointer" :class="{ desc: weekDesc }" />
				</span>
				<span class="week" @click.stop="sort('new_week')">
					新上课日期<i class="border-pointer" :class="{ desc: newWeekDesc }" />
				</span>
				<span class="room">原授课教室</span>
				<span class="room">新授课教室</span>
				<span class="control">操作</span>
			</li>
			<li class="info-list" v-for="item in demandList"
														:class="{ checked: item.checked }"
														:key="item.id"
														@click="item.checked = !item.checked">
				<span class="checkbox">
					<input type="checkbox" v-model="item.checked"
																 @click.stop="">
				</span>
				<span class="teacher single-line">{{item.teacher}}</span>
				<span class="class single-line">{{item.class}}</span>
				<span class="course single-line">{{item.course}}</span>
				<span class="demand-time single-line">{{item.demand_time}}</span>
				<span class="time single-line">{{item.time}}</span>
				<span class="time single-line">{{item.new_time}}</span>
				<span class="week single-line">{{item.week}}</span>
				<span class="week single-line">{{item.new_week}}</span>
				<span class="room single-line">{{item.room}}</span>
				<span class="room single-line">{{item.new_room}}</span>
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
