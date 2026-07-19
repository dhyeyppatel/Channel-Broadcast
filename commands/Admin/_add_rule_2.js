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
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "⏳ *Step 2: Target Channel*\nPlease select the Target Channel:",
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: [[{
        text: "📢 Select Target Channel",
        request_chat: { request_id: 2, chat_is_channel: true }
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

function nextStep() {
  let temp_start = User.getProperty("temp_rule_start");
  if (temp_start) {
     Bot.runCommand("/save_rule");
  } else {
     Bot.runCommand("/add_rule_3");
  }
}

if (shared) {
  User.setProperty("temp_rule_target", parseInt(shared.chat_id), "integer");
  Api.sendMessage({ chat_id: user.telegramid, text: "✅ Target saved.", reply_markup: { remove_keyboard: true } });
  nextStep();
  return;
}

let num = parseInt(message);
if (!isNaN(num) && message && message.startsWith("-100")) {
  User.setProperty("temp_rule_target", num, "integer");
  Api.sendMessage({ chat_id: user.telegramid, text: "✅ Target saved.", reply_markup: { remove_keyboard: true } });
  nextStep();
  return;
}

if (request.forward_from_chat) {
  User.setProperty("temp_rule_target", parseInt(request.forward_from_chat.id), "integer");
  Api.sendMessage({ chat_id: user.telegramid, text: "✅ Target saved.", reply_markup: { remove_keyboard: true } });
  nextStep();
  return;
}

Api.sendMessage({ chat_id: user.telegramid, text: "❌ Invalid input. Try again.", reply_markup: { remove_keyboard: true } });
Bot.runCommand("/admin_panel");
