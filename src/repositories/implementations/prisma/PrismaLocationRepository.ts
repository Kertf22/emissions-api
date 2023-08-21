import prisma from "../../../database/prisma-client";
import LocationRepository from "../../contracts/LocationRepository";
import Location from "../../../models/location";

export default class PrismaLocationRepository implements LocationRepository {
  async getHistory(): Promise<any[]> {
    const locations = await prisma.history_location.groupBy({
      by: ["city", "country", "state"],
      _count: {
        city: true,
        country: true,
        state: true,
      },
    });
    console.log(locations);
    return locations;
  }
  async save(location: Location): Promise<void> {
    await prisma.history_location.create({
      data: {
        lat: location.lat,
        long: location.long,
        timestamp: location.timestamp,
        country: location.country,
        city: location.city,
        state: location.state,
      },
    });
  }
}
