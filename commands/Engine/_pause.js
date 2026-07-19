/*CMD
  command: /pause
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Engine
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

Bot.setProperty("is_running", false, "boolean");
Bot.sendMessage("⏸️ Engine paused. Will resume from current rules states when you /run again.");
Bot.runCommand("/admin_panel");
