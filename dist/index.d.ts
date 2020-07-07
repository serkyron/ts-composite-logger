import { ILoggerChannel } from "./interfaces/ILoggerChannel";
import { ILoggerPayload } from "./interfaces/ILoggerPayload";
export { Console } from "./Console";
export { LogLevel } from "./constants/LogLevel";
export { ILoggerChannel } from "./interfaces/ILoggerChannel";
export { ILoggerPayload } from "./interfaces/ILoggerPayload";
export { ILogMessage } from "./interfaces/ILogMessage";
export { LogCode } from "./constants/LogCode";
export declare class Logger {
    private readonly channels;
    private level;
    constructor();
    addChannel(channel: ILoggerChannel): Logger;
    removeChannel(name: string): Logger;
    setLevel(level: string): Logger;
    error(message: string, code?: number, object?: ILoggerPayload): Promise<any>;
    fatal(message: string, code?: number, object?: ILoggerPayload, callback?: Function): Promise<any>;
    warn(message: string, code?: number, object?: ILoggerPayload): Promise<any>;
    info(message: string, code?: number, object?: ILoggerPayload): Promise<any>;
    debug(message: any, code?: number, object?: ILoggerPayload): Promise<any>;
    private static appendDetails;
    private write;
}
