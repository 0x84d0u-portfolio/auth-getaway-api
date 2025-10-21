import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import api from "./api";

import { ExpressLogger } from "@0x84d0u/protocool/express";
import { logger } from "./lib";


const app = express();

app.use(ExpressLogger.requestsMiddleware(logger));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api", api);

export default app