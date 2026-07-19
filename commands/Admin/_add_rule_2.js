/*CMD
  command: /add_rule_2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin

  <<ANSWER
⏳ *Step 2: Target Channel*
Please forward a message from your **Target Channel**, or paste its ID (e.g. -100...):
  ANSWER
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

function nextStep() {
  let temp_start = User.getProperty("temp_rule_start");
  if (temp_start) {
     Bot.runCommand("/save_rule");
  } else {
     Bot.runCommand("/add_rule_3");
  }
}

if (request.forward_from_chat) {
  User.setProperty("temp_rule_target", parseInt(request.forward_from_chat.id), "integer");
  Bot.sendMessage("✅ Target Channel saved!");
  nextStep();
  return;
}

let num = parseInt(message);
if (!isNaN(num) && message && message.startsWith("-100")) {
  User.setProperty("temp_rule_target", num, "integer");
  Bot.sendMessage("✅ Target Channel saved!");
  nextStep();
  return;
}

Bot.sendMessage("❌ Invalid input. Please forward a message or paste a valid ID.");
Bot.runCommand("/admin_panel");
