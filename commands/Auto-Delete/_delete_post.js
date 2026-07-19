/*CMD
  command: /delete_post
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

Api.deleteMessage({
  chat_id: options.chat_id,
  message_id: options.message_id,
  context: { chat_id: options.chat_id, message_id: options.message_id },
  on_result: "/on_delete_result",
  on_error: "/on_delete_result"
});
