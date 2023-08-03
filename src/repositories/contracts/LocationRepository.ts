import Location from "../../models/location";


export default interface LocationRepository {
    getHistory(): Promise<Location[]>;
    save(location: Location): Promise<void>;
}