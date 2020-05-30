import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import AuthStore from '../stores/auth-store'


const Header: React.FC = (props: any) => {

    const authStore = useContext(AuthStore)
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
        async function checkLoginStatus() {
            let signedIn = await authStore.isLoggedIn();
            setLoggedIn(signedIn);
        }
    });

    function logout() {
        authStore.logoutUser();
        props.history.push("/login");
    }

    const user = authStore.user ? authStore.user : null;

    return (

        <div>
            {
                loggedIn === true && user
                    ? <div>
                        <div>Hi, {authStore.getUsername()}!</div>
                        <a href="#" onClick={logout}>Logout</a>
                    </div>
                    : <div>Empty Header - Not Logged In</div>
            }
        </div>
    )
}

export default withRouter(Header);