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
  on_result: function(response) {
    if (response.ok) {
      Bot.setProp(`log_${options.chat_id}_${options.message_id}`, {
        deleted_at: new Date().toISOString(),
        status: "deleted"
      }, 'json');
    } else {
      Bot.run({
        command: "/on_error",
        options: {
          chat_id: options.chat_id,
          message_id: options.message_id,
          error: JSON.stringify(response)
        }
      });
    }
  }
});

