import React from 'react';
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from './common/private-route';
import Header from './common/header';
import Footer from './common/footer';
import Login from "./pages/login-page";
import Main from "./pages/main-page";
import Loading from "./pages/loading-page";


export interface AppProps {

}

const App: React.SFC<AppProps> = () => {

    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute
                    exact={true}
                    path="/main"
                    component={Main}
                />
                <Route path="/" component={Loading} />
            </Switch>
            <Footer />
        </div>

    );
}

export default App;