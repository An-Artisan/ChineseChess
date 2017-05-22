 // 连接服务端
function connect() {
   // 创建websocket
   ws = new WebSocket("ws://"+document.domain+":1025");
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
// connect();
function onopen(){

}
function onmessage(e){
	console.log(e);
}

