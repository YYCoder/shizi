<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="
    style/login.css">
</head>
<body>
    <canvas id="bg">你的浏览器不支持canvas!</canvas>
    <div class="login">
        <h1>Login</h1>
        <p>师资信息管理系统</p>
        <form action="login" method="post" name="login">
            <label>
                <span>邮箱&nbsp;/</span>
                <input type="text" name="user">
            </label>
            <label>
                <span>密码&nbsp;/</span>
                <input type="password" name="pw">
            </label>
            <button id="submit" type="submit">登录</button>
        </form>
        <p class="hrefs">
            <a href="javascript:;" id="forget">忘记密码</a>
            <a href="javascript:;" id="register">注册</a>
        </p>
    </div>
    <div class="register">
        <h1>Register</h1>
        <p>师资信息管理系统</p>
        <form action="register" method="post" name="register">
            <label>
                <span>邮箱&nbsp;/</span>
                <input type="text" name="email">
            </label>
            <label>
                <span>密码&nbsp;/</span>
                <input type="password" name="pw">
            </label>
            <label>
                <span>确认密码&nbsp;/</span>
                <input type="password" name="confirm-pw">
            </label>
            <label>
                <span>姓名&nbsp;/</span>
                <input type="text" name="name">
            </label>
            <label>
                <span>手机号&nbsp;/</span>
                <input type="number" name="mobile">
            </label>
            <button id="submit" type="submit">注册</button>
        </form>
        <p class="hrefs">
            <a href="javascript:;" id="login">登陆</a>
        </p>
    </div>
    <footer>whyCoder&nbsp;©️版权所有</footer>
</body>
</html>