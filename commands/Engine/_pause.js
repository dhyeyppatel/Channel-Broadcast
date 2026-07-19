/*CMD
  command: /pause
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
Bot.sendMessage("⏸️ Forwarding paused. Will resume from current message ID when you /run again.");
Bot.runCommand("/admin_panel");
