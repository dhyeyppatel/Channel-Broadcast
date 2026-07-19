/*CMD
  command: /on_forward_result
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
let currentIndex = Bot.getProperty("awaiting_rule_index");

if (currentIndex !== null && currentIndex !== undefined && rules[currentIndex]) {
  let rule = rules[currentIndex];
  
  rule.start_id = parseInt(rule.start_id) + 1;
  rules[currentIndex] = rule;
  Bot.setProperty("rules", rules, "json");
  
  if (options && options.ok && Bot.getProperty("autodelete_enabled")) {
    let delay = Bot.getProperty("autodelete_delay") || 3600; 
    let new_message_id = options.result.message_id;
    
    if (new_message_id) {
      Bot.run({
        command: "/delete_post",
        run_after: delay,
        options: {
          chat_id: rule.target,
          message_id: new_message_id
        }
      });
    }
  }
}

let nextIndex = (currentIndex + 1) >= rules.length ? 0 : (currentIndex + 1);
Bot.setProperty("current_rule_index", nextIndex, "integer");

let interval = Bot.getProperty("interval") || 60;
Bot.run({
  command: "/forwardNext",
  run_after: interval
});
