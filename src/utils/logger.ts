import pino from "pino";
import dayjs from "dayjs";

const transport = pino.transport({
    target: "pino-pretty",
    options: { colorize: true },
});

const log = pino(
    {
        base: {
            pid: false,
        },
        timestamp: () => `,"time": "${dayjs().format("DD/MM/YYYY HH:mm:ss")}"`,
    },
    transport
);

export default log;
