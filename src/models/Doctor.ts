export interface Doctor {
  id: number;
  phoneNumber: string;
  email: string;
  avatar: string;
  name: string;
  surname: string;
  role: number;
  speciality: string;
  calendar_link: string;
}

export interface DoctorsClient {
  id: number;
  phoneNumber: string;
  email: string;
  avatar: string;
  fullname: string;
  speciality: string;
  calendar_link: string;
}
