declare namespace NodeJS {
    interface ILogger {
        info(...args);

        warn(...args);

        error(...args);

        debug(...args);

        fatal(...args);

        setBot(...args);
    }

    interface Global {
        logger: ILogger;
    }
}
