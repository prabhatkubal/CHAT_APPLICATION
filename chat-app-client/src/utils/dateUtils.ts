interface Messages {
  messageId: string;
  senderId: string;
  recipientId: string;
  chatId: string;
  message: string;
  dateTime: string;
}

export const groupMessagesByDate = (
  messages: Messages[]
): { [date: string]: Messages[] } => {
  const groupedMessages: { [date: string]: Messages[] } = {};

  messages.forEach((message) => {
    // Parse the timestamp string into a Date object
    const timestamp = parseInt(message.dateTime);
    const date = new Date(timestamp);

    // Format the date portion
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // // Format the time portion
    // const formattedTime = date.toLocaleTimeString("en-US", {
    //   hour: "numeric",
    //   minute: "numeric",
    // });

    // Combine date and time for grouping
    const fullDate = `${formattedDate}`;

    if (groupedMessages[fullDate]) {
      groupedMessages[fullDate].push(message);
    } else {
      groupedMessages[fullDate] = [message];
    }
  });

  return groupedMessages;
};

function parseDateToTimestamp(dateString) {
  const timestamp = Date.parse(dateString);
  if (!isNaN(timestamp)) {
    return timestamp;
  }
  return null;
}

export default parseDateToTimestamp;
