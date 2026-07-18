/*CMD
  command: /stop1
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Test

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
User.setProperty("forward_loop1", false, "boolean");
Bot.sendMessage("⏹ Auto forward stopped.");

