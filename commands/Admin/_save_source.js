/*CMD
  command: /save_source
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

// Handle response from the Telegram Chat Picker
if (request.chat_shared) {
  let channel_id = request.chat_shared.chat_id;
  User.setProperty("temp_rule_source", parseInt(channel_id), "integer");
  Bot.sendMessage("Source saved: " + channel_id);
  Bot.runCommand("/add_rule_2");
  return;
}

// Fallback: user forwarded a message from the channel
if (request.forward_from_chat) {
  User.setProperty("temp_rule_source", parseInt(request.forward_from_chat.id), "integer");
  User.setProperty("temp_rule_start", parseInt(request.forward_from_message_id), "integer");
  Bot.sendMessage("Source captured from forward: " + request.forward_from_chat.id);
  Bot.runCommand("/add_rule_2");
  return;
}

Bot.sendMessage("No channel detected. Please tap the button or forward a message from your source channel.");
