/*CMD
  command: /help
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin
  aliases: Help
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let guide = "User Guide\n\n" +
  "Configuration:\n" +
  "1. Tap 'Add Rule'. The bot sends a channel picker button.\n" +
  "   - Tap the button to open Telegram's Choose a Channel screen.\n" +
  "   - Select your Source Channel, then your Target Channel.\n" +
  "   - Enter the Starting Message ID.\n" +
  "   - The rule is saved!\n\n" +
  "2. Add as many rules as you need (Rule 1, Rule 2, etc.)\n\n" +
  "3. Tap 'Toggle Auto-Delete' to enable auto-removal of forwarded messages.\n" +
  "4. Tap 'Set Time' to set how many seconds before deletion.\n\n" +
  "Operation:\n" +
  "- Run All: Starts all forwarding rules.\n" +
  "- Stop All: Halts and resets the engine.\n\n" +
  "Only you (the registered Admin) can control this bot.";

Bot.sendMessage(guide);
