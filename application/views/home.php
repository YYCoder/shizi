<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <style>
	.nav {
		height: 50px;
		line-height: 50px;
		background: rgba(33,33,33,0.5);
		text-align: right;
	}
	.user-name {
		color: red;
	}
    </style>
    <script>

    </script>
</head>
<body>
	<div class="nav">
		你好, <span class="user-name"><?php echo $name ?></span>
	</div>
    <form action="/Login/do_login" method="post">
        <input type="text" name="id" placeholder="请输入用户名">
        <input type="password" name="pw" placeholder="请输入密码">
        <button>提交</button>
    </form>
</body>
</html>