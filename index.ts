import LogCode from "./constants/LogCode";
import {ILoggerChannel} from "./interfaces/ILoggerChannel";
import {LogLevel} from "./constants/LogLevel";
import {ILogMessage} from "./interfaces/ILogMessage";
import allSettled from "promise-all-settled";
import {ILoggerPayload} from "./interfaces/ILoggerPayload";
import {LogWeight} from "./constants/LogWeight";

export class Logger {
    private readonly channels: ILoggerChannel[];
    private level;

    constructor() {
        this.level = LogLevel.DEBUG;
        this.channels = [];
    }

    public addChannel(channel: ILoggerChannel): void {
        this.channels.push(channel);
    }

    public removeChannel(name: string): ILoggerChannel[] {
        for (const i in this.channels) {
            if (this.channels[i].constructor.name === name) {
                return this.channels.splice(parseInt(i), 1);
            }
        }

        throw new Error(`Failed to remove channel: ${name}`)
    }

    public setLevel(level: string): void {
        if (!Object.values(LogLevel).includes(level)) {
            throw new Error(`Unexpected log level: ${level}`);
        }

        this.level = level;
    }

    public async error(message: string, code: number = LogCode.GENERAL_ERROR, object: ILoggerPayload = {}) {
        const logMessage: ILogMessage = {
            message,
            level: LogLevel.ERROR,
            payload: object,
            code,
        };

        Logger.appendDetails(logMessage);
        return this.write(logMessage);
    }

    public async fatal(message: string, code: number = LogCode.GENERAL_FATAL, object: ILoggerPayload = {}, callback: Function = () => {}) {
        const logMessage: ILogMessage = {
            message,
            level: LogLevel.FATAL,
            payload: object,
            code,
        };

        Logger.appendDetails(logMessage);
        await this.write(logMessage);
        return callback();
    }

    public async warn(message: string, code: number = LogCode.GENERAL_WARNING, object: ILoggerPayload = {}) {
        const logMessage: ILogMessage = {
            message,
            level: LogLevel.WARNING,
            payload: object,
            code,
        };

        Logger.appendDetails(logMessage);
        return this.write(logMessage);
    }

    public async info(message: string, code: number = LogCode.GENERAL_INFO, object: ILoggerPayload = {}) {
        const logMessage: ILogMessage = {
            message,
            level: LogLevel.INFO,
            payload: object,
            code,
        };

        Logger.appendDetails(logMessage);
        return this.write(logMessage);
    }

    public async debug(message, code: number = LogCode.GENERAL_DEBUG, object: ILoggerPayload = {}) {
        const logMessage: ILogMessage = {
            message,
            level: LogLevel.DEBUG,
            payload: object,
            code,
        };

        Logger.appendDetails(logMessage);
        return this.write(logMessage);
    }

    private static appendDetails(object: ILogMessage) {
        object.timestamp = (new Date()).getTime() / 1000;
    }

    private async write(object: ILogMessage) {
        if (LogWeight[object.level] < LogWeight[this.level]) {
            return;
        }

        const tasks = [];

        for (const channel of this.channels) {
            tasks.push(channel.write(object));
        }

        return allSettled(tasks);
    }
}
