import { Env } from "@0x84d0u/protocool";
import app from "./app";
import { logger } from "./lib";

const port = Env.variable('PORT')

app.listen(port, () => {
    logger.info(`🚀 Running on port ${port} : http://localhost:${port}`)
})