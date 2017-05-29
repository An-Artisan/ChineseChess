<?php 	/**
		 * 模拟POST请求获取第三方网站接口数据
		 * @Author   不敢为天下
		 * @DateTime 2017-04-29T15:09:38+0800
		 * @param    [String]                   $url [请求接口网址]
		 * @return   [Array]                         [返回第三方接口数据]
		*/
		function getHttpPostData($url){

		        $ch = curl_init();
		        // 请求URL地址
		      	curl_setopt($ch, CURLOPT_URL, $url);
		     	// 以POST方式请求URL地址
		      	curl_setopt($ch, CURLOPT_POST, 1);
		        /*
		            禁用后cURL将终止从服务端进行验证。使用CURLOPT_CAINFO选项设置证书使用CURLOPT_CAPATH选项设置证书目录 如果CURLOPT_SSL_VERIFYPEER(默认值为2)被启用，CURLOPT_SSL_VERIFYHOST需要被设置成TRUE否则设置为FALSE。
		            自cURL 7.10开始默认为TRUE。从cURL 7.10开始默认绑定安装。
		        */
		        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		        /*
		            将curl_exec()获取的信息以文件流的形式返回，而不是直接输出。
		         */
		        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		        // 得到数据
		        $data = curl_exec($ch);
		        // 如果是FALSE的话，代表请求网址失败
		        if($data === FALSE){
		            return false;
		        }
		        // 转换json格式为数组
		        $data = json_decode($data,TRUE);
		        // 关闭连接
		        curl_close($ch);
		        // 返回数据
		        return $data;
		}
		// 取消授权
		if($_GET['error_code']){
			header("Location: http://chess.joker1996.com/login.html"); 
		}
		// 应用的ApiKey
		$app_key = "2680233808";
		// 应用的SecretKey
		$app_secret = "d0f9714b91f99f244287f8cb739809e3";
		// 应用的授权回调地址
		$redirect_uri = "http://chess.joker1996.com/login/sina_login.php";
		// 获取code值，用于获取Access Token
		$code = $_GET['code'];
		// 拼接获取Access Token URL地址
		$get_access_token_url = "https://api.weibo.com/oauth2/access_token?client_id=".$app_key."&client_secret=".$app_secret."&grant_type=authorization_code&redirect_uri=".$redirect_uri."&code=" . $code;
		// 调用自定义函数getHttpPostData 获取POST请求返回的数据
		$access_token_and_uid = getHttpPostData($get_access_token_url);
		// 获取access_token
		$access_token = $access_token_and_uid['access_token'];
		// 获取uid
		$uid = $access_token_and_uid['uid'];
		// 拼接获取用户信息URL
		$get_user_info_url = "https://api.weibo.com/2/users/show.json?access_token=" . $access_token . "&uid=" . $uid;
		// 获取用户信息
		$user_info = json_decode(file_get_contents($get_user_info_url),true);
		// 实例化Redis数据库
		$redis = new Redis();
		$redis->pconnect('localhost',6379);
		// 查看user_id 是否存在。
		$sina_id = $redis->exists('user:' . $user_info['idstr']);
		// 如果存在，更新昵称和头像
		if($sina_id){
			$redis->set('user:' . $user_info['idstr'] . 'nickname',$user_info['screen_name']);
			$redis->set('user:' . $user_info['idstr'] . 'user_head',$user_info['profile_image_url']);
		}
		// 如果不存在，设置user_id，并设置昵称和头像
		else{
			$redis->set('user:' . $user_info['idstr'],$user_info['idstr']);
			$redis->set('user:' . $user_info['idstr'] . 'nickname',$user_info['screen_name']);
			$redis->set('user:' . $user_info['idstr'] . 'user_head',$user_info['profile_image_url']);
		}
		// 开启session
		session_start();
		$_SESSION['username'] = $user_info['screen_name'];
		$_SESSION['uid'] = $user_info['idstr'];
		$_SESSION['user_head'] = $user_info['profile_image_url'];
        // 跳转到主页面
		header("Location: http://chess.joker1996.com/home.php"); 
		//确保重定向后，后续代码不会被执行 
		exit;
		
 ?>