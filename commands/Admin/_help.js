/*CMD
  command: /help
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin
  aliases: Help

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let guide = `📖 **User Guide**\n\n` +
  `**Configuration:**\n` +
  `1. Click **Add Source Channel**. Forward a message from your source channel to this bot. The bot will save the Channel ID and the Starting Message ID.\n` +
  `2. Click **Add Target Channel**. Forward a message from your target channel or paste its ID.\n` +
  `3. Configure Auto-Delete if you want copied messages to be automatically removed after a set time.\n\n` +
  `**Operation:**\n` +
  `- **Run**: Starts the forwarding loop.\n` +
  `- **Pause**: Halts the loop. The bot remembers where it left off.\n` +
  `- **Stop**: Halts the loop and resets the starting message ID back to the beginning.\n\n` +
  `Only you (the registered Admin) can control this bot.`;

Bot.sendMessage(guide);
