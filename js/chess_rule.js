var red_status = 0;
var black_status = 0;
var global_src = null;
var global_target = {};
function rule(e,camp){
	// 获取棋子的类型
	var chessman = $(e).attr('chessman');
	switch(chessman)
	{
	case 'r_b':
	  // 调用红色兵的规则
	  red_soldier(e,camp);
	  break;
	case 'b_b':
	  // 调用黑色兵的规则
	  black_soldier(e,camp);
	  break;
	case 'r_p':
	  // 调用红色炮的公共规则
	  common_cannon(e,camp);
	  break;
	case 'b_p':
	  // 调用黑色炮的公共规则
	  common_cannon(e,camp);
	  break;
	case 'r_j':
	  // 调用红色車的公共规则
	  common_car(e,camp);
	  break;
	case 'b_j':
	  // 调用黑色車的公共规则
	  common_car(e,camp);
	  break;
	case 'r_m':
	  // 调用红色马的规则
	  common_horse(e,camp);
	  break;
	case 'b_m':
	  // 调用黑色马的规则
	  common_horse(e,camp);
	  break;
	case 'r_x':
	  // soldier(e);
	  break;
	case 'r_s':
	  // soldier(e);
	  break;
	case 'r_boos':
	  // soldier(e);
	  break;
	default:
	}
	
}
// 设置全局json中的棋位为活跃
function set_chessman_active(camp){
	// 循环全局json
	$.each(global_target,function(name,value) {
		// 获取当前位置的name
		var attr_name = $(".chess_board img[position='"+name+"']").attr('name');
		// 获取当前位置的chessman
		var attr_chessman = $(".chess_board img[position='"+name+"']").attr('chessman');
		// 如果attr_name为null表示为空棋位
		if(attr_name == 'null'){
			// 设置可走的位置为活跃棋位
			$(".chess_board img[position='"+name+"']").attr('src','./images_chess/XQSTUDIO/OOS.GIF');
			// 设置棋位的chessman_position值为active
			$(".chess_board img[position='"+name+"']").attr('chessman_position','active');
		}
		// 如果可走棋位不为我方棋子就添加为活跃棋位
		else if(attr_chessman.substring(0,1)!=camp){
			// 获取活跃棋位的src
			var s = $(".chess_board img[position='"+name+"']").attr('src');
			// 拼接字符串
			s = s.substring(0,s.length-4) + 'S.GIF'
			// 设置棋位为可走棋位
			$(".chess_board img[position='"+name+"']").attr('src',s);
			// 设置chessman_position为active，用于点击判断
			$(".chess_board img[position='"+name+"']").attr('chessman_position','active');
			// 设置name为chessman_active，用于区分对方棋子不可点击
			$(".chess_board img[position='"+name+"']").attr('name','chessman_active');
		}
		
	});
}
// 双方马的公共规则
function common_horse(e,camp){

	// 获取当前棋子的位置
	var position = parseInt($(e).attr('position'));
	// 获取个位
	var units = position - ((Math.floor(position/10))*10);
	// 把当前棋子位置赋值给i，用于上下棋位的判断
	var i = position;
	// 把当前棋子的位置个位数赋值给j，用于左右棋位的判断
	var j = units;
	//	马左上二，右上二的规则
	if(i < 90 && $(".chess_board img[position='"+(i+10)+"']").attr('name') == 'null'){
		// 左上二
		if(j > 1 && ($(".chess_board img[position='"+(i+19)+"']").attr('name') == 'null' || $(".chess_board img[position='"+(i+19)+"']").attr('chessman').substring(0,1) != camp)){
			global_target[i+19] = $(".chess_board img[position='"+(i+19)+"']").attr('src');
		}
		// 右上二
		if(j < 9 && ($(".chess_board img[position='"+(i+21)+"']").attr('name') == 'null' || $(".chess_board img[position='"+(i+21)+"']").attr('chessman').substring(0,1) != camp)){
			global_target[i+21] = $(".chess_board img[position='"+(i+21)+"']").attr('src');
		}
	}
	//	马左上一，左下一的规则
	if(i < 100 && $(".chess_board img[position='"+(i-1)+"']").attr('name') == 'null'){
		// 左上一
		if(j > 2 && ($(".chess_board img[position='"+(i+8)+"']").attr('name') == 'null' || $(".chess_board img[position='"+(i+8)+"']").attr('chessman').substring(0,1) != camp)){
			global_target[i+8] = $(".chess_board img[position='"+(i+8)+"']").attr('src');
		}
		// 左下一
		if(j > 2 &&  i > 20 && ($(".chess_board img[position='"+(i-12)+"']").attr('name') == 'null' || $(".chess_board img[position='"+(i-12)+"']").attr('chessman').substring(0,1) != camp)){
			global_target[i-12] = $(".chess_board img[position='"+(i-12)+"']").attr('src');
		}
	}
	// 马右上一，右下一的规则
	if(i < 100 &&  $(".chess_board img[position='"+(i+1)+"']").attr('name') == 'null'){
		// 右上一
		if(j < 8 && ($(".chess_board img[position='"+(i+12)+"']").attr('name') == 'null' || $(".chess_board img[position='"+(i+12)+"']").attr('chessman').substring(0,1) != camp)){
			global_target[i+12] = $(".chess_board img[position='"+(i+12)+"']").attr('src');
		}
		// 右下一
		if(j < 8 && i > 20 && ($(".chess_board img[position='"+(i-8)+"']").attr('name') == 'null' || $(".chess_board img[position='"+(i-8)+"']").attr('chessman').substring(0,1) != camp)){
			global_target[i-8] = $(".chess_board img[position='"+(i-8)+"']").attr('src');
		}
	}
	// 马左下二，右下二的规则
	if(i > 30 && $(".chess_board img[position='"+(i-10)+"']").attr('name') == 'null'){
		// 左下二
		if(j > 1 && ($(".chess_board img[position='"+(i-21)+"']").attr('name') == 'null' || $(".chess_board img[position='"+(i-21)+"']").attr('chessman').substring(0,1) != camp)){
			global_target[i-21] = $(".chess_board img[position='"+(i-21)+"']").attr('src');
		}
		// 右下二
		if(j < 9 && ($(".chess_board img[position='"+(i-19)+"']").attr('name') == 'null' || $(".chess_board img[position='"+(i-19)+"']").attr('chessman').substring(0,1) != camp)){
			global_target[i-19] = $(".chess_board img[position='"+(i-19)+"']").attr('src');
		}
	}
	// 设置棋位为活跃可吃棋位
	set_chessman_active(camp);
}
// 双方車的规则
function common_car(e,camp){
	// 获取当前棋子的位置
	var position = parseInt($(e).attr('position'));
	// 获取个位
	var units = position - ((Math.floor(position/10))*10);
	// 把当前棋子位置赋值给i，用于上下棋位的判断
	var i = position;
	// 把当前棋子的位置个位数赋值给j，用于左右棋位的判断
	var j = units;
	// 直接判断当前棋位的上一个棋位
	i += 10;
	// 循环判断，如果这个棋位小于110 代表在棋盘内。并且name值为null，代表是空棋位
	while(i <110 && $(".chess_board img[position='"+i+"']").attr('name') == 'null'){
			// 添加至全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
			// 自增10，判断下一个棋位
			i += 10;
	}
	// 直接判断这个不是空棋位的棋子是不是我方棋子，如果不是，添加到全局json
	if(i< 110 && $(".chess_board img[position='"+i+"']").attr('chessman').substring(0,1) != camp){
			// 添加到全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
	}
	// 重新赋值之前的位置
	i = position;
	// i++ 表示当前棋子右边的第一个棋位
	i ++;
	// j++ 表示当前棋子左边第一个棋位的个位
	j ++;
	// 如果当前的个位小于10，并且当前棋子的值为空棋位
	while(j < 10 && $(".chess_board img[position='"+i+"']").attr('name') == 'null'){
			// 添加至全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
			// i++ 判断下一个棋位
			i ++;
			// j++ 判断下一个棋位的个位
			j ++;
	}
	// 直接判断这个不是空棋位的棋子是不是我方棋子，如果不是，添加到全局json
	if(j< 10 && $(".chess_board img[position='"+i+"']").attr('chessman').substring(0,1) != camp){
			// 添加到全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
	}
	// 重新赋值个位
	j = units;
	// 重新赋值位置
	i = position;
	// i-10 判断当前棋子后一位的棋子
	i -= 10;
	// 当前位置大于10，表示在棋盘内，并且name值等于null，是空棋位才添加到全局json
	while(i > 10 && $(".chess_board img[position='"+i+"']").attr('name') == 'null'){
			// 添加至全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
			// i-10，判断下一个棋位
			i -= 10;
	}
	// 直接判断这个不是空棋位的棋子是不是我方棋子，如果不是，添加到全局json
	if(i > 10 && $(".chess_board img[position='"+i+"']").attr('chessman').substring(0,1) != camp){
			// 添加到全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
	}
	i = position;
	// i-- 直接判断当前棋位的左一个棋位
	i --;
	// j-- 表示往左一个棋位的个位
	j --;
	// 个位小于0，代表在棋盘内，并且name值为空，表示是空棋位，可以添加到全局json
	while(j > 0 && $(".chess_board img[position='"+i+"']").attr('name') == 'null'){
			// 添加到全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
			// 自减1，判断下一个棋位
			i --;
			// 自减1，判断下一个棋位
			j --;
	}
	// 直接判断这个不是空棋位的棋子是不是我方棋子，如果不是，添加到全局json
	if(j > 0 && $(".chess_board img[position='"+i+"']").attr('chessman').substring(0,1) != camp){
			// 直接判断这个不是空棋位的棋子是不是我方棋子，如果不是，添加到全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
	}
	// 设置棋位为活跃可吃棋位
	set_chessman_active(camp);
}

// 双方炮的规则
function common_cannon(e,camp){
	// 获取当前棋子的位置
	var position = parseInt($(e).attr('position'));
	// 获取个位
	var units = position - ((Math.floor(position/10))*10);
	// 把当前棋子位置赋值给i，用于上下棋位的判断
	var i = position;
	// 把当前棋子的位置个位数赋值给j，用于左右棋位的判断
	var j = units;
	// 直接判断当前棋位的上一个棋位
	i += 10;
	// 循环判断，如果这个棋位小于110 代表在棋盘内。并且name值为null，代表是空棋位
	while(i <110 && $(".chess_board img[position='"+i+"']").attr('name') == 'null'){
			// 添加至全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
			// 自增10，判断下一个棋位
			i += 10;
	}
	// i自增10 表示在上一次棋位的name值不为null的基础上在往前一个的棋位
	i += 10;
	// 如果小于110，代表在棋盘内，并且它的name值不为空，代表炮吃棋子的规则
	while(i < 110){
		if($(".chess_board img[position='"+i+"']").attr('name') != 'null'){
			// 判断是不是我方棋子，不是我方棋子才添加至全局json
			if($(".chess_board img[position='"+i+"']").attr('chessman').substring(0,1)!=camp){
				// 添加至全局json
				global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
				// 跳出循环
				break;
			}
			// 是我方棋子也跳出循环，因为炮的规则不允许吃我方棋子
			else{
				// 跳出循环
				break;
			}
		}
		// 自增10，判断下一个棋位
		i += 10;
	}
	// 重新赋值之前的位置
	i = position;
	// i++ 表示当前棋子右边的第一个棋位
	i ++;
	// j++ 表示当前棋子左边第一个棋位的个位
	j ++;
	// 如果当前的个位小于10，并且当前棋子的值为空棋位
	while(j < 10 && $(".chess_board img[position='"+i+"']").attr('name') == 'null'){
			// 添加至全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
			// i++ 判断下一个棋位
			i ++;
			// j++ 判断下一个棋位的个位
			j ++;
	}
	// i++ 表示在上一次棋位的name值不为null的基础上在往右一个的棋位
	i ++;
	// j++ 表示在上一次棋位个位
	j ++;
	// 如果j小于10，代表在棋盘内，并且它的name值不为空，代表炮吃棋子的规则
	while(j < 10){
		if($(".chess_board img[position='"+i+"']").attr('name') != 'null'){
			// 判断是不是我方棋子，不是我方棋子才添加至全局json
			if($(".chess_board img[position='"+i+"']").attr('chessman').substring(0,1)!=camp){
				// 添加至全局json
				global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
				// 跳出循环
				break;
			}
			// 是我方棋子也跳出循环，因为炮的规则不允许吃我方棋子
			else{
				// 跳出循环
				break;
			}
		}
		// 自增1，判断下一个棋位
		i ++;
		// 自增1，判断下一个棋位
		j ++;
	}
	// 重新赋值个位
	j = units;
	// 重新赋值位置
	i = position;
	// i-10 判断当前棋子后一位的棋子
	i -= 10;
	// 当前位置大于10，表示在棋盘内，并且name值等于null，是空棋位才添加到全局json
	while(i > 10 && $(".chess_board img[position='"+i+"']").attr('name') == 'null'){
			// 添加至全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
			// i-10，判断下一个棋位
			i -= 10;
	}
	// i-10 表示在上一次棋位的name值不为null的基础上在往后一个的棋位
	i -= 10;
	// 当前位置大于10，代表在棋盘内，并且它的name值不为空，代表炮吃棋子的规则
	while(i > 10){
		if($(".chess_board img[position='"+i+"']").attr('name') != 'null'){
			// 判断是否是我方棋子，不是我方棋子，代表可以吃，添加至全局json
			if($(".chess_board img[position='"+i+"']").attr('chessman').substring(0,1)!=camp){
				// 添加至全局json
				global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
				// 跳出循环
				break;
			}
			// 是我方棋子也跳出循环，因为不能吃自家棋子
			else{
				// 跳出循环
				break;
			}
		}
		// i-10 判断下一个棋位
		i -= 10;
	}
	// 重新赋值棋子的位置
	i = position;
	// i-- 直接判断当前棋位的左一个棋位
	i --;
	// j-- 表示往左一个棋位的个位
	j --;
	// 个位小于0，代表在棋盘内，并且name值为空，表示是空棋位，可以添加到全局json
	while(j > 0 && $(".chess_board img[position='"+i+"']").attr('name') == 'null'){
			// 添加到全局json
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
			// 自减1，判断下一个棋位
			i --;
			// 自减1，判断下一个棋位
			j --;
	}
	// i-- 表示在上一次棋位的name值不为null的基础上在往左一个的棋位
	i --;
	// j-- 表示往左一个棋位的个位
	j --;
	// 个位小于0，代表在棋盘内，代表在棋盘内，并且它的name值不为空，代表炮吃棋子的规则
	while(j > 0){
		if($(".chess_board img[position='"+i+"']").attr('name') != 'null'){
			// 判断是否是我方棋子，不是我方棋子，代表可以吃，添加至全局json
			if($(".chess_board img[position='"+i+"']").attr('chessman').substring(0,1)!=camp){
				// 添加至全局json
				global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
				// 跳出循环
				break;
			}
			// 是我方棋子也跳出循环，因为不能吃自家棋子。
			else{
				// 跳出循环
				break;
			}
		}
		// 判断下一个棋位
		i --;
		// 判断下一个棋位
		j --;
	}
	// 设置棋位为活跃可吃棋位
	set_chessman_active(camp);

}
// 黑色方兵的规则
function black_soldier(e,camp){
	// 在我黑色方棋盘内
	if($(e).attr('position') > 60){
		// 得到兵可走的位置
		var new_position = parseInt($(e).attr('position')) - 10;
		// 把可走的位置原来的信息存在一个json数据中
		global_target[new_position] = $(".chess_board img[position='"+new_position+"']").attr('src');
		// 设置可走棋位
		set_chessman_active(camp);
	// 在对方棋盘内
	}else{
		// 获取当前棋子的位置
		var position = parseInt($(e).attr('position'));
		// 获取个位
		var units = position - ((Math.floor(position/10))*10);
		// 用switch判断
		switch(units)
		{
			// 为9表示是右侧边缘
			case 9:
				// 获取下左棋位的src
				var up = $(".chess_board img[position='"+(position-10)+"']").attr('src');
				var left = $(".chess_board img[position='"+(position-1)+"']").attr('src');
				// 添加到全局json
				if(position > 20){
					global_target[position-10] = up;
				}
				global_target[position-1] = left;
				// 跳出switch
			    break;
			// 为1表示是左侧边缘
			case 1:
				// 获取下右棋位的src
				var up = $(".chess_board img[position='"+(position-10)+"']").attr('src');
				var right = $(".chess_board img[position='"+(position+1)+"']").attr('src');
				// 添加到全局json
				if(position > 20){
					global_target[position-10] = up;
				}
				global_target[position+1] = right;
				// 跳出switch
				break;
			// 否则表示不是边缘
			default:
				// 获取下左右棋位的src，因为兵不能后退
				var up = $(".chess_board img[position='"+(position-10)+"']").attr('src');
				var right = $(".chess_board img[position='"+(position+1)+"']").attr('src');
				var left = $(".chess_board img[position='"+(position-1)+"']").attr('src');
				// 添加到全局json
				if(position > 20){
					global_target[position-10] = up;
				}
				global_target[position-1] = left;
				global_target[position+1] = right;
		}
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
		
	}

}
// 红方兵的规则
function red_soldier(e,camp){
	// 在我方棋盘内
	if($(e).attr('position') < 60){
		// 得到兵可走的位置
		var new_position = parseInt($(e).attr('position')) + 10;
		// 把可走的位置原来的信息存在一个json数据中
		global_target[new_position] = $(".chess_board img[position='"+new_position+"']").attr('src');
		// 设置可走棋位
		set_chessman_active(camp);
	// 在对方棋盘内
	}else{
		// 获取当前棋子的位置
		var position = parseInt($(e).attr('position'));
		// 获取个位
		var units = position - ((Math.floor(position/10))*10);
		// 用switch判断
		switch(units)
		{
			// 为9表示是右侧边缘
			case 9:
				// 获取上左棋位的src
				var up = $(".chess_board img[position='"+(position+10)+"']").attr('src');
				var left = $(".chess_board img[position='"+(position-1)+"']").attr('src');
				// 添加到全局json
				if(position < 100){
					global_target[position+10] = up;
				}
				global_target[position-1] = left;
				// 跳出switch
			    break;
			// 为1表示是左侧边缘
			case 1:
				// 获取上右棋位的src
				var up = $(".chess_board img[position='"+(position+10)+"']").attr('src');
				var right = $(".chess_board img[position='"+(position+1)+"']").attr('src');
				// 添加到全局json
				if(position < 100){
					global_target[position+10] = up;
				}
				global_target[position+1] = right;
				// 跳出switch
				break;
			// 否则表示不是边缘
			default:
				// 获取上左右棋位的src，因为兵不能后退
				var up = $(".chess_board img[position='"+(position+10)+"']").attr('src');
				var right = $(".chess_board img[position='"+(position+1)+"']").attr('src');
				var left = $(".chess_board img[position='"+(position-1)+"']").attr('src');
				// 添加到全局json
				if(position < 100){
					global_target[position+10] = up;
				}
				global_target[position-1] = left;
				global_target[position+1] = right;
		}
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
		
	}


}
// 活跃棋位的点击
$('.chess_board').on('click',"img[chessman_position='active']",function(){
		// 获取活跃棋子的src
		var active_src = $(".chess_board img[status='active']").attr('src');
		// 得到不活跃棋子的src
		var s = active_src.substring(0,active_src.length-5);
		// 拼接字符串
		s = (s + '.GIF');
		// 设置棋子的状态处于不活跃
		$(this).attr('src',s);
		// 设置name为chessman 代表是棋子
		$(this).attr('name','chessman');
		// 设置chessman属性值为 之前棋子的值
		$(this).attr('chessman',$(".chess_board img[status='active']").attr('chessman'));
		// 移除chessman_position属性
		$(this).removeAttr('chessman_position');
		// 设置之前的棋子的src为空棋子 
		$(".chess_board img[status='active']").attr('src','./images_chess/XQSTUDIO/OO.GIF');
		// 设置之前的棋子的name为null
		$(".chess_board img[status='active']").attr('name','null');
		// 移除之前棋子的chessman值
		$(".chess_board img[status='active']").removeAttr('chessman');
		// 设置之前棋子的状态为inactive
		$(".chess_board img[status='active']").attr('status','inactive');
		// 把红旗状态设置为0
		red_status = 0;
		// 把global_target 清空 
		global_target = {};
		$("img[chessman_position='active']").each(function(){
			// 获取当前棋子的src
			src = $(this).attr('src');
			// 把src最后的 .GIF去掉
			var s = src.substring(0,src.length-5);
			// 设置棋子的状态处于不活跃
			s = s + '.GIF';
			// 改变棋子的状态
			$(this).attr('src',s);
			// 移除chessman_position
			$(this).removeAttr('chessman_position');
		});
		
	});
// 棋子的点击事件
$('.chess_board').on('click',"img[name='chessman']",function(){
		var src;
		// 设置棋子状态为非活跃
		if($(this).attr("status")=="active"){
			// 获取当前棋子的src
			src = $(this).attr('src');
			// 把src最后的 .GIF去掉
			var s = src.substring(0,src.length-5);
			// 设置棋子的状态处于不活跃
			s = s + '.GIF';
			// 改变棋子的状态
			$(this).attr('src',s);
			// 设置棋子的状态为 inactive
			$(this).attr('status','inactive');
			// 设置全局状态为false
			red_status = 0;
			// 设置全局src为null
			global_src = null;
			// 把所有能走的棋盘恢复原状
			$.each(global_target,function(name,value) {
				// 设置为之前的值
				$(".chess_board img[position='"+name+"']").attr('src',value);
				// 如果是为空棋位的话就不设置为chessman
				if($(".chess_board img[position='"+name+"']").attr('name')!='null'){
					// 设置name值为chessman，因为上面有改变
					$(".chess_board img[position='"+name+"']").attr('name','chessman');
				}
				// 移除chessman_position属性
				$(".chess_board img[position='"+name+"']").removeAttr('chessman_position');

			});
			// 清空全局目标棋位
			global_target = {};

		}
		// 设置棋子状态为活跃
		else{
			if(red_status == 0){
				// 获取当前棋子的src
				src = $(this).attr('src');
				// 把src最后的 .GIF去掉
				var s = src.substring(0,src.length-4);
				// 添加S.GIF 棋子处于活动状态
				s = s + 'S.GIF';
				// 改变棋子的状态
				$(this).attr('src',s);
				// 设置棋子的状态为 active
				$(this).attr('status','active');
				// 设置全局状态为true
				red_status = 1;
				// 把该棋子的src装进全局src
				global_src = s;
				// 获取是哪方阵营
				var camp = $(this).attr('chessman').substring(0,1);
				// 调用规则
				rule(this,camp);
			}
		}
});
