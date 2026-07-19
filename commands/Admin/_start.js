/*CMD
  command: /start
  help: 
  need_reply: false
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

// If no admin is set, the first person to use /start becomes the admin
if (!admin_id) {
  Bot.setProperty("admin_id", user.telegramid, "integer");
  Bot.sendMessage("👑 You have been registered as the Bot Admin!");
} else if (user.telegramid !== admin_id) {
  return; // Ignore unauthorized users
}

Bot.runCommand("/admin_panel");
