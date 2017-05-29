<?php
/**
 * This file is part of workerman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link http://www.workerman.net/
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */

/**
 * 用于检测业务代码死循环或者长时间阻塞等问题
 * 如果发现业务卡死，可以将下面declare打开（去掉//注释），并执行php start.php reload
 * 然后观察一段时间workerman.log看是否有process_timeout异常
 */
//declare(ticks=1);

use \GatewayWorker\Lib\Gateway;

/**
 * 主逻辑
 * 主要是处理 onConnect onMessage onClose 三个方法
 * onConnect 和 onClose 如果不需要可以不用实现并删除
 */
class Events
{
    /**
     * 当客户端连接时触发
     * 如果业务不需此回调可以删除onConnect
     * 
     * @param int $client_id 连接id
     */
    public static function onConnect($client_id)
    {   


      // Gateway::sendToCurrentClient(json_encode(array(
      //                   'type'=>'currentLogin',
      //                   'client_id'=>$client_id, 
      //               )));
      //   Gateway::joinGroup($client_id, 'test');
      //   $count = Gateway::getClientCountByGroup('test');
      //   if($count == 2){
      //     $user = Gateway::getClientSessionsByGroup('test');
      //     foreach ($user as $key => $value) {
      //           $users[] = $key;
      //     }
      //     // 向当前client_id发送数据 
      //     $new_message = array(
      //                   'type'=>'otherLogin',
      //                   'client_id_one'=>$users[0], 
      //                   'client_id_two'=>$users[1], 
      //               );
      //     Gateway::sendToGroup('test', json_encode($new_message));
      //   }
        // 向所有人发送
        // Gateway::sendToAll("$client_id login\r\n");
    }
    
   /**
    * 当客户端发来消息时触发
    * @param int $client_id 连接id
    * @param mixed $message 具体消息
    */
   public static function onMessage($client_id, $message)
   {    
        // 客户端传递的是json数据
        $message_data = json_decode($message, true);
        // 判断类型
        switch ($message_data['type']) {
          // 将军
          case 'checkmate':
            // 向对方发送数据
            Gateway::sendToClient($message_data['client_id'],  json_encode(array(
                        'type'=>'checkmate'
                    )));
            break;
          // 输了
          case 'fail':
            // 向对方发送数据
            Gateway::sendToClient($message_data['client_id'],  json_encode(array(
                        'type'=>'fail'
                    )));
            break;
          // 登录
          case 'login':
            // 发送给当前用户的当前id
            Gateway::sendToCurrentClient(json_encode(array(
                        'type'=>'currentLogin',
                        'client_id'=>$client_id, 
                    )));
           // 设置一个数组，每次赋值为空
           $all_connect = [];
           // 加入分组
           Gateway::joinGroup($client_id, $message_data['group']);
           // 添加session信息，头像和分组
           Gateway::setSession($client_id, array('group'=>$message_data['group'],'photo'=>addslashes($message_data['photo'])));
           // 循环分组获取所有分组信息
            for ($i=1; $i < 9; $i++) { 
                // 装入一个变量中
                $all_connect[] = Gateway::getClientSessionsByGroup($i);
            }
            // 判断当前分组用户数量
            $count = Gateway::getClientCountByGroup($message_data['group']);
            // 如果等于2，则发送双方的id给当前分组
            if($count == 2){
              // 获取分组信息
              $user = Gateway::getClientSessionsByGroup($message_data['group']);
              // 获取clien_id
              foreach ($user as $key => $value) {
                    $users[] = $key;
              }
              // 打包数组数据
              $new_message = array(
                            'type'=>'otherLogin',
                            'client_id_one'=>$users[0],
                            'client_id_one_camp'=>'red', 
                            'client_id_two'=>$users[1], 
                            'client_id_two_camp'=>'black', 
                        );
              // 给当前分组发送消息
              Gateway::sendToGroup($message_data['group'], json_encode($new_message));
              // 发送给大厅页面有人加入游戏
              Gateway::sendToGroup('home', json_encode($all_connect));
            }
            // 等于1，也发送给大厅界面，用户显示头像信息
            else if($count == 1){
                // 发送给大厅界面
                Gateway::sendToGroup('home', json_encode($all_connect));
            }
            // 大于等于3，则不可以，房间已满
            else{
                // 提示房间已经满了
                Gateway::sendToCurrentClient(json_encode(array(
                        'type'=>'full'
                    )));
                // 并且踢掉该client_id
                Gateway::closeClient($client_id);
            }
            break;
          // 游戏大厅登录
          case 'home':
            // 清空数组
            $all_connect = [];
            // 添加分组，因为不同的客户端都会打开游戏大厅页面
            Gateway::joinGroup($client_id, 'home');
            // 循环分组信息
            for ($i=1; $i < 9; $i++) { 
              // 保存在数组里面
              $all_connect[] = Gateway::getClientSessionsByGroup($i);
            }
            // 发送给游戏大厅
            Gateway::sendToGroup('home', json_encode($all_connect));
            break;
          default:
           // 向对方发送数据 之前棋子的位置，src，棋子名称，阵营，等等信息
           Gateway::sendToClient($message_data['client_id'],  json_encode(array(
                          'type'=>'move',
                          'before_position' =>$message_data['before_position'],
                          'before_src' =>addslashes($message_data['before_src']),
                          'before_name' =>$message_data['before_name'],
                          'before_camp' =>$message_data['before_camp'],
                          'before_chessman' =>$message_data['before_chessman'],
                          'after_position' =>$message_data['after_position'],
                          'camp' =>$message_data['camp'],
                      )));
        }
   }
   
   /**
    * 当用户断开连接时触发
    * @param int $client_id 连接id
    */
   public static function onClose($client_id)
   {   

      // 向对应的组成员发送下线消息
      GateWay::sendToGroup($_SESSION['group'],json_encode(array(
                        'type'=>'loginOut'
                    )));
      // 清空数组
      $all_connect = [];
      // 获取所有分组信息
      for ($i=1; $i < 9; $i++) { 
              $all_connect[] = Gateway::getClientSessionsByGroup($i);
            }
      // 发送给游戏大厅
      Gateway::sendToGroup('home', json_encode($all_connect));
   }
}
