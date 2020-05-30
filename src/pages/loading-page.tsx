import React, { useEffect } from 'react'
import loadingImg from '../assets/images/loading.gif';

const gen = require('../assets/styles/general.scss');

export interface Props {
}

const LoadingPage: React.FC<Props> = (props: any) => {

    useEffect(() => {
        props.history.push("/login");
    });

    return (
        <div>
            <p className={gen.loadingImg}>
                <img id="loading" src={loadingImg} />
            </p>
        </div>
    );
}

export default LoadingPage;