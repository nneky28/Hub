export type TrainingType = {
  id: number;
    title: string;
    description: string;             
    venue: string;
    start_datetime: string;
    end_datetime: string;
  cost: string;
  opacity?: number;
};
  
export type useFetchTrainingsData = {
  data: {
    id: number;
    title: string;
    description: string;
    venue: string;
    start_datetime: string;
    end_datetime: string;
    cost: string;
  }[];

  opacity?: number;
}   
export type useFetchTrainingsProps = {
  data? : {
      count? : number
      results? : useFetchTrainingsData[]
  }
  isLoading : boolean
  isFetching : boolean
}