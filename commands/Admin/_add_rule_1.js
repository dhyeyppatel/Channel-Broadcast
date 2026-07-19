/*CMD
  command: /add_rule_1
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin
  aliases: Add Rule
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

// Send the channel picker keyboard
Bot.sendMessage("Step 1: Select your Source Channel:");

Bot.makeRequest("sendMessage", {
  chat_id: user.telegramid,
  text: "Tap the button below to open the channel picker:",
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
