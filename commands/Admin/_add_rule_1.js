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
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Awaiting your response...",
    show_alert: false
  });
  
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "⏳ *Step 1: Source Channel*\nPlease select the Source Channel using the button below:",
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: [[{
        text: "📢 Select Source Channel",
        request_chat: { request_id: 1, chat_is_channel: true }
      }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
  return;
}

let shared = request.chat_shared;
if (!shared && request.message && request.message.chat_shared) {
  shared = request.message.chat_shared;
}

if (shared) {
  User.setProperty("temp_rule_source", parseInt(shared.chat_id), "integer");
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "✅ Source saved.",
    reply_markup: { remove_keyboard: true }
  });
  Bot.runCommand("/add_rule_2");
  return;
}

let num = parseInt(message);
if (!isNaN(num) && message && message.startsWith("-100")) {
  User.setProperty("temp_rule_source", num, "integer");
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "✅ Source saved.",
    reply_markup: { remove_keyboard: true }
  });
  Bot.runCommand("/add_rule_2");
  return;
}

if (request.forward_from_chat) {
  User.setProperty("temp_rule_source", parseInt(request.forward_from_chat.id), "integer");
  User.setProperty("temp_rule_start", parseInt(request.forward_from_message_id), "integer");
  
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "✅ Source and Start ID captured from forward.",
    reply_markup: { remove_keyboard: true }
  });
  Bot.runCommand("/add_rule_2");
  return;
}

Api.sendMessage({
  chat_id: user.telegramid,
  text: "❌ Invalid input. Try again.",
  reply_markup: { remove_keyboard: true }
});
Bot.runCommand("/admin_panel");
