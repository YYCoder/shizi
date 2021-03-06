<div class="insert-container">
    <slot name="title">
        <h1 class="title">档案录入</h1>
    </slot>
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
        <!-- 基本信息 -->
        <div class="info-basic" v-show="curPage == 1">
            <div class="info-container">
                <span class="info-name">姓名</span>
                <i class="require-icon" v-if="requires.name">*</i>
                <div class="content-container">
                    <input class="info-inp" type="text" name="name"
                        maxlength=20
                        v-model="formData.name"
                    >
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">身份证号</span>
                <i class="require-icon" v-if="requires.idCode">*</i>
                <div class="content-container">
                    <input class="info-inp" type="text" name="idCode"
                        min="0"
                        maxlength="18"
                        v-model="formData.idCode"
                    >
                </div>
            </div>
            <div class="info-container">
                <span class="info-name avatar-span">头像</span>
                <i class="require-icon" v-if="requires.avatar">*</i>
                <div class="content-container">
                    <input type="file" name="avatar" id="avatar"
                        accept="image/png,image/gif"
                        @change="changeAvatar"
                    >
                    <label class="btn1 upload" for="avatar">点击上传头像</label>
                    <img :src="formData.avatar" class="avatar">
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">性别</span>
                <i class="require-icon" v-if="requires.sex">*</i>
                <div class="content-container">
                    <label>
                        男:&nbsp;<input type="radio" name="sex" value="1"
                                v-model="formData.sex">
                    </label>
                    <label>
                        女:&nbsp;<input type="radio" name="sex" value="2"
                                v-model="formData.sex">
                    </label>
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">专业</span>
                <i class="require-icon" v-if="requires.major">*</i>
                <div class="content-container">
                    <input type="list" list="majors" name="major" v-model="formData.major">
                    <datalist id="majors">
                        <option v-for="major in majors" :value="major.id" :label="major.name">
                    </datalist>
                    <span class="tip">专业编号或专业名称</span>
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">研究方向</span>
                <i class="require-icon" v-if="requires.direction">*</i>
                <div class="content-container">
                    <input class="info-inp" type="text"
                        name="direction"
                        maxlength=30
                        v-model="formData.direction"
                    >
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">国籍</span>
                <i class="require-icon" v-if="requires.nationality">*</i>
                <div class="content-container">
                    <input class="info-inp" type="text"
                        name="nationality"
                        maxlength=30
                        v-model="formData.nationality"
                    >
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">职称</span>
                <i class="require-icon" v-if="requires.title">*</i>
                <div class="content-container">
                    <input class="info-inp" type="text"
                        name="title"
                        maxlength=30
                        v-model="formData.title"
                    >
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">毕业院校</span>
                <i class="require-icon" v-if="requires.graduation">*</i>
                <div class="content-container">
                    <input class="info-inp" type="text"
                        name="graduation"
                        maxlength=20
                        v-model="formData.graduation"
                    >
                </div>
            </div>
            <button class="btn2" @click="changePage(curPage)">下一步</button>
        </div>
        <!-- 个人信息 -->
        <div class="info-personal" v-show="curPage == 2">
            <div class="info-container">
                <span class="info-name">生日</span>
                <i class="require-icon" v-if="requires.birthday">*</i>
                <div class="content-container">
                    <input class="info-inp" type="date" name="birthday"
                        v-model="formData.birthday"
                    >
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">手机</span>
                <i class="require-icon" v-if="requires.mobile">*</i>
                <div class="content-container">
                    <input class="info-inp" type="number" name="mobile"
                        maxlength=11
                        v-model="formData.mobile"
                    >
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">家庭住址</span>
                <i class="require-icon" v-if="requires.address">*</i>
                <div class="content-container">
                    <input class="info-inp" type="text" name="address"
                        maxlength=100
                        v-model="formData.address"
                    >
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">邮政编码</span>
                <i class="require-icon" v-if="requires.postcode">*</i>
                <div class="content-container">
                    <input class="info-inp" type="number"
                        name="postcode"
                        maxlength=10
                        v-model="formData.postcode"
                    >
                </div>
            </div>
            <div class="info-container">
                <span class="info-name self-desc">自我描述</span>
                <i class="require-icon" v-if="requires.self">*</i>
                <div class="content-container">
                    <textarea class="info-inp" name="self"
                        rows=4
                        maxlength=100
                        v-model="formData.self"
                    ></textarea>
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">薪资</span>
                <i class="require-icon" v-if="requires.salary">*</i>
                <div class="content-container">
                    <i class="salary-icon">¥&nbsp;</i>
                    <input class="info-inp" type="number" name="salary"
                        max="10" min="0"
                        v-model="formData.salary">
                    <span class="tip">k/月</span>
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">婚否</span>
                <i class="require-icon" v-if="requires.marriage">*</i>
                <div class="content-container">
                    <label>
                        是:&nbsp;<input type="radio" name="marriage" value="1"
                                v-model="formData.marriage">
                    </label>
                    <label>
                        否:&nbsp;<input type="radio" name="marriage" value="2"
                                v-model="formData.marriage">
                    </label>
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">教龄</span>
                <i class="require-icon" v-if="requires.teachYear">*</i>
                <div class="content-container">
                    <input class="info-inp" type="number" name="teachYear"
                        max=20 min="0"
                        v-model="formData.teachYear"
                    >
                </div>
            </div>
            <div class="info-container">
                <span class="info-name">入职时间</span>
                <i class="require-icon" v-if="requires.entry">*</i>
                <div class="content-container">
                    <input class="info-inp" type="date" name="entry"
                        v-model="formData.entry"
                    >
                </div>
            </div>
            <button class="btn2" @click="changePage(curPage)">下一步</button>
        </div>
        <!-- 工作经验 -->
        <div class="info-experience" v-show="curPage == 3">
            <!-- 列表过渡 -->
            <transition-group name="exp-transition"
                tag="div"
            >
                <div class="exp-container" v-for="exp in formData.exps"
                    :key="formData.exps.indexOf(exp) + 1"
                    @transitionend="afterAdd"
                >
                    <p class="exp-title">工作经验{{formData.exps.indexOf(exp) + 1}}</p>
                    <div class="exp-content">
                        <span class="exp-info-title">任教学校:</span>
                        <input class="exp-inp" type="text" name="expCollege"
                            maxlength="20"
                            v-model="exp.expCollege"
                        >
                    </div>
                    <div class="exp-content">
                        <span class="exp-info-title">任教时间:</span>
                        <input class="exp-inp" type="date" name="expStart"
                            v-model="exp.expStart"
                        >&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;
                        <input class="exp-inp" type="date" name="expEnd"
                            v-model="exp.expEnd"
                        >
                    </div>
                    <div class="exp-content">
                        <span class="exp-info-title-descp">工作描述:</span>
                        <textarea name="expDescp"
                            rows="4" maxlength="100"
                            v-model="exp.expDescp"
                        >
                        </textarea>
                    </div>
                    <button class="btn1"
                        @click="formData.exps.splice(formData.exps.indexOf(exp), 1)"
                    >删除</button>
                </div>
            </transition-group>

            <button class="btn2" @click="submit">提交</button>
            <button class="btn1 add" @click="addExp">添加</button>
        </div>
    </div>
</div>
