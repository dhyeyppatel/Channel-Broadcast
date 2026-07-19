/*CMD
  command: /on_forward_result
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

let message_id = User.getProperty("current_message_id");
let interval = User.getProperty("interval");

// Auto-Delete integration
if (options && options.ok && User.getProperty("autodelete_enabled")) {
  let delay = User.getProperty("autodelete_delay");
  let target_channel = User.getProperty("target_channel");
  let new_message_id = options.result.message_id;
  
  if (delay && target_channel && new_message_id) {
    Bot.run({
      command: "/delete_post",
      run_after: delay,
      options: {
        chat_id: target_channel,
        message_id: new_message_id
      }
    });
  }
}

// Increment for next time
User.setProperty("current_message_id", message_id + 1, "integer");

// Ensure loop continues
if (User.getProperty("forward_loop")) {
  Bot.run({
    command: "/forwardNext",
    run_after: interval
  });
}
