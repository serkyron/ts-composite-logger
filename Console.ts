import {ILogMessage} from "./interfaces/ILogMessage";
import {LogLevel} from "./constants/LogLevel";
import {ILoggerChannel} from "./interfaces/ILoggerChannel";
import {dateFormat} from "dateformat";

export class Console implements ILoggerChannel {
    private format: string = "HH:MM:SS.l";

    public setFormat(format: string) {
        this.format = format;
    }

    public async write(message: ILogMessage) {
        const date = new Date(message.timestamp * 1000);
        const timeStr = dateFormat(date, this.format);

        let level = message.level;

        if (level.length < LogLevel.WARNING.length) {
            level += " ".repeat(LogLevel.WARNING.length - level.length);
        }

        console.log(`${timeStr} ${level.toUpperCase()} ${message.message}`);
    }
}
