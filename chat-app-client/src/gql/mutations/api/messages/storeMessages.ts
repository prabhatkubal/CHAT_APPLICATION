import client from "../../../../services/apiInstance";
import { STORE_MESSAGES } from "../../messages/storeUserMessages";

export async function storeMessage(
  senderId,
  recipientId,
  chatId,
  message,
  dateTime
) {
  try {
    const response = await client.mutate({
      mutation: STORE_MESSAGES,
      variables: {
        senderId,
        recipientId,
        chatId,
        message,
        dateTime,
      },
    });

    const data = response.data.storeMessages;
    if (data.success) {
      // Message inserted successfully
      const insertedMessage = data.insertedMessage;
      client.clearStore();
      return { success: true, insertedMessage };
    } else {
      // Handle the error response
      console.log("Failed to insert message:", data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    // Handle any errors
    console.log("Failed to insert message:", error);
    return {
      success: false,
      message: "An error occurred while inserting the message.",
    };
  }
}
