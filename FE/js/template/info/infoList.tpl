<div class="info-list-container">
	<h1 class="title">全部档案</h1>
	<hr>
	<div class="controls">
		<div class="right-control">
			<input type="text" placeholder="可搜索姓名,编号,年龄,专业,手机" class="search-inp">
			<button class="search btn">搜 索</button>
		</div>
		<div class="left-control">
			<div class="drop btn">
				<span class="selected"
							@click.self="itemShow = !itemShow"
				>字段名</span>
				<span class="border-pointer"
						  :class="{ rotated: itemShow }"
						  @click.self="itemShow = !itemShow"
			  ></span>
				<transition name="item">
					<div class="selection item" v-show="itemShow">
						<div class="option" @click="sortItem = 'code'">编号</div>
						<div class="option" @click="sortItem = 'age'">年龄</div>
						<div class="option" @click="sortItem = 'entry'">入职时间</div>
					</div>
				</transition>
			</div>
			<div class="drop btn" >
				<span class="selected"
							@click.self="typeShow = !typeShow"
				>方式</span>
				<span class="border-pointer"
							:class="{ rotated: typeShow }"
						  @click.self="typeShow = !typeShow"
				></span>
				<transition name="type">
					<div class="selection type" v-show="typeShow">
						<div class="option" @click="sortType = 'asc'">升序</div>
						<div class="option" @click="sortType = 'desc'">降序</div>
					</div>
				</transition>
			</div>
			<span class="tips">您可以选择数据的排序方式, 默认是按编号的升序排列</span>
		</div>
	</div>
	<div class="info-list-wrap">
		<ul class="info-list-ul">
			<li class="title-list">
				<span class="checkbox"></span>
				<span class="avatar">头像</span>
				<span class="name">姓名</span>
				<span class="sex">性别</span>
				<span class="code">编号</span>
				<span class="mobile">手机号</span>
				<span class="major">专业</span>
				<span class="age">年龄</span>
				<span class="title">职称</span>
				<span class="entry">入职时间</span>
				<span class="id-code">身份证</span>
				<span class="address">住址</span>
				<span class="control" v-if="!isHome">操作</span>
			</li>

			<li class="info-list" v-for="item in list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control" v-if="!isHome">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
			<li class="info-list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
			<li class="info-list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
			<li class="info-list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
			<li class="info-list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
			<li class="info-list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
			<li class="info-list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
			<li class="info-list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
			<li class="info-list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
			<li class="info-list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
			<li class="info-list">
				<span class="checkbox">
					<input type="checkbox">
				</span>
				<span class="avatar">
					<img src="http://www.yyteacher.com/uploads/img/XxAkIoUwvabMVZCK.png" alt="用户头像" class="avatar-img">
				</span>
				<span class="name single-line">袁野</span>
				<span class="sex">男</span>
				<span class="code single-line">102400</span>
				<span class="mobile single-line">15811152743</span>
				<span class="major single-line">信息管理及信息系统</span>
				<span class="age">22</span>
				<span class="title single-line">教师</span>
				<span class="entry">2017-04-11</span>
				<span class="id-code single-line">150424199505100071</span>
				<span class="address single-line">河北省沧州市任丘市</span>
				<span class="control">
					<a href="javascript:alert('点击删除');">删除</a>
				</span>
			</li>
		</ul>
	</div>
	<div class="controls bottom-controls">
		<div class="left-control">
			<button class="btn delete-all" v-if="!isHome">批量删除</button>
		</div>
		<div class="right-control">
			<pager :pageNumber="pageNumber"
						 :curPage="curPage"
						 @page-change="pageChange"
			></pager>
		</div>
	</div>



</div>
