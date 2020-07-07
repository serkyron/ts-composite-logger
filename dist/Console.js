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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogLevel_1 = require("./constants/LogLevel");
const format = __importStar(require("date-format"));
class Console {
    constructor() {
        this.format = "hh:mm:ss.SSS";
    }
    setFormat(format) {
        this.format = format;
    }
    write(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date(message.timestamp * 1000);
            const timeStr = format.asString(this.format, date);
            let level = message.level;
            if (level.length < LogLevel_1.LogLevel.WARNING.length) {
                level += " ".repeat(LogLevel_1.LogLevel.WARNING.length - level.length);
            }
            console.log(`${timeStr} ${level.toUpperCase()} ${message.message}`);
        });
    }
}
exports.Console = Console;
//# sourceMappingURL=Console.js.map