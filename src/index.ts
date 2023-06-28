import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from "cors"
const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

// Para determinado limite de paises retorne os quem maior emissão

app.get(`/co2-total/:paises_count/:ordem`, async (req, res) => {

  const { paises_count, ordem } = req.params;
  try {
    const data = await prisma.co2.groupBy({
      by: ['country'],
      _sum: {
        total: true,
        per_capita: true,
      },
      take: Number(paises_count),
      orderBy: {
        _sum: {
          [ordem]: "desc"
        }
      }
    });

    const format = data.map(({ _sum: { total, per_capita }, country, }) => ({
      country, total, per_capita,
    }))
    res.status(200)
    res.send(format);
    res.end()
  } catch (err) {
    res.status(500)
    res.send({
      message: "Aconteceu um erro"
    });
    res.end()
  }
});


// Dado um pais retorne dados
app.get(`/country-info/:country`, async (req, res) => {
  try {
    const { country } = req.params;
    const data = await prisma.co2.groupBy({
      where: {
        country: {
          equals: country
        },
      },
      by: ['country'],
      _avg: {
        total: true,
      },
      _sum: {
        coal: true,
        gas: true,
        flaring: true,
        cement: true,
        oil: true,
      }
    });

    const format = data.map(({ _sum, _avg, country }) => ({
      ..._sum,
      ..._avg,
      country,
    }))

    res.status(200)
    res.send(format);
    res.end()
  } catch (err) {
    res.status(500)
    res.send({
      message: "Aconteceu um erro"
    });
    res.end()
  }

});


// Dado um pais retorne dados
app.get(`/country/:country/:ano`, async (req, res) => {
  try {
    const { country, ano } = req.params;
    const data = await prisma.co2.groupBy({
      where: {
        country: {
          equals: country
        },
        year: {
          gte: Number(ano)
        }
      },
      by: ['year', 'country'],
      _sum: {
        coal: true,
        gas: true,
        flaring: true,
        cement: true,
        oil: true,
      },
      orderBy: {
        year: 'desc',
      }

    });

    const format = data.map(({ _sum, country, year }) => ({
      ..._sum,
      country, year
    }))

    res.status(200)
    res.send(format);
    res.end()
  } catch (err) {
    res.status(500)
    res.send({
      message: "Aconteceu um erro"
    });
    res.end()
  }

});

// Para um ano retorne todas infos

app.get(`/year-total/:ano`, async (req, res) => {
  const { ano } = req.params;

  try {
    const years = await prisma.co2.findMany({
      where: {
        year: {
          gte: Number(ano)
        }
      },
      distinct: 'year',
      select: {
        year: true
      }
    })


    const data = await prisma.co2.groupBy({
      where: {
        year: {
          gt: Number(ano)
        }
      },
      by: ['country', 'year'],
      _sum: {
        total: true,
        coal: true,
        gas: true,
        flaring: true,
        cement: true,
        oil: true,
      },
      orderBy: {
        year: 'desc',
      }
    });

    const format = years.map(({ year }) => {
      return {
        year,
        countries: [
          ...data.filter(d => d.year === year).map(({ _sum, country }) => ({
            country,
            ..._sum
          }))
        ]
      }
    })

    res.status(200)
    res.send(format);
    res.end()
  } catch (err) {
    res.status(500)
    res.send({
      message: "Aconteceu um erro"
    });
    res.end()
  }

});

app.get(`/country`, async (req, res) => {
  try {
    const data = await prisma.co2.findMany({
      distinct: 'country',
      select: {
        country: true
      }
    })
    res.status(200)
    res.send(data);
    res.end()
  } catch (err) {
    res.status(500)
    res.send({
      message: "Aconteceu um erro"
    });
    res.end()
  }
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
