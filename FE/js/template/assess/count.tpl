<div class="count-container">
	<div class="list-head">
		<h1 class="title">考核成绩统计</h1>
		<hr>
		<div class="top-control">
			<div class="right-controls">
				<button class="btn" @click="changeChart('bar')">柱状图</button>
				<button class="btn" @click="changeChart('pie')">饼图</button>
			</div>
		</div>
	</div>
	<div class="chart-container">
		<div class="bar-chart chart" :class="[ whichChart.bar ? 'left-in' : 'right-out' ]"></div>
		<div class="pie-chart chart" :class="[ whichChart.pie ? 'left-in' : 'right-out' ]"></div>
	</div>
</div>
