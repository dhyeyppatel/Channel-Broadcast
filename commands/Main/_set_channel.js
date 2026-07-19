/*CMD
  command: /set_channel
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

let p = params;
if(!p) return;

let args = p.split(" ");
if(args.length < 3) return;

let type = args[0];
let channel_id = args[1];
let message_id = args[2];

if (type === "storage") {
  User.setProperty("storage_channel", parseInt(channel_id), "integer");
  User.setProperty("current_message_id", parseInt(message_id), "integer");
  
  Bot.sendMessage("✅ Storage Channel set to `" + channel_id + "`\nStarting Message ID set to `" + message_id + "`");
} else if (type === "target") {
  User.setProperty("target_channel", parseInt(channel_id), "integer");
  
  Bot.sendMessage("✅ Target Channel set to `" + channel_id + "`");
} else {
  return;
}

// Send current status
let s = User.getProperty("storage_channel") || "Not Set";
let t = User.getProperty("target_channel") || "Not Set";
let id = User.getProperty("current_message_id") || "Not Set";
let int = User.getProperty("interval") || "Not Set";

Bot.sendMessage("📊 **Current Setup:**\nStorage: " + s + "\nTarget: " + t + "\nMessage ID: " + id + "\nInterval: " + int + "s\n\nRun /start to begin broadcasting!");
