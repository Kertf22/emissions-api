import { Request, Response } from "express";
import UserService from "../services/UserService";
import LocationService from "../services/LocationService";
import Location from "../models/location";

export default class LocationController {
    constructor(private locationService: LocationService) {
        this.getHistory = this.getHistory.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
    }

    async getHistory(req: Request, res: Response): Promise<void> {
        try {
            const locations = await this.locationService.getHistory();
            res.status(200).json(locations).send();
        }
        catch (err) {
            res.status(500).json({
                message: "Aconteceu um erro"
            }).send();
        }
    }


    async saveLocation(req: Request, res: Response): Promise<void> {
        const { lat, long, timestamp, city, country, state} = req.body;
        if (!lat || !long || !timestamp || !city || !country || !state) {
            res.status(500).json({
                message: "Aconteceu um erro"
            }).send();
        }
        try {
            await this.locationService.saveLocation( new Location(0, lat, long, timestamp, country, city,state));
            res.status(200).send();
        }
        catch (err) {
            res.status(500).json({
                message: "Aconteceu um erro"
            }).send();
        }
    }
    
}