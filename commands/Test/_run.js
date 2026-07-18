/*CMD
  command: /run
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
/start 
Starts looped forwarding from storage channel to target channel
*/
if (user.telegramid == 1123135015){
let storage_channel1 = -1002860287870; // your storage channel (negative with -100 prefix)
let target_channel1 = -1002352107567;  // replace with your target channel id
let start_message_id1 = 1;             // first message id
let interval1 = 10;                   // seconds (30 minutes)

// save settings in user state
User.setProperty("forward_loop1", true, "boolean");
User.setProperty("current_message_id1", start_message_id1, "integer");
User.setProperty("storage_channel1", storage_channel1, "integer");
User.setProperty("target_channel1", target_channel1, "integer");
User.setProperty("interval1", interval1, "integer");

Bot.sendMessage("✅ Auto forward started.\nEvery " + interval1 + " seconds a new message will be sent.");

// run first loop
Bot.run({
  command: "/forwardNext1",
  run_after: interval1
});
}
