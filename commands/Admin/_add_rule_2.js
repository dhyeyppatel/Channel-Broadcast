/*CMD
  command: /add_rule_2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

if (!message && !request.chat_shared && !request.forward_from_chat) {
  Bot.sendMessage("*(Wait) Attempting to open Chat Picker...*\nIf a keyboard does not appear below, simply forward a message from your Target Channel instead.");

  Api.sendMessage({
    chat_id: user.telegramid,
    text: "👇 Select your Target Channel below:",
    reply_markup: JSON.stringify({
      keyboard: [[{
        text: "📢 Choose Channel",
        request_chat: {
          request_id: 2,
          chat_is_channel: true
        }
      }]],
      resize_keyboard: true,
      one_time_keyboard: true
    })
  });
  return;
}

if (message === "📢 Choose Channel") {
  Bot.sendMessage("Your Telegram app does not support the Chat Picker. Please update your Telegram app, use the official mobile app, or simply forward a message from your Target Channel to me right now as a fallback.");
  return;
}

let shared = request.chat_shared;
if (!shared && request.message && request.message.chat_shared) {
  shared = request.message.chat_shared;
}

if (shared) {
  let channel_id = shared.chat_id;
  User.setProperty("temp_rule_target", parseInt(channel_id), "integer");
  
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "✅ Target saved.\nID: `" + channel_id + "`",
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({ remove_keyboard: true })
  });
  
  let temp_start = User.getProperty("temp_rule_start");
  if (temp_start) {
     Bot.runCommand("/save_rule");
  } else {
     Bot.runCommand("/add_rule_3");
  }
  return;
}

if (request.forward_from_chat) {
  User.setProperty("temp_rule_target", parseInt(request.forward_from_chat.id), "integer");
  
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "✅ Target saved.",
    reply_markup: JSON.stringify({ remove_keyboard: true })
  });
  
  let temp_start = User.getProperty("temp_rule_start");
  if (temp_start) {
     Bot.runCommand("/save_rule");
  } else {
     Bot.runCommand("/add_rule_3");
  }
  return;
}

Bot.sendMessage("❌ Please use the button to select a channel, or forward a message from the channel.");
