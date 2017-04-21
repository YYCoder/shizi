<div class="insert-course-container">
	<h1 class="title">录入排课</h1>
	<hr>
	<div class="form-container">
    <p class="info">填写排课基本信息</p>
    <hr>
		<div class="info-container">
      <span class="info-name">授课教师</span>
      <i class="require-icon" v-if="requires.teacher">*</i>
      <div class="content-container">
        <input type="list" list="teachers" name="teacher" v-model="formData.teacher">
        <datalist id="teachers">
          <option v-for="teacher in teachers" :value="teacher.id" :label="teacher.name">
        </datalist>
        <span class="tip">选择授课教师</span>
      </div>
    </div>
		<div class="info-container">
      <span class="info-name">授课班级</span>
      <i class="require-icon" v-if="requires.class">*</i>
      <div class="content-container">
        <input class="info-inp" type="text" name="class"
               maxlength=20
               v-model="formData.class">
      </div>
    </div>
		<div class="info-container">
      <span class="info-name">课程开始时间</span>
      <i class="require-icon" v-if="requires.start">*</i>
      <div class="content-container">
        <input class="info-inp" type="date" name="start"
               v-model="formData.start">
      </div>
    </div>
		<div class="info-container">
      <span class="info-name">课程结束时间</span>
      <i class="require-icon" v-if="requires.end">*</i>
      <div class="content-container">
        <input class="info-inp" type="date" name="end"
               v-model="formData.end">
      </div>
    </div>
		<div class="info-container">
      <span class="info-name">选择课程</span>
      <i class="require-icon" v-if="requires.course">*</i>
      <div class="content-container">
        <input type="list" list="courses" name="course" v-model="formData.course">
        <datalist id="courses">
          <option v-for="course in courses" :value="course.id" :label="course.name">
        </datalist>
        <span class="tip">选择课程</span>
      </div>
    </div>
    <hr>
  	<p class="info">选择上课时间及地点</p>
    <div class="class-time-container">
    	<div class="class-1">
				<div class="info-container">
		      <span class="info-name">选择上课时间</span>
		      <i class="require-icon" v-if="requires.time_1">*</i>
		      <div class="content-container pick-time time_1">
							<drop :items="drop.classTime"
                    :dropName="drop.classTimeName"
                    @drop-click="dropClickTime1"></drop>
		      </div>
          <span class="info-name">选择上课日期</span>
          <i class="require-icon" v-if="requires.week_1">*</i>
          <div class="content-container pick-time week_1">
              <drop :items="drop.classWeek"
                    :dropName="drop.classWeekName"
                    @drop-click="dropClickWeek1"></drop>
          </div>
		    </div>
        <div class="info-container">
          <span class="info-name">输入上课教室</span>
          <i class="require-icon" v-if="requires.room_1">*</i>
          <div class="content-container">
            <input class="info-inp" type="number" name="room_1"
                   maxlength=20
                   v-model="formData.room_1">
          </div>
        </div>
    	</div>
      <!-- 可选添加排课 -->
      <transition name="class">
        <div class="class-2" v-show="hasAddClass">
          <div class="info-container">
            <span class="info-name">选择上课时间</span>
            <i class="require-icon" v-if="requires.time_2">*</i>
            <div class="content-container pick-time time_2">
                <drop :items="drop.classTime"
                      :dropName="drop.classTimeName"
                      @drop-click="dropClickTime2"></drop>
            </div>
            <span class="info-name">选择上课日期</span>
            <i class="require-icon" v-if="requires.week_2">*</i>
            <div class="content-container pick-time week_2">
                <drop :items="drop.classWeek"
                      :dropName="drop.classWeekName"
                      @drop-click="dropClickWeek2"></drop>
            </div>
          </div>
          <div class="info-container">
            <span class="info-name">输入上课教室</span>
            <i class="require-icon" v-if="requires.room_2">*</i>
            <div class="content-container">
              <input class="info-inp" type="number" name="room_2"
                     maxlength=20
                     v-model="formData.room_2">
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="btn-container">
      <button class="btn1" @click="hasAddClass = true">添加本周排课次数</button>
      <button class="btn1" @click="deleteAddClass">删除本周排课次数</button>
      <br>
      <button class="submit btn2" @click="submit">提交</button>
    </div>

	</div>
</div>
