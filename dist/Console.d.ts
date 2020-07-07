import { ILogMessage } from "./interfaces/ILogMessage";
import { ILoggerChannel } from "./interfaces/ILoggerChannel";
export declare class Console implements ILoggerChannel {
    private format;
    setFormat(format: string): void;
    write(message: ILogMessage): Promise<void>;
}
