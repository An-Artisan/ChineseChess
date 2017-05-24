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
    {   Gateway::sendToCurrentClient(json_encode(array(
                        'type'=>'currentLogin',
                        'client_id'=>$client_id, 
                    )));
        Gateway::joinGroup($client_id, 'test');
        $count = Gateway::getClientCountByGroup('test');
        if($count == 2){
          $user = Gateway::getClientSessionsByGroup('test');
          foreach ($user as $key => $value) {
                $users[] = $key;
          }
          // 向当前client_id发送数据 
          $new_message = array(
                        'type'=>'otherLogin',
                        'client_id_one'=>$users[0], 
                        'client_id_two'=>$users[1], 
                    );
          Gateway::sendToGroup('test', json_encode($new_message));
        }
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
        // 向对方发送数据
         Gateway::sendToClient($message_data['client_id'],  json_encode(array(
                        'type'=>'move',
                        'before_position' =>$message_data['before_position'],
                        'before_src' =>addslashes($message_data['before_src']),
                        'before_name' =>$message_data['before_name'],
                        'before_camp' =>$message_data['before_camp'],
                        'after_position' =>$message_data['after_position'],
                        'camp' =>$message_data['camp'],
                    )));
        // 向所有人发送 
        // Gateway::sendToAll("$client_id said $message\r\n");
   }
   
   /**
    * 当用户断开连接时触发
    * @param int $client_id 连接id
    */
   public static function onClose($client_id)
   {
       // 向所有人发送 
       // GateWay::sendToAll("$client_id logout\r\n");
   }
}
