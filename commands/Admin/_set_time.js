/*CMD
  command: /set_time
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  aliases: Set Time

  <<ANSWER
⏳ *Awaiting Response...*
Please send the auto-delete delay in seconds (e.g. 3600 for 1 hour):
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let num = parseInt(message);
if (!isNaN(num) && num > 0) {
  Bot.setProperty("autodelete_delay", num, "integer");
  Bot.sendMessage("✅ Auto-Delete time set to " + num + " seconds.");
  Bot.runCommand("/admin_panel");
  return;
}

Bot.sendMessage("❌ Invalid input. Please send a positive number.");
