<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
#infinity { 
position: relative; 
width: 212px; 
height: 100px; 
} 
#infinity:before, 
#infinity:after { 
content: ""; 
position: absolute; 
top: 0; 
left: 0; 
width: 60px; 
height: 60px; 
border: 20px solid red; 
-moz-border-radius: 50px 50px 0 50px; 
border-radius: 50px 50px 0 50px; 
-webkit-transform: rotate(-45deg); 
-moz-transform: rotate(-45deg); 
-ms-transform: rotate(-45deg); 
-o-transform: rotate(-45deg); 
transform: rotate(-45deg); 
} 
#infinity:after { 
left: auto; 
right: 0; 
-moz-border-radius: 50px 50px 50px 0; 
border-radius: 50px 50px 50px 0; 
-webkit-transform: rotate(45deg); 
-moz-transform: rotate(45deg); 
-ms-transform: rotate(45deg); 
-o-transform: rotate(45deg); 
transform: rotate(45deg); 
} 

</style>
</head>
<body>
	<?php
		// session_start();
		// if(!isset($_SESSION['username'])){
		// 	echo '请登录后再试';
		// }else{
		// 	var_dump($_SESSION);
		// }
		
	?>
	<div>
		<div>
			<img src="img/default.jpg" alt="">
		<div id="infinity"></div>
			

		</div>
	</div>

</body>
</html>