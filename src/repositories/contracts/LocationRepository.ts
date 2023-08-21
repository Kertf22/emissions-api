import Location from "../../models/location";

export default interface LocationRepository {
  getHistory(): Promise<any[]>;
  save(location: Location): Promise<void>;
}
