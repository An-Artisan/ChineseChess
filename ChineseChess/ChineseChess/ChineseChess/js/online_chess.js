 var current_client_id;
 var other_client_id;
 // 连接服务端
function connect() {
   // 创建websocket
   ws = new WebSocket("ws://"+document.domain+":9292");
   // 当socket连接打开时，输入用户名
   ws.onopen = onopen;
   // 当有消息时根据消息类型显示不同信息
   ws.onmessage = onmessage; 
   ws.onclose = function() {
	  console.log("连接关闭，定时重连");
      connect();
   };
   ws.onerror = function() {
 	  console.log("出现错误");
   };
}
connect();
function onopen(){

}
function onmessage(e){
	var data = eval("("+e.data+")");
   switch(data.type)
   {
      case 'currentLogin':
         current_client_id = data.client_id;
         break;
      case 'otherLogin':
         if(data.client_id_one == current_client_id){
            other_client_id = data.client_id_two;
         }else{
            other_client_id = data.client_id_one;
         }

         console.log(current_client_id,other_client_id);
         break;
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
            $(this).removeAttr('move');
             console.log(this);
         });
         $("img[position='"+data.before_position+"']").attr('src',data.before_src);
         $("img[position='"+data.before_position+"']").attr('move','move');
         $("img[position='"+data.before_position+"']").attr('name',data.before_name);
         $("img[position='"+data.before_position+"']").attr('camp',data.before_camp);
         $("img[position='"+data.before_position+"']").attr('chessman',data.before_chessman);
         $("img[position='"+data.after_position+"']").attr('name','null');
         $("img[position='"+data.after_position+"']").attr('move','move');
         $("img[position='"+data.after_position+"']").attr('src','./images_chess/XQSTUDIO/OOS.GIF');
         $("img[position='"+data.after_position+"']").removeAttr('chessman');

         global_camp = data.camp;
         break;
      case 'checkmate':
         layer.msg('将军');
         break;
      case 'loginOut':
         layer.msg('对方已经退出此局对战。');
         break;
      default:
         layer.confirm('您输了！！！', {
           btn: ['知道了，o(╯□╰)o'] //按钮
         }, function(){
           location.reload();
         });
   }
   
}
// window.onbeforeunload = function() {

//            return "你确定要离开吗？离开此局自动认输！！！";
           
//   }

