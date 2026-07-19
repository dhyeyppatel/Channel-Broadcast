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

// Triggered by inline button (request.data set) OR reply keyboard text "Add Rule"
// OR first run with no message — all should show the channel picker
let isFirstRun = (message === "Add Rule") || (!message && !request.chat_shared && !request.forward_from_chat);

if (isFirstRun) {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "Select your Source Channel:",
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
  return;
}

// Handle response from the Telegram Chat Picker
if (request.chat_shared) {
  let channel_id = request.chat_shared.chat_id;
  User.setProperty("temp_rule_source", parseInt(channel_id), "integer");
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "Source saved: " + channel_id,
    reply_markup: JSON.stringify({ remove_keyboard: true })
  });
  Bot.runCommand("/add_rule_2");
  return;
}

// Fallback: user forwarded a message from the channel
if (request.forward_from_chat) {
  User.setProperty("temp_rule_source", parseInt(request.forward_from_chat.id), "integer");
  User.setProperty("temp_rule_start", parseInt(request.forward_from_message_id), "integer");
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "Source and Start ID captured from forward: " + request.forward_from_chat.id,
    reply_markup: JSON.stringify({ remove_keyboard: true })
  });
  Bot.runCommand("/add_rule_2");
  return;
}

// If we get here, resend the picker
Api.sendMessage({
  chat_id: user.telegramid,
  text: "Please tap the button below to choose a channel:",
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
