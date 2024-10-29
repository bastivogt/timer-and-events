import { Event, EventEmitter, EventEmitterAdvanced } from "./sevo/events.mjs";

export class CounterEvent extends Event {
    static COUNTER_START = "COUNTER_START";
    static COUNTER_CHANGE = "COUNTER_CHANGE";
    static COUNTER_FINISH = "COUNTER_FINISH";

    constructor(type, sender, params) {
        super(type, sender, params);
    }
}

export class Counter {
    constructor(start = 0, stop = 10, step = 1) {
        this._eventEmitter = new EventEmitter();
        this._start = start;
        this._stop = stop;
        this._step = step;
        this._count = this._start;
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

    get count() {
        return this._count;
    }

    run() {
        this._counter = this._start;
        this._eventEmitter.emit(
            new CounterEvent(CounterEvent.COUNTER_START, this, {
                count: this._count,
            })
        );
        for (; this._count < this._stop; this._count += this._step) {
            this._eventEmitter.emit(
                new CounterEvent(CounterEvent.COUNTER_CHANGE, this, {
                    count: this._count,
                })
            );
        }
        this._eventEmitter.emit(
            new CounterEvent(CounterEvent.COUNTER_FINISH, this, {
                count: this._count,
            })
        );
    }
}
