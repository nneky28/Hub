import { Images } from '../Image';

export type ProfileDataType = {
    key?: string
    title: string
    iconLeft: {uri : string},
    data?: string[],
    iconRight?: { uri: string }, 
    url?:string
}

export const profileData :  ProfileDataType[] = [
    {
        key: '1',
        title: 'Personal Information',
        iconLeft: {uri : Images.ManFillIcon},
        data: [
            'Nationality', 'Nigerian', 'Gender', 'Female', 'Marital Status', 'Married', 'Date Of Birth', '14 Jun, 1978'
        ],
        iconRight: {uri : Images.ArrowDown},
    },
    {
        key: '2',
        title: 'Job Detail',
        iconLeft: {uri : Images.ShopFillIcon},
        data: [
            'Hire Date', '23, Jun 2021', 'Employment Status', 'Full Time', 'Role', 
            'Abuja, Lagos', 'Marital Status', 'Married', 'Salary (Monthly)', 'N400,000'
        ],
        iconRight: {uri : Images.ArrowDown},
    },
    {
        key: '3',
        title: 'Next of Kin',
        iconLeft: {uri : Images.TwoFillMen},
        data: [
            'First Name', 'Laracroft', 'Last Name', 'Williams', 'Relationship ', 'Sibiling', 
            'Mobile Number', '08145687952', 'Address', '23/24 Nashville Estate, Ikeja Lagos',
            'Email', 'Jessicastones@gmail.com'
        ],
        iconRight:{uri : Images.ArrowDown},
    },
    {
        key: '4',
        title: 'Emergency Contact',
        iconLeft: {uri : Images.EmergencyIcon},
        data: [
            'First Name', 'Laracroft', 'Last Name', 'Williams', 'Relationship ', 'Sibiling', 
            'Mobile Number', '08145687952', 'Address', '23/24 Nashville Estate, Ikeja Lagos',
            'Email', 'Jessicastones@gmail.com'
        ],
        iconRight: {uri : Images.ArrowDown},
    },
    {
        key: '5',
        title: 'Banking and Pension Details',
        iconLeft: {uri : Images.BankingIcon},
        data: [
            'Bank Name', 'First City Momument Bank', 'Account Number', '31097730073', 'Pension Provider', 
            'Leadway Pension Provider', 'Pencom No', '131097730073'
        ],
        iconRight: {uri : Images.ArrowDown},
    },
];

