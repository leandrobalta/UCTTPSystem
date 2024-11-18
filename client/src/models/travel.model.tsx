import { ProfessorModel } from "./professor.model";
import { ReservationModel } from "./reservation.model";
import { CourseModel } from "./course.model";
export interface Travel {
    trip: CourseModel
    bus: ProfessorModel;
    rightSeats: Seat[];
    leftSeats: Seat[];
}

export interface Seat {
    id: string;
    number: number;
    reservation: ReservationModel | null;
}