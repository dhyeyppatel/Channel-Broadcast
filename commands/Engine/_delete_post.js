/*CMD
  command: /delete_post
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Engine

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Api.deleteMessage({
  chat_id: options.chat_id,
  message_id: options.message_id
});
