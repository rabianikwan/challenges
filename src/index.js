import express from 'express';
import dotenv from 'dotenv';
import dishesRoutes from "./router/dishes.routes";
dotenv.config()
const app = express();
const port = process.env.PORT;

app.use(dishesRoutes)

app.listen(port, () => console.log('server has run http://localhost:' + port))