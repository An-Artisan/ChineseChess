<?php  	
		/**
		* 截取两个指定字符之间的字符串内容
		* @Author   不敢为天下
		* @DateTime 2017-04-29T16:58:39+0800
		* @param    [string]                   $kw1   [要截取的字符串]
		* @param    [string]                   $mark1 [指定字符1]
		* @param    [string]                   $mark2 [指定字符2]
		* @return   [string]                          [返回截取的字符串内容]
		*/
		function getNeedBetween($kw1,$mark1,$mark2){
			$kw = $kw1;
			$kw = '123'. $kw . '123';
			$st =stripos($kw,$mark1);
			$ed =stripos($kw,$mark2);
			if(($st==false||$ed==false)||$st>=$ed)
				return 0;
			$kw=substr($kw,($st+1),($ed-$st-1));
			return $kw;
		}
		//应用的APPID
		$app_id = "101404446";
		//应用的APPKEY
		$app_secret = "8f42e89c0ecc5ea748bf15a18c8df146";
		//成功授权后的回调地址
		$my_url = "http://chess.joker1996.com/login/tencent_login.php";
		//Step1：获取Authorization Code
		$code = $_GET['code'];
		//Step2：通过Authorization Code获取Access Token
		$token_url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&"
		. "client_id=" . $app_id . "&redirect_uri=" . urlencode($my_url)
		. "&client_secret=" . $app_secret . "&code=" . $code;
		// 获取腾讯开放接口内容
		$response = file_get_contents($token_url);
		// 获取access token值，用于验证。getNeedBetween截取指定两个字符串间内容
		$access_token = getNeedBetween($response,'=','&');
		//Step3：使用Access Token来获取用户的OpenID
		$graph_url = "https://graph.qq.com/oauth2.0/me?access_token=" . $access_token; 
		// 获取腾讯开放接口内容
		$str  = file_get_contents($graph_url);
		// 没有找到callback代表授权错误。转到登录界面
		if (strpos($str, "callback") !== false)
		{
			$lpos = strpos($str, "(");
			$rpos = strrpos($str, ")");
			$str  = substr($str, $lpos + 1, $rpos - $lpos -1);
		}else{
			header("Location: http://chess.joker1996.com/login.html"); 
		}
		// 返回一个user对象 client_id和openid是属性
		$open_info = json_decode($str);
		// 判断是否有错误，如果有，给提示，跳转到登录页面
		if (isset($open_info->error))
		{
			header("Location: http://chess.joker1996.com/login.html"); 
		}
		$getUserInfoUrl = "https://graph.qq.com/user/get_user_info?access_token=$access_token&oauth_consumer_key=$app_id&openid=" . $open_info->openid;
		$user_info = json_decode(file_get_contents($getUserInfoUrl),true);
		// 实例化Redis数据库
		$redis = new Redis();
		$redis->pconnect('localhost',6379);
		// 查看user_id 是否存在。
		$tencent_id = $redis->exists('user:' . $open_info->client_id);
		// 如果存在，更新昵称和头像
		if($tencent_id){
			$redis->set('user:' .$open_info->client_id . 'nickname',$user_info['nickname']);
			$redis->set('user:' .$open_info->client_id. 'user_head',$user_info['figureurl_qq_2']);
		}
		// 如果不存在，设置user_id，并设置昵称和头像
		else{
			$redis->set('user:' . $open_info->client_id,$open_info->client_id);
			$redis->set('user:' . $open_info->client_id . 'nickname',$user_info['nickname']);
			$redis->set('user:' . $open_info->client_id . 'user_head',$user_info['figureurl_qq_2']);
		}
		session_start();
		$_SESSION['username'] = $user_info['nickname'];
		$_SESSION['uid'] = $open_info->client_id;
		$_SESSION['user_head'] = $user_info['figureurl_qq_2'];
        // 跳转到主页面
		header("Location: http://chess.joker1996.com/home.php"); 
		//确保重定向后，后续代码不会被执行 
		exit;
		