<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>对局大厅</title>
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <script src="layer/layer.js"></script>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/index.css">
    <script src="js/home.js"></script>
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
 ?>
<div class="container">
    <div class="row">
        <div class="col-md-12" id="left">
            <div class="row">
                <div class="col-md-12">
                    <center><h4>中国象棋在线对局</h4></center>  
                </div>
            </div>
            <!--正文框-->
            <div class="text-center col-md-12 verscroll ">
                <div class="row">
                    <div id="1" class="col-md-6">
                        <div class="col-md-4"  >
                            <img  name="black" src="img/black.gif" >
                        </div>
                        <div class="col-md-5"><a href="http://chess.joker1996.com?page=1" target="_blank"><img width="100" height="100"  src="images_chess/MOVESKY.GIF"  ></a></div>
                        <div class="col-md-4">
                            <img  name="red" src="img/red.gif"  >
                        </div>
                        <div name="notice" class="col-md-8 text-center">空房间</div>
                    </div>
                    <div id="2" class="col-md-6">
                         <div class="col-md-4">
                            <img  name="black" src="img/black.gif" >
                        </div>
                        <div class="col-md-5"><a href="http://chess.joker1996.com?page=2" target="_blank"><img width="100" height="100"  src="images_chess/MOVESKY.GIF"  ></a></div>
                        <div class="col-md-4">
                            <img  name="red" src="img/red.gif"  >
                        </div>
                        <div name="notice" class="col-md-8 text-center">空房间</div>
                    </div>
                </div><!--第一行-->
                <div class="row">
                    <div id="3" class="col-md-6">
                         <div class="col-md-4">
                            <img name="black" src="img/black.gif"   style="">
                        </div>
                        <div class="col-md-5"><a href="http://chess.joker1996.com?page=3" target="_blank"><img width="100" height="100" src="images_chess/MOVESKY.GIF"  ></a></div>
                        <div class="col-md-4">
                            <img  name="red" src="img/red.gif"  >
                        </div>
                        <div name="notice" class="col-md-8 text-center">空房间</div>
                    </div>
                    <div id="4" class="col-md-6">
                         <div class="col-md-4">
                            <img name="black" src="img/black.gif"   style="">
                        </div>
                        <div class="col-md-5"><a href="http://chess.joker1996.com?page=4" target="_blank"><img width="100" height="100" src="images_chess/MOVESKY.GIF"  ></a></div>
                        <div class="col-md-4">
                            <img name="red" src="img/red.gif"  >
                        </div>
                        <div  name="notice" class="col-md-8 text-center">空房间</div>
                    </div>
                </div><!--第二行-->
                <div class="row">
                    <div id="5" class="col-md-6">
                         <div class="col-md-4">
                            <img name="black" src="img/black.gif"   style="">
                        </div>
                        <div class="col-md-5"><a href="http://chess.joker1996.com?page=5" target="_blank"><img width="100" height="100"  src="images_chess/MOVESKY.GIF"  ></a></div>
                        <div class="col-md-4">
                            <img name="red" src="img/red.gif"  >
                        </div>
                        <div name="notice" class="col-md-8 text-center">空房间</div>
                    </div>
                    <div id="6" class="col-md-6">
                         <div class="col-md-4">
                            <img name="black" src="img/black.gif"   style="">
                        </div>
                        <div class="col-md-5"><a href="http://chess.joker1996.com?page=6" target="_blank"><img width="100" height="100" src="images_chess/MOVESKY.GIF"  ></a></div>
                        <div class="col-md-4">
                            <img name="red" src="img/red.gif"  >
                        </div>
                        <div name="notice" class="col-md-8 text-center">空房间</div>
                    </div>
                </div><!--第三行-->
                <div class="row">
                    <div id="7" class="col-md-6">
                         <div class="col-md-4">
                            <img name="black" src="img/black.gif"   style="">
                        </div>
                        <div class="col-md-5"><a href="http://chess.joker1996.com?page=7" target="_blank"><img width="100" height="100" src="images_chess/MOVESKY.GIF"  ></a></div>
                        <div class="col-md-4">
                            <img name="red" src="img/red.gif"  >
                        </div>
                        <div name="notice" class="col-md-8 text-center">空房间</div>
                    </div>
                    <div id="8" class="col-md-6">
                        <div class="col-md-4">
                            <img name="black" src="img/black.gif"  style="">
                        </div>
                        <div class="col-md-5"><a href="http://chess.joker1996.com?page=8" target="_blank"><img width="100" height="100" src="images_chess/MOVESKY.GIF" ></a></div>
                        <div class="col-md-4">
                            <img name="red" src="img/red.gif" >
                        </div>
                        <div name="notice" class="col-md-8 text-center">空房间</div>
                    </div>
                </div>
        
              
            </div>
        </div>
        
    </div>
</div>
</body>
</html>