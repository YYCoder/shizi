<div class="insert-course-container">
	<h1 class="title">录入排课</h1>
	<hr>
	<div class="form-container">
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

    <div class="class-time-container">
    	<p class="info">选择上课时间及地点</p>
    	<div class="class-1">
				<div class="info-container">
		      <span class="info-name">选择上课时间</span>
		      <i class="require-icon" v-if="requires.teacher">*</i>
		      <div class="content-container">
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
										<div class="option" @click="changeSortItem('code')">编号</div>
										<div class="option" @click="changeSortItem('age')">年龄</div>
										<div class="option" @click="changeSortItem('entry')">入职时间</div>
									</div>
								</transition>
							</div>
		      </div>
		    </div>
    	</div>
    </div>


	</div>
</div>
