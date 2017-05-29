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
// 连接服务器
connect();
// 服务器发来消息执行
function onmessage(e) {
   // 全部重置
   $('img[name="red"]').each(function(){
      $(this).attr('src','img/red.gif');
   });
   $('img[name="black"]').each(function(){
      $(this).attr('src','img/black.gif');
   });
   $('div[name="notice"]').each(function(){
      $(this).text("空房间");
   });
   // 转换js对象
   var data = eval("("+e.data+")");
   // 设置一个标记
   var flag = 1;
   // 循环json数据
   for(var o in data){  
        for (var k in data[o]) {
            // 如果为1设置 img[name=red]的头像
            if(flag){
               $('#'+data[o][k].group + ' img[name="red"]').attr('src',data[o][k].photo);
               // 设置一个人在线
               $('#'+data[o][k].group + '> div').last().text('一人在线'); 
               // 设置标记为0
               flag = 0;
            }
            // 否则就是两个人都在
            else{
               // 设置img[name=balck]的头像
               $('#'+data[o][k].group + ' img[name="black"]').attr('src',data[o][k].photo);
               $('#'+data[o][k].group + '> div').last().text('房间已满'); 
               flag = 1;
            }
        }
        // 设置falg为1
        flag = 1;
      } 

}
function onopen(){
   // 发送登录主页面登录标记i
   ws.send('{"type":"home"}');
}