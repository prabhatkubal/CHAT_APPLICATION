import client from "../../../../services/apiInstance";
import { GET_MESSAGES } from "../../../queries/messages/getUserMessages";

export async function getMessagesBySenderAndRecipientId(senderId, recipientId) {
  let loading = false; // Initialize loading status

  try {
    loading = true; // Set loading to true

    const { data, error } = await client.query({
      query: GET_MESSAGES,
      variables: {
        senderId,
        recipientId,
      },
      fetchPolicy: "network-only",
    });

    if (error) {
      console.error("Error retrieving messages:", error);
      return { messages: [], loading: false }; // Return loading status along with messages
    }

    const messages = data.getMessages;
    return { messages, loading: false }; // Return loading status along with messages
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return { messages: [], loading: false }; // Return loading status along with messages
  } finally {
    loading = false; // Make sure loading is set to false in case of exceptions
  }
}
