
import express from 'express'
import cors from "cors"
import appRoutes from './routes'

const app = express()

app.use(express.json())
app.use(cors())



app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)

app.use(appRoutes);