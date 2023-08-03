export default class CO2 {
    private id: number
    private country: string
    private iso_code: string
    private year: number
    private total: number
    private coal:number
    private oil:number
    private gas:number
    private cement:number
    private flaring:number
    private other:number
    private per_capita:number

    constructor(id: number, country: string, iso_code: string, year: number, total: number, coal:number, oil:number, gas:number, cement:number, flaring:number, other:number, per_capita:number) {
        this.id = id
        this.country = country
        this.iso_code = iso_code
        this.year = year
        this.total = total
        this.coal = coal
        this.oil = oil
        this.gas = gas
        this.cement = cement
        this.flaring = flaring
        this.other = other
        this.per_capita = per_capita
    }

}