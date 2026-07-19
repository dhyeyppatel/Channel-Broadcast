/*CMD
  command: /on_delete_result
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

let ctx = options.context;
if (!ctx) return;

if (options.ok) {
  Bot.setProp(`log_${ctx.chat_id}_${ctx.message_id}`, {
    deleted_at: new Date().toISOString(),
    status: "deleted"
  }, 'json');
} else {
  Bot.run({
    command: "/on_error",
    options: {
      chat_id: ctx.chat_id,
      message_id: ctx.message_id,
      error: JSON.stringify(options)
    }
  });
}
