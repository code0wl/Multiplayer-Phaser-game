import { Observable } from 'rxjs';

export module StopWatch {

    const input = document.querySelector('.input');
    const startButton = document.querySelector('.start');
    const stopButton = document.querySelector('.stop');
    const resetButton = document.querySelector('.resetButton');
    const halfButton = document.querySelector('.half');
    const quarterButton = document.querySelector('.quarter');

    const stop$ = Observable.fromEvent(stopButton, 'click');
    const start$ = Observable.fromEvent(startButton, 'click');
    const reset$ = Observable.fromEvent(resetButton, 'click');
    const half$ = Observable.fromEvent(halfButton, 'click');

    const quarter$ = Observable.fromEvent(quarterButton, 'click');

    const input$ = Observable
        .fromEvent(input, 'input')
        .map((ev: any) => ev.target.value)
        .filter(x => x);

    const startNumber: any = 0;

    const inc = (acc, cur) => acc + 1;

    const reset = acc => startNumber;

    const timeControl$ = Observable.merge(
        start$.mapTo(1000),
        half$.mapTo(500),
        quarter$.mapTo(250));

    const speedControl = (time) => Observable.merge(
        Observable
            .interval(time)
            .takeUntil(stop$)
            .mapTo(inc),
        
        reset$
            .mapTo(reset)
    );

    timeControl$
        .switchMap(speedControl)
        .startWith(startNumber)
        .scan((acc, cur) => cur(acc))

    Observable
        .combineLatest(timeControl$, input$)
        .subscribe((x) => console.log(x));
}
