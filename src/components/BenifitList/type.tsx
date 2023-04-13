import {useFetchBenefitsData} from '../../screens/Dashboard/types';

export type BenefitListProps = {
  data: readonly any[];
  horizontal?: boolean;
  benefits: readonly useFetchBenefitsData[];
  goToWeb?: (url: string) => void;
};
