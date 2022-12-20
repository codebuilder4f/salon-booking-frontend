export interface Payment {
     id: string;
     createdDate: Date;
     lastModifiedDate: Date;
     paymentDate: Date;
     amount: number;
     description: string;
     paymentType: string;
}
