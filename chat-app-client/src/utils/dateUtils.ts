interface MessageData {
  message: string;
  dateTime: Date;
}

interface Messages {
  messageId: string;
  senderId: string;
  recipientId: string;
  chatId: string;
  message: string;
  datetime: string;
}

export const groupMessagesByDate = (
  messages: Messages[]
): { [date: string]: Messages[] } => {
  const groupedMessages: { [date: string]: Messages[] } = {};

  messages.forEach((message) => {
    const date = new Date(message.datetime).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    if (groupedMessages[date]) {
      groupedMessages[date].push(message);
    } else {
      groupedMessages[date] = [message];
    }
  });

  return groupedMessages;
};
