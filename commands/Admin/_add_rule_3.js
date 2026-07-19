/*CMD
  command: /add_rule_3
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin

  <<ANSWER
⏳ *Step 3: Start Message ID*
Please send the Starting Message ID for the Source Channel (e.g. 150):
  ANSWER
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let num = parseInt(message);
if (!isNaN(num) && num > 0) {
  User.setProperty("temp_rule_start", num, "integer");
  Bot.sendMessage("✅ Start ID saved.");
  Bot.runCommand("/save_rule");
  return;
}

Bot.sendMessage("❌ Invalid ID. Try again.");
Bot.runCommand("/admin_panel");
