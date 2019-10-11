import {ILogMessage} from "./interfaces/ILogMessage";
import {LogLevel} from "./constants/LogLevel";
import {ILoggerChannel} from "./interfaces/ILoggerChannel";
import * as format from "date-format";

export class Console implements ILoggerChannel {
    private format: string = "hh:mm:ss.SSS";

    public setFormat(format: string) {
        this.format = format;
    }

    public async write(message: ILogMessage) {
        const date = new Date(message.timestamp * 1000);
        const timeStr = format.asString(this.format, date);

        let level = message.level;

        if (level.length < LogLevel.WARNING.length) {
            level += " ".repeat(LogLevel.WARNING.length - level.length);
        }

        console.log(`${timeStr} ${level.toUpperCase()} ${message.message}`);
    }
}
