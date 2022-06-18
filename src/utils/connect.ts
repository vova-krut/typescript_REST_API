import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

function connect() {
    const dbUri = config.get<string>("dbUri");

    return mongoose
        .connect(dbUri)
        .then(() => {
            logger.info(`Connected to DB`);
        })
        .catch((e) => {
            logger.error(`Could not connect to a DB`);
            process.exit(1);
        });
}

export default connect;
