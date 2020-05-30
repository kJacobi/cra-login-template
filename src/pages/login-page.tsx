import React, { useContext, useState, useEffect } from "react";
import AuthStore, { IUserLogin } from '../stores/auth-store';
import loadingImg from '../assets/images/loading.gif';

const gen = require('../assets/styles/general.scss');


interface LoginPageProps {
}

const LoginPage: React.FC<LoginPageProps> = (props: any) => {

    const authStore = useContext(AuthStore);

    const initialValues: IUserLogin = { username: "", password: "", };

    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState(initialValues);
    const [error, setError] = useState("");

    useEffect(() => {
        checkLoginStatus();
        async function checkLoginStatus() {
            const loggedIn = await authStore.isLoggedIn();
            if (loggedIn === true) {
                props.history.push('/Main');
            }
        }
    });


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const res = await authStore.login(inputs);
        if (res) {
            setError(res);
            setLoading(false);
        } else {
            props.history.push('/Main');
        }

    };

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        e.persist();
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    return (

        <div className={gen.main}>

            {loading
                ?
                <div>
                    <p className={gen.loadingImg}>
                        <img id="loading" src={loadingImg} />
                    </p>
                </div>
                :
                <form className="container mx-auto max-w-sm" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="username">Email</label>
                        <input type="text" id="username" name="username" onChange={handleInputChange} value={inputs.username} placeholder="User" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={handleInputChange} value={inputs.password} placeholder="PW" />
                    </div>

                    {error ? <p>Error: {error}</p> : null}

                    <button type="submit">Login</button>

                </form>
            }

        </div>
    );

}

export default LoginPage;