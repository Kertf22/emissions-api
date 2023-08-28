import prisma from "../../../database/prisma-client";
import CO2 from "../../../models/co2";
import { AverageEmissionsQueryResponse, MostCommonFontsQueryResponse } from "../../../types";
import CO2Repository from "../../contracts/CO2Repository";
import { Prisma, co2 } from "@prisma/client";

export default class PrismaCO2Repository implements CO2Repository {
  async getCountryInfo(country: string): Promise<any> {
    const data = await prisma.co2.groupBy({
      where: {
        country: {
          equals: country,
        },
      },
      by: ["country"],
      _avg: {
        total: true,
      },
      _sum: {
        coal: true,
        gas: true,
        flaring: true,
        cement: true,
        oil: true,
      },
    });

    const format = data.map(({ _sum, _avg, country }) => ({
      ..._sum,
      ..._avg,
      country,
    }));

    return format;
  }
  async getCountries(): Promise<any> {
    const countries = await prisma.co2.findMany({
      distinct: "country",
      select: {
        country: true,
      },
    });
    console.log(countries)
    return countries
  }
  async getCountryByYear(country: string, year: number): Promise<any> {
    const data = await prisma.co2.groupBy({
      where: {
        country: {
          equals: country,
        },
        year: {
          equals: year,
        },
      },
      by: ["year", "country"],
      _sum: {
        coal: true,
        gas: true,
        flaring: true,
        cement: true,
        oil: true,
      },
      orderBy: {
        year: "desc",
      },
    });

    const format = data.map(({ _sum, country, year }) => ({
      ..._sum,
      country,
      year,
    }));
    return format;
  }

  async getYear(year: number): Promise<any> {
    const years = await prisma.co2.findMany({
      where: {
        year: {
          gte: Number(year),
        },
      },
      distinct: "year",
      select: {
        year: true,
      },
    });

    const data = await prisma.co2.groupBy({
      where: {
        year: {
          gt: Number(year),
        },
      },
      by: ["country", "year"],
      _sum: {
        total: true,
        coal: true,
        gas: true,
        flaring: true,
        cement: true,
        oil: true,
      },
      orderBy: {
        year: "desc",
      },
    });

    const format = years.map(({ year }) => {
      return {
        year,
        countries: [
          ...data
            .filter((d) => d.year === year)
            .map(({ _sum, country }) => ({
              country,
              ..._sum,
            })),
        ],
      };
    });

    return format;
  }

  async getAverageEmissions(
    country: string = "Brazil",
    lastYears: number = 10
  ): Promise<any> {
    const data: AverageEmissionsQueryResponse = await prisma.$queryRaw`
      SELECT AVG(total) AS media_emissao
  FROM co2
  WHERE country = ${country}
      AND year >= (SELECT MAX(year) - ${Number(lastYears) - 1} FROM co2)
      AND year <= (SELECT MAX(year) FROM co2);
      `;
    const mapped = data.map((d) => ({
      ...d,
      media_emissao: Number(d.media_emissao),
    }));

    return mapped;
  }

  async getMostCommonFonts(amount: number = 6): Promise<any> {
    const data: MostCommonFontsQueryResponse = await prisma.$queryRaw`
      SELECT fonte, COUNT(fonte) AS total_registros_fonte
      FROM (
          SELECT 'coal' AS fonte
          FROM co2
          WHERE coal > 0
      
          UNION ALL
          
          SELECT 'oil' AS fonte
          FROM co2
          WHERE oil > 0
      
          UNION ALL
          
          SELECT 'gas' AS fonte
          FROM co2
          WHERE gas > 0
          
          
          UNION ALL
          
          SELECT 'cement' AS fonte
          FROM co2
          WHERE cement > 0
          
          
          UNION ALL
          
          SELECT  'flaring' AS fonte
          FROM co2
          WHERE flaring > 0
          
          UNION ALL
          
          SELECT 'other' AS fonte
          FROM co2
          WHERE other > 0
          
      ) AS subquery
      GROUP BY fonte
      ORDER BY total_registros_fonte DESC
      LIMIT ${+amount};
          `;
    const mapped = data.map((d: any) => ({
      ...d,
      total_registros_fonte: Number(d.total_registros_fonte),
    }));

    return mapped;
  }

  async getTotalByCountryCount(count: number, order: string): Promise<any> {
    const data = await prisma.co2.groupBy({
      by: ['country'],
      _sum: {
        total: true,
        per_capita: true,
      },
      take: Number(count),
      orderBy: {
        _sum: {
          [order]: "desc"
        }
      }
    });

    const format = data.map(({ _sum: { total, per_capita }, country, }) => ({
      country, total, per_capita,
    }))

    return format;
  }

  save(user: CO2): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
