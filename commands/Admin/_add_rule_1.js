/*CMD
  command: /add_rule_1
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  aliases: Add Rule
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

// Handle response from the Telegram Chat Picker
if (request.chat_shared) {
  let channel_id = request.chat_shared.chat_id;
  User.setProperty("temp_rule_source", parseInt(channel_id), "integer");
  Bot.sendMessage("✅ Source saved: " + channel_id);
  Bot.runCommand("/add_rule_2");
  return;
}

// Fallback: user forwarded a message from the channel
if (request.forward_from_chat) {
  User.setProperty("temp_rule_source", parseInt(request.forward_from_chat.id), "integer");
  User.setProperty("temp_rule_start", parseInt(request.forward_from_message_id), "integer");
  Bot.sendMessage("✅ Source and Start ID captured: " + request.forward_from_chat.id);
  Bot.runCommand("/add_rule_2");
  return;
}

// Show the channel picker — use Bot.makeRequest to bypass the Api wrapper
Bot.sendMessage("Step 1: Select your Source Channel using the button below 👇");

Bot.makeRequest("sendMessage", {
  chat_id: user.telegramid,
  text: "Tap the button to choose your Source Channel:",
  reply_markup: JSON.stringify({
    keyboard: [[{
      text: "Choose Channel",
      request_chat: {
        request_id: 1,
        chat_is_channel: true
      }
    }]],
    resize_keyboard: true,
    one_time_keyboard: true
  })
});
