<div class="train-demand-container">
	<h1 class="title">培训申请</h1>
	<hr>
	<div class="form-container">
		<p class="info">请填写培训信息</p>
		<hr>
		<div class="info-container">
      <span class="info-name">培训名称</span>
      <i class="require-icon" v-if="requires.title">*</i>
      <div class="content-container">
        <input class="info-inp" type="text" name="title"
               maxlength=20
               v-model="formData.title">
      </div>
    </div>
		<div class="info-container">
      <span class="info-name">培训类型</span>
      <i class="require-icon" v-if="requires.type">*</i>
      <div class="content-container">
	      <drop :dropName="drop.dropType"
	      			:items="drop.types"
	      			@drop-click="selectType"></drop>
	      <span class="tip">{{dropText}}</span>
      </div>
    </div>
		<div class="info-container">
      <span class="info-name self-desc">培训描述</span>
      <i class="require-icon" v-if="requires.desc">*</i>
      <div class="content-container">
        <textarea class="info-inp" name="desc" rows=4 maxlength=100
            			v-model="formData.desc"
        ></textarea>
      </div>
    </div>
		<div class="info-container">
      <span class="info-name">培训地点</span>
      <i class="require-icon" v-if="requires.place">*</i>
      <div class="content-container">
        <input class="info-inp" type="text" name="place"
               maxlength=40
               v-model="formData.place">
      </div>
    </div>
    <div class="info-container">
      <span class="info-name">培训经费</span>
      <i class="require-icon" v-if="requires.price">*</i>
      <div class="content-container">
        <input class="info-inp" type="number" name="price"
               v-model="formData.price">
        <span class="tip">k</span>
      </div>
    </div>

		<div class="btn-container">
      <button class="submit btn1" @click="submit">提 交</button>
      <button class="reset btn1" @click="reset">重 置</button>
    </div>
	</div>
</div>
