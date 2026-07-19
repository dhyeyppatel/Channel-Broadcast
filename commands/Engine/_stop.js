/*CMD
  command: /stop
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Engine
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

Bot.setProperty("is_running", false, "boolean");
Bot.setProperty("current_rule_index", 0, "integer"); 
Bot.sendMessage("⏹️ Engine stopped.");
Bot.runCommand("/admin_panel");
