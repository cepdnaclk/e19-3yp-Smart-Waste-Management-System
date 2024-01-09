"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_timers_1 = require("worker-timers");
const is_browser_1 = __importStar(require("./is-browser"));
class PingTimer {
    constructor(keepalive, checkPing) {
        this._setTimeout = is_browser_1.default && !is_browser_1.isWebWorker
            ? worker_timers_1.setTimeout
            : (func, time) => setTimeout(func, time);
        this._clearTimeout = is_browser_1.default && !is_browser_1.isWebWorker ? worker_timers_1.clearTimeout : (timer) => clearTimeout(timer);
        this.keepalive = keepalive * 1000;
        this.checkPing = checkPing;
        this.setup();
    }
    setup() {
        this.timer = this._setTimeout(() => {
            this.checkPing();
            this.reschedule();
        }, this.keepalive);
    }
    clear() {
        if (this.timer) {
            this._clearTimeout(this.timer);
            this.timer = null;
        }
    }
    reschedule() {
        this.clear();
        this.setup();
    }
}
exports.default = PingTimer;
//# sourceMappingURL=PingTimer.js.map