
export interface IMessage {
  id: number;
  content: string;
  botId: number;
  sender: 'user' | 'bot';
  sentAt: string; 
}

export interface IRequestCreateMessageJson {
  botId: number;
  content: string;
}

export interface IResponseMessagesJson {
  messages: IMessage[];
}

export interface IResponseSendMessageJson {
  id: number;
  content: string;
  sender: 'bot';
  sentAt: string;
}