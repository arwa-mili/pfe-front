//chatbot url:
export const Chat_URL = 'http://127.0.0.1:5000/ask';
//baseurl
export const Backend_URL = 'http://127.0.0.1:3000';
// https://api.medi-nexus.zvr1ev89.pfe.anypli.com/

//controllers baseurl
export const AUTH = '/auth';
export const USERs = '/users';
export const Disease = '/disease';
export const USER_PLANS = '/nutrition-plan-user';
export const MEALS = '/meals';
export const Measure = '/measure';
export const NutritionPlans = '/nutrition-plans';
export const mealsPerType = '/meals-for-nutrition-plan';
export const Exported_meals = '/exported-recipes';
export const Notifs = '/notification';
export const User_Doctor_Chats = '/user-doctor';
export const chat_Messages = '/chat-users';
export const doctors = '/doctors';

export const getWeeklyNutriments =
  Backend_URL + USER_PLANS + '/user/:userid/getEatenNutrimentsOfWeek';

export const getSuggestedPlans =
  Backend_URL + USER_PLANS + '/user' + '/:userid/suggestedmeals';

export const ChangeEmail = Backend_URL + USERs + '/sendVerifEmail';

export const createConversation = Backend_URL + User_Doctor_Chats;
export const checkfood =
  Backend_URL + USER_PLANS + '/user/:userid/nutritionplan/checkfood';
export const getDoctors =
  Backend_URL +
  doctors +
  '?page=:page&searchWord=:searchWord&selectedSpec=:selectedSpec';

export const getPatientData =
  Backend_URL +
  User_Doctor_Chats +
  '/doctor/user/getUserMedicalInfo?token=:token';

export const getPreviousConversation =
  Backend_URL + chat_Messages + '/conversations/:chatid';

export const getSpecificChat =
  Backend_URL + User_Doctor_Chats + '/doctor?id=:id&token=:token';

export const sendMessage =
  Backend_URL + chat_Messages + '?chat_id=:chat_id&sender_id=:sender_id';
export const getAllChats =
  Backend_URL + User_Doctor_Chats + '/users/:userid?page=:page';

export const customMealAdd = Backend_URL + Exported_meals;
export const notifs_path = Backend_URL + Notifs;
//geminiapi
export const GEMINI_BASEURL = '/gemini';
export const SubmitMealName_Path = Backend_URL + GEMINI_BASEURL + '/prompt';
export const SubmitImageMeal_Path =
  Backend_URL + GEMINI_BASEURL + '/prompt-with-image';

export const ChatGPTEndpoint = '/openai' + '/:userid/getReport';

export const GenerateReportApi = Backend_URL + ChatGPTEndpoint;

//methods url
export const getRecipeById = Backend_URL + Exported_meals + '/:id';

//notifs
export const getNotifsCount = notifs_path + '/:userid/count';
export const showNotifications = notifs_path + '/:userid?page=:page';

export const getMealsOfPlan = Backend_URL + NutritionPlans + '/:id/meals';
export const DiseaseUser = '/disease-user';
export const addMealToPlan =
  Backend_URL + mealsPerType + '/:meal_id/:day/:nutrition_plan_id';
export const deleteMeasureHistory =
  Backend_URL + DiseaseUser + '/measureHistory/:mes_history_id';
export const GetUserDiseasesAndSchedules =
  Backend_URL + DiseaseUser + '/users/:userid' + '/diseasesandschedules';
export const AddMeasureToHistory =
  Backend_URL +
  DiseaseUser +
  '/users/:userid' +
  '/measures/:mesid/addNewMeasuretoHistory';
export const GetMeasureHistoryOfUser =
  Backend_URL + DiseaseUser + '/users/:userid' + '/measures/';

export const getMealsOfPlanOfDay =
  Backend_URL + USER_PLANS + '/user/:userid/mealsofday';

export const getUserTotalMeasuresForchart =
  Backend_URL + DiseaseUser + '/users/:userid/getAllMeasuresHistory';

export const LOGIN = '/login';
export const SIGNUPUSER = '/signup';
export const VERIFYCODE = '/code';
export const VERIFEMAIL = '/verifEmail';
export const AUTH_URL = Backend_URL + AUTH;
export const Disease_URL = Backend_URL + Disease;
export const Users_URL = Backend_URL + USERs;
export const Measure_URL = Backend_URL + Measure;
export const GetPlanById = Backend_URL + NutritionPlans + '/:id';
export const EXPORTED_MEALS_URL = Backend_URL + Exported_meals;
export const FindByMealType =
  Backend_URL +
  USER_PLANS +
  '/user/:userid' +
  '/findrecipesforuser?mealType=:mealType&page=:page';
export const GetPdfFile = Backend_URL + USERs + '/fetch/:filename';
export const getMedicalFiles = Users_URL + '/:id/medicalfiles';

export const findLaboMeasures =
  Measure_URL + '/findByCriteria?measureType=:measureType';
export const AddDiseaseOfUser =
  Backend_URL + DiseaseUser + USERs + '/:id/diseases';
export const GetAllDiseases = Backend_URL + Disease;

export const getUserDiseases = Backend_URL + Disease + '/:userid?'; //to change
export const UploadImage_PATH = Backend_URL + USERs + '/:id/upload-image';
export const EditProfile_PATH = Backend_URL + USERs + '/:id';

export const GetUserPlans_PATH =
  Backend_URL +
  USER_PLANS +
  '/user/:userid/nutritionplans/user-plans?page=:page';

export const AddPlanToUser =
  Backend_URL + USER_PLANS + 'user/:userid/nutritionplan/:planid/add';

// auth urls
export const excluded_endpoints = {
  LOGIN_PATH: AUTH_URL + LOGIN,
  SIGNUPUSER_PATH: AUTH_URL + SIGNUPUSER,
  VERIFYCODE_PATH: AUTH_URL + VERIFYCODE,
  VERIFEMAIL: AUTH_URL + VERIFEMAIL,
  RESET_PASSWORD: AUTH_URL + '/sendForgetPasswordCode',
  FORGET_PASSWORD_RESET: AUTH_URL + '/forgot-password-reset/:email/:otp'
};
//refresh
export const REFRESH_PATH = Backend_URL + '/auth/refresh';
