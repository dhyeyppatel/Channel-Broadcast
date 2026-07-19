/*CMD
  command: /save_rule
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let source = User.getProperty("temp_rule_source");
let target = User.getProperty("temp_rule_target");
let start = User.getProperty("temp_rule_start");

if (source && target && start) {
  let rules = Bot.getProperty("rules") || [];
  rules.push({
    source: source,
    target: target,
    start_id: start
  });
  Bot.setProperty("rules", rules, "json");
  Bot.sendMessage("🎉 Rule added successfully!");
  
  User.setProperty("temp_rule_source", null);
  User.setProperty("temp_rule_target", null);
  User.setProperty("temp_rule_start", null);
} else {
  Bot.sendMessage("⚠️ Failed to save rule. Missing data.");
}

Bot.runCommand("/admin_panel");
