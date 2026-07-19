/*CMD
  command: /on_forward_result
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

let message_id = Bot.getProperty("current_message_id");
let is_running = Bot.getProperty("is_running");

if (!is_running) return;

// Auto-Delete integration
if (options && options.ok && Bot.getProperty("autodelete_enabled")) {
  let delay = Bot.getProperty("autodelete_delay") || 3600; 
  let target = Bot.getProperty("target_channel");
  let new_message_id = options.result.message_id;
  
  if (target && new_message_id) {
    Bot.run({
      command: "/delete_post",
      run_after: delay,
      options: {
        chat_id: target,
        message_id: new_message_id
      }
    });
  }
}

// Increment for next time
Bot.setProperty("current_message_id", message_id + 1, "integer");

let interval = Bot.getProperty("interval") || 60; // 60s default
Bot.run({
  command: "/forwardNext",
  run_after: interval
});
