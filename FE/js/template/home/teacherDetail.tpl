<div class="teacher-detail-container">
	<h1 class="title">教师详情</h1>
	<hr>
	<table class="detail-table" align="center">
		<caption>教师信息表</caption>
		<tr class="first-row">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
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
			<td class="avatar-td" rowspan="4" colspan="3">
				<img :src="info.avatar" alt="教师头像" class="avatar">
			</td>
			<td class="title-td">姓名</td>
			<td class="info">{{info.name}}</td>
			<td class="title-td">性别</td>
			<td class="info">{{info.sex}}</td>
			<td class="title-td">出生日期</td>
			<td class="info">{{info.birthday}}</td>
			<td class="title-td">手机号</td>
			<td class="info">{{info.mobile}}</td>
			<td class="title-td">婚否</td>
			<td class="info">{{marriage}}</td>
		</tr>
		<tr>
			<td class="title-td">身份证</td>
			<td class="info" colspan="2">{{info.id_code}}</td>
			<td class="title-td">毕业院校</td>
			<td class="info" colspan="2">{{info.graduation}}</td>
			<td class="title-td">家庭住址</td>
			<td class="info" colspan="3">{{info.address}}</td>
		</tr>
		<tr>
			<td class="title-td">专业</td>
			<td class="info" colspan="2">{{info.major}}</td>
			<td class="title-td">入职时间</td>
			<td class="info">{{info.entry_time}}</td>
			<td class="title-td">职称</td>
			<td class="info">{{info.title}}</td>
			<td class="title-td mock">爱好</td>
			<td class="info" colspan="2">好多好多好多爱好,好多好多</td>
		</tr>
		<tr>
			<td class="title-td">自我描述</td>
			<td class="info" colspan="9">{{info.self_descp}}</td>
		</tr>
		<tr>
			<td class="title-td">国籍</td>
			<td class="info">{{info.nationality}}</td>
			<td class="title-td">研究方向</td>
			<td class="info" colspan="2">{{info.direction}}</td>
			<td class="title-td">薪资</td>
			<td class="info">{{info.salary}}k</td>
			<td class="title-td">邮政编码</td>
			<td class="info">{{info.postcode}}</td>
			<td class="title-td">教龄</td>
			<td class="info">{{info.teach_year}}年</td>
			<td class="title-td mock">学历</td>
			<td class="info">硕士</td>
		</tr>
		<tr>
			<td rowspan="4" class="title-td mock">家庭情况</td>
			<td class="mock" colspan="3" class="title-td mock">姓名</td>
			<td class="mock" colspan="3" class="title-td mock">与本人关系</td>
			<td class="mock" colspan="3" class="title-td mock">工作单位</td>
			<td class="mock" colspan="3" class="title-td mock">职务</td>
		</tr>
		<tr>
			<td class="info" colspan="3">{{info.home[0].name}}</td>
			<td class="info" colspan="3">{{info.home[0].relation}}</td>
			<td class="info" colspan="3">{{info.home[0].dep}}</td>
			<td class="info" colspan="3">{{info.home[0].job}}</td>
		</tr>
		<tr>
			<td class="info" colspan="3">{{info.home[1].name}}</td>
			<td class="info" colspan="3">{{info.home[1].relation}}</td>
			<td class="info" colspan="3">{{info.home[1].dep}}</td>
			<td class="info" colspan="3">{{info.home[1].job}}</td>
		</tr>
		<tr>
			<td class="info" colspan="3">{{info.home[2].name}}</td>
			<td class="info" colspan="3">{{info.home[2].relation}}</td>
			<td class="info" colspan="3">{{info.home[2].dep}}</td>
			<td class="info" colspan="3">{{info.home[2].job}}</td>
		</tr>
		<tr>
			<td rowspan="4" class="title-td">教学经验</td>
			<td colspan="3" class="title-td">任教学校</td>
			<td colspan="3" class="title-td">任职时间</td>
			<td colspan="6" class="title-td">工作描述</td>
		</tr>
		<tr>
			<td class="info" colspan="3">{{info.exp_1_college}}</td>
			<td class="info" colspan="3">{{info.exp_1_time}}</td>
			<td class="info" colspan="6">{{info.exp_1_descp}}</td>
		</tr>
		<tr>
			<td class="info" colspan="3">{{info.exp_2_college}}</td>
			<td class="info" colspan="3">{{info.exp_2_time}}</td>
			<td class="info" colspan="6">{{info.exp_2_descp}}</td>
		</tr>
		<tr>
			<td class="info" colspan="3">{{info.exp_3_college}}</td>
			<td class="info" colspan="3">{{info.exp_3_time}}</td>
			<td class="info" colspan="6">{{info.exp_3_descp}}</td>
		</tr>
	</table>
</div>
