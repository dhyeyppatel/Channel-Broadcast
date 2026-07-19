/*CMD
  command: /add_rule_1
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

if (request.data) {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "Select your channel:",
    reply_markup: {
      keyboard: [[{
        text: "📢 Choose Channel",
        request_chat: {
          request_id: 1,
          chat_is_channel: true
        }
      }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
  return;
}

if (message === "📢 Choose Channel") {
  Bot.sendMessage("Your Telegram app does not support the Chat Picker. Please update your Telegram app, use the official mobile app, or simply forward a message from your Source Channel to me right now as a fallback.");
  return;
}

let shared = request.chat_shared;
if (!shared && request.message && request.message.chat_shared) {
  shared = request.message.chat_shared;
}

if (shared) {
  let channel_id = shared.chat_id;
  User.setProperty("temp_rule_source", parseInt(channel_id), "integer");
  
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "✅ Source saved.\nID: `" + channel_id + "`",
    parse_mode: "Markdown",
    reply_markup: { remove_keyboard: true }
  });
  
  Bot.runCommand("/add_rule_2");
  return;
}

if (request.forward_from_chat) {
  User.setProperty("temp_rule_source", parseInt(request.forward_from_chat.id), "integer");
  User.setProperty("temp_rule_start", parseInt(request.forward_from_message_id), "integer");
  Bot.sendMessage("✅ Source and Start ID captured from forward.");
  Bot.runCommand("/add_rule_2");
  return;
}

Bot.sendMessage("❌ Please use the button to select a channel, or forward a message from the channel.");
