/*CMD
  command: /save_target
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
  User.setProperty("temp_rule_target", parseInt(channel_id), "integer");
  Bot.sendMessage("Target saved: " + channel_id);

  let temp_start = User.getProperty("temp_rule_start");
  if (temp_start) {
    Bot.runCommand("/save_rule");
  } else {
    Bot.runCommand("/add_rule_3");
  }
  return;
}

// Fallback: user forwarded a message from the target channel
if (request.forward_from_chat) {
  User.setProperty("temp_rule_target", parseInt(request.forward_from_chat.id), "integer");
  Bot.sendMessage("Target captured from forward: " + request.forward_from_chat.id);

  let temp_start = User.getProperty("temp_rule_start");
  if (temp_start) {
    Bot.runCommand("/save_rule");
  } else {
    Bot.runCommand("/add_rule_3");
  }
  return;
}

Bot.sendMessage("No channel detected. Please tap the button or forward a message from your target channel.");
