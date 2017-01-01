import { Observable } from 'rxjs';
import 'whatwg-fetch';

export module UserSearch {
    const refreshEl = document.querySelector('button');

    const request$ = Observable
        .fromPromise(requestUrl())
        .flatMap(extractData);

    const refreshClickStream$ = Observable
        .fromEvent(refreshEl, 'click')
        .do(x => console.log(x))
        .merge(request$)

    function extractData(data) {
        return data.json();
    }

    function requestUrl() {
        return fetch('http://api.github.com/users?since=' + Math.floor(Math.random() * 500));
    }

    function renderUsers(users) {
        const list = document.createElement('ul');
        document.body.appendChild(list)

        return users
            .filter((user, index) => index < 4)
            .map((user, index) => {
                const div = document.createElement('div');
                const image = document.createElement('img');
                const listItem = document.createElement('li');
                div.textContent = user.login;
                image.src = user.avatar_url;
                listItem.appendChild(div);
                listItem.appendChild(image);
                list.appendChild(listItem);
                list.appendChild(listItem)
            })
    }

    request$
        .map(renderUsers)
        .subscribe();
}