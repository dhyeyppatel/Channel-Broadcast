/*CMD
  command: /run
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Engine
  aliases: ▶️ Run All
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let rules = Bot.getProperty("rules") || [];

if (rules.length === 0) {
  Bot.sendMessage("⚠️ Cannot run. No rules are configured.");
  return;
}

if (Bot.getProperty("is_running")) {
  Bot.sendMessage("⚠️ Engine is already running!");
  return;
}

Bot.setProperty("is_running", true, "boolean");
// Reset index to start from rule 1
Bot.setProperty("current_rule_index", 0, "integer");
Bot.sendMessage("▶️ Engine started! Processing rules sequentially.");

Bot.run({
  command: "/forwardNext",
  run_after: 2
});

Bot.runCommand("/admin_panel");
