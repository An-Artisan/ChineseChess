 // 当前用户的websocket的连接id
 var current_client_id;
 // 对面用户的websocket的连接id
 var other_client_id;
 // 连接服务端
function connect() {
   // 创建websocket
   ws = new WebSocket("ws://"+document.domain+":9292");
   // 当socket连接打开时，输入用户名
   ws.onopen = onopen;
   // 当有消息时根据消息类型显示不同信息
   ws.onmessage = onmessage; 
   // 关闭连接时
   ws.onclose = function() {
	  console.log("连接关闭");
   };
   // 出现错误时
   ws.onerror = function() {
 	  console.log("出现错误");
   };
}
// 连接socket
connect();
// 打开连接执行
function onopen(){
   //获取url中"?"符后的字串 
   var url = location.search; 
   var theRequest = new Object(); 
   if (url.indexOf("?") != -1) { 
   var str = url.substr(1); 
   strs = str.split("&"); 
   for(var i = 0; i < strs.length; i ++) { 
   theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
   } 
   }
   // 发送登录标志，以及分组信息，和头像信息
   ws.send('{"type":"login","group":"'+Math.floor(theRequest.page)+'","photo":"'+$("#user_head").attr('src')+'"}');
}
function onmessage(e){
   // 转换为js对象
	var data = eval("("+e.data+")");
   // switch判断
   switch(data.type)
   {  
      // 如果是当前用户登录，就赋值当前用户的连接id
      case 'currentLogin':
         current_client_id = data.client_id;
         break;
      // 如果是其他用户登录，就设置其他用户的连接id，并且设置黑红双方
      case 'otherLogin':
         // 如果第一个id等于当前id
         if(data.client_id_one == current_client_id){
            // 设置阵营
            global_camp = data.client_id_one_camp;
            // 设置对方id
            other_client_id = data.client_id_two;
            // 显示阵营
            $('#camp').text("当前阵营：红棋");
         }else{
            // 设置阵营
            other_client_id = data.client_id_one;
            // 显示阵营
            $('#camp').text("当前阵营：黑棋");
         }
         // 提示开始游戏
         layer.confirm('开始游戏，红方先走', {
           btn: ['知道了，o(╯□╰)o'] //按钮
         });
         break;
      // 移动棋子的时候
      case 'move':
         $('.chess_board img[move="move"]').each(function(){
            // 获取当前棋子的src
            src = $(this).attr('src');
            // 把src最后的 .GIF去掉
            var s = src.substring(0,src.length-5);
            // 添加S.GIF 棋子处于活动状态
            s = s + '.GIF';
            // 改变棋子的状态
            $(this).attr('src',s);
            // 移除move状态
            $(this).removeAttr('move');
         });
         // 设置棋子走动的信息
         $("img[position='"+data.before_position+"']").attr('src',data.before_src);
         $("img[position='"+data.before_position+"']").attr('move','move');
         $("img[position='"+data.before_position+"']").attr('name',data.before_name);
         $("img[position='"+data.before_position+"']").attr('camp',data.before_camp);
         $("img[position='"+data.before_position+"']").attr('chessman',data.before_chessman);
         $("img[position='"+data.after_position+"']").attr('name','null');
         $("img[position='"+data.after_position+"']").attr('move','move');
         $("img[position='"+data.after_position+"']").attr('src','./images_chess/XQSTUDIO/OOS.GIF');
         $("img[position='"+data.after_position+"']").removeAttr('chessman');
         // 设置阵营，判断是否我方走
         global_camp = data.camp;
         break;
      // 将军
      case 'checkmate':
         // 提示将军
         layer.msg('将军');
         break;
         // 登出
      case 'loginOut':
         // 提示对方退出此对战
         layer.confirm('对方已经退出游戏', {
              btn: ['知道了，o(╯□╰)o'] //按钮
            }, function(){
              // 刷新当前窗口
              location.reload();
            });
         break;
      // 房间已满提示
      case 'full':
         layer.confirm('当前房间已经满员，请选择其他房间。', {
           btn: ['知道了，o(╯□╰)o'] //按钮
         }, function(){
           // 关闭当前窗口
           window.open('','_self'); window.close();
         });
         break;
      // 失败提示
      case 'fail':
         layer.confirm('您输了！！！', {
              btn: ['知道了，o(╯□╰)o'] //按钮
            }, function(){
              // 关闭当前窗口
              window.open('','_self'); window.close();
            });
         break;
      default:
         
   }
   
}
// window.onbeforeunload = function() {

//            return "你确定要离开吗？离开此局自动认输！！！";
           
//   }

