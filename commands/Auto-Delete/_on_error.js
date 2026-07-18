/*CMD
  command: /on_error
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Auto-Delete

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Bot.setProp(`log_${options.chat_id}_${options.message_id}`, {
  error_at: new Date().toISOString(),
  status: "failed",
  error: options.error
}, 'json');

