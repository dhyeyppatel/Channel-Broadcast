/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Main
  answer: Supported by @commonthread 😊


  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* 
/start 
Starts looped forwarding from storage channel to target channel
*/
if (user.telegramid == 1123135015){
let storage_channel = -1002743651819; // your storage channel (negative with -100 prefix)
let target_channel = -1002352107567;  // replace with your target channel id
let start_message_id = 1300;             // first message id
let interval = 900;       // seconds (30 minutes)

// save settings in user state
User.setProperty("forward_loop", true, "boolean");
User.setProperty("current_message_id", start_message_id, "integer");
User.setProperty("storage_channel", storage_channel, "integer");
User.setProperty("target_channel", target_channel, "integer");
User.setProperty("interval", interval, "integer");

Bot.sendMessage("✅ Auto forward started.\nEvery " + interval + " seconds a new message will be sent.");

// run first loop
Bot.run({
  command: "/forwardNext",
  run_after: interval
});
}
