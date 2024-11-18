import { BaseModel } from "./base.model";

export interface ReservationModel extends BaseModel {
    tripID: number;
    seatNumber: number;
    passengerName: string;
    identityType: string;
    identity: string;
    cityThatLives: string;
    phoneNumber: string;
    dateOfBirth: string;
    observation: string;
}