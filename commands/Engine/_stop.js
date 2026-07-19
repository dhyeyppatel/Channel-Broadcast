/*CMD
  command: /stop
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

Bot.setProperty("is_running", false, "boolean");
Bot.setProperty("current_message_id", null); // Reset
Bot.sendMessage("⏹️ Forwarding stopped and Starting Message ID has been cleared.");
Bot.runCommand("/admin_panel");
