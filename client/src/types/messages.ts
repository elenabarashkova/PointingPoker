export interface Message {
  userId: string;
  test: string;
  messageId: string;
}

export interface Messages {
  error: boolean;
  isLoading: boolean;
  messages: Message[];
}
