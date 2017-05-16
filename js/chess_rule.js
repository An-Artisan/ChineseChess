var red_status = 0;
var black_status = 0;
var global_src = null;
var a = $(".chess_board img[position='102']").attr('src');
console.log(a);
$("#red img[name='chessman']").each(function(){
	$(this).click(function(){
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
			}
		}
	});
});