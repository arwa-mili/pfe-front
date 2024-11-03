import {
  GetAllChatsResponseClient,
  mapGetAllChatsResponse,
  UserDoctorChatResponse
} from '../../../interfaces/chatsUserDoctor/UserDoctorChats';

import { LastdataOfUserResponse } from '../../../interfaces/chatsUserDoctor/DataOfUser.ts';
import {
  mapGetChatConversationResponse,
  ChatConversation,
  ChatConversationClient
} from '../../../interfaces/chatsUserDoctor/user-doctor-chat-conversations';
import {
  createConversation,
  getAllChats,
  getDoctors,
  getPatientData,
  getPreviousConversation,
  getSpecificChat,
  sendMessage
} from '../../../utils/consts/apiConsts/apiConsts';
import { apiSlice } from '../apiSlice';
import {
  mapPreviousMessageChatResponse,
  Message,
  MessageClient
} from '../../../interfaces/chatsUserDoctor/Message';

import {
  DoctorsResponseClient,
  DoctorsResponse,
  mapGetDoctors
} from '../../../interfaces/chatsUserDoctor/doctorsget';
import { CreateChatRequest } from '../../../features/LoggedIn/Components/SendMessageForChatPopUp/SendMessageForChatPopUp.tsx';

export const chatUserDoctorApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createNewChatConversation: builder.mutation<void, CreateChatRequest>({
      query: (credentials) => ({
        url: createConversation,
        method: 'POST',
        body: credentials
      })
    }),
    getPreviousConversation: builder.query<MessageClient[], { chatid: Number }>(
      {
        query: ({ chatid }) => ({
          url: getPreviousConversation.replace(':chatid', chatid.toString()),
          method: 'GET'
        }),
        providesTags: ['chatConversations'],
        transformResponse: (response: Message[]) => {
          return mapPreviousMessageChatResponse(response);
        }
      }
    ),
    getAllDoctors: builder.query<
      DoctorsResponseClient,
      { page: number; searchWord: string; selectedSpec: string }
    >({
      query: ({ page, searchWord, selectedSpec }) => ({
        url: getDoctors
          .replace(':page', page.toString())
          .replace(':selectedSpec', selectedSpec)
          .replace(':searchWord', searchWord),
        method: 'GET'
      }),
      transformResponse: (response: DoctorsResponse) => {
        return mapGetDoctors(response);
      }
    }),
    getPatientData: builder.query<LastdataOfUserResponse, { token: string }>({
      query: ({ token }) => ({
        url: getPatientData.replace(':token', token),
        method: 'GET'
      })
    }),
    getAllChats: builder.query<
      GetAllChatsResponseClient,
      { userid: Number; page: Number }
    >({
      query: ({ userid, page }) => ({
        url: getAllChats
          .replace(':userid', userid.toString())
          .replace(':page', page.toString()),
        method: 'GET'
      }),
      providesTags: ['userDoctorChats'],
      transformResponse: (response: UserDoctorChatResponse) => {
        return mapGetAllChatsResponse(response);
      }
    }),
    sendMessage: builder.mutation<
      void,
      { formdata: FormData; user_id: Number; chat_id: Number }
    >({
      query: ({ user_id, chat_id, formdata }) => ({
        url: sendMessage
          .replace(':sender_id', user_id.toString())
          .replace(':chat_id', chat_id.toString()),
        method: 'POST',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data'
        },

        formData: true
      }),
      invalidatesTags: ['userDoctorChats']
    }),

    getSpecificChat: builder.query<
      ChatConversationClient,
      { id?: number; token?: string }
    >({
      query: ({ id, token }) => {
        let url = getSpecificChat;
        if (id !== undefined) {
          url = url.replace(':id', id.toString());
        } else {
          url = url.replace(':id', '');
        }
        if (token !== undefined) {
          url = url.replace(':token', token.toString());
        } else {
          url = url.replace(':token', '');
        }
        return {
          url,
          method: 'GET'
        };
      },
      transformResponse: (response: ChatConversation) => {
        return mapGetChatConversationResponse(response);
      }
    })
  })
});

export const {
  useLazyGetSpecificChatQuery,
  useLazyGetAllChatsQuery,
  useSendMessageMutation,
  useLazyGetPreviousConversationQuery,
  useLazyGetAllDoctorsQuery,
  useLazyGetPatientDataQuery,
  useCreateNewChatConversationMutation
} = chatUserDoctorApiSlice;
