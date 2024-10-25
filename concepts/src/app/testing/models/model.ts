export interface Customer {
    id?: number;
    name: string;
    customerAadhar?: string;
    customerPAN?: string;
    address?: string;
    phoneNumber?: string;
    customerMail?: string;
    state?: string;
    district?: string;
    email?:string
  }

  export interface Admin {
    id?: number;
    name: string;
    phoneNumber: string;
    email?:string
  }