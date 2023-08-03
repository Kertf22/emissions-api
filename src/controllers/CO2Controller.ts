import { Request, Response } from "express";
import CO2Service from "../services/CO2Service";

export default class CO2Controller {
    constructor(private co2Service: CO2Service) {
        this.getCountryInfo = this.getCountryInfo.bind(this);
        this.getCountries = this.getCountries.bind(this);
        this.getCountryByYear = this.getCountryByYear.bind(this);
        this.getYear = this.getYear.bind(this);
        this.getAverageEmissions = this.getAverageEmissions.bind(this);
        this.getMostCommonFonts = this.getMostCommonFonts.bind(this);
        this.getTotalByCountryCount = this.getTotalByCountryCount.bind(this);
    }

    async getCountryInfo(req: Request, res: Response): Promise<void> {
        const { country } = req.params;
        try {
            const data = await this.co2Service.getCountryInfo(country);
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Aconteceu um erro"
            });
        }
    }
    async getCountries(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.co2Service.getCountries();
            console.log(data)
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Aconteceu um erro"
            });
        }
    }

    async getCountryByYear(req: Request, res: Response): Promise<void> {
        const { country, ano } = req.params;
        try {
            const data = await this.co2Service.getCountryByYear(country, Number(ano));
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Aconteceu um erro"
            });
        }
    }

    async getYear(req: Request, res: Response): Promise<void> {
        const { ano } = req.params;
        try {
            const data = await this.co2Service.getYear(Number(ano));
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json({
                message: "Aconteceu um erro"
            });
        }
    }

    async getAverageEmissions(req: Request, res: Response): Promise<void> {
        const { country, lastYears } = req.query;
        try {
            const data = await this.co2Service.getAverageEmissions(String(country), Number(lastYears));
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json({
                message: "Aconteceu um erro"
            });
        }
    }

    async getMostCommonFonts(req: Request, res: Response): Promise<void> {
        const { amount } = req.query;
        try {
            const data = await this.co2Service.getMostCommonFonts(Number(amount));
            console.log(data)
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Aconteceu um erro"
            });
        }
    }

    async getTotalByCountryCount(req: Request, res: Response): Promise<void> {
        const {  paises_count, ordem } = req.params;
        try {
            const data = await this.co2Service.getTotalByCountryCount(Number(paises_count), ordem);
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json({
                message: "Aconteceu um erro"
            });
        }
    }

    
}