export interface MessageData {
    message: string;
    dateTime: Date;
  }
  
  export interface Messages {
    messageId: string;
    senderId: string;
    recipientId: string;
    chatId: string;
    message: string;
    datetime: string;
  }
  
  export interface Recipient {
    id: string;
    name: string;
  }
  
  export interface ChatWindowProps {
    emitMessage: (data: MessageData) => void;
    chatExit: () => void;
    messages: Messages[];
    onlineUsers: Array<any>;
    recipient: Recipient;
  }
  
  export interface ChatWindowState {
    message: string;
  }
  