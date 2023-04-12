export type BenefitListProps = {
    data: any;
    horizontal?: boolean;
    benefits: Array<any>;
    goToWeb?: (url: string) => void;
}