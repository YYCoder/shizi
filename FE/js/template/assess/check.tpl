<div class="assess-check-container">
	<div class="head">
		<h1 class="title">查看考核成绩</h1>
		<hr>
		<button class="btn" @click="download">下载excel表格</button>
	</div>
	<div class="table-container">
		<table class="detail-table" align="center">
			<caption>{{user.name}}的考核成绩单</caption>
			<tr class="first-row">
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td class="avatar-td" rowspan="2" colspan="4">
					<img :src="user.avatar" alt="教师头像" class="avatar">
				</td>
				<td class="title-td">姓名</td>
				<td class="info" colspan="2">{{user.name}}</td>
				<td class="title-td">操作时间</td>
			</tr>
			<tr>
				<td class="title-td">操作人</td>
				<td class="info" colspan="2">{{data.m_name}}</td>
				<td class="info">{{data.time}}</td>
			</tr>
			<tr>
				<td class="title-td" colspan="8">院系考核成绩</td>
			</tr>
			<tr>
				<td class="title-td">科研考核平均分</td>
				<td class="info">{{data.science}}分</td>
				<td class="title-td" colspan="2">教学考核平均分</td>
				<td class="info">{{data.teach}}分</td>
				<td class="title-td" colspan="2">公益活动考核平均分</td>
				<td class="info">{{data.public}}分</td>
			</tr>
			<tr>
				<td class="title-td" colspan="8">学生考核成绩</td>
			</tr>
			<tr>
				<td class="title-td">课程质量考核平均分</td>
				<td class="info">{{data.course_quality}}分</td>
				<td class="title-td" colspan="2">课程纪律考核平均分</td>
				<td class="info">{{data.course_discipline}}分</td>
				<td class="title-td" colspan="2">教师仪表考核平均分</td>
				<td class="info">{{data.appearance}}分</td>
			</tr>
			<tr>
				<td class="title-td" colspan="8">综合成绩</td>
			</tr>
			<tr>
				<td class="title-td">院系考核评价</td>
				<td class="info">{{data.college_assessment}}</td>
				<td class="title-td">学生考核评价</td>
				<td class="info">{{data.student_assessment}}</td>
				<td class="title-td" colspan="2">综合评价</td>
				<td class="info" colspan="2">{{data.average}}</td>
			</tr>
		</table>
	</div>
</div>
