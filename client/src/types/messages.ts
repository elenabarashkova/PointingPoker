export interface Message {
  text: string;
  userId: string;
}

export interface Messages {
  error: boolean;
  isLoading: boolean;
  messages: Array<Message>;
}
