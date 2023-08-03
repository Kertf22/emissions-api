import prisma from "../../../database/prisma-client";
import LocationRepository from "../../contracts/LocationRepository";
import Location from "../../../models/location";

export default class PrismaLocationRepository implements LocationRepository {
  async getHistory(): Promise<Location[]> {
    const locations = await prisma.history_location.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });
    return locations.map(
      (location) =>
        new Location(
          location.id,
          location.lat,
          location.long,
          location.timestamp,
          location.country,
          location.city,
          location.state
        )
    );
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
