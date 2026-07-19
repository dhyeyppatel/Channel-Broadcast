/*CMD
  command: /admin_panel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return;

let autoDel = Bot.getProperty("autodelete_enabled") ? "ON" : "OFF";
let autoDelTime = Bot.getProperty("autodelete_delay") || "Not Set";
let isRunning = Bot.getProperty("is_running") ? "🟢 RUNNING" : "🔴 STOPPED";

let rules = Bot.getProperty("rules") || [];
let rulesText = "";

if (rules.length === 0) {
  rulesText = "No active rules.\n";
} else {
  for (let i = 0; i < rules.length; i++) {
    let r = rules[i];
    rulesText += `**Rule ${i+1}:**\n` +
                 `  Source: \`${r.source}\`\n` +
                 `  Target: \`${r.target}\`\n` +
                 `  Next ID: \`${r.start_id}\`\n\n`;
  }
}

let msg = `🎛 **Admin Panel**\n\n` +
  `**Engine Status:** ${isRunning}\n` +
  `**Auto-Delete:** ${autoDel} (${autoDelTime}s)\n\n` +
  `📜 **Forwarding Rules:**\n${rulesText}` +
  `Use the buttons below to configure the bot.`;

let buttons = [
  [{ title: "➕ Add Rule", command: "/add_rule_1" }, { title: "🗑️ Remove Rule", command: "/remove_rule" }],
  [{ title: "🗑️ Toggle Auto-Delete", command: "/toggle_autodelete" }, { title: "⏱️ Set Time", command: "/set_time" }],
  [{ title: "▶️ Run All", command: "/run" }, { title: "⏹️ Stop All", command: "/stop" }],
  [{ title: "❓ Help", command: "/help" }]
];

Bot.sendInlineKeyboard(buttons, msg);
