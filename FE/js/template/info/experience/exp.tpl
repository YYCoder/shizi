<div class="exp-container">
    <p class="exp-title">工作经验:</p>
    <div class="exp-content">
        <span class="exp-info-title">任教学校:</span>
        <input class="exp-inp" type="text" name="expCollege"
            maxlength="20"
            v-model="formData.exp1College"
        >
    </div>
    <div class="exp-content">
        <span class="exp-info-title">任教时间:</span>
        <input class="exp-inp" type="date" name="expStart"
            v-model="Date.parse(expTime.exp1Start)"
        > -- 
        <input class="exp-inp" type="date" name="expEnd"
            v-model="Date.parse(expTime.exp1End)"
        >
    </div>
    <div class="exp-content">
        <span class="exp-info-title">工作描述:</span>
        <textarea name="expDescp" 
            rows="4" maxlength="100"
            v-model="formData.exp1Descp"
        >
        </textarea>
    </div>
    <button class="btn1" @click="delExp">删除</button>
</div>