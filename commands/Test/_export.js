/*CMD
  command: /export
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Test

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// save settings in user state

let props = ["forward_loop", "current_message_id", "storage_channel", "target_channel", "interval"];

let result = {};

props.forEach(name => {
  result[name] = Bot.getProp(name);
});

Bot.sendMessage(
  "```json\n" + JSON.stringify(result, null, 2) + "\n```",
  { parse_mode: "Markdown" }
);

