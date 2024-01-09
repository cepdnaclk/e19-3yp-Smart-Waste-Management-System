export default class PingTimer {
    private keepalive;
    private timer;
    private checkPing;
    private _setTimeout;
    private _clearTimeout;
    constructor(keepalive: number, checkPing: () => void);
    private setup;
    clear(): void;
    reschedule(): void;
}
