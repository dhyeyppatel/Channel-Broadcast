/*CMD
  command: /set_start_id
  help: 
  need_reply: true
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

if (request.data) {
  Bot.sendMessage("Please send the Starting Message ID (e.g. 150):");
  return;
}

let num = parseInt(message);
if (!isNaN(num) && num > 0) {
  Bot.setProperty("current_message_id", num, "integer");
  Bot.sendMessage("✅ Start Message ID set to `" + num + "`.");
  Bot.runCommand("/admin_panel");
  return;
}

Bot.sendMessage("❌ Invalid input. Please send a valid positive number.");
