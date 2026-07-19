/*CMD
  command: /add_rule_3
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin

  <<ANSWER
Step 3 of 3: Start Message ID
What Message ID should forwarding start from?
(Tip: The ID was already captured from the forward in Step 1 - type 0 to use it, or enter a custom ID)
  ANSWER
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let source = User.getProperty("temp_source");
let target = User.getProperty("temp_target");
let capturedStart = User.getProperty("temp_start") || 1;

let inputId = parseInt(message);
let startId = (inputId === 0) ? capturedStart : inputId;

if (!isNaN(startId) && startId > 0) {
  let rules = Bot.getProperty("rules") || [];
  rules.push({ source: source, target: target, start_id: startId });
  Bot.setProperty("rules", rules, "json");

  User.setProperty("temp_source", null, "integer");
  User.setProperty("temp_target", null, "integer");
  User.setProperty("temp_start", null, "integer");

  Bot.sendMessage("Rule saved!\nSource: " + source + "\nTarget: " + target + "\nStart ID: " + startId);
  Bot.runCommand("/admin_panel");
  return;
}

Bot.sendMessage("Invalid ID. Please send a positive number, or 0 to use the auto-detected ID (" + capturedStart + ").");
