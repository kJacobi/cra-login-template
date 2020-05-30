import React from 'react';
import { observer } from 'mobx-react';
import { Route, Redirect, RouteComponentProps } from 'react-router';
import AuthStore from '../stores/auth-store';
import loadingImg from '../assets/images/loading.gif';


const gen = require('../assets/styles/general.scss');

interface IPrivateRouteProps {
    exact: boolean;
    path: string;
    component:
    | React.StatelessComponent<{}>
    | React.ComponentClass<{}>
    | React.ComponentClass<RouteComponentProps<{}>>;
}

interface IPrivateRouteState {
    isAuth: boolean,
    loading: boolean
}

@observer
export class PrivateRoute extends React.Component<IPrivateRouteProps, IPrivateRouteState> {

    static contextType = AuthStore;


    constructor(PrivateRouteProps: any, PrivateRouteState: any) {
        super(PrivateRouteProps, PrivateRouteState);

        this.state = {
            isAuth: false,
            loading: true
        };
    }

    componentDidMount = async () => {
        const authStore = this.context;
        const isAuth = await authStore.isLoggedIn();
        const loading = false;

        this.setState({
            isAuth,
            loading
        });
    }

    render() {
        const { isAuth, loading } = this.state;
        return (
            <div>
                {loading
                    ? <div>
                        <p className={gen.loadingImg}>
                            <img id="loading" src={loadingImg} />
                        </p>
                    </div>
                    : (isAuth
                        ? <Route path={this.props.path} component={this.props.component} exact={this.props.exact} />
                        : <Redirect to="/" />
                    )
                }
            </div>
        );

    }
}