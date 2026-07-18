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

let storage_channel = User.getProperty("storage_channel");
let target_channel = User.getProperty("target_channel");
let interval = User.getProperty("interval");
let start_message_id = User.getProperty("current_message_id");

if(!storage_channel || !target_channel || !interval || !start_message_id) {
  Bot.sendMessage("⚠️ Bot is not configured. Please run:\n`/setup <storage_channel> <target_channel> <start_message_id> <interval_in_seconds>`");
  return;
}

// start the loop
User.setProperty("forward_loop", true, "boolean");

Bot.sendMessage("✅ Auto forward started.\nEvery " + interval + " seconds a new message will be sent from ID: " + start_message_id);

// run first loop
Bot.run({
  command: "/forwardNext",
  run_after: interval
});
