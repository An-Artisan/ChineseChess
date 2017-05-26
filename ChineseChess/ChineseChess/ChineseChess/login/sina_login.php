<?php 
if(Request::instance()->param('error_code')){
			$this->error("你已取消授权，正在返回登录界面！",'/login_chat.html');
		}
		// 应用的ApiKey
		$app_key = "2975043359";
		// 应用的SecretKey
		$app_secret = "eb8b690709c3fd09fa238babdc3af479";
		// 应用的授权回调地址
		$redirect_uri = "http://www.joker1996.com/sina_login.html";
		// 获取code值，用于获取Access Token
		$code = Request::instance()->param('code');
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
		// 实例化user表
		$user = new User();
		// 查询单个数据
		$info = $user->where('third_id', "sina_".$user_info['idstr'])->find();
		/* 
		如果uid不存在，代表第一次用新浪账号登录，需要添加记录到数据库
		如果存在表示已经用新浪账号登录过该网站。只需要更新头像和昵称保证拉取
		新浪最新的用户信息（为防止uid和其他第三方登录重名，前面加上
		改第三方的前缀，这里是新浪，加上sina_）
		*/
		if(is_null($info)){
			// 添加client_id
			$user->third_id = "sina_" . $user_info['idstr'];
			// 添加昵称
			$user->nickname = $user_info['screen_name'];
			// 添加头像地址
			$user->user_head = $user_info['profile_image_url'];
			// 保存
			$user->save();
		}else{
			$user->save([
			'nickname'  => $user_info['screen_name'],
			'user_head' => $user_info['profile_image_url']
			],['third_id' => "sina_" . $user_info['idstr']]);
		}
		// 设置session标记，直接跳转到聊天主页界面
		Session::set('username', $user_info['screen_name']);
		// 设置用户头像
		Session::set('user_head', $user_info['profile_image_url']);
        // 跳转到后台界面
		$this->success("登录成功！",'/home-chat.html');
 ?>