export interface Message {
  id: number;

  senderid: number;

  text: string;

  file?: string | null;

  chat_id: number | null;

  created_at: Date | string;
}

export interface MessageClient {
  senderid: number;

  id: number;
  text: string;

  file?: string | null;

  createdAt: Date | string;
}

export function mapPreviousMessageChatResponse(
  response: Message[]
): MessageClient[] {
  return response.map((message) => ({
    id: message.id,
    text: message.text,
    file: message.file,
    senderid: message.senderid,
    createdAt: message.created_at
  }));
}
