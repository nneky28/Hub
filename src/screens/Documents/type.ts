export type useFetchDocumentsData = {
  id: number;
    name: string;
    file: string;             
    created_at: string;
    updated_at: string;
    file_type: string;
    url: string;
}   
export type useFetchDocumentsProps = {
  data? : {
      count? : number
      results? : useFetchDocumentsData[]
  }
  isLoading : boolean
  isFetching : boolean
}