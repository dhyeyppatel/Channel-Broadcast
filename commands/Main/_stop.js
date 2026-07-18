/*CMD
  command: /stop
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Main

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* 
/stop
Stops the auto forwarding loop
*/
User.setProperty("forward_loop", false, "boolean");
Bot.sendMessage("⏹ Auto forward stopped.");

