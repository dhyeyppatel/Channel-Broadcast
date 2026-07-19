/*CMD
  command: /toggle_autodelete
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let currentState = Bot.getProperty("autodelete_enabled");
Bot.setProperty("autodelete_enabled", !currentState, "boolean");

Bot.runCommand("/admin_panel");
