var red_status = 0;
var black_status = 0;
var global_src = null;
var global_target = {};
// var a = $(".chess_board img[position='102']").attr('src');
// console.log(a);
function rule(e){
	// 获取棋子的类型
	var chessman = $(e).attr('chessman');
	switch(chessman)
	{
	case 'r_b':
	  soldier(e);
	  break;
	case 'r_p':
	  // soldier(e);
	  break;
	case 'r_j':
	  // soldier(e);
	  break;
	case 'r_m':
	  // soldier(e);
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
function soldier(e){
	// 在我方棋盘内
	if($(e).attr('position') < 60){
		// 得到兵可走的位置
		var new_position = parseInt($(e).attr('position')) + 10;
		// 把可走的位置原来的信息存在一个json数据中
		global_target[new_position] = $(".chess_board img[position='"+new_position+"']").attr('src');
		// 获取可走位置的name值
		var attr_name = $(".chess_board img[position='"+new_position+"']").attr('name');
		// 获取可走位的chessman值
		var attr_chessman = $(".chess_board img[position='"+new_position+"']").attr('chessman');
		// 如果为null代表是空棋位，否则是有其他棋子
		if(attr_name == 'null'){
			// 设置可走的位置为活跃
			$(".chess_board img[position='"+new_position+"']").attr('src','./images_chess/XQSTUDIO/OOS.GIF');
			// 设置棋位的chessman_position值为active
			$(".chess_board img[position='"+new_position+"']").attr('chessman_position','active');
		}
		// 如果不是的棋子才给可走棋位
		else if(attr_chessman.substring(0,1)!='r'){
			// 获取可走棋位的src
			var s = $(".chess_board img[position='"+new_position+"']").attr('src');
			// 拼接字符串
			s = s.substring(0,s.length-4) + 'S.GIF'
			// 设置可走棋位的src为活跃状态
			$(".chess_board img[position='"+new_position+"']").attr('src',s);
			// 设置chessman_position为active
			$(".chess_board img[position='"+new_position+"']").attr('chessman_position','active');
			// 设置name为chessman_active
			$(".chess_board img[position='"+new_position+"']").attr('name','chessman_active');
		}
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
				global_target[position+10] = up;
				global_target[position-1] = left;
				// 跳出switch
			    break;
			// 为1表示是左侧边缘
			case 1:
				// 获取上右棋位的src
				var up = $(".chess_board img[position='"+(position+10)+"']").attr('src');
				var right = $(".chess_board img[position='"+(position+1)+"']").attr('src');
				// 添加到全局json
				global_target[position+10] = up;
				global_target[position+1] = right;
				// 跳出switch
				break;
			// 否则表示不是边缘
			default:
				// 获取上左右棋位的src，因为兵不能
				var up = $(".chess_board img[position='"+(position+10)+"']").attr('src');
				var right = $(".chess_board img[position='"+(position+1)+"']").attr('src');
				var left = $(".chess_board img[position='"+(position-1)+"']").attr('src');
				// 添加到全局json
				global_target[position+10] = up;
				global_target[position-1] = left;
				global_target[position+1] = right;
		}
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
			else if(attr_chessman.substring(0,1)!='r'){
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
				// 调用规则
				rule(this);
			}
		}
	});
