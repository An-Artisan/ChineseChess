layui.use('layedit', function(){
         // 获取编辑器
          layedit = layui.layedit;
          // 获取编辑器
          layedit = layui.layedit;
          //建立编辑器
          index = layedit.build('demo', {
          height:80,
          tool: [
              'strong' //加粗
              ,'italic' //斜体
              ,'underline' //下划线
              ,'del' //删除线
              ,'|' //分割线
              ,'left' //左对齐
              ,'center' //居中对齐
              ,'right' //右对齐
              ,'link' //超链接
            ]
        }); 
        // iframe的键盘监听事件
        document.getElementsByTagName('iframe')[0].contentWindow.document.onkeydown = function (event) {
            // 发送消息
            sendMessage(event);
        }
        }); 

// ctrl+enter 发送本地消息和远程消息
function sendMessage(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    // 按住ctrl+enter发送
     if (event.ctrlKey && event.keyCode == 13) { // 按 enter  e.ctrlKey代表ctrl
        // 拼接内容
        var content = '<br /><div><img style="border-radius:50%;width: 33px;" src="'+$("#user_head").attr("src")+'" alt=""><a>'+$("#username").text()+'&nbsp;'+layedit.getText(index)+'</a></div>';
        // 添加到聊天区域
        $("#main_content").append(content);
        if(typeof(other_client_id) != 'undefined'){
            // 发送给对方
            ws.send('{"type":"say","client_id":"'+other_client_id+'","content":"'+layedit.getText(index)+'"}');
        }
        // 滚动条置于底部
        document.getElementById('main_content').scrollTop = document.getElementById('main_content').scrollHeight;
        // 重新绑定编辑器
        index = layedit.build('demo', {
          height:80,
          tool: [
               'strong' //加粗
              ,'italic' //斜体
              ,'underline' //下划线
              ,'del' //删除线
              ,'|' //分割线
              ,'left' //左对齐
              ,'center' //居中对齐
              ,'right' //右对齐
              ,'link' //超链接
            ]
        }); 
        // iframe的键盘监听事件
        document.getElementsByTagName('iframe')[0].contentWindow.document.onkeydown = function (event) {
            sendMessage(event);
        }
    }
}