<div class="comment-container">
	<h1 class="title animated wobble">留言板</h1>
	<hr>
	<div class="top-btns">
		<button class="leave-message" @click="comment">我要发言</button>
	</div>
	<div class="comment" @mousewheel="scrolling">
		<div class="scroll-bar" :class="{ hide: scrollBarBlur }"
														:style="{ height: `${scroll.scrollBarHeight}px` }"
														v-show="canScroll"></div>
		<div class="scroller">

			<div class="scroll-container">
				<div class="comment-item">
					<p class="user-info">
						<img src="http://www.yyteacher.com/FE/img/user.png" class="avatar">
						<span class="name">歪歪</span>
						<span class="type">说:</span>
					</p>
					<div class="content">啊实打实多控件:
						1.打算打
						2.阿斯顿撒多
						3.爱上大
					</div>
					<p class="time">2017年5月 3日 16:02 | <button class="quota">引用</button></p>
				</div>

				<div class="comment-item reply">
					<p class="user-info">
						<img src="http://www.yyteacher.com/FE/img/user.png" class="avatar">
						<span class="name">歪歪aaa</span>
						<span class="type">回复 歪歪:</span>
					</p>
					<div class="content">我是回复回复回复
					</div>
					<p class="time">2017年5月 3日 16:05 | <button class="quota">引用</button></p>
				</div>

				<div class="comment-item reply">
					<p class="user-info">
						<img src="http://www.yyteacher.com/FE/img/user.png" class="avatar">
						<span class="name">歪歪aaa</span>
						<span class="type">回复 歪歪:</span>
					</p>
					<div class="content">我是回复回复回复
						<blockquote>
							<pre>引用 歪歪 的发言:</pre>
							啊实打实多控件:
							1.打算打
							2.阿斯顿撒多
							3.爱上大
						</blockquote>
						我也是回复回复
					</div>
					<p class="time">2017年5月 3日 16:05 | <button class="quota">引用</button></p>
				</div>

				<div class="comment-item">
					<p class="user-info">
						<img src="http://www.yyteacher.com/FE/img/user.png" class="avatar">
						<span class="name">歪程序猿</span>
						<span class="type">说:</span>
					</p>
					<div class="content">啊刷了打卡实例化啊搜覅否后拉卡莎大是登录考核阿拉山口的好多阿里开始打的是空号埃里克森的好阿拉山口的哈迪斯啊看来是打断时,阿斯利康等哈说的了拉卡莎大.
					</div>
					<p class="time">2017年5月 6日 16:02 | <button class="quota">引用</button></p>
				</div>
			</div>
		</div>
	</div>

	<div class="comment-edit">
		<div class="title">您想说的话:</div>
		<div class="content">
			<div class="quota">您已引用了歪歪的话</div>
			<textarea type="text" v-model="commentData.content" @input="inputComment"></textarea>
			<div class="count-font">
				共<span class="number">{{fontCount}}</span>字, 还可写<span class="left-number">{{fontLeft}}</span>字
			</div>
		</div>
	</div>
</div>
