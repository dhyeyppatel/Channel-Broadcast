/*CMD
  command: *
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

if (typeof request === "string") {
  try { request = JSON.parse(request.replace(/\n/g, "\\\n")); } catch (e) { return; }
}

// Removed manual channel post parsing

// Logic 2: Catch forwarded messages for setup
if (request.message && request.message.forward_from_chat) {
  if (request.message.chat.type !== "private") return;
  
  let channel_id = request.message.forward_from_chat.id;
  let message_id = request.message.forward_from_message_id;
  
  if(!message_id) return;
  
  let buttons = [
    [ 
      { title: "Storage Channel", command: "/set_channel storage " + channel_id + " " + message_id }, 
      { title: "Target Channel", command: "/set_channel target " + channel_id + " " + message_id } 
    ]
  ];
  Bot.sendInlineKeyboard(buttons, "Detected Channel: `" + channel_id + "`\nStarting Message ID: `" + message_id + "`\n\nSet this as:");
  return;
}
