import { Observable } from 'rxjs';

export module StopWatch {

    const startButton = document.querySelector('.start');
    const stopButton = document.querySelector('.stop');

    const stop$ = Observable.fromEvent(stopButton, 'click');
    const start$ = Observable.fromEvent(startButton, 'click')
    const interval$ = Observable.interval(1000);

    const stopInterval$ = interval$
        .do(() => console.log('what am i?'))
        .takeUntil(stop$)

    start$
        .switchMapTo(stopInterval$)
        .subscribe(x => console.log(x));
}