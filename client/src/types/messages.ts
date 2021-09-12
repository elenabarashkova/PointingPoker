export interface Message {
  userId: string;
  text: string;
  messageId: string;
}

export interface Messages {
  error: boolean;
  isLoading: boolean;
  messages: Message[];
}
