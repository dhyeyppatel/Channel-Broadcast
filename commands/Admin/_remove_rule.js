/*CMD
  command: /remove_rule
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  aliases: Remove Rule

  <<ANSWER
⏳ *Awaiting Response...*
Please reply with the Rule Number (e.g. 1, 2) that you want to remove, or type 0 to cancel:
  ANSWER
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let num = parseInt(message);
if (isNaN(num)) {
  Bot.sendMessage("❌ Invalid input. Try again.");
  Bot.runCommand("/admin_panel");
  return;
}

if (num === 0) {
  Bot.sendMessage("✅ Cancelled.");
  Bot.runCommand("/admin_panel");
  return;
}

let rules = Bot.getProperty("rules") || [];
if (num > 0 && num <= rules.length) {
  let removed = rules.splice(num - 1, 1);
  Bot.setProperty("rules", rules, "json");
  Bot.sendMessage("🗑️ Rule " + num + " (Source: " + removed[0].source + ") removed.");
} else {
  Bot.sendMessage("❌ Rule number not found.");
}

Bot.runCommand("/admin_panel");
