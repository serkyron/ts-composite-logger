import { ILogMessage } from "./ILogMessage";
export interface ILoggerChannel {
    write(message: ILogMessage): any;
}
