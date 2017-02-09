<div class="insert-container">
    <h1 class="title">档案录入</h1>
    <hr>
    <div class="tab-container">
        <button id="basic"
        	@click="curPage = 1"
        >1.基本信息</button>
        <button id="personal"
        	@click="curPage = 2"
        	:disabled="disables.personal"
        	:class="{disabled: disables.personal}"
        >2.个人信息</button>
        <button id="experience"
        	@click="curPage = 3"
        	:disabled="disables.experience"
        	:class="{disabled: disables.experience}"
        >3.工作经历</button>
    </div>
    <div class="form-container">
        <div class="info-basic" v-show="curPage == 1">
            <label class="info-label">
                <span class="info-name">姓名</span>
                <i class="require-icon" v-if="requires.name">*</i>
                <input class="info-inp" type="text" name="name"
                    maxlength=20
                    v-model="formData.name"
                >
            </label>
            <button class="next" @click="">下一步</button>
        </div>
        <div class="info-personal" v-show="curPage == 2">
            <input type="text" name="self" maxlength=100>
            <button class="next" @click="curPage = 3">下一步</button>
        </div>
        <div class="info-experience" v-show="curPage == 3">
            <input type="text" name="exp-college-1" maxlength=20>
            <button class="next" @click="submit">提交</button>
        </div>
    </div>
</div>