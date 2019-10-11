import {ILogMessage} from "./interfaces/ILogMessage";
import {LogLevel} from "./constants/LogLevel";
import {ILoggerChannel} from "./interfaces/ILoggerChannel";

export class Console implements ILoggerChannel {
    public async write(message: ILogMessage) {
        const date = new Date(message.timestamp * 1000);
        const timeStr = this.getTimeStr(date);

        let level = message.level;

        if (level.length < LogLevel.WARNING.length) {
            level += " ".repeat(LogLevel.WARNING.length - level.length);
        }

        console.log(`${timeStr} ${level.toUpperCase()} ${message.message}`);
    }

    private getTimeStr(date: Date) {
        let hours: string|number = date.getHours();
        hours = hours < 10 ? `0${hours}` : hours;

        let minutes: string|number = date.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        let seconds: string|number = date.getSeconds();
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        let milliseconds: string|number = date.getMilliseconds();

        if (milliseconds < 10) {
            milliseconds = `00${milliseconds}`;
        }

        if (milliseconds > 10 && milliseconds < 100) {
            milliseconds = `0${milliseconds}`;
        }

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
}
