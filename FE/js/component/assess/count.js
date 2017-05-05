/**
 * 考核统计组件
 * @author  Markey
 * @date    2017-05-04
 */
define(function (require, exports) {
	'use strict';
	const render = require('text!../../template/assess/count.tpl');
	const ui = require('ui');
	const echarts = require('echarts');

	const count = {
		template: render,
		data() {
			return {
				whichChart: {
					'bar': true,
					'pie': false
				},
				// 图表实例
				chart: '',
				// 柱状图配置
				barOption: {
					title: {
              text: '考核成绩统计'
          },
          tooltip: {},
          legend: {
              show: false
          },
          xAxis: {
              data: []
          },
          yAxis: {},
          series: [{
              name: '考核成绩柱状图',
              type: 'bar',
              data: []
          }],
				},
				// 饼图配置
				pieOption: {
					title: {
              text: '考核成绩统计'
          },
          tooltip: {},
          legend: {
              show: false
          },
					series : [
			        {
			            name: '考核成绩饼图',
			            type: 'pie',
			            radius: '55%',
			            data:[]
			        }
			    ],
				}
			}
		},
		mounted() {
			this.chart = echarts.init(document.querySelector('.bar-chart'));
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(this.barOption);
      this.getData();
		},
		methods: {
			// 获取数据并配置echarts, 将数据渲染进图表中
			getData() {
				ui.loading();
				$.ajax({
					url: `${location.origin}/index.php/assessment/get_data`,
					type: 'get',
				}).done(res => {
					ui.closeAll('loading');
					if (res.code == 0) {
						// 不同的图表用不同的数据
						if (this.whichChart.bar) {
							const colorArr = ['#bda29a', '#d48265', '#546570', '#ca8622', '#6495ed', '#8fbc8f'];
							const barData = [];
							for(let k in res.data) {
								barData.push({
									name: k,
									value: res.data[k],
									itemStyle: {
										normal: {
											color: colorArr[Math.floor(Math.random()*4)]
										}
									}
								});
							}
							this.chart.setOption({
								xAxis: {
									data: Object.keys(res.data)
								},
								series: {
									name: '考核成绩柱状图',
									data: barData
								}
							});
						}
						else {
							const pieData = [];
							for(let k in res.data) {
								pieData.push({
									name: k,
									value: res.data[k]
								});
							}
							this.chart.setOption({
								series: {
									name: '考核成绩饼图',
									data: pieData
								}
							});
						}
					}
					else {
						ui.msgError(res.msg);
					}
				}).fail(res => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			},
			changeChart(c) {
				const whichChart = this.whichChart;
				for(let k in whichChart) {
					if (k === c) {
						whichChart[k] = true;
						this.chart = echarts.init(document.querySelector(`.${k}-chart`));
						this.chart.setOption(this[`${k}Option`]);
						this.getData();
					}
					else {
						whichChart[k] = false;
					}
				}
			}
		}
	}

	return count;

});
