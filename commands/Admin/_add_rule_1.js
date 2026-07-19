/*CMD
  command: /add_rule_1
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin
  aliases: Add Rule

  <<ANSWER
Step 1 of 3: Source Channel
Forward any message from your Source Channel to me now.
I will automatically detect the Channel ID and Starting Message ID.
  ANSWER
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

if (request.forward_from_chat) {
  let channel_id = request.forward_from_chat.id;
  let msg_id = request.forward_from_message_id;

  User.setProperty("temp_source", parseInt(channel_id), "integer");
  User.setProperty("temp_start", parseInt(msg_id), "integer");

  Bot.sendMessage("Source saved!\nChannel ID: " + channel_id + "\nStart Message ID: " + msg_id);
  Bot.runCommand("/add_rule_2");
  return;
}

Bot.sendMessage("Please forward a message from your Source Channel. Try again.");
