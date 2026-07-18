/*CMD
  command: /forwardNext1
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
This is /forwardNext command it forwards one message and re-runs itself untill /stop command is used.
*/
let storage_channel1 = User.getProperty("storage_channel1");
let target_channel1  = User.getProperty("target_channel1");
let interval1        = User.getProperty("interval1");
let message_id1      = User.getProperty("current_message_id1");

if(!User.getProperty("forward_loop")){
  Bot.sendMessage("⏹ Forwarding stopped.");
  return;
}

// forward message
Api.copyMessage({
  chat_id: target_channel1,
  from_chat_id: storage_channel1,
  message_id: message_id1
});

// increment message id
User.setProperty("current_message_id", message_id1 + 1, "integer");

// schedule next run
Bot.run({
  command: "/forwardNext1",
  run_after: interval1
});

