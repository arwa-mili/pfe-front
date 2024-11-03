import { Doctor, DoctorsClient } from '../../models/Doctor';

export interface DoctorsResponse {
  doctors: Doctor[];
  total_pages: number;
}

export interface DoctorsResponseClient {
  doctors: DoctorsClient[];
  totalPages: number;
}

export function mapGetDoctors(
  response: DoctorsResponse
): DoctorsResponseClient {
  const doctors = response.doctors.map((doctor) => ({
    id: doctor.id,
    fullname: doctor.name + ' ' + doctor.surname,
    email: doctor.email,
    speciality: doctor.speciality,
    calendar_link: doctor.calendar_link,
    phoneNumber: doctor.phoneNumber,
    avatar: doctor.avatar
  }));

  return {
    doctors: doctors,
    totalPages: response.total_pages
  };
}
