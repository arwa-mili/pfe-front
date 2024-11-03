import { Status } from '../../enums/Status';
import { formatChatDate } from './helper/formattigDate';
import { Message } from './Message';

export interface UserDoctorChatResponse {
  user_doctor_chats: UserDoctorChatEntity[];
  totalpages: number;
}

export interface UserDoctorChatEntity {
  user_doctor_chats: UserDoctorChat;
  doctorname: string;
}

export interface UserDoctorChat {
  id: number;

  userid: number;

  messages?: Message[];

  doctorid: number;
  status: Status;
}

export interface UserDoctorChatEntityClient {
  id: number;
  userid: number;
  lastMessage: Message;
  doctorid: number;
  status: Status;
  doctorname: string;
}

export interface GetAllChatsResponseClient {
  user_doctor_chats: UserDoctorChatEntityClient[];
  totalpages: number;
}
export function mapGetAllChatsResponse(
  response: UserDoctorChatResponse
): GetAllChatsResponseClient {
  const userDoctorChats: UserDoctorChatEntityClient[] =
    response.user_doctor_chats.map((chatEntity: UserDoctorChatEntity) => {
      let lastMessage: Message = {
        id: 2,
        senderid: 2,
        text: '',
        file: '',
        chat_id: null,
        created_at: ''
      };

      if (
        chatEntity.user_doctor_chats.messages !== undefined &&
        chatEntity.user_doctor_chats.messages.length > 0
      ) {
        const lastMessageWithFormattedDate =
          chatEntity.user_doctor_chats.messages.reduce(
            (prevMessage: Message, currentMessage: Message) => {
              const prevMessageDate = new Date(prevMessage.created_at);
              const currentMessageDate = new Date(currentMessage.created_at);
              return prevMessageDate > currentMessageDate
                ? prevMessage
                : currentMessage;
            }
          );

        const formattedDate = formatChatDate(
          lastMessageWithFormattedDate.created_at.toString()
        );

        lastMessage = {
          id: lastMessageWithFormattedDate.id,
          senderid: lastMessageWithFormattedDate.senderid,
          text: lastMessageWithFormattedDate.text,
          file: lastMessageWithFormattedDate.file,
          chat_id: lastMessageWithFormattedDate.chat_id,
          created_at: formattedDate
        };
      }

      return {
        id: chatEntity.user_doctor_chats.id,
        userid: chatEntity.user_doctor_chats.userid,
        lastMessage: lastMessage,
        doctorid: chatEntity.user_doctor_chats.doctorid,
        status: chatEntity.user_doctor_chats.status,
        doctorname: chatEntity.doctorname
      };
    });

  return {
    user_doctor_chats: userDoctorChats,
    totalpages: response.totalpages
  };
}
