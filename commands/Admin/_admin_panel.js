/*CMD
  command: /admin_panel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin
  aliases: panel
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let autoDel = Bot.getProperty("autodelete_enabled") ? "ON" : "OFF";
let autoDelTime = Bot.getProperty("autodelete_delay") || "Not Set";
let isRunning = Bot.getProperty("is_running") ? "RUNNING" : "STOPPED";

let rules = Bot.getProperty("rules") || [];
let rulesText = "";

if (rules.length === 0) {
  rulesText = "No active rules.\n";
} else {
  for (let i = 0; i < rules.length; i++) {
    let r = rules[i];
    rulesText += "Rule " + (i+1) + ":\n" +
                 "  Source: " + r.source + "\n" +
                 "  Target: " + r.target + "\n" +
                 "  Next ID: " + r.start_id + "\n\n";
  }
}

let msg = "Admin Panel\n\n" +
  "Engine Status: " + isRunning + "\n" +
  "Auto-Delete: " + autoDel + " (" + autoDelTime + "s)\n\n" +
  "Forwarding Rules:\n" + rulesText +
  "Use the buttons below to configure the bot.";

// Use Reply Keyboard (sendKeyboard) - no emojis to avoid encoding issues
let keyboard = "Add Rule, Remove Rule\nToggle Auto-Delete, Set Time\nRun All, Stop All\nHelp";
Bot.sendKeyboard(keyboard, msg);
