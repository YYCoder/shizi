<div class="demand-container">
	<h1 class="title">申请调课</h1>
	<hr>
	<div class="form-container">
		<p class="info">填写您希望调整的信息</p>
		<hr>
    <div class="info-container">
    	<span class="info-name">选择您希望调整的课:</span>
    	<div class="content-container">
        <input type="list" list="courses" name="class" v-model="demand.id" @input="changeCourse">
        <datalist id="courses">
          <option v-for="course in courses" :value="course.id" :label="course.course">
        </datalist>
      </div>
  	</div>
		<div class="info-container">
      <span class="info-name">授课教室:</span>
      <div class="content-container">
	      <input type="text" name="room" class="info-inp" v-model="demand.room">
      </div>
    </div>
		<div class="info-container">
      <span class="info-name">上课时间:</span>
      <div class="content-container">
	      <drop :dropName="drop.timeDrop"
	      			:items="drop.timeDropList"
	      			@drop-click="timeDropClick"
	      			class="time"></drop>
	      <span class="tips">{{time}}</span>
      </div>
    </div>
		<div class="info-container">
      <span class="info-name">上课日期:</span>
      <div class="content-container">
	      <drop :dropName="drop.weekDrop"
	      			:items="drop.weekDropList"
	      			@drop-click="weekDropClick"
	      			class="week"></drop>
	      <span class="tips">{{week}}</span>
      </div>
    </div>

		<div class="btn-container">
      <button class="submit btn2" @click="submitDemand">提 交</button>
      <button class="reset btn2" @click="resetDemand">重 置</button>
    </div>
	</div>

</div>
