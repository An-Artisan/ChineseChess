<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>在线中国象棋对局</title>
	<link rel="stylesheet" href="layui/css/layui.css">
	<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
	<script src="layer/layer.js"></script>
	<script src="layui/layui.js"></script>
	<script src="js/online_chess.js"></script>
	<style>
		.chess_board{
			background-image: url(./images_chess/XQSTUDIO.GIF);
			background-size:100%;
			position: absolute;
			width: 500px;
			height: 545px;
			left:50%;
			top:50%; 
			margin-left:-400px;
			margin-top:-260px;
		}
		.games_info{
			position: absolute;
			margin-top:-50px;
			margin-left:12px;
		}
		.chat_content{margin-top:70px;width:420px; height:525px;border:2px solid #555;float:right} 
/* css注释：对divcss5-right设置float:right即可让对象靠右浮动 */ 
	</style>
	<script>
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
		      ,'face' //表情
		    ]
		}); 
		}); 
	</script>
</head>
<body>
	<?php 
		// 开启session
	    session_start();
	    // 判断是否存在昵称
	    if(!isset($_SESSION['username'])){
	        echo "<script>layer.confirm('请登录后再试！', {
	              btn: ['知道了，o(╯□╰)o'] //按钮
	            }, function(){
	              window.location.href='http://chess.joker1996.com/login.html';
	            });</script>";
	        exit;
	    }
	    $page = $_GET['page'];
	    if(!(is_numeric($page) && $page > 0 && $page < 9)){
	    	echo "<script>layer.confirm('参数不正确', {
	              btn: ['知道了，o(╯□╰)o'] //按钮
	            }, function(){
	              window.location.href='http://chess.joker1996.com/home.php';
	            });</script>";
	        exit;
	    }
	?>
	<div class="chess_board">
		<img style="display: none;" id="user_head" src="<?php echo $_SESSION['user_head'];?>">
		<div class="games_info">
		<div style="font-size: 20px;" id="camp"></div>
		</div>
		<div id="black">
		<div id="black_1">
		<img width="50" style="margin-left: 9px;" position="101" name="chessman" chessman="b_j" status="inactive" src="./images_chess/XQSTUDIO/BR.GIF" alt="">
		<img width="50" position="102" name="chessman" chessman="b_m" status="inactive" src="./images_chess/XQSTUDIO/BN.GIF" alt="">
		<img width="50" position="103" name="chessman" chessman="b_x" status="inactive" src="./images_chess/XQSTUDIO/BB.GIF" alt="">
		<img width="50" position="104" name="chessman" chessman="b_s" status="inactive" src="./images_chess/XQSTUDIO/BA.GIF" alt="">
		<img width="50" position="105" name="chessman" chessman="b_boss" status="inactive" src="./images_chess/XQSTUDIO/BK.GIF" alt="">
		<img width="50" position="106" name="chessman" chessman="b_s" status="inactive" src="./images_chess/XQSTUDIO/BA.GIF" alt="">
		<img width="50" position="107" name="chessman" chessman="b_x" status="inactive" src="./images_chess/XQSTUDIO/BB.GIF" alt="">
		<img width="50" position="108" name="chessman" chessman="b_m" status="inactive" src="./images_chess/XQSTUDIO/BN.GIF" alt="">
		<img width="50" position="109" name="chessman" chessman="b_j" status="inactive" src="./images_chess/XQSTUDIO/BR.GIF" alt="">
		</div>
		<div id="black_2" style="margin-top: 8px;">
		<img width="50" style="margin-left: 9px;" position="91" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="92" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="93" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="94" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="95" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="96" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="97" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="98" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="99" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		</div>
		<div id="black_3" style="margin-top: 12px;">
		<img width="50" style="margin-left: 9px;" position="81" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="82" name="chessman" chessman="b_p" status="inactive" src="./images_chess/XQSTUDIO/BC.GIF" alt="">
		<img width="50" position="83" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="84" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="85" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="86" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="87" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="88" name="chessman" chessman="b_p" status="inactive" src="./images_chess/XQSTUDIO/BC.GIF" alt="">
		<img width="50" position="89" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		</div>
		<div id="black_4" >
		<img width="50" style="margin-left: 9px;" position="71" name="chessman" chessman="b_b" status="inactive" src="./images_chess/XQSTUDIO/BP.GIF" alt="">
		<img width="50" position="72" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="73" name="chessman" chessman="b_b" status="inactive" src="./images_chess/XQSTUDIO/BP.GIF" alt="">
		<img width="50" position="74" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="75" name="chessman" chessman="b_b" status="inactive" src="./images_chess/XQSTUDIO/BP.GIF" alt="">
		<img width="50" position="76" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="77" name="chessman" chessman="b_b" status="inactive" src="./images_chess/XQSTUDIO/BP.GIF" alt="">
		<img width="50" position="78" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="79" name="chessman" chessman="b_b" status="inactive" src="./images_chess/XQSTUDIO/BP.GIF" alt="">
		</div>
		<div id="black_5" >
		<img width="50" style="margin-left: 9px;" position="61" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="62" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="63" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="64" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="65" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="66" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="67" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="68" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="69" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		</div>
		</div>
		<!-- 楚河汉界 -->
		<div id="red" style="margin-top: 8px;">
		<div id="red_1">
		<img width="50" style="margin-left: 9px;" position="51" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="52" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="53" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="54" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="55" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="56" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="57" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="58" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="59" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		</div>
		<div id="red_2" >
		<img width="50" style="margin-left: 9px;" position="41" name="chessman" chessman="r_b" status="inactive" src="./images_chess/XQSTUDIO/RP.GIF" alt="">
		<img width="50" position="42" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="43" name="chessman" chessman="r_b" status="inactive" src="./images_chess/XQSTUDIO/RP.GIF" alt="">
		<img width="50" position="44" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="45" name="chessman" chessman="r_b" status="inactive" src="./images_chess/XQSTUDIO/RP.GIF" alt="">
		<img width="50" position="46" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="47" name="chessman" chessman="r_b" status="inactive" src="./images_chess/XQSTUDIO/RP.GIF" alt="">
		<img width="50" position="48" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="49" name="chessman" chessman="r_b" status="inactive" src="./images_chess/XQSTUDIO/RP.GIF" alt="">
		</div>
		<div id="red_3" style="margin-top: 10px;">
		<img width="50" style="margin-left: 9px;" position="31" name="null"  status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="32" name="chessman" chessman="r_p" status="inactive" src="./images_chess/XQSTUDIO/RC.GIF" alt="">
		<img width="50" position="33" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="34" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="35" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="36" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="37" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="38" name="chessman" chessman="r_p" status="inactive" src="./images_chess/XQSTUDIO/RC.GIF" alt="">
		<img width="50" position="39" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		</div>
		<div id="red_4" style="margin-top: 4px;">
		<img width="50" style="margin-left: 9px;" position="21" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="22" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="23" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="24" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="25" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="26" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="27" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="28" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		<img width="50" position="29" name="null" status="inactive" src="./images_chess/XQSTUDIO/OO.GIF" alt="">
		</div>
		<div id="red_5" style="margin-top: -2px;">
		<img width="50" style="margin-left: 9px;" position="11" name="chessman" chessman="r_j" status="inactive" src="./images_chess/XQSTUDIO/RR.GIF" alt="">
		<img width="50" position="12" name="chessman" chessman="r_m" status="inactive" src="./images_chess/XQSTUDIO/RN.GIF" alt="">
		<img width="50" position="13" name="chessman" chessman="r_x" status="inactive" src="./images_chess/XQSTUDIO/RB.GIF" alt="">
		<img width="50" position="14" name="chessman" chessman="r_s" status="inactive" src="./images_chess/XQSTUDIO/RA.GIF" alt="">
		<img width="50" position="15" name="chessman" chessman="r_boss" status="inactive" src="./images_chess/XQSTUDIO/RK.GIF" alt="">
		<img width="50" position="16" name="chessman" chessman="r_s" status="inactive" src="./images_chess/XQSTUDIO/RA.GIF" alt="">
		<img width="50" position="17" name="chessman" chessman="r_x" status="inactive" src="./images_chess/XQSTUDIO/RB.GIF" alt="">
		<img width="50" position="18" name="chessman" chessman="r_m" status="inactive" src="./images_chess/XQSTUDIO/RN.GIF" alt="">
		<img width="50" position="19" name="chessman" chessman="r_j" status="inactive" src="./images_chess/XQSTUDIO/RR.GIF" alt="">
		</div>
	
		</div>
		</div>
	<div class="chat_content">
	<div id="main_content" style="height: 400px;overflow-y:scroll;">
	
	</div>
     <textarea id="demo" style="display: none;"></textarea>
	</div> 
<script src="js/chess_rule.js"></script>

</body>
</html>