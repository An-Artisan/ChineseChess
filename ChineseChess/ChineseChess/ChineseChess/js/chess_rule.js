var global_src = 1;
var global_target = {};
var global_camp = 'red';
// 聊天消息置于最底部
document.getElementById('main_content').scrollTop = document.getElementById('main_content').scrollHeight;
function rule(e,camp,next=1){
	// 获取棋子的类型
	var chessman = $(e).attr('chessman');
	switch(chessman)
	{
	case 'r_b':
	  if (next) {
		  	// 调用红色兵的规则
		 	red_soldier(e,camp,next);
		}else{
			red_soldier(e,camp,next);
			// 查看是否将军
			checkmate();
		}
	  break;
	case 'b_b':
	  if (next) {
		  	// 调用黑色兵的规则
		 	black_soldier(e,camp,next);
		}else{
			black_soldier(e,camp,next);
			// 查看是否将军
			checkmate();
		}
	  break;
	case 'r_p':
		if (next) {
		  	// 调用红色炮的公共规则
		 	common_cannon(e,camp,next);
		}else{
			common_cannon(e,camp,next);
			// 查看是否将军
			checkmate();
		}
	  break;
	case 'b_p':
	    if (next) {
		  	// 调用黑色炮的公共规则
		 	common_cannon(e,camp,next);
		}else{
			common_cannon(e,camp,next);
			// 查看是否将军
			checkmate();
		}
	  break;
	case 'r_j':
		if (next) {
		  	// 调用红色車的公共规则
		 	common_chariots(e,camp,next);
		}else{
			common_chariots(e,camp,next);
			// 查看是否将军
			checkmate();
		}
	  break;
	case 'b_j':
	  	if (next) {
		  	// 调用黑色車的公共规则
		 	common_chariots(e,camp,next);
		}else{
			common_chariots(e,camp,next);
			// 查看是否将军
			checkmate();
		}
	  break;
	case 'r_m':
		if (next) {
		  	// 调用红色马的规则
		 	common_horse(e,camp,next);
		}else{
			common_horse(e,camp,next);
			// 查看是否将军
			checkmate();
		}
	  break;
	case 'b_m':
	 	if (next) {
		  	// 调用黑色马的规则
		 	common_horse(e,camp,next);
		}else{
			common_horse(e,camp,next);
			// 查看是否将军
			checkmate();
		}
	  break;
	case 'r_x':
	  // 调用红色方相的规则
	  if(next){
	  	red_elephants(e,camp,next);
	  }
	  break;
	case 'b_x':
	  // 调用黑色方相的规则
	  if(next){
	  	black_elephants(e,camp,next);
	  }
	  break;
	case 'r_s':
	  // 调动红色方士的规则
	  if(next){
		red_guards(e,camp,next);
	  }
	  break;
	case 'b_s':
	  // 调动黑色方士的规则
	  if(next){
		black_guards(e,camp,next);
	  }
	  break;
	case 'r_boss':
	  if(next){
	  	red_generals(e,camp,next);
	  }
	  break;
	case 'b_boss':
	  if(next){
	  	black_generals(e,camp,next);
	  }
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
		var move = $(".chess_board img[position='"+name+"']").attr('move');
		// 如果attr_name为null表示为空棋位
		if(attr_name == 'null'){
			// 设置可走的位置为活跃棋位
			$(".chess_board img[position='"+name+"']").attr('src','./images_chess/XQSTUDIO/OOS.GIF');
			// 设置棋位的chessman_position值为active
			$(".chess_board img[position='"+name+"']").attr('chessman_position','active');

		}
		// 如果可走棋位不为我方棋子就添加为活跃棋位
		else if(attr_chessman.substring(0,1)!=camp){
			// 如果move存在的话，就不添加S了，只设置chessman_position为active
			if(typeof(move) == 'undefined'){
				// 获取活跃棋位的src
				var s = $(".chess_board img[position='"+name+"']").attr('src');
				// 拼接字符串
				s = s.substring(0,s.length-4) + 'S.GIF'
				// 设置棋位为可走棋位
				$(".chess_board img[position='"+name+"']").attr('src',s);
				// 设置chessman_position为active，用于点击判断
				$(".chess_board img[position='"+name+"']").attr('chessman_position','active');
			}
			else{
				$(".chess_board img[position='"+name+"']").attr('chessman_position','active');
			}
		}
	});	

	
}
// 查看棋子的下一步是否将军
function checkmate(){
	console.log(global_camp);
	// 如果下一步该黑色方走，就判断能否将军黑色方将，否则判断红色方帅
	var boss = (global_camp == 'b_boss') ? 'b_boss' : 'r_boss';
	// 循环下一步可走步骤
	console.log(boss);
	$.each(global_target,function(name,value) {
		// 如果下一步可走步骤有对方的 将或者帅，就提示将军
		if($(".chess_board img[position='"+name+"']").attr('chessman') == boss){
			// 提示将军
			layer.msg('将军');
			ws.send('{"type":"checkmate","client_id":"'+other_client_id+'"}');
			// 跳出循环
			return false;
		}
	});
	// 清空全局步骤json
	global_target = {};
}
// 黑方将可走位置
function black_generals(e,camp,next){
	// 获取当前棋子的位置
	var position = parseInt($(e).attr('position'));
	// 当前棋子位置直接 +10 用于判断帅和将是否面对面
	var i = position - 10;
	// 获取对方的boss名称
	var boss = (global_camp == 'black') ? 'r_boss' : 'b_boss';
	// 判断boss是否面对面
	while(i > 10){
		// 判断是否是空棋位，如果不是空棋位在判断是不是对面的帅或者将。
		if(($(".chess_board img[position='"+i+"']").attr('name') == 'null')){
			// 自增10 ，结束本次循环
			i -= 10;
			continue;
		}
		if(($(".chess_board img[position='"+i+"']").attr('chessman') != boss)){
			break;
		}else{
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
			break;
		}
		
	}
	// 重新赋值
	i = position;
	// 将的可走位置分别判断
	if(i == 104){
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
	}
	if(i == 94){
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
	}
	if(i == 105){
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
	}
	if(i == 106){
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
	}
	if(i == 96){
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
	}
	if(i == 95){
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
	}
	if(i == 84){
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
	}
	if(i == 85){
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
	}
	if(i == 36){
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
	}
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}

}
// 红方将可走位置
function red_generals(e,camp,next){
	// 获取当前棋子的位置
	var position = parseInt($(e).attr('position'));
	// 当前棋子位置直接 +10 用于判断帅和将是否面对面
	var i = position + 10;
	// 获取对方的boss名称
	var boss = (global_camp == 'black') ? 'r_boss' : 'b_boss';
	// 判断boss是否面对面
	while(i < 110){
		// 判断是否是空棋位，如果不是空棋位在判断是不是对面的帅或者将。
		if(($(".chess_board img[position='"+i+"']").attr('name') == 'null')){
			// 自增10 ，结束本次循环
			i += 10;
			continue;
		}
		if(($(".chess_board img[position='"+i+"']").attr('chessman') != boss)){
			break;
		}else{
			global_target[i] = $(".chess_board img[position='"+i+"']").attr('src');
			break;
		}
		
	}
	// 重新赋值
	i = position;
	// 将的可走位置分别判断
	if(i == 14){
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
	}
	if(i == 24){
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
	}
	if(i == 15){
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
	}
	if(i == 16){
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
	}
	if(i == 26){
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
	}
	if(i == 25){
		global_target[i+10] = $(".chess_board img[position='"+(i+10)+"']").attr('src');
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
	}
	if(i == 34){
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
	}
	if(i == 35){
		global_target[i+1] = $(".chess_board img[position='"+(i+1)+"']").attr('src');
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
	}
	if(i == 36){
		global_target[i-1] = $(".chess_board img[position='"+(i-1)+"']").attr('src');
		global_target[i-10] = $(".chess_board img[position='"+(i-10)+"']").attr('src');
	}
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}

}
// 黑色方士的规则
function black_guards(e,camp,next=1){
	// 获取当前棋子的位置
	var position = parseInt($(e).attr('position'));
	// 把当前棋子位置赋值给i，用于上下棋位的判断
	var i = position;
	// 左边士的可走位置
	if(i == 104){
		global_target[i-9] = $(".chess_board img[position='"+(i-9)+"']").attr('src');
	}
	// 右边士的可走位置
	if(i == 106){
		global_target[i-11] = $(".chess_board img[position='"+(i-11)+"']").attr('src');
	}
	// 中间士的可走位置
	if(i == 95){
		global_target[i-11] = $(".chess_board img[position='"+(i-11)+"']").attr('src');
		global_target[i-9] = $(".chess_board img[position='"+(i-9)+"']").attr('src');
		global_target[i+11] = $(".chess_board img[position='"+(i-11)+"']").attr('src');
		global_target[i+9] = $(".chess_board img[position='"+(i-9)+"']").attr('src');
	}
	// 左上士的可走位置
	if(i == 84){
		global_target[i+11] = $(".chess_board img[position='"+(i+11)+"']").attr('src');
	}
	// 右上士的可走位置
	if(i == 86){
		global_target[i+9] = $(".chess_board img[position='"+(i+9)+"']").attr('src');
	}
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}
}
// 红色方士的规则
function red_guards(e,camp,next=1){
	// 获取当前棋子的位置
	var position = parseInt($(e).attr('position'));
	// 把当前棋子位置赋值给i，用于上下棋位的判断
	var i = position;
	// 左边士的可走位置
	if(i == 14){
		global_target[i+11] = $(".chess_board img[position='"+(i+11)+"']").attr('src');
	}
	// 右边士的可走位置
	if(i == 16){
		global_target[i+9] = $(".chess_board img[position='"+(i+9)+"']").attr('src');
	}
	// 中间士的可走位置
	if(i == 25){
		global_target[i-11] = $(".chess_board img[position='"+(i-11)+"']").attr('src');
		global_target[i-9] = $(".chess_board img[position='"+(i-9)+"']").attr('src');
		global_target[i+11] = $(".chess_board img[position='"+(i-11)+"']").attr('src');
		global_target[i+9] = $(".chess_board img[position='"+(i-9)+"']").attr('src');
	}
	// 左上士的可走位置
	if(i == 34){
		global_target[i+9] = $(".chess_board img[position='"+(i+9)+"']").attr('src');
	}
	// 右上士的可走位置
	if(i == 36){
		global_target[i-9] = $(".chess_board img[position='"+(i-9)+"']").attr('src');
	}
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}
}
// 黑色方相的规则
function black_elephants(e,camp,next=1){
	// 获取当前棋子的位置
	var position = parseInt($(e).attr('position'));
	// 获取个位
	var units = position - ((Math.floor(position/10))*10);
	// 把当前棋子位置赋值给i，用于上下棋位的判断
	var i = position;
	// 把当前棋子的位置个位数赋值给j，用于左右棋位的判断
	var j = units;
	// 第一排双相的可走位置
	if(position > 100){
		// 左边相可走位置
		if( units == 3 && ($(".chess_board img[position='"+(i-9)+"']").attr('name') == 'null') ){
			global_target[i-18] = $(".chess_board img[position='"+(i-18)+"']").attr('src');
		}
		if( units == 3 && ($(".chess_board img[position='"+(i-11)+"']").attr('name') == 'null') ){
			global_target[i-22] = $(".chess_board img[position='"+(i-22)+"']").attr('src');
		}
		// 右边相可走位置
		if( units == 7 && ($(".chess_board img[position='"+(i-9)+"']").attr('name') == 'null')){
			global_target[i-18] = $(".chess_board img[position='"+(i-18)+"']").attr('src');
		}
		if( units == 7 && ($(".chess_board img[position='"+(i-11)+"']").attr('name') == 'null')){
			global_target[i-22] = $(".chess_board img[position='"+(i-22)+"']").attr('src');
		}
		if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
		}
	}
	// 第三排三相可走位置
	if(position > 80 && position < 90){
		// 左边相可走位置
		if( units == 1 && ($(".chess_board img[position='"+(i+11)+"']").attr('name') == 'null')){
			global_target[i+22] = $(".chess_board img[position='"+(i+22)+"']").attr('src');
			console.log(1);

		}
		if( units == 1 && ($(".chess_board img[position='"+(i-9)+"']").attr('name') == 'null')){
			global_target[i-18] = $(".chess_board img[position='"+(i-18)+"']").attr('src');
		}
		// 中间相可走位置
		if( units == 5 && ($(".chess_board img[position='"+(i+11)+"']").attr('name') == 'null')){
			global_target[i+22] = $(".chess_board img[position='"+(i+22)+"']").attr('src');
		}
		if( units == 5 && ($(".chess_board img[position='"+(i+9)+"']").attr('name') == 'null')){
			global_target[i+18] = $(".chess_board img[position='"+(i+18)+"']").attr('src');
		}
		if( units == 5 && ($(".chess_board img[position='"+(i-9)+"']").attr('name') == 'null')){
			global_target[i-18] = $(".chess_board img[position='"+(i-18)+"']").attr('src');
		}
		if( units == 5 && ($(".chess_board img[position='"+(i-11)+"']").attr('name') == 'null') ){
			global_target[i-22] = $(".chess_board img[position='"+(i-22)+"']").attr('src');
		}
		// 右边相可走位置
		if( units == 9 && ($(".chess_board img[position='"+(i-11)+"']").attr('name') == 'null')){
			global_target[i-22] = $(".chess_board img[position='"+(i-22)+"']").attr('src');
		}
		if( units == 9 && ($(".chess_board img[position='"+(i+9)+"']").attr('name') == 'null') ){
			global_target[i+18] = $(".chess_board img[position='"+(i+18)+"']").attr('src');
		}
	}
	// 第五排双相可走位置
	if(position < 70 && position > 60){
		// 左边相可走位置
		if( units == 3 && ($(".chess_board img[position='"+(i+9)+"']").attr('name') == 'null')){
			global_target[i+18] = $(".chess_board img[position='"+(i+18)+"']").attr('src');
		}
		if( units == 3 && ($(".chess_board img[position='"+(i+11)+"']").attr('name') == 'null')){
			global_target[i+22] = $(".chess_board img[position='"+(i+22)+"']").attr('src');
		}
		// 右边相可走位置
		if( units == 7 && ($(".chess_board img[position='"+(i+9)+"']").attr('name') == 'null')){
			global_target[i+18] = $(".chess_board img[position='"+(i+18)+"']").attr('src');
		}
		if( units == 7 && ($(".chess_board img[position='"+(i+11)+"']").attr('name') == 'null')){
			global_target[i+22] = $(".chess_board img[position='"+(i+22)+"']").attr('src');
		}
	}
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}
}
// 红色方相的规则
function red_elephants(e,camp,next=1){
	// 获取当前棋子的位置
	var position = parseInt($(e).attr('position'));
	// 获取个位
	var units = position - ((Math.floor(position/10))*10);
	// 把当前棋子位置赋值给i，用于上下棋位的判断
	var i = position;
	// 把当前棋子的位置个位数赋值给j，用于左右棋位的判断
	var j = units;
	// 第一排双相的可走位置
	if(position < 20){
		// 左边相可走位置
		if( units == 3 && ($(".chess_board img[position='"+(i+9)+"']").attr('name') == 'null')){
			global_target[i+18] = $(".chess_board img[position='"+(i+18)+"']").attr('src');
		}
		if( units == 3 && ($(".chess_board img[position='"+(i+11)+"']").attr('name') == 'null')){
			global_target[i+22] = $(".chess_board img[position='"+(i+22)+"']").attr('src');
		}
		// 右边相可走位置
		if( units == 7 && ($(".chess_board img[position='"+(i+9)+"']").attr('name') == 'null')){
			global_target[i+18] = $(".chess_board img[position='"+(i+18)+"']").attr('src');
		}
		if( units == 7 && ($(".chess_board img[position='"+(i+11)+"']").attr('name') == 'null')){
			global_target[i+22] = $(".chess_board img[position='"+(i+22)+"']").attr('src');
		}
	}
	// 第三排三相可走位置
	if(position > 30 && position < 40){
		// 左边相可走位置
		if( units == 1 && ($(".chess_board img[position='"+(i-9)+"']").attr('name') == 'null')){
			global_target[i-18] = $(".chess_board img[position='"+(i-18)+"']").attr('src');
		}
		if( units == 1 && ($(".chess_board img[position='"+(i+11)+"']").attr('name') == 'null')){
			global_target[i+22] = $(".chess_board img[position='"+(i+22)+"']").attr('src');
		}
		// 中间相可走位置
		if( units == 5 && ($(".chess_board img[position='"+(i-11)+"']").attr('name') == 'null') ){
			global_target[i-22] = $(".chess_board img[position='"+(i-22)+"']").attr('src');
		}
		if( units == 5 && ($(".chess_board img[position='"+(i-9)+"']").attr('name') == 'null') ){
			global_target[i-18] = $(".chess_board img[position='"+(i-18)+"']").attr('src');
		}
		if( units == 5 && ($(".chess_board img[position='"+(i+9)+"']").attr('name') == 'null') ){
			global_target[i+18] = $(".chess_board img[position='"+(i+18)+"']").attr('src');
		}
		if( units == 5 && ($(".chess_board img[position='"+(i+11)+"']").attr('name') == 'null')){
			global_target[i+22] = $(".chess_board img[position='"+(i+22)+"']").attr('src');
		}
		// 右边相可走位置
		if( units == 9 && ($(".chess_board img[position='"+(i-11)+"']").attr('name') == 'null')){
			global_target[i-22] = $(".chess_board img[position='"+(i-22)+"']").attr('src');
		}
		if( units == 9 && ($(".chess_board img[position='"+(i+9)+"']").attr('name') == 'null')){
			global_target[i+18] = $(".chess_board img[position='"+(i+18)+"']").attr('src');
		}
	}
	// 第五排双相可走位置
	if(position < 60 && position > 50){
		// 左边相可走位置
		if( units == 3 && ($(".chess_board img[position='"+(i-9)+"']").attr('name') == 'null') ){
			global_target[i-18] = $(".chess_board img[position='"+(i-18)+"']").attr('src');
		}
		if( units == 3 && ($(".chess_board img[position='"+(i-11)+"']").attr('name') == 'null') ){
			global_target[i-22] = $(".chess_board img[position='"+(i-22)+"']").attr('src');
		}
		// 右边相可走位置
		if( units == 7 && ($(".chess_board img[position='"+(i-9)+"']").attr('name') == 'null') ){
			global_target[i-18] = $(".chess_board img[position='"+(i-18)+"']").attr('src');
		}
		if( units == 7 && ($(".chess_board img[position='"+(i-11)+"']").attr('name') == 'null')){
			global_target[i-22] = $(".chess_board img[position='"+(i-22)+"']").attr('src');
		}
	}
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}
}
// 双方马的公共规则
function common_horse(e,camp,next=1){

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
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}
}
// 双方車的规则
function common_chariots(e,camp,next=1){
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
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}
}

// 双方炮的规则
function common_cannon(e,camp,next=1){
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
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}

}
// 黑色方兵的规则
function black_soldier(e,camp,next=1){
	// 在我黑色方棋盘内
	if($(e).attr('position') > 60){
		// 得到兵可走的位置
		var new_position = parseInt($(e).attr('position')) - 10;
		// 把可走的位置原来的信息存在一个json数据中
		global_target[new_position] = $(".chess_board img[position='"+new_position+"']").attr('src');
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
		
	}
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}

}
// 红方兵的规则
function red_soldier(e,camp,next=1){
	// 在我方棋盘内
	if($(e).attr('position') < 60){
		// 得到兵可走的位置
		var new_position = parseInt($(e).attr('position')) + 10;
		// 把可走的位置原来的信息存在一个json数据中
		global_target[new_position] = $(".chess_board img[position='"+new_position+"']").attr('src');
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

	}
	if(next){
		// 循环全局json的活跃可吃棋位
		set_chessman_active(camp);
	}

}
$('.chess_board #red img[name="chessman"]').each(function(){
	$(this).attr('camp','red');
});
$('.chess_board #black img[name="chessman"]').each(function(){
	$(this).attr('camp','black');
});
// 活跃棋位的点击
$('.chess_board').on('click',"img[chessman_position='active']",function(){
		// img 所有move属性 还原
		$('.chess_board img[move="move"]').each(function(){
            // 获取当前棋子的src
            var src = $(this).attr('src');
            // 把src最后的 .GIF去掉
            var s = src.substring(0,src.length-5);
            // 添加S.GIF 棋子处于活动状态
            s = s + '.GIF';
            // 改变棋子的状态
            $(this).attr('src',s);
            // 移除move属性
            $(this).removeAttr('move');
            // 移除chessman_position属性
            $(this).removeAttr('chessman_position');
         });
		// 设置棋子阵营
		(global_camp == 'red') ? $(this).attr('camp','red') : $(this).attr('camp','black');
		// 获取chessman，判断是否游戏结束
		var chessman = $(this).attr('chessman');
		// 获取活跃棋子的src
		var active_src = $(".chess_board img[status='active']").attr('src');
		var after = $(".chess_board img[status='active']").get(0);
		var before = $(this).get(0);
		// 设置活跃活跃棋子属性
		$(this).attr('src',active_src);
		// 添加一个move属性
		$(this).attr('move','move');
		// 设置name为chessman 代表是棋子
		$(this).attr('name','chessman');
		// 设置chessman属性值为 之前棋子的值
		$(this).attr('chessman',$(".chess_board img[status='active']").attr('chessman'));
		// 移除chessman_position属性
		$(this).removeAttr('chessman_position');
		// 设置之前的棋子的src为空棋子 
		$(".chess_board img[status='active']").attr('src','./images_chess/XQSTUDIO/OOS.GIF');
		// 设置之前的棋子的name为null
		$(".chess_board img[status='active']").attr('name','null');
		// 添加一个move属性
		$(".chess_board img[status='active']").attr('move','move');
		// 移除之前棋子的chessman值
		$(".chess_board img[status='active']").removeAttr('chessman');
		// 设置之前棋子的状态为inactive
		$(".chess_board img[status='active']").attr('status','inactive');
		// 循环其他的活跃棋子为不活跃棋子
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
		// 把global_target 清空 
		global_target = {};
		// 获取对面的帅或者将的name
		var boss = (global_camp == 'red') ? 'b_boss' : 'r_boss';
		var opponents = (global_camp == 'red') ? 'black' : 'red';
		// 打包json数据
		var data = '{"type":"move","client_id":"'+other_client_id+'","before_position":"'
		+$(before).attr('position')+'","before_src":"'
		+$(before).attr('src')+'","before_name":"'
		+$(before).attr('name')+'","before_camp":"'
		+$(before).attr('camp')+'","before_chessman":"'
		+$(before).attr('chessman')+'","camp":"'
		+opponents+'","after_position":"'
		+$(after).attr('position')+'"}';
		// 发送给对面的棋盘同步
		ws.send(data);
		// 把阵营置为null
		global_camp = boss;
		// 判断游戏是否结束
		if(chessman == boss){
			ws.send('{"type":"fail","client_id":"'+other_client_id+'"}');
			layer.confirm('您赢了！！！', {
			  btn: ['知道了，(*^__^*)'] //按钮
			}, function(){
			  location.reload();
			});
		}

		// 预测下一步是否将军
		rule(this,$(this).attr('chessman').substring(0,1),0);
		
	});
// 棋子的点击事件
$('.chess_board').on('click',"img[name='chessman']",function(){
		// 判断是哪方阵营走，如果不是该方阵营，则点击无效
		if(global_camp != $(this).attr('camp')){
			// 结束函数
			return false;
		}
		// 获取活跃棋子的位置
		var middle = $('.chess_board img[status="active"]').attr('position');
		// 如果不是undefined的话，代表之前有点击
		if (typeof(middle) != "undefined"){ 
			console.log(middle,global_target);
			// 获取之前点击的棋子的src
			var src = $('.chess_board img[status="active"]').attr('src');
			// 把src最后的 .GIF去掉
			var s = src.substring(0,src.length-5);
			// 设置棋子的状态处于不活跃
			s = s + '.GIF';
			// 改变棋子的状态
			$('.chess_board img[status="active"]').attr('src',s);
			// 设置棋子的状态为 inactive
			$('.chess_board img[status="active"]').attr('status','inactive');
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
			return false;
		} 
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
		// 把该棋子的src装进全局src
		global_src = 0;
		// 获取是哪方阵营
		var camp = $(this).attr('chessman').substring(0,1);
		// 调用规则
		rule(this,camp);
		
});

