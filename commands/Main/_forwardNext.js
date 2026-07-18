/*CMD
  command: /forwardNext
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
This is /forwardNext command it forwards one message and re-runs itself untill /stop command is used.
*/
let storage_channel = User.getProperty("storage_channel");
let target_channel  = User.getProperty("target_channel");
let interval        = User.getProperty("interval");
let message_id      = User.getProperty("current_message_id");

if(!User.getProperty("forward_loop")){
  Bot.sendMessage("⏹ Forwarding stopped.");
  return;
}

// forward message
Api.copyMessage({
  chat_id: target_channel,
  from_chat_id: storage_channel,
  message_id: message_id
});

// increment message id
User.setProperty("current_message_id", message_id + 1, "integer");

// schedule next run
Bot.run({
  command: "/forwardNext",
  run_after: interval
});

