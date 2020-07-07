export interface ILogMessage {
    message: string;
    code?: number;
    level: string;
    payload?: any;
    timestamp?: number;
}
