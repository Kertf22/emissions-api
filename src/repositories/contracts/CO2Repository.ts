import CO2 from "../../models/co2";

export default interface CO2Repository {
    getCountryInfo(country: string): Promise<any>;
    getCountries(): Promise<any>;
    getCountryByYear(country: string, year: number): Promise<any>;
    getYear(year: number): Promise<any>;
    getAverageEmissions(country: string, lastYears: number): Promise<any>;
    getMostCommonFonts(amount:number): Promise<any>;
    getTotalByCountryCount(count: number, order: string): Promise<any>;
    save(user: CO2): Promise<void>;
}