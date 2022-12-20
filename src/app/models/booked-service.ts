import {Services} from "./services";

export interface BookedService {
    id: string;
    start: string| Date;
    end: string| Date;
    price: number;
    services: Services;
}
