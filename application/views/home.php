<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home</title>
    <link rel="stylesheet" href="">
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