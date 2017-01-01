import { Observable } from 'rxjs';
import 'whatwg-fetch';

export module ObservablesFromScratch {
    'use strict';

    // of
    const data = '1,3,4,5,6,6,7';
    const bar = Observable.fromEventPattern(add, remove);
    
    function add () {

    }

    function remove() {

    }

    bar.subscribe(x => console.log(data));

    // from array
    const dataArray = [1, 2, 3, 4, 5, 6, 7];
    Observable
        .from(dataArray)
        .subscribe(x => console.log(x));

    

}