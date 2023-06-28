import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

//Quais são os x países com as maiores emissões de CO2 totais no x registrado?

app.get(`/co2-total/:paises_count`, async (req, res) => {

  const { paises_count } = req.params;

  const data = await prisma.co2.groupBy({
    by: ['country'],
    where: {
      NOT: {
        country: "Global"
      }
    },
    _sum: {
      total: true,
    },
    take:Number(paises_count),
    orderBy: {
      _sum: {
        total: "desc"
      }
    }
  });
  const format = data.map(({ _sum: { total }, country }) => ({
    country, total
  }))
  res.status(200)
  res.send(format);
  res.end()
});

app.get(`/co2-total/:country`, async (req, res) => {
  const data = await prisma.co2.groupBy({
    by: ['country'],
    _sum: {
      total: true,
    },
    orderBy: {
      _sum: {
        total: "desc"
      }
    }
  });

  res.status(200)
  res.send(data);
  res.end()
});


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
