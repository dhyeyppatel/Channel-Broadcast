/*CMD
  command: /add_rule_2
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

// Send the channel picker keyboard
Bot.sendMessage("Step 2: Select your Target Channel:");

Bot.makeRequest("sendMessage", {
  chat_id: user.telegramid,
  text: "Tap the button below to open the channel picker:",
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
