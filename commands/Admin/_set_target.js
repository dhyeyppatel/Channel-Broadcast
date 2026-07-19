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

let shared = request.chat_shared;
if (!shared && request.message && request.message.chat_shared) {
  shared = request.message.chat_shared;
}

if (shared) {
  let channel_id = shared.chat_id;
  Bot.setProperty("target_channel", parseInt(channel_id), "integer");
  
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "✅ Target Channel saved!\nID: `" + channel_id + "`",
    reply_markup: { remove_keyboard: true }
  });
  Bot.runCommand("/admin_panel");
  return;
}

if (request.forward_from_chat) {
  let channel_id = request.forward_from_chat.id;
  Bot.setProperty("target_channel", parseInt(channel_id), "integer");
  
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "✅ Target Channel saved!\nID: `" + channel_id + "`",
    reply_markup: { remove_keyboard: true }
  });
  Bot.runCommand("/admin_panel");
  return;
}

if (!message || message === "/set_target") {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "⏳ *Awaiting Response...*\nPlease use the button below to select your Target Channel:",
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: [[{
        text: "📢 Select Target Channel",
        request_chat: {
          request_id: 2,
          chat_is_channel: true
        }
      }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
  return;
}

let num = parseInt(message);
if (!isNaN(num) && message && message.startsWith("-100")) {
  Bot.setProperty("target_channel", num, "integer");
  
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "✅ Target Channel saved!\nID: `" + num + "`",
    reply_markup: { remove_keyboard: true }
  });
  Bot.runCommand("/admin_panel");
  return;
}

Api.sendMessage({
  chat_id: user.telegramid,
  text: "❌ Invalid input. Please select a channel using the button, or forward a message.",
  reply_markup: { remove_keyboard: true }
});
