import { chatRequest } from '../../../interfaces/chat/chatMessageRequest.interface';
import {
  Chat_URL,
  GenerateReportApi
} from '../../../utils/consts/apiConsts/apiConsts';
import { apiSlice } from '../apiSlice';

export const chatBotApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    chatApiPost: builder.mutation<any, chatRequest>({
      query: (credentials) => ({
        url: Chat_URL,
        method: 'POST',
        body: credentials
      })
    }),

    GenerateReportApi: builder.query<string, { userid: number }>({
      query: ({ userid }) => ({
        url: GenerateReportApi.replace(':userid', userid.toString()),
        method: 'GET'
      })
    }),

    chatApiGet: builder.query<any, void>({
      query: () => ({
        url: Chat_URL,
        method: 'GET'
      })
    })
  })
});

export const {
  useChatApiGetQuery,
  useChatApiPostMutation,
  useLazyGenerateReportApiQuery
} = chatBotApiSlice;
