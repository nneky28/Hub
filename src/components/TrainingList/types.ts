import { useFetchTrainingsData } from "../../screens/Training/types";

export type TrainingListProps= {
    data: useFetchTrainingsData[];
    opacity?: number;
  }