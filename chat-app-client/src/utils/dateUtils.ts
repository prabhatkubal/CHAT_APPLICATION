interface MessagesWithTime extends Messages {
  time: string;
}

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
): { [date: string]: MessagesWithTime[] } => {
  const groupedMessages: { [date: string]: MessagesWithTime[] } = {};

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

    // Format the time portion in 12-hour format with AM/PM
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Combine date and time for grouping
    const fullDate = `${formattedDate}`;
    const timeField = formattedTime; // Store the formattedTime as the key

    const messageWithTime: MessagesWithTime = {
      ...message,
      time: formattedTime,
    };

    if (!groupedMessages[fullDate]) {
      groupedMessages[fullDate] = [];
    }
    groupedMessages[fullDate].push(messageWithTime);
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
