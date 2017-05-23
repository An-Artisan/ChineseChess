 var current_client_id;
 var other_client_id;
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
connect();
function onopen(){

}
function onmessage(e){
	var data = eval("("+e.data+")");
   if(data.type == 'currentLogin'){
      current_client_id = data.client_id;
         console.log(current_client_id);
   }else if(data.type == 'otherLogin'){
      if(data.client_id_one == current_client_id){
         other_client_id = data.client_id_two;
         console.log('current',current_client_id,'other',other_client_id);
      }
      else{
         other_client_id = data.client_id_one;
         console.log('current',current_client_id,'other',other_client_id);
      }
   }
   else{
         console.log(e);
   }
}

