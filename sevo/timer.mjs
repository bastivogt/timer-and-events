import { EventEmitter, Event } from "./events.mjs";

export class TimerEvent extends Event {
    static TIMER_TICK = "TIMER_TICK";
    static TIMER_START = "TIMER_START";
    static TIMER_STOP = "TIMER_STOP";
    static TIMER_PAUSE = "TIMER_PAUSE";
}

export const TimerState = {
    RUNNING: "RUNNING",
    PAUSED: "PAUSED",
    STOPPED: "STOPPED",
    NONE: "NONE",
};

export class Timer {
    constructor(time, loop = -1) {
        this.reset(time, loop);
        this._eventEmitter = new EventEmitter();
    }

    reset(time, loop = -1) {
        this._time = time;
        this._loop = loop;
        this._intervalID = 0;
        this._count = 0;
        this._state = TimerState.NONE;
    }

    get count() {
        return this._count;
    }

    get state() {
        return this._state;
    }

    get loop() {
        return this._loop;
    }

    get time() {
        return this._time;
    }

    start() {
        if (
            this._state === TimerState.STOPPED ||
            this._state === TimerState.PAUSED ||
            this._state === TimerState.NONE
        ) {
            //this._count++;
            this._state = TimerState.RUNNING;
            this._eventEmitter.emit(
                new TimerEvent(TimerEvent.TIMER_START, this, {
                    count: this._count,
                    state: this._state,
                })
            );
            this._intervalID = setInterval(() => {
                if (this._loop < 0 || this._count < this._loop) {
                    this._count++;
                    this._eventEmitter.emit(
                        new TimerEvent(TimerEvent.TIMER_TICK, this, {
                            count: this._count,
                            state: this._state,
                        })
                    );
                } else {
                    this.stop();
                }
            }, this._time);
        }
    }

    stop() {
        if (
            this._state === TimerState.RUNNING ||
            this._state === TimerState.PAUSED
        ) {
            clearInterval(this._intervalID);
            this._count = 0;
            this._state = TimerState.STOPPED;
            this._eventEmitter.emit(
                new TimerEvent(TimerEvent.TIMER_STOP, this, {
                    count: this._count,
                    state: this._state,
                })
            );
        }
    }

    pause() {
        if (this._state === TimerState.RUNNING) {
            clearInterval(this._intervalID);
            this._eventEmitter.emit(TimerEvent.TIMER_PAUSE, this, {
                count: this._count,
                state: this._state,
            });
        }
    }

    clear() {
        clearInterval(this._intervalID);
        this._count = 0;
        this._state = TimerState.NONE;
    }

    set eventEmitter(value) {
        if (
            value instanceof EventEmitter ||
            value instanceof EventEmitterAdvanced
        ) {
            this._eventEmitter = value;
        } else {
            throw new Error(
                "This value is not an instance EventEmitter or EventEmitterAdvanced!"
            );
        }
    }

    get eventEmitter() {
        return this._eventEmitter;
    }
}
