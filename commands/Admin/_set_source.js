/*CMD
  command: /set_source
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
  Bot.sendMessage("Please forward a message from your Source Channel to me now:");
  return;
}

if (request.forward_from_chat) {
  let channel_id = request.forward_from_chat.id;
  let message_id = request.forward_from_message_id;
  
  if (channel_id && message_id) {
    Bot.setProperty("source_channel", parseInt(channel_id), "integer");
    Bot.setProperty("current_message_id", parseInt(message_id), "integer");
    Bot.sendMessage("✅ Source Channel saved!\nID: `" + channel_id + "`\nStarting Msg ID: `" + message_id + "`");
    Bot.runCommand("/admin_panel");
    return;
  }
}

let num = parseInt(message);
if (!isNaN(num) && message.startsWith("-100")) {
  Bot.setProperty("source_channel", num, "integer");
  Bot.sendMessage("✅ Source Channel saved!\nID: `" + num + "`\n⚠️ Note: Starting message ID was not captured. Update it manually if needed.");
  Bot.runCommand("/admin_panel");
  return;
}

Bot.sendMessage("❌ Invalid input. Please forward a message from your channel.");
