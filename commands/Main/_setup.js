/*CMD
  command: /setup
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Main

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let p = params; // params contains text after the command
if(!p) {
  Bot.sendMessage("Usage: `/setup <storage_channel_id> <target_channel_id> <start_message_id> <interval_in_seconds>`");
  return;
}

let args = p.split(" ");
if(args.length < 4) {
  Bot.sendMessage("Please provide all 4 parameters: storage_channel, target_channel, start_message_id, interval");
  return;
}

User.setProperty("storage_channel", parseInt(args[0]), "integer");
User.setProperty("target_channel", parseInt(args[1]), "integer");
User.setProperty("current_message_id", parseInt(args[2]), "integer");
User.setProperty("interval", parseInt(args[3]), "integer");

Bot.sendMessage("✅ Setup complete!\nStorage Channel: " + args[0] + "\nTarget Channel: " + args[1] + "\nStart Message ID: " + args[2] + "\nInterval: " + args[3] + "s\n\nRun /start to begin broadcasting.");
