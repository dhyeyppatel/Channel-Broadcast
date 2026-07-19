/*CMD
  command: /run
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Engine

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let source = Bot.getProperty("source_channel");
let target = Bot.getProperty("target_channel");
let start_id = Bot.getProperty("current_message_id");

if (!source || !target || !start_id) {
  Bot.sendMessage("⚠️ Cannot run. Source Channel, Target Channel, or Starting Message ID is missing.");
  return;
}

if (Bot.getProperty("is_running")) {
  Bot.sendMessage("⚠️ Bot is already running!");
  return;
}

Bot.setProperty("is_running", true, "boolean");
Bot.sendMessage("▶️ Forwarding loop started!");

// Initial delay of 2 seconds to kick off
Bot.run({
  command: "/forwardNext",
  run_after: 2
});

Bot.runCommand("/admin_panel");
