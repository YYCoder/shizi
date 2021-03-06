<div class="class-container">
	<h1 class="title">我的课表</h1>
	<hr>
	<div class="download btn" @click.stop="download">下载excel表格</div>
	<div class="class-table-container">
		<table>
			<caption>
				<drop :items="drop.items"
							:dropName="drop.name"
							@drop-click="selectWeek"></drop>
				我的课表
			</caption>
			<tr class="first-line">
				<td class="title"></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td class="title"></td>
				<td class="title">周一</td>
				<td class="title">周二</td>
				<td class="title">周三</td>
				<td class="title">周四</td>
				<td class="title">周五</td>
				<td class="title">周六</td>
				<td class="title">周日</td>
			</tr>
			<tr>
				<td class="title">第一二节</td>
				<td v-for="n in 7">
					<template v-for="classInfo in classList[0]">
						<div class="class-info" v-if="classInfo['week'] == n">
							<p class="class-name">{{classInfo['course_name']}}</p>
							<p class="class-class">{{classInfo['class']}}</p>
							<p class="class-timespan">{{classInfo['start']}}-{{classInfo['end']}}周</p>
							<p class="class-room">{{classInfo['room']}}教室</p>
						</div>
					</template>
				</td>
			</tr>
			<tr>
				<td class="title">第三四节</td>
				<td v-for="n in 7">
					<template v-for="classInfo in classList[1]">
						<div class="class-info" v-if="classInfo['week'] == n">
							<p class="class-name">{{classInfo['course_name']}}</p>
							<p class="class-class">{{classInfo['class']}}</p>
							<p class="class-timespan">{{classInfo['start']}}-{{classInfo['end']}}周</p>
							<p class="class-room">{{classInfo['room']}}教室</p>
						</div>
					</template>
				</td>
			</tr>
			<tr>
				<td class="title">第五六节</td>
				<td v-for="n in 7">
					<template v-for="classInfo in classList[2]">
						<div class="class-info" v-if="classInfo['week'] == n">
							<p class="class-name">{{classInfo['course_name']}}</p>
							<p class="class-class">{{classInfo['class']}}</p>
							<p class="class-timespan">{{classInfo['start']}}-{{classInfo['end']}}周</p>
							<p class="class-room">{{classInfo['room']}}教室</p>
						</div>
					</template>
				</td>
			</tr>
			<tr>
				<td class="title">第七八节</td>
				<td v-for="n in 7">
					<template v-for="classInfo in classList[3]">
						<div class="class-info" v-if="classInfo['week'] == n">
							<p class="class-name">{{classInfo['course_name']}}</p>
							<p class="class-class">{{classInfo['class']}}</p>
							<p class="class-timespan">{{classInfo['start']}}-{{classInfo['end']}}周</p>
							<p class="class-room">{{classInfo['room']}}教室</p>
						</div>
					</template>
				</td>
			</tr>
			<tr>
				<td class="title">第九十节</td>
				<td v-for="n in 7">
					<template v-for="classInfo in classList[4]">
						<div class="class-info" v-if="classInfo['week'] == n">
							<p class="class-name">{{classInfo['course_name']}}</p>
							<p class="class-class">{{classInfo['class']}}</p>
							<p class="class-timespan">{{classInfo['start']}}-{{classInfo['end']}}周</p>
							<p class="class-room">{{classInfo['room']}}教室</p>
						</div>
					</template>
				</td>
			</tr>
		</table>
	</div>
</div>
