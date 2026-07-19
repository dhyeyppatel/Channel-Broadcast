/*CMD
  command: /autodelete
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
if (!p) {
  let status = User.getProperty("autodelete_enabled") ? "ON" : "OFF";
  let delay = User.getProperty("autodelete_delay") || "Not set";
  Bot.sendMessage("Current Auto-Delete Status: `" + status + "`\nDelay: `" + delay + "s`\n\nTo change, use:\n`/autodelete on <seconds>`\n`/autodelete off`");
  return;
}

let args = p.split(" ");
let action = args[0].toLowerCase();

if (action === "off") {
  User.setProperty("autodelete_enabled", false, "boolean");
  Bot.sendMessage("❌ Global Auto-Delete is now OFF.");
} else if (action === "on") {
  if (args.length < 2) {
    Bot.sendMessage("Please provide a delay in seconds. Example:\n`/autodelete on 3600`");
    return;
  }
  let delay = parseInt(args[1]);
  if (isNaN(delay) || delay <= 0) {
    Bot.sendMessage("Invalid delay. Must be a positive number of seconds.");
    return;
  }
  
  User.setProperty("autodelete_enabled", true, "boolean");
  User.setProperty("autodelete_delay", delay, "integer");
  Bot.sendMessage("✅ Global Auto-Delete is now ON.\nForwarded messages will be deleted after " + delay + " seconds.");
} else {
  Bot.sendMessage("Invalid command. Use `/autodelete on <seconds>` or `/autodelete off`.");
}
