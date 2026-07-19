/*CMD
  command: /forwardNext
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Engine

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return; 

let is_running = Bot.getProperty("is_running");
if (!is_running) return;

let source = Bot.getProperty("source_channel");
let target = Bot.getProperty("target_channel");
let message_id = Bot.getProperty("current_message_id");

Api.copyMessage({
  chat_id: target,
  from_chat_id: source,
  message_id: message_id,
  on_result: "/on_forward_result",
  on_error: "/on_forward_result"
});
