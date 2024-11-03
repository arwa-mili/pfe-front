export interface ChatConversation {
  id: number;

  userid: number;

  doctorid: number;

  status: string;
}

export interface ChatConversationClient {
  chatid: number;
  doctorid: number;
}

export function mapGetChatConversationResponse(
  response: ChatConversation
): ChatConversationClient {
  return {
    chatid: response.id,
    doctorid: response.doctorid
  };
}

export interface requestForChat {
  doctorid: number;
  userid: number;
  message: string;
}
