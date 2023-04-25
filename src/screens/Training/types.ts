
  
export type useFetchTrainingsData = {
  id?: number;
  title?: string;
  description?: string;
  venue?: string;
  start_datetime?: string;
  end_datetime?: string;
  cost?: string;
}  
export type useFetchTrainingsProps = {
  data? : {
      count? : number
      results? : useFetchTrainingsData[]
  }
  isLoading : boolean
  isFetching : boolean
}