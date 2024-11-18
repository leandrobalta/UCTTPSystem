import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api.service";
import { HttpMethod } from "../enums/http-method";
import { ReservationModel } from "../models/reservation.model";
import { isHttps, prodPort } from "../utils/endpoint";

interface ReservationDTO {
    Id?: number;
    TripID: number;
    SeatNumber: number;
    PassengerName: string;
    IdentityType: string;
    Identity: string;
    CityThatLives: string;
    PhoneNumber: string;
    DateOfBirth: string;
    Name?: string;
    Observation?: string;
}


const getAllReservations = async (navFunction: NavigateFunction) => {
    const response = await ApiService.call<ReservationModel[]>(
        {
            action: "api/Reservation",
            method: HttpMethod.GET,
            navFunction,
            port: prodPort,
            https: isHttps,
        }
    )

    return response;
}

const addReservation = async (navFunction: NavigateFunction, reservation: ReservationModel) => {
    const customBody: ReservationDTO = {
        TripID: reservation.tripID,
        SeatNumber: reservation.seatNumber,
        PassengerName: reservation.passengerName,
        IdentityType: reservation.identityType,
        Identity: reservation.identity,
        CityThatLives: reservation.cityThatLives,
        PhoneNumber: reservation.phoneNumber,
        DateOfBirth: reservation.dateOfBirth?.toString()!,
        Observation: reservation.observation,
    }

    if (sessionStorage.getItem("name") !== null) {
        customBody.Name = sessionStorage.getItem("name")!;
    }
    
    const response = await ApiService.call<any>(
        {
            action: "api/Reservation/Add",
            method: HttpMethod.POST,
            navFunction,
            port: prodPort,
            body: customBody,
            https: isHttps,
        }
    )

    return response;
}

const updateReservation = async (navFunction: NavigateFunction, reservation: ReservationModel) => {
    const customBody: ReservationDTO = {
        Id: reservation.id,
        TripID: reservation.tripID,
        SeatNumber: reservation.seatNumber,
        PassengerName: reservation.passengerName,
        IdentityType: reservation.identityType,
        Identity: reservation.identity,
        CityThatLives: reservation.cityThatLives,
        PhoneNumber: reservation.phoneNumber,
        DateOfBirth: reservation.dateOfBirth?.toString()!,
        Observation: reservation.observation,
    }

    if (sessionStorage.getItem("name") !== null) {
        customBody.Name = sessionStorage.getItem("name")!;
    }
    
    const response = await ApiService.call<any>(
        {
            action: "api/Reservation/Update",
            method: HttpMethod.PUT,
            navFunction,
            port: prodPort,
            body: customBody,
            https: isHttps,
        }
    )

    return response;
}

const deleteReservation = async (navFunction: NavigateFunction, reservation: ReservationModel) => {
    
    const response = await ApiService.call<any>(
        {
            action: "api/Reservation/Delete/" + reservation.id,
            method: HttpMethod.DELETE,
            navFunction,
            port: prodPort,
            https: isHttps,
        }
    )

    return response;
}

const getReservationByTrip = async (navFunction: NavigateFunction, tripID: number) => {
    const response = await ApiService.call<ReservationModel[]>(
        {
            action: "api/Reservation/GetByTrip/" + tripID,
            method: HttpMethod.GET,
            navFunction,
            port: prodPort,
            https: isHttps,
        }
    )

    return response;
}

const addManyReservations = async (navFunction: NavigateFunction, reservations: ReservationModel[]) => {
    const customBody: ReservationDTO[] = reservations.map(reservation => {
        return {
            TripID: reservation.tripID,
            SeatNumber: reservation.seatNumber,
            PassengerName: reservation.passengerName,
            IdentityType: reservation.identityType,
            Identity: reservation.identity,
            CityThatLives: reservation.cityThatLives,
            PhoneNumber: reservation.phoneNumber,
            DateOfBirth: reservation.dateOfBirth?.toString()!,
            Observation: reservation.observation,
        }
    })
    
    if (sessionStorage.getItem("name") !== null) {
        customBody.forEach(reservation => {
            reservation.Name = sessionStorage.getItem("name")!;
        })
    }

    const response = await ApiService.call<any>(
        {
            action: "api/Reservation/AddMany",
            method: HttpMethod.POST,
            navFunction,
            port: prodPort,
            body: customBody,
            https: isHttps,
        }
    )

    return response;
}
    
export const ReservationService = {
    getAllReservations,
    addReservation,
    updateReservation,
    deleteReservation,
    getReservationByTrip,
    addManyReservations,
};