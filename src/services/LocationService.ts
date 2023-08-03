import Location from "../models/location";
import User from "../models/user";
import LocationRepository from "../repositories/contracts/LocationRepository";
import UserRepository from "../repositories/contracts/UserRepository";
import JWTService from "./JWTService";

export default class LocationService {
    constructor
    (private locationRepository: LocationRepository) {}

    async getHistory(): Promise<Location[]> {
        const locations = await this.locationRepository.getHistory();
        return locations;
    }

    async saveLocation(location: Location): Promise<void> {
        await this.locationRepository.save(location);
    }

}