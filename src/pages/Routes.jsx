import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { HOME, MY_WATCH_LIST, HOME_PAGE_NUMBER } from '../Constants/routes';
import { Home, MyWatchList } from './index';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={HOME_PAGE_NUMBER} component={Home} />
                <Route path={MY_WATCH_LIST} component={MyWatchList} />
                <Route path={HOME}>
                    <Redirect to={HOME_PAGE_NUMBER}/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;