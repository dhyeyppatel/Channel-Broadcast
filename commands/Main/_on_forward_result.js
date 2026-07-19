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

// Increment for next time
User.setProperty("current_message_id", message_id + 1, "integer");

// Ensure loop continues
if (User.getProperty("forward_loop")) {
  Bot.run({
    command: "/forwardNext",
    run_after: interval
  });
}
