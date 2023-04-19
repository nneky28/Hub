
export type  Data ={
  bank: number | string;
  provider: number | string;
  account_name : string;
  account_number: string;
  pension_number: string;
  bank_code: string;
  bank_name: string
  prov_name: string
}
export type DataKeys = keyof Data;



   

// bank_account?: {
//   bank? : {
//       code?: string,
//       id?: number,
//       name?:string
//   }
//   account_number?: string,
//   account_name?: string,
//   bank_name?:string
// },
// pension?: {
//   provider?: {
//       name?: string,
//       id?:number
//   }
 