<div class="assess-insert-container">
	<h1 class="title">考核成绩录入</h1>
	<hr>
	<div class="form-container">
		<p class="info">选择教师</p>
		<hr>
		<div class="info-container">
      <span class="info-name">选择教师所属专业</span>
      <i class="require-icon" v-if="requires.mid">*</i>
      <div class="content-container">
        <input type="list" list="major" v-model="mid" @input="selectMajor">
	    	<datalist id="major">
	    		<option v-for="item in majorList" :value="item.id">{{item.name}}</option>
	    	</datalist>
	    	<!-- 动态渲染的选择教师 -->
		    <transition name="custom"
										enter-active-class="animated bounceInRight"
    								leave-active-class="animated bounceOutRight">
			    <div class="select-teacher" v-show="hasSelectMajor">
			    	<span class="teacher">选择教师</span>
			      <i class="require-icon">*</i>
			    	<input type="list" list="teacher" v-model="formData.tid" @input="selectTeacher">
			    	<datalist id="teacher">
			    		<option v-for="item in teacherList" :value="item.id">{{item.name}}</option>
			    	</datalist>
			    </div>
		    </transition>
      </div>
    </div>
    <!-- 选择教师后,显示出来该教师信息 -->
    <transition name="custom"
    						enter-active-class="animated tada"
    						leave-active-class="animated fadeOutDown">
	    <div class="teacher-container" v-show="hasSelectTeacher">
	    	<div class="avatar-wrap">
	    		<img :data-src="teacher.avatar" src="http://www.yyteacher.com/FE/img/user.png" alt="教师头像" class="avatar" title="教师头像">
	    	</div>
				<div class="teacher-info-container">
					<p class="name">{{teacher.name}}</p>
					<p class="age">{{teacher.age}}岁</p>
					<p class="major">{{teacher.major}}</p>
					<p class="self">{{teacher.self}}</p>
				</div>
	    </div>

    </transition>
		<p class="info">院系考核成绩</p>
		<hr>
		<div class="info-container">
      <span class="info-name">您要反馈的培训</span>
      <i class="require-icon" v-if="requires.title">*</i>
      <div class="content-container">

      </div>
    </div>
	</div>
</div>
