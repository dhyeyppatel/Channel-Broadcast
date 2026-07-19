/*CMD
  command: /set_target
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
  Bot.sendMessage("Please forward a message from your Target Channel, or paste its ID (e.g. -100...):");
  return;
}

if (request.forward_from_chat) {
  Bot.setProperty("target_channel", parseInt(request.forward_from_chat.id), "integer");
  Bot.sendMessage("✅ Target Channel saved!\nID: `" + request.forward_from_chat.id + "`");
  Bot.runCommand("/admin_panel");
  return;
}

let num = parseInt(message);
if (!isNaN(num) && message.startsWith("-100")) {
  Bot.setProperty("target_channel", num, "integer");
  Bot.sendMessage("✅ Target Channel saved!\nID: `" + num + "`");
  Bot.runCommand("/admin_panel");
  return;
}

Bot.sendMessage("❌ Invalid input. Please send a valid channel ID.");
