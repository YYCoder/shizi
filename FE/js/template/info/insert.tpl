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
            <div class="info-container">
                <span class="info-name">姓名</span>
                <i class="require-icon" v-if="requires.name">*</i>
                <input class="info-inp" type="text" name="name"
                    maxlength=20
                    v-model="formData.name"
                >
            </div>
            <div class="info-container">
                <span class="info-name">头像</span>
                <i class="require-icon" v-if="requires.avatar">*</i>
                <input type="file" name="avatar" id="avatar"
                    accept="image/png,image/gif" 
                    @change="changeAvatar"
                >
                <label for="avatar">点击上传头像</label>
                <img src="http://www.yyteacher.com/FE/img/user.png" class="avatar">
            </div>
            <div class="info-container">
                <span class="info-name">性别</span>
                <i class="require-icon" v-if="requires.sex">*</i>
                <label>
                    男:<input type="radio" name="sex" value="1"
                            v-model="formData.sex">
                </label>
                <label>
                    女:<input type="radio" name="sex" value="2"
                            v-model="formData.sex">
                </label>
            </div>
            <button class="next" @click="changePage(curPage)">下一步</button>
        </div>
        <div class="info-personal" v-show="curPage == 2">
            <div class="info-container">
                <span class="info-name">年龄</span>
                <i class="require-icon" v-if="requires.age">*</i>
                <input class="info-inp" type="number" name="age"
                    max=100
                    v-model="formData.age"
                >
            </div>
            <div class="info-container">
                <span class="info-name">自我描述</span>
                <i class="require-icon" v-if="requires.self">*</i>
                <textarea class="info-inp" name="self"
                    rows=4
                    maxlength=100
                    v-model="formData.self"
                ></textarea>
            </div>
            <button class="next" @click="changePage(curPage)">下一步</button>
        </div>
        <div class="info-experience" v-show="curPage == 3">
            <input type="text" name="exp-college-1" maxlength=20>
            <button class="next" @click="submit">提交</button>
        </div>
    </div>
</div>