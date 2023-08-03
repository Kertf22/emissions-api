import CO2Repository from "../repositories/contracts/CO2Repository";

export default class CO2Service {
    constructor (private co2Repository: CO2Repository) {}

    async getCountryInfo(country: string): Promise<any> {
        const data = await this.co2Repository.getCountryInfo(country);
        return data;
    }

    async getCountries(): Promise<any> {
        const data = await this.co2Repository.getCountries();
        return data;
    }

    async getCountryByYear(country: string, year: number): Promise<any> {
        const data = await this.co2Repository.getCountryByYear(country, year);
        return data;
    }

    async getYear(year: number): Promise<any> {
        const data = await this.co2Repository.getYear(year);
        return data;
    }

    async getAverageEmissions(country: string, lastYears: number): Promise<any> {
        const data = await this.co2Repository.getAverageEmissions(country, lastYears);
        return data;
    }

    async getMostCommonFonts(amount: number): Promise<any> {
        const data = await this.co2Repository.getMostCommonFonts(amount);
        return data;
    }

    async getTotalByCountryCount(count: number, order: string): Promise<any> {
        const data = await this.co2Repository.getTotalByCountryCount(count, order);
        return data;
    }
}