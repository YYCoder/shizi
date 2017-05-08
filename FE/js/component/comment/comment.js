/**
 * 留言板组件
 * @author  Markey
 * @date    2017-05-05
 */
define(function (require, exports) {
	const render = require('text!../../template/comment/comment.tpl');
	const ui = require('ui');
	const layer = require('layer');
	const pager = require('../common/pager');
	const lazyLoadImage = require('lazyLoadImage');

	const comment = {
		template: render,
		components: {
			pager
		},
		data() {
			return {
				// 自定义滚动条所需数据
				scroll: {},
				canScroll: false,
				// 鼠标离开滚动条2s滚动条消失, 暂时没实现
				scrollBarBlur: false,
				commentData: {
					content: '',
					refer_id: 0,
					quota_id: 0,
					refer_name: '',
					quota_name: '',
					quota_content: ''
				},
				data: [],
				// 分页用数据
				page: {
					pageNumber: 0,
					curPage: 0
				},
				param: {
					limit: 20,
					page: 1
				},
				// 用于告知是否为data的更新, 从而更新滚动条样式
				isDataUpdate: false,
				user: this.$root.user
			};
		},
		computed: {
			fontCount() {
				return this.commentData.content.length;
			},
			fontLeft() {
				return 100 - this.commentData.content.length;
			}
		},
		created() {
			this.getData();
		},
		mounted() {
			const	scroller = document.querySelector('div.scroller'),
						scrollBar = document.querySelector('div.scroll-bar'),
						scrollContainer = document.querySelector('div.scroll-container');
			this.scroll = {
				scroller,
				scrollBar,
				scrollContainer,
				// 滚动容器可滚动距离
	      scrollLength: 0,
	      // 滚动比例
	      ratio: 0,
	      // 滚动条高度
	      scrollBarHeight: 0,
				// 滚动条可滚动距离
				scrollBarLength: 0
			}
			// 不知道为什么, mounted钩子和updated钩子时的scroller高度不同, 只能在updated时再修改一下
			console.log(`scroller Height: ${ scroller.offsetHeight }`);
			console.log(`scrollContainer Height: ${ scrollContainer.offsetHeight }`);
		},
		updated() {
			// 更新自定义滚动条数据, 只有是data更新时才执行
			if (this.isDataUpdate) {
				let scroll = this.scroll;
				scroll.ratio = scroll.scroller.offsetHeight / scroll.scrollContainer.offsetHeight;
				scroll.scrollLength = scroll.scrollContainer.offsetHeight - scroll.scroller.offsetHeight;
				scroll.scrollBarHeight = parseInt(scroll.scroller.offsetHeight * scroll.ratio);
				scroll.scrollBarLength = scroll.scrollLength * scroll.ratio;
				this.canScroll = scroll.scroller.offsetHeight <= scroll.scrollContainer.offsetHeight;
				// 由于必须得在列表渲染之后才能计算出正确的滚动条数据, 并且此时修改绑定数据又不会更新DOM, 所以只能手动修改自定义滚动条的样式
				if (this.canScroll) {
					$('div.scroll-bar').css({
						'height': `${scroll.scrollBarHeight}px`,
						'display': 'block',
						'top': '0px'
					});
				}
				else {
					$('div.scroll-bar').css('display', 'none');
				}
				scroll.scroller.scrollTop = 0;
				this.isDataUpdate = false;
				lazyLoadImage.init();
				lazyLoadImage.reload();
				console.log(`scroller Height: ${ scroll.scroller.offsetHeight }`);
				console.log(`scrollContainer Height: ${ scroll.scrollContainer.offsetHeight }`);
			}
		},
		methods: {
			getData() {
				ui.loading();
				$.ajax({
					url: `${location.origin}/index.php/comment/get_comments`,
					type: 'get',
					data: this.param
				}).done(res => {
					ui.closeAll('loading');
					if (res.code == 0) {
						console.log(res.data);
						this.page.pageNumber = +res.data.page.page_count;
						this.page.curPage = +res.data.page.current_page;
						this.data = res.data.data;
						this.isDataUpdate = true;
					}
					else {
						ui.msgError(res.msg);
					}
				}).fail(res => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			},
			// 分页函数
			pageChange(p) {
				this.param.page = p;
				this.getData();
			},
			// 自己写的滚动条滚动事件处理函数
			scrolling(e) {
				const scroll = this.scroll,
							scroller = scroll.scroller,
							scrollBar = scroll.scrollBar,
							scrollBarLength = scroll.scrollBarLength,
							scrollLength = scroll.scrollLength,
							ratio = scroll.ratio;
				const top = parseInt(window.getComputedStyle(scroll.scrollBar, null).top);
				if (scroller.scrollTop >= 0 && scroller.scrollTop <= scrollLength) {
					scroller.scrollTop += e.deltaY / 2;
				}
				if (top >= 0 && top <= scrollBarLength) {
					/*console.log(`top: ${scrollBar.style.top}`);
					console.log(`scrollLength: ${scrollLength}`);
					console.log(`scrollBarLength: ${this.scroll.scrollBarLength}`);*/
					scrollBar.style.top = `${parseInt(scroller.scrollTop * ratio)}px`;
				}
				lazyLoadImage.init();
				lazyLoadImage.reload();
			},
			// 编辑留言
			comment(opt) {
				const vm = this;
				if (typeof opt === 'object') {
					if (opt.type === 'quota') {
						this.commentData.quota_id = opt.quota_id;
						this.commentData.quota_name = opt.quota_name;
						this.commentData.quota_content = opt.quota_content;
					}
					if (opt.type === 'reply') {
						this.commentData.refer_id = opt.refer_id;
						this.commentData.refer_name = opt.refer_name;
					}
				}
				layer.open({
					type: 1,
					area: '420px',
					title: false,
					content: $('.comment-edit'),
					shade: 0,
					cancel() {
						vm.clearData();
					}
				});
			},
			// 删除自己的留言, 同时删除所有回复该留言
			del(id) {
				const vm = this;
				ui.info({
					title: '确认要删除留言吗',
					msg: '若删除了该留言, 所有的回复与引用也会一同删除喔',
					yes() {
						$.ajax({
							url: `${location.origin}/index.php/comment/del_comment`,
							data: {id},
							type: 'post'
						}).done(res => {
							if (res.code == 0) {
								ui.msgRight('删除成功');
								vm.getData();
							}
							else {
								ui.msgError(res.msg);
							}
						}).fail(res => {
							ui.msgError(res.msg);
						});
					}
				});
			},
			// 清空要提交的数据
			clearData() {
				const commentData = this.commentData;
				commentData.refer_name = '';
				commentData.quota_name = '';
				commentData.quota_content = '';
				commentData.content = '';
				commentData.refer_id = 0;
				commentData.quota_id = 0;
			},
			// 输入留言, 防止输入过长
			inputComment() {
				let content = this.commentData.content;
				if (content.length > 100) {
					this.commentData.content = content.slice(0, 100);
				}
			},
			// 提交留言
			submit() {
				const commentData = this.commentData;
				if (commentData.content.length === 0) {
					ui.msgError('留言不能为空喔 ~');
				}
				else {
					ui.loading();
					$.ajax({
						url: `${location.origin}/index.php/comment/add_comment`,
						data: commentData,
						type: 'post'
					}).done(res => {
						ui.closeAll('loading');
						if (res.code == 0) {
							ui.msgRight('留言成功');
							this.clearData();
							this.getData();
						}
						else {
							ui.msgError(res.msg);
						}
					}).fail(res => {
						ui.closeAll('loading');
						ui.msgError(res.msg);
					});
				}
			}
		}
	}

	return comment;

});
