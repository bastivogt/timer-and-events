import { Counter, CounterEvent } from "./counter.mjs";
import { EventEmitterAdvanced } from "./sevo/events.mjs";
import { Timer, TimerEvent, TimerState } from "./sevo/timer.mjs";

// const c = new Counter();

// c.eventEmitter.on(CounterEvent.COUNTER_START, (e) => {
//     console.log(e.type, e.sender.count, e.params, e.params.count);
// });

// c.eventEmitter.on(CounterEvent.COUNTER_CHANGE, (e) => {
//     console.log(e.type, e.sender.count, e.params, e.params.count);
// });

// c.eventEmitter.on(CounterEvent.COUNTER_FINISH, (e) => {
//     console.log(e.type, e.sender.count, e.params, e.params.count);
// });

// c.run();
// console.log(c.eventEmitter.listeners);

const c2 = new Counter();

c2.eventEmitter = new EventEmitterAdvanced();
//c2.eventEmitter = new Object();

function c2_counterStart(e) {
    console.log(e.type, e.sender.count, e.params, e.params.count);
    // e.sender.eventEmitter.clear();
}

function c2_counterChange(e) {
    console.log(e.type, e.sender.count, e.params, e.params.count);
}

function c2_counterFinish(e) {
    console.log(e.type, e.sender.count, e.params, e.params.count);
}

c2.eventEmitter.on(CounterEvent.COUNTER_START, c2_counterStart);
c2.eventEmitter.on(CounterEvent.COUNTER_CHANGE, c2_counterChange);
c2.eventEmitter.on(CounterEvent.COUNTER_FINISH, c2_counterFinish);

//c2.eventEmitter.off(CounterEvent.COUNTER_CHANGE, c2_counterChange);
// c2.eventEmitter.clear();
c2.run();

console.log("-------------------------------");

const t1 = new Timer(1000, 3);

t1.eventEmitter.on(TimerEvent.TIMER_TICK, (e) => {
    console.log(e.type, e.params);
});

t1.eventEmitter.on(TimerEvent.TIMER_START, (e) => {
    console.log(e.type, e.params);
});

t1.eventEmitter.on(TimerEvent.TIMER_STOP, (e) => {
    console.log(e.type, e.params);
});

t1.start();

const timeout = new Timer(3000, 0);
let startTime = 0;
let endTime = 0;
timeout.eventEmitter.on(TimerEvent.TIMER_START, (e) => {
    console.log("start timeout", e.type, e.params);
    startTime = new Date().getTime();
});

timeout.eventEmitter.on(TimerEvent.TIMER_STOP, (e) => {
    console.log("end timeout", e.type, e.params);
    endTime = new Date().getTime();
    console.log("timeout time:", endTime - startTime);
});

timeout.start();
