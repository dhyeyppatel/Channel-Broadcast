/*CMD
  command: /add_rule_2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin

  <<ANSWER
Step 2 of 3: Target Channel
Forward any message from your Target Channel to me now.
  ANSWER
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

if (request.forward_from_chat) {
  let channel_id = request.forward_from_chat.id;
  User.setProperty("temp_target", parseInt(channel_id), "integer");
  Bot.sendMessage("Target saved!\nChannel ID: " + channel_id);
  Bot.runCommand("/add_rule_3");
  return;
}

Bot.sendMessage("Please forward a message from your Target Channel. Try again.");
