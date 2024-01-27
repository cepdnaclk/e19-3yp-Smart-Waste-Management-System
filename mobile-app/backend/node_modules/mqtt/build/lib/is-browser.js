"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWebWorker = void 0;
const isStandardBrowserEnv = () => typeof window !== 'undefined' && typeof window.document !== 'undefined';
const isWebWorkerEnv = () => {
    var _a, _b;
    return Boolean(typeof self === 'object' &&
        ((_b = (_a = self === null || self === void 0 ? void 0 : self.constructor) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.includes('WorkerGlobalScope')));
};
const isReactNativeEnv = () => typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
const isBrowser = isStandardBrowserEnv() || isWebWorkerEnv() || isReactNativeEnv();
exports.isWebWorker = isWebWorkerEnv();
exports.default = isBrowser;
//# sourceMappingURL=is-browser.js.map