import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {App} from 'App';
import {Route, BrowserRouter} from 'react-router-dom';

import 'semantic.css';


const store = {
    descriptor: {}, // TODO add store
};


const Router = () => (
    <BrowserRouter>
        <Route path="/" render={App}/>
    </BrowserRouter>
);

ReactDOM.render(
    <Provider {...store}>
        <Router/>
         </Provider>,
    document.getElementById('root') as HTMLElement
);