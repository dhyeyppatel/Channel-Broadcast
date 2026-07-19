/*CMD
  command: /add_rule_2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

// Show picker when no input yet received
if (!message && !request.chat_shared && !request.forward_from_chat) {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "Select your Target Channel:",
    reply_markup: JSON.stringify({
      keyboard: [[{
        text: "Choose Channel",
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

// Handle response from the Telegram Chat Picker
if (request.chat_shared) {
  let channel_id = request.chat_shared.chat_id;
  User.setProperty("temp_rule_target", parseInt(channel_id), "integer");
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "Target saved: " + channel_id,
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

// Fallback: user forwarded a message from the target channel
if (request.forward_from_chat) {
  User.setProperty("temp_rule_target", parseInt(request.forward_from_chat.id), "integer");
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "Target saved from forward: " + request.forward_from_chat.id,
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

// Resend picker if we get unexpected input
Api.sendMessage({
  chat_id: user.telegramid,
  text: "Please tap the button below to choose a channel:",
  reply_markup: JSON.stringify({
    keyboard: [[{
      text: "Choose Channel",
      request_chat: {
        request_id: 2,
        chat_is_channel: true
      }
    }]],
    resize_keyboard: true,
    one_time_keyboard: true
  })
});
