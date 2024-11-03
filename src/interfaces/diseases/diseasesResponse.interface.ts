export interface DiseaseForRequest {
  id: number;
  name: string;
  schedules?: Schedule[];
}

export interface Schedule {
  id: number;
  title: string;
  specification: string;
}

export interface DiseaseForState {
  name: string;
}

export interface DiseasesClient {
  id: number;
  name: string;
}
export function mapGetDiseasesResponse(
  response: DiseaseForRequest[]
): DiseasesClient[] {
  return response.map((disease) => ({
    id: disease.id,
    name: disease.name
  }));
}
