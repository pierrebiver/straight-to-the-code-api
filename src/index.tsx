import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {App} from 'App';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import {DescriptorStore} from "stores/Descriptor";
import Add from "components/Add";


import 'semantic/dist/semantic.css';


const store = {
    descriptorStore: DescriptorStore.create(),
};


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/add-edit" component={Add}/>
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(
    <Provider {...store}>
        <Router/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);