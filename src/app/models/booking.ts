import {CustomerModel} from "./customer-model";
import {BookedService} from "./booked-service";

export interface Booking {
    id: string;
    customer: CustomerModel;
    start: Date | string;
    end:  Date | string;
    bookingState: string;
    advancedPayments: { amount: number, id: string, createdDate: string | Date }[]
    totalAmount: number;
    bookingDate: Date | string; // current date
    bookedServices: BookedService[]
}
