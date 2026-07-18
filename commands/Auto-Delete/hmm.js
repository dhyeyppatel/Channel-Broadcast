/*CMD
  command: hmm
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Auto-Delete
  answer: .

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (typeof request === "string") {
  try { request = JSON.parse(request.replace(/\n/g, "\\\n")); } catch (e) { return; }
}

let { channel_post: message } = request;
if (!message) return;

let chat_id = message.chat.id;
let message_id = message.message_id;
let text = message.text || message.caption || "";

let delayMatch = text.match(/\/set_delay\s+(\d+)([smhd])/i);
if (!delayMatch) return;

let amount = parseInt(delayMatch[1]);
let unit = delayMatch[2].toLowerCase();
let delayMs;

switch (unit) {
  case 's': delayMs = amount * 1000; break
  case 'm': delayMs = amount * 1000 * 60; break
  case 'h': delayMs = amount * 1000 * 60 * 60; break
  case 'd': delayMs = amount * 1000 * 60 * 60 * 24; break
  default: return;
}

let delaySec = Math.floor(delayMs / 1000);

Bot.run({
  command: "/delete_post",
  run_after: delaySec,
  options: {
    chat_id: chat_id,
    message_id: message_id
  }
});

Bot.setProp(`log_${chat_id}_${message_id}`, {
  scheduled_at: new Date().toISOString(),
  delay: `${amount}${unit}`,
  message_id: message_id
}, 'json');

