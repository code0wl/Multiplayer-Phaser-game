import { Observable } from 'rxjs';

export module StopWatch {

    const startButton = document.querySelector('.start');
    const stopButton = document.querySelector('.stop');
    const resetButton = document.querySelector('.resetButton');
    const startNumber: any = 0;
    const stop$ = Observable.fromEvent(stopButton, 'click');
    const start$ = Observable.fromEvent(startButton, 'click');
    const reset$ = Observable.fromEvent(resetButton, 'click');

    const interval$ = Observable.interval(1000);

    const stopInterval$ = interval$
        .takeUntil(stop$)

    const inc = (acc, cur) => acc + 1;

    const reset = acc => startNumber;

    const timerChannel$ = Observable.merge(
        stopInterval$.mapTo(inc),
        reset$.mapTo(reset)
    );

    start$
        .switchMapTo(timerChannel$)
        .startWith(startNumber)
        .scan((acc, cur) => cur(acc))
        .subscribe(x => console.log(x));
}