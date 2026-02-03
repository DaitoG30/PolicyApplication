import express from "express"
import { PORT } from "./config/env.js";
import { sequelize } from "./Database-Manager/DatabaseManger.js";
import policyEndpoint from "./Routes/BackEnd/policy.endpoint.js";
import cors from "cors"
import policyTypeEndpoint from "./Routes/BackEnd/policyType.endpoint.js";

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ origin: 'http://localhost:5173' })); // Allow your frontend
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use('/api/policy', policyEndpoint)
app.use('/api/policyType', policyTypeEndpoint)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, async () => {
    console.log(`Example app listening at http://localhost:${PORT}`);

    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

});


export default app;