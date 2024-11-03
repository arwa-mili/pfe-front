import { ChnageEmailDto } from '../../../features/LoggedIn/Screens/ChangeEmail/ChangeEmail.container';
import { DiseasesIds } from '../../../interfaces/diseases/diseasesAddedToUser.interface';
import {
  DiseaseForRequest,
  DiseasesClient,
  mapGetDiseasesResponse
} from '../../../interfaces/diseases/diseasesResponse.interface';
import {
  IProfileEditResonseClient,
  mapEditProfileResponse
} from '../../../interfaces/userProfile/userProfile.interface';
import { MedicalFile } from '../../../models/MedicalFile';
import { EditProfileRequest, User } from '../../../models/User';
import {
  AddDiseaseOfUser,
  ChangeEmail,
  EditProfile_PATH,
  GetAllDiseases,
  getMedicalFiles,
  UploadImage_PATH
} from '../../../utils/consts/apiConsts/apiConsts';
import { apiSlice } from '../apiSlice';
export const userProfileApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addDiseaseOfUser: builder.mutation<
      void,
      { diseases: DiseasesIds; id: number }
    >({
      query: ({ diseases, id }) => ({
        url: AddDiseaseOfUser.replace(':id', id.toString()),
        method: 'PUT',

        body: diseases
      })
    }),
    getMedicalFiles: builder.query<MedicalFile[], { id: number }>({
      query: ({ id }) => ({
        url: getMedicalFiles.replace(':id', id.toString()),
        method: 'GET'
      })
    }),

    ChangeEmail: builder.mutation<any, { user: ChnageEmailDto }>({
      query: ({ user }) => ({
        url: ChangeEmail,
        method: 'POST',
        body: user
      })
    }),
    getAlldiseases: builder.query<DiseasesClient[], void>({
      query: () => ({
        url: GetAllDiseases,
        method: 'GET'
      }),
      transformResponse: (response: DiseaseForRequest[]) =>
        mapGetDiseasesResponse(response)
    }),
    //type user returns error
    editProfile: builder.mutation<
      IProfileEditResonseClient,
      { updateUserDto: EditProfileRequest; id: number }
    >({
      query: ({ updateUserDto, id }) => ({
        url: EditProfile_PATH.replace(':id', id.toString()),
        method: 'PATCH',
        body: updateUserDto
      }),
      transformResponse: (response: User) => mapEditProfileResponse(response)
    }),
    updateImage: builder.mutation<any, { file: FormData; id: number }>({
      query: ({ file, id }) => ({
        url: UploadImage_PATH.replace(':id', id.toString()),
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': 'multipart/form-data'
        },

        formData: true
      })
    })
  })
});
export const {
  useAddDiseaseOfUserMutation,
  useGetAlldiseasesQuery,
  useEditProfileMutation,
  useUpdateImageMutation,
  useChangeEmailMutation,
  useLazyGetMedicalFilesQuery
} = userProfileApiSlice;
