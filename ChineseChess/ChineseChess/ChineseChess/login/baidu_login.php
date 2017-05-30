<?php 
// 应用的ApiKey
		$api_key = "P9L2Gh5EAH7z2rlzzIWhqIGx";
		// 应用的SecretKey
		$secret_key = "qwaa0iu1e35M4HyqaGcpAOv6AEqyQTWw";
		// 应用的授权回调地址
		$redirect_uri = "http://chess.joker1996.com/login/baidu_login.php";
		// 获取code值，用于获取Access Token
		$code = $_GET['code'];
		// 拼接获取Access Token URL地址
		$get_access_token_url = "https://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code=".$code."&client_id=".$api_key."&client_secret=".$secret_key."&redirect_uri=" . $redirect_uri;
		// 获取access_token的值
		$access_token = json_decode(file_get_contents($get_access_token_url),true)['access_token'];
		// 拼接获取用户信息URL
		$get_user_info_url = "https://openapi.baidu.com/rest/2.0/passport/users/getLoggedInUser?access_token=" . $access_token;
		/* 
			获取用户信息 转json为数组 该数组有: 
			uid(用户id)，uname(用户昵称)，portrait(用户头像) 键
		*/
		$user_info = json_decode(file_get_contents($get_user_info_url),true);
		// 开启session
		session_start();
		$_SESSION['username'] = $user_info['uname'];
		$_SESSION['uid'] = $user_info['uid'];
		$_SESSION['user_head'] = "http://tb.himg.baidu.com/sys/portraitn/item/" . $user_info['portrait'];
        // 跳转到主页面
		header("Location: http://chess.joker1996.com/home.php"); 
		//确保重定向后，后续代码不会被执行 
		exit;
 ?>