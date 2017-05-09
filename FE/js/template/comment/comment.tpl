<div class="comment-container">
	<h1 class="title animated wobble">留言板</h1>
	<hr>
	<div class="top-btns">

		<button class="leave-message" @click="comment">
			<span class="mask" v-if="user.isGag == 1"></span>我要发言
		</button>
		<button class="control-gag" v-if="user.isGag == 1"
																@click="changeGag">解除用户禁言</button>
	</div>
	<div class="comment" @mousewheel="scrolling">
		<div class="scroll-bar" :class="{ hide: scrollBarBlur }"
														v-show="canScroll"></div>
		<div class="scroller">
			<div class="scroll-container">

				<div class="comment-item" :class="{ reply: item.refer_id != 0 }" v-for="item in data">
					<div class="user-info">
						<div class="img-wrap">
							<img :data-src="item.avatar" class="avatar">
						</div>
						<template v-if="item.refer_id != 0">
							<span class="name">{{item.name}}</span>
							<span class="type">回复 {{item.refer_name}}:</span>
						</template>
						<template v-else>
							<span class="name">{{item.name}}</span>
							<span class="type">说:</span>
						</template>
					</div>
					<div class="content">
						<blockquote v-if="item.quota_id != 0"><pre>引用 {{item.quota_name}} 的发言:</pre>{{item.quota_content}}</blockquote>{{item.content}}
					</div>
					<p class="time">{{item.time}}
						<button class="quota" v-if="user.isGag == 0"
																	@click="comment({type: 'quota', quota_id: item.id, quota_name: item.name, quota_content: item.content})">引用</button>
						<button class="reply" v-if="user.isGag == 0"
																  @click="comment({type: 'reply', refer_id: item.refer_id == 0 ? item.id : item.refer_id, refer_name: item.name})">回复</button>
						<button class="delete" @click="del(item.id)"
																	 v-if="item.uid == +user.id">删除</button>
					</p>
				</div>

			</div>
		</div>
	</div>
	<div class="page-wrap">
		<pager :pageNumber="page.pageNumber"
					 :curPage="page.curPage"
					 @page-change="pageChange"></pager>
	</div>
	<div class="comment-edit">
		<div class="title" v-if="commentData.refer_id == 0">您想说的话:</div>
		<div class="title" v-else>您想回复{{commentData.refer_name}}的话:</div>
		<div class="content">
			<div class="quota" v-if="commentData.quota_id != 0">您已引用了{{commentData.quota_name}}的话</div>
			<textarea type="text" v-model="commentData.content" @input="inputComment"></textarea>
			<div class="count-font">
				共<span class="number">{{fontCount}}</span>字, 还可写<span class="left-number">{{fontLeft}}</span>字
			</div>
		</div>
		<div class="btns">
			<button class="submit" @click="submit">发布</button>
			<button class="reset" @click="commentData.content = ''">重新输入</button>
		</div>
	</div>

	<div class="gaged-users">
		<ul class="users">
			<li class="title-list">
				<span class="id">用户id</span>
				<span class="name">用户名</span>
				<span class="control">操作</span>
			</li>
			<li class="user-list">
				<span class="id">123</span>
				<span class="name">歪歪</span>
				<span class="control">
					<a href="javascript:;">解除禁言</a>
				</span>
			</li>
		</ul>
	</div>

</div>
