/**
 * 留言板组件
 * @author  Markey
 * @date    2017-05-05
 */
define(function (require, exports) {
	const render = require('text!../../template/comment/comment.tpl');
	const ui = require('ui');
	const layer = require('layer');

	const comment = {
		template: render,
		data() {
			return {
				// 自定义滚动条所需数据
				scroll: {},
				canScroll: false,
				// 鼠标离开滚动条2s滚动条消失, 暂时没实现
				scrollBarBlur: false,
				commentData: {
					uid: '',
					content: '',
					refer_id: 0,
					quota_id: 0
				},
				data: []
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
			// console.log(`scroller Height: ${ scroller.offsetHeight }`);
		},
		beforeUpdate() {
			let scroll = this.scroll;
			scroll.ratio = scroll.scroller.offsetHeight / scroll.scrollContainer.offsetHeight;
			scroll.scrollLength = scroll.scrollContainer.offsetHeight - scroll.scroller.offsetHeight;
			scroll.scrollBarHeight = parseInt(scroll.scroller.offsetHeight * scroll.ratio);
			scroll.scrollBarLength = scroll.scrollLength * scroll.ratio;
			this.canScroll = scroll.scroller.offsetHeight <= scroll.scrollContainer.offsetHeight;
			// console.log(`scroller Height: ${ scroll.scroller.offsetHeight }`);
		},
		methods: {
			scrolling(e) {
				const scroll = this.scroll,
							scroller = scroll.scroller,
							scrollBar = scroll.scrollBar,
							scrollBarLength = scroll.scrollBarLength,
							scrollLength = scroll.scrollLength,
							ratio = scroll.ratio;
				const top = parseInt(window.getComputedStyle(scroll.scrollBar, null).top);
				if (scroller.scrollTop >= 0 && scroller.scrollTop <= scrollLength) {
					scroller.scrollTop += e.deltaY / 3;
				}
				if (top >= 0 && top <= scrollBarLength) {
					/*console.log(`top: ${scrollBar.style.top}`);
					console.log(`scrollLength: ${scrollLength}`);
					console.log(`scrollBarLength: ${this.scroll.scrollBarLength}`);*/
					scrollBar.style.top = `${parseInt(scroller.scrollTop * ratio)}px`;
				}
			},
			comment() {
				layer.open({
					type: 1,
					area: '420px',
					title: false,
					content: $('.comment-edit'),
					shade: 0,
					cancel: function () {
					}
				});
			},
			inputComment() {
				let content = this.commentData.content;
				if (content.length > 100) {
					this.commentData.content = content.slice(0, 100);
				}
			}
		}
	}

	return comment;

});
