/*CMD
  command: /forwardNext
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Engine
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (user.telegramid !== admin_id) return; 

let is_running = Bot.getProperty("is_running");
if (!is_running) return;

let rules = Bot.getProperty("rules") || [];
if (rules.length === 0) {
  Bot.setProperty("is_running", false, "boolean");
  Bot.sendMessage("⚠️ Engine stopped: No rules available.");
  return;
}

let currentIndex = Bot.getProperty("current_rule_index") || 0;
if (currentIndex >= rules.length) {
  currentIndex = 0; // Wrap around
}

let rule = rules[currentIndex];

Bot.setProperty("awaiting_rule_index", currentIndex, "integer");

Api.copyMessage({
  chat_id: rule.target,
  from_chat_id: rule.source,
  message_id: rule.start_id,
  on_result: "/on_forward_result",
  on_error: "/on_forward_result"
});
