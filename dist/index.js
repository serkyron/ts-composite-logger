"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogCode_1 = require("./constants/LogCode");
const LogLevel_1 = require("./constants/LogLevel");
const promise_all_settled_1 = __importDefault(require("promise-all-settled"));
const LogWeight_1 = require("./constants/LogWeight");
var Console_1 = require("./Console");
exports.Console = Console_1.Console;
var LogLevel_2 = require("./constants/LogLevel");
exports.LogLevel = LogLevel_2.LogLevel;
var LogCode_2 = require("./constants/LogCode");
exports.LogCode = LogCode_2.LogCode;
class Logger {
    constructor() {
        this.level = LogLevel_1.LogLevel.DEBUG;
        this.channels = [];
    }
    addChannel(channel) {
        this.channels.push(channel);
        return this;
    }
    removeChannel(name) {
        for (const i in this.channels) {
            if (this.channels[i].constructor.name === name) {
                this.channels.splice(parseInt(i), 1);
                return this;
            }
        }
        throw new Error(`Failed to remove channel: ${name}`);
    }
    setLevel(level) {
        if (!Object.values(LogLevel_1.LogLevel).includes(level)) {
            throw new Error(`Unexpected log level: ${level}`);
        }
        this.level = level;
        return this;
    }
    error(message, code = LogCode_1.LogCode.GENERAL_ERROR, object = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const logMessage = {
                message,
                level: LogLevel_1.LogLevel.ERROR,
                payload: object,
                code,
            };
            Logger.appendDetails(logMessage);
            return this.write(logMessage);
        });
    }
    fatal(message, code = LogCode_1.LogCode.GENERAL_FATAL, object = {}, callback = () => { }) {
        return __awaiter(this, void 0, void 0, function* () {
            const logMessage = {
                message,
                level: LogLevel_1.LogLevel.FATAL,
                payload: object,
                code,
            };
            Logger.appendDetails(logMessage);
            yield this.write(logMessage);
            return callback();
        });
    }
    warn(message, code = LogCode_1.LogCode.GENERAL_WARNING, object = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const logMessage = {
                message,
                level: LogLevel_1.LogLevel.WARNING,
                payload: object,
                code,
            };
            Logger.appendDetails(logMessage);
            return this.write(logMessage);
        });
    }
    info(message, code = LogCode_1.LogCode.GENERAL_INFO, object = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const logMessage = {
                message,
                level: LogLevel_1.LogLevel.INFO,
                payload: object,
                code,
            };
            Logger.appendDetails(logMessage);
            return this.write(logMessage);
        });
    }
    debug(message, code = LogCode_1.LogCode.GENERAL_DEBUG, object = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const logMessage = {
                message,
                level: LogLevel_1.LogLevel.DEBUG,
                payload: object,
                code,
            };
            Logger.appendDetails(logMessage);
            return this.write(logMessage);
        });
    }
    static appendDetails(object) {
        object.timestamp = (new Date()).getTime() / 1000;
    }
    write(object) {
        return __awaiter(this, void 0, void 0, function* () {
            if (LogWeight_1.LogWeight[object.level] < LogWeight_1.LogWeight[this.level]) {
                return;
            }
            const tasks = [];
            for (const channel of this.channels) {
                tasks.push(channel.write(object));
            }
            return promise_all_settled_1.default(tasks);
        });
    }
}
exports.Logger = Logger;
//# sourceMappingURL=index.js.map