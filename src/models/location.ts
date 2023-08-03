export default class Location {
    id: number
    lat: number
    long: number
    timestamp: number
    country :string
    city :string
    state :string

    constructor(id: number, lat: number, long: number, timestamp: number, country :string, city :string, state :string) {
        this.id = id
        this.lat = lat
        this.long = long
        this.timestamp = timestamp
        this.country = country
        this.city = city
        this.state = state
    }
}