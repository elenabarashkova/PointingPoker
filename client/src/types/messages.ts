export interface Message {
  text: string;
  userId: string;
}

export interface Messages {
  error: boolean;
  isLoading: boolean;
  messages: Record<string, Message>;
}

export interface MessageData {
  messageId: string;
  message: Message;

}
