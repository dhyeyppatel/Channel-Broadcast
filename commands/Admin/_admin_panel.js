/*CMD
  command: /admin_panel
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
if (user.telegramid !== admin_id) return;

let source = Bot.getProperty("source_channel") || "Not Set";
let target = Bot.getProperty("target_channel") || "Not Set";
let autoDel = Bot.getProperty("autodelete_enabled") ? "ON" : "OFF";
let autoDelTime = Bot.getProperty("autodelete_delay") || "Not Set";
let isRunning = Bot.getProperty("is_running") ? "🟢 RUNNING" : "🔴 STOPPED";
let startId = Bot.getProperty("current_message_id") || "Not Set";

let msg = `🎛 **Admin Panel**\n\n` +
  `**Status:** ${isRunning}\n` +
  `**Source Channel:** ${source}\n` +
  `**Target Channel:** ${target}\n` +
  `**Start Message ID:** ${startId}\n` +
  `**Auto-Delete:** ${autoDel}\n` +
  `**Auto-Delete Time:** ${autoDelTime}s\n\n` +
  `Use the buttons below to configure the bot.`;

let buttons = [
  [{ title: "📥 Source", command: "/set_source" }, { title: "📤 Target", command: "/set_target" }],
  [{ title: "🔢 Set Start Message ID", command: "/set_start_id" }],
  [{ title: "🗑️ Toggle Auto-Delete", command: "/toggle_autodelete" }, { title: "⏱️ Set Time", command: "/set_time" }],
  [{ title: "▶️ Run", command: "/run" }, { title: "⏸️ Pause", command: "/pause" }, { title: "⏹️ Stop", command: "/stop" }],
  [{ title: "❓ Help", command: "/help" }]
];

Bot.sendInlineKeyboard(buttons, msg);
