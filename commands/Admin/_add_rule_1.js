/*CMD
  command: /add_rule_1
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin

  <<ANSWER
⏳ *Step 1: Source Channel*
Please forward any message from your **Source Channel** to me now. 
*(I will automatically detect the Channel ID and Starting Message ID!)*
  ANSWER
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

if (request.forward_from_chat) {
  let channel_id = request.forward_from_chat.id;
  let message_id = request.forward_from_message_id;
  
  if (channel_id && message_id) {
    User.setProperty("temp_rule_source", parseInt(channel_id), "integer");
    User.setProperty("temp_rule_start", parseInt(message_id), "integer");
    
    Bot.sendMessage("✅ Source Channel ID (`" + channel_id + "`) and Starting Message ID (`" + message_id + "`) captured successfully!");
    Bot.runCommand("/add_rule_2");
    return;
  }
}

let num = parseInt(message);
if (!isNaN(num) && message && message.startsWith("-100")) {
  User.setProperty("temp_rule_source", num, "integer");
  Bot.sendMessage("✅ Source Channel saved. Note: Starting Message ID is not known, you must set it manually later.");
  Bot.runCommand("/add_rule_2");
  return;
}

Bot.sendMessage("❌ Invalid input. Please forward a message from your channel.");
Bot.runCommand("/admin_panel");
