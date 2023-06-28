import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Para determinado limite de paises retorne os quem maior emissão
app.get(`/co2-total/:paises_count`, async (req, res) => {

  const { paises_count } = req.params;
  const { ordem } = req.query;

  const data = await prisma.co2.groupBy({
    by: ['country'],
    where: {
      NOT: {
        country: "Global"
      }
    },
    _sum: {
      total: true,
      per_capita: true,
    },
    take: Number(paises_count),
    orderBy: {
      _sum: {
        total: "desc"
      }
    }
  });

  const format = data.map(({ _sum: { total, per_capita }, country, }) => ({
    country, total, per_capita,
  }))
  res.status(200)
  res.send(format);
  res.end()
});

// Dado um pais retorne dados
app.get(`/country/:country/:ano`, async (req, res) => {
  const { country, ano } = req.params;
  const data = await prisma.co2.groupBy({
    where: {
      country: {
        equals: country
      },
      year: {
        gt: Number(ano)
      }
    },
    by: ['year', 'country'],
    _sum: {
      coal: true,
      gas: true,
      flaring: true,
      cement: true,
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
});

// Para um ano retorne todas infos

app.get(`/year-total/:ano`, async (req, res) => {
  const { ano } = req.params;
  const data = await prisma.co2.groupBy({
    where: {
      year: {
        gt: Number(ano)
      }
    },
    by: ['country', 'year'],
    _sum: {
      total: true,
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
});

app.get(`/country`, async (req, res) => {
  const data = await prisma.co2.findMany({
    distinct: 'country',
    select: {
      country: true
    }
  })
  res.status(200)
  res.send(data);
  res.end()
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
