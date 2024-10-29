export class Event {
    constructor(type, sender, params = {}) {
        this._type = type;
        this._sender = sender;
        this._params = params;
    }

    get type() {
        return this._type;
    }

    get sender() {
        return this._sender;
    }

    get params() {
        return this._params;
    }
}

export class EventEmitter {
    constructor() {
        this._listeners = {};

        // aliases
        this.addListener = this.on;
        this.removeListener = this.off;
        this.clearListeners = this.clear;
    }

    hasListener(type) {
        return type in this._listeners;
    }

    on(type, listener) {
        if (!this.hasListener(type) && typeof listener === "function") {
            this._listeners[type] = listener;
            return true;
        }
        return false;
    }

    off(type, listener = null) {
        if (this.hasListener(type)) {
            delete this._listeners[type];
            return true;
        }
        return false;
    }

    emit(event) {
        if (
            this.hasListener(event.type) &&
            typeof this._listeners[event.type] === "function"
        ) {
            this._listeners[event.type](event);
            return true;
        }
        return false;
    }

    clear() {
        this._listeners = {};
    }

    get listeners() {
        return { ...this._listeners };
    }
}

export class EventEmitterAdvanced {
    constructor() {
        this._listeners = [];
        // aliases
        this.addListener = this.on;
        this.removeListener = this.off;
        this.clearListeners = this.clear;
    }

    hasListener(type, listener) {
        for (let i = 0; i < this._listeners.length; i++) {
            if (
                this._listeners[i].type === type &&
                this._listeners[i].listener === listener
            ) {
                return true;
            }
        }
        return false;
    }

    on(type, listener) {
        if (!this.hasListener(type, listener)) {
            this._listeners.push({ type: type, listener: listener });
            return true;
        }
        return false;
    }

    off(type, listener) {
        if (this.hasListener(type, listener)) {
            for (let i = 0; i < this._listeners.length; i++) {
                if (
                    this._listeners[i].type === type &&
                    this._listeners[i].listener === listener
                ) {
                    this._listeners.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }

    emit(event) {
        for (let i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i].type === event.type) {
                this._listeners[i].listener(event);
                return true;
            }
        }
        return false;
    }

    clear() {
        this._listeners = [];
    }

    get listeners() {
        return [...this._listeners];
    }
}
