<div class="feedback-container">
	<h1 class="title">提交反馈</h1>
	<hr>
	<div class="form-container">
		<p class="info">请填写反馈信息</p>
		<hr>
		<div class="info-container">
      <span class="info-name">您要反馈的培训</span>
      <i class="require-icon" v-if="requires.title">*</i>
      <div class="content-container">
        <drop :dropName="drop.dropTrain"
	      			:items="drop.trains"
	      			@drop-click="selectTrain"></drop>
	      <span class="tip">{{dropText}}</span>
      </div>
    </div>
		<div class="info-container">
      <span class="info-name self-desc">反馈描述</span>
      <i class="require-icon" v-if="requires.desc">*</i>
      <div class="content-container">
        <textarea class="info-inp" name="desc" rows=4 maxlength=100
            			v-model="formData.desc"
        ></textarea>
      </div>
    </div>
		<div class="info-container">
      <span class="info-name">培训结束时间</span>
      <i class="require-icon" v-if="requires.end_time">*</i>
      <div class="content-container">
        <input class="info-inp" type="date" name="end_time"
               v-model="formData.end_time">
      </div>
    </div>
		<div class="info-container">
      <span class="info-name certificate-span">上传毕业/结业证书</span>
      <i class="require-icon" v-if="requires.certificate">*</i>
      <div class="content-container">
        <input type="file" name="certificate" id="certificate"
            accept="image/png,image/jpeg"
            @change="upload"
        >
        <label class="btn-upload upload" for="certificate">点击上传</label>
        <span class="tip" v-text="certificateText"></span>
      </div>
    </div>
		<div class="info-container">
      <span class="info-name invoice-span">上传培训费用发票</span>
      <i class="require-icon" v-if="requires.invoice">*</i>
      <div class="content-container">
        <input type="file" name="invoice" id="invoice"
            accept="image/png,image/jpeg"
            @change="upload"
        >
        <label class="btn-upload upload" for="invoice">点击上传</label>
        <span class="tip" v-text="invoiceText"></span>
      </div>
    </div>

		<div class="btn-container">
      <button class="submit btn1" @click="submit">提 交</button>
      <button class="reset btn1" @click="reset">重 置</button>
    </div>
	</div>
</div>
